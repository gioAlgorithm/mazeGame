"use client"
import { collection, query, orderBy, getDocs, getDoc, doc, limit } from "firebase/firestore";
import { db, auth } from "../utils/firebase";

// Define an interface for leaderboard user
export interface LeaderboardUser {
  id: string;
  displayName: string;
  imageUrl: string | null;
  bestTime: number | null;
  totalGames: number | null;
}

// Fetch leaderboard data function
export const fetchLeaderboard = async () => {
  const usersCollection = collection(db, 'users');
  const leaderboardQuery = query(usersCollection, orderBy('bestTime'), limit(10));
  const leaderboardSnapshot = await getDocs(leaderboardQuery);
  const leaderboardUsers: LeaderboardUser[] = [];

  for (const userDoc of leaderboardSnapshot.docs) {
    try {
      const userData = userDoc.data();
      const { displayName, imageUrl } = userData;

      let bestTime: number | null = null;
      let totalGames: number | null = null;

      const statsDocRef = doc(db, `users/${userDoc.id}/stats/stats`);
      const statsDocSnapshot = await getDoc(statsDocRef);

      if (statsDocSnapshot.exists()) {
        const statsData = statsDocSnapshot.data();
        bestTime = statsData?.bestTime || null;
        totalGames = statsData?.totalGames || null;
      } else {
        // Initialize bestTime and totalGames if stats document doesn't exist
        bestTime = 0;
        totalGames = 0;
      }

      leaderboardUsers.push({
        id: userDoc.id,
        displayName: displayName || 'Unknown',
        imageUrl: imageUrl || null,
        bestTime,
        totalGames
      });
    } catch (error) {
      console.error('Error fetching stats for user:', userDoc.id, error);
    }
  }

  // Check if there is a signed-in user
  const signedInUser = auth.currentUser;
  if (signedInUser) {
    // Fetch the stats of the signed-in user
    const statsDocRef = doc(db, `users/${signedInUser.uid}/stats/stats`);
    const statsDocSnapshot = await getDoc(statsDocRef);
    if (statsDocSnapshot.exists()) {
      const signedInUserData = statsDocSnapshot.data();
      const signedInUserBestTime = signedInUserData?.bestTime || null;
      const signedInUserTotalGames = signedInUserData?.totalGames || null;
      if (signedInUserBestTime !== null) {
        // Include the signed-in user in the leaderboard
        leaderboardUsers.push({
          id: signedInUser.uid,
          displayName: signedInUser.displayName || 'Unknown',
          imageUrl: signedInUser.photoURL || null,
          bestTime: signedInUserBestTime,
          totalGames: signedInUserTotalGames
        });

        // Re-sort the leaderboard to maintain correct ordering
        leaderboardUsers.sort((a, b) => (a.bestTime !== null && b.bestTime !== null) ? a.bestTime - b.bestTime : 0);

        // Keep only the top 10 users in the leaderboard
        leaderboardUsers.splice(10);
      }
    }
  }

  return leaderboardUsers;
};