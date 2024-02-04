"use client"
import React, {useState, useEffect, createContext} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import {collection, getDocs, query, orderBy, limit, doc, getDoc} from "firebase/firestore"
import { auth, db } from "../utils/firebase";

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
}

export const UserContext = createContext<ContextType>({
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

  useEffect(() => {
    const fetchGameHistory = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const uid = currentUser.uid;
          const historyRef = collection(db, 'users', uid, 'history');
          const q = query(historyRef, orderBy('timestamp', 'desc'), limit(30));
          const historyDocs = await getDocs(q);
    
          const historyData: GameHistory[] = historyDocs.docs.map((doc) => {
            const data = doc.data() as GameHistory;
            return {
              ...data,
              id: doc.id,
            };
          });
    
          setGameHistory(historyData);
          setLoadingSkeleton(false);
        }
      } catch (error) {
        console.error('Error fetching game history:', error);
        setLoadingSkeleton(false);
      }
    };
  
    const fetchUserStats = async () => {
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;
        const userStatsDoc = doc(db, `users/${userId}/stats/stats`);

        try {
          const statsSnapshot = await getDoc(userStatsDoc);

          if (statsSnapshot.exists()) {
            const currentBestTime = statsSnapshot.data()?.bestTime || null;
            const totalWins = statsSnapshot.data()?.totalWins || null;
            const totalTime = statsSnapshot.data()?.totalTime || null;
            const totalGames = statsSnapshot.data()?.totalGames || null;

            setBestTime(currentBestTime);
            setTotalWins(totalWins);
            setTotalTime(totalTime);
            setTotalGames(totalGames);

            // hard coding the levels 
            const fetchedLevels: Record<string, number | null> = {};

            // Hard code the levels based on your desired format
            fetchedLevels["Level 1"] = statsSnapshot.data()?.levelOne || null;
            fetchedLevels["Level 2"] = statsSnapshot.data()?.levelTwo || null;
            fetchedLevels["Level 3"] = statsSnapshot.data()?.levelThree || null;
            fetchedLevels["Level 4"] = statsSnapshot.data()?.levelFour || null;
            fetchedLevels["Level 5"] = statsSnapshot.data()?.levelFive || null;
            fetchedLevels["Level 6"] = statsSnapshot.data()?.levelSix || null;
            fetchedLevels["Level 7"] = statsSnapshot.data()?.levelSeven || null;
            fetchedLevels["Level 8"] = statsSnapshot.data()?.levelEight || null;
            fetchedLevels["Level 9"] = statsSnapshot.data()?.levelNine || null;
            fetchedLevels["Level 10"] = statsSnapshot.data()?.levelTen || null;

            setLevelCount(fetchedLevels);
          } else {
            console.log("Stats document does not exist in Firestore.");
          }
        } catch (error) {
          console.error('Error fetching user stats:', error);
        }
      }
    };
    fetchUserStats()
    fetchGameHistory()
  }, [user]);

  return (
    <UserContext.Provider
      value={{
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
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider