import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../utils/firebase";
import { GameHistory } from "@/context/UserContext";

export const fetchGameHistory = async (userId: string) => {
  const historyRef = collection(db, `users/${userId}/history`);

  try {
    const q = query(historyRef, orderBy('timestamp', 'desc'), limit(20));
    const historySnapshot = await getDocs(q);

    if (!historySnapshot.empty) {
      // Map each document to its data and return
      const userHistory: GameHistory[] = historySnapshot.docs.map(doc => ({
        id: doc.id,
        levelLost: doc.data().levelLost,
        timeSpent: doc.data().timeSpent,
        timestamp: doc.data().timestamp,
        WinOrLost: doc.data().WinOrLost
      }));
      
      return userHistory;
    } else {
      console.log("User history documents do not exist in Firestore.");
      return [];
    }
  } catch (error) {
    console.error('Error fetching user history:', error);
    return [];
  }
};