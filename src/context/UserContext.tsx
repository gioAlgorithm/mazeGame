"use client"
import React, {useState, useEffect, createContext, useCallback} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from "../utils/firebase";
import { fetchUserStats } from '@/utils/fetchUserStats';
import { fetchGameHistory } from '@/utils/fetchGameHistory';
import { LeaderboardUser } from '@/utils/fetchLeaderboard';
import { fetchLeaderboard } from '@/utils/fetchLeaderboard';

// type interface for game state
export interface GameHistory {
  id: string;
  levelLost: string;
  timeSpent: string;
  timestamp: { toDate(): Date }; // Assuming timestamp is a Firestore Timestamp
  WinOrLost: string;
}


//interface for contextprovider which is going to be only child
interface ContextProviderProps{
  children: React.ReactNode
}

interface ContextType{
  leaderboard: LeaderboardUser[],
  loadingLeaderboard:  boolean,
  gameHistory: GameHistory[];
  setGameHistory: React.Dispatch<React.SetStateAction<GameHistory[]>>;
  bestTime: number | null;
  setBestTime: React.Dispatch<React.SetStateAction<number | null>>;
  totalWins: number | null;
  setTotalWins: React.Dispatch<React.SetStateAction<number | null>>;
  totalTime: number | null;
  setTotalTime: React.Dispatch<React.SetStateAction<number | null>>;
  totalGames: number | null;
  setTotalGames: React.Dispatch<React.SetStateAction<number | null>>;
  levelCount: Record<string, number | null>;
  setLevelCount:React.Dispatch<React.SetStateAction<Record<string, number | null>>>
  loadingSkeleton: boolean;
  setLoadingSkeleton: React.Dispatch<React.SetStateAction<boolean>>;
  fetchData: () => void;
}

export const UserContext = createContext<ContextType>({
  leaderboard: [],
  loadingLeaderboard: true,
  gameHistory: [],
  setGameHistory: ()=> {},
  bestTime: null,
  setBestTime: ()=> {},
  totalWins: null,
  setTotalWins: ()=> {},
  totalTime: null,
  setTotalTime: ()=> {},
  totalGames: null,
  setTotalGames: ()=> {},
  levelCount: {},
  setLevelCount: ()=> {},
  loadingSkeleton: true,
  setLoadingSkeleton: ()=> {},
  fetchData: () => { },
})

const UserProvider = ({children}: ContextProviderProps) => {
  const [user] = useAuthState(auth) 

  // states for stats and history
  const [gameHistory, setGameHistory] = useState<GameHistory[]>([]);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [totalWins, setTotalWins] = useState<number | null>(null);
  const [totalTime, setTotalTime] = useState<number | null>(null);
  const [totalGames, setTotalGames] = useState<number | null>(null);
  const [levelCount, setLevelCount] = useState<Record<string, number | null>>({})

  // loading state
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);

  // Define states for leaderboard and loading
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(true);

  // Fetch leaderboard function
  const fetchLeaderboardData = useCallback(async () => {
    try {
      const leaderboardData = await fetchLeaderboard();
      setLeaderboard(leaderboardData);
      setLoadingLeaderboard(false);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      setLoadingLeaderboard(false);
    }
  }, []);
  
  useEffect(() => {
    fetchLeaderboardData();
  }, [fetchLeaderboardData]);


  // fetching history and the stats
  const fetchData = useCallback(async () => {
    try {
      if (user) {
        const userId = user.uid;
        
        // Fetch user history
        const userHistory = await fetchGameHistory(userId);
        setGameHistory(userHistory);
        setLoadingSkeleton(false);
        
        // Fetch user stats
        const stats = await fetchUserStats(userId);
        if (stats) {
          // Update state with fetched stats
          setBestTime(stats.bestTime);
          setTotalWins(stats.totalWins);
          setTotalTime(stats.totalTime);
          setTotalGames(stats.totalGames);
          setLevelCount(stats.fetchedLevels);
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setLoadingSkeleton(false);
    }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  

  return (
    <UserContext.Provider
      value={{
        leaderboard,
        loadingLeaderboard,
        gameHistory,
        setGameHistory,
        bestTime,
        setBestTime,
        totalWins,
        setTotalWins,
        loadingSkeleton,
        setLoadingSkeleton,
        totalTime, 
        setTotalTime,
        levelCount, 
        setLevelCount,
        totalGames, 
        setTotalGames,
        fetchData,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider