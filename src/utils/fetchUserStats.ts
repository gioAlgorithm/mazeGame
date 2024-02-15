import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

export const fetchUserStats = async (userId: string) => {
  const userStatsDoc = doc(db, `users/${userId}/stats/stats`);

  try {
    const statsSnapshot = await getDoc(userStatsDoc);
    

    if (statsSnapshot.exists()) {
      // hard coding the levels 
      const fetchedLevels: Record<string, number | null> = {};

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
      
      // Extract stats from snapshot and return
      return {
        bestTime: statsSnapshot.data()?.bestTime || null,
        totalWins: statsSnapshot.data()?.totalWins || null,
        totalTime: statsSnapshot.data()?.totalTime || null,
        totalGames: statsSnapshot.data()?.totalGames || null,
        fetchedLevels
      };
    } else {
      console.log("Stats document does not exist in Firestore.");
      return null;
    }
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return null;
  }
};