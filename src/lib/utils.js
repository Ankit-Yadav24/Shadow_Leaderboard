import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Generates a mock current user from available leaderboard data or creates a default one
 */
export function getMockCurrentUser(data) {
  // If we have leaderboard data, select a random entry to use as current user
  if (data.length > 0) {
    const randomIndex = Math.floor(Math.random() * data.length);
    const randomEntry = data[randomIndex];

    return {
      ...randomEntry,
      userId: {
        ...randomEntry.userId,
        name: randomEntry.userId.name,
      },
      rank: randomEntry.rank,
    };
  }

  // Fallback if no leaderboard data is available
  const mockSubjects = [
    {
      subjectId: { _id: "physics-id", title: "Physics" },
      totalMarkScored: 65,
      accuracy: 78.5,
    },
    {
      subjectId: { _id: "chemistry-id", title: "Chemistry" },
      totalMarkScored: 72,
      accuracy: 82.3,
    },
    {
      subjectId: { _id: "maths-id", title: "Mathematics" },
      totalMarkScored: 68,
      accuracy: 75.8,
    },
  ];

  // Calculate total score
  const totalScore = mockSubjects.reduce(
    (sum, subject) => sum + subject.totalMarkScored,
    0
  );

  return {
    rank: 56, // Mock rank
    userId: {
      _id: "current-user-id",
      name: "You",
      profilePicture: "",
    },
    totalMarkScored: totalScore,
    accuracy: 79.5,
    subjects: mockSubjects,
    marksGained: totalScore,
    marksLost: 300 - totalScore,
    unansweredMarks: 0,
  };
}

/**
 * Calculate starting rank for the leaderboard table based on current page
 */
export function getStartingRank(currentPage, limit) {
  return currentPage === 1 ? 4 : (currentPage - 1) * limit + 1;
}

/**
 * Get table data by slicing leaderboard data appropriately
 */
export function getTableData(leaderboardData, currentPage) {
  return currentPage === 1 ? leaderboardData.slice(3) : leaderboardData;
}

/**
 * Get medal icon name based on rank
 */
export function getMedalIcon(rank, isCurrentUser = false) {
  if (isCurrentUser) return null; // Current user doesn't get medals

  switch (rank) {
    case 1:
      return "1st-place-medal";
    case 2:
      return "2nd-place-medal";
    case 3:
      return "3rd-place-medal";
    default:
      return null;
  }
}

/**
 * Get subject icon name based on subject title
 */
export function getSubjectIcon(subjectName) {
  const name = subjectName.toLowerCase();
  if (name.includes("phys")) return "physics-icon";
  if (name.includes("chem")) return "chemistry-icon";
  if (name.includes("math")) return "maths-icon";
  return "checks";
}

/**
 * Get card CSS class based on rank and current user status
 */
export function getLeaderboardCardClass(rank, isCurrentUser = false) {
  if (isCurrentUser) return "leaderboard-card--current-user";

  switch (rank) {
    case 1:
      return "leaderboard-card--rank1";
    case 2:
      return "leaderboard-card--rank2";
    case 3:
      return "leaderboard-card--rank3";
    default:
      return "leaderboard-card--default";
  }
}

/**
 * Get rank badge CSS class based on rank and current user status
 */
export function getRankBadgeClass(rank, isCurrentUser = false) {
  if (isCurrentUser) return "rank-badge--current-user";

  switch (rank) {
    case 1:
      return "rank-badge--rank1";
    case 2:
      return "rank-badge--rank2";
    case 3:
      return "rank-badge--rank3";
    default:
      return "rank-badge--default";
  }
}

/**
 * Format rank as ordinal string (1st, 2nd, 3rd, etc.)
 */
export function formatRankOrdinal(rank) {
  if (rank === 1) return "1st";
  if (rank === 2) return "2nd";
  if (rank === 3) return "3rd";
  return `${rank}th`;
}

/**
 * Convert current user info to leaderboard entry
 */
export function convertCurrentUserToEntry(user) {
  return {
    rank: user.rank,
    userId: user.userId,
    totalMarkScored: user.totalMarkScored,
    accuracy: user.accuracy,
    subjects: user.subjects,
    marksGained: user.marksGained,
    marksLost: user.marksLost,
    unansweredMarks: user.unansweredMarks,
  };
}

/**
 * Generate a mock LeaderboardEntry to represent the current user
 */
export function mockLeaderboardEntry(topEntries) {
  const mockSubjects = [];

  if (topEntries.length > 0 && topEntries[0].subjects.length > 0) {
    topEntries[0].subjects.forEach((subj) => {
      mockSubjects.push({
        subjectId: { ...subj.subjectId },
        totalMarkScored: Math.floor(Math.random() * 50) + 30,
        accuracy: Math.random() * 20 + 70,
      });
    });
  } else {
    mockSubjects.push(
      {
        subjectId: { _id: "physics-id", title: "Physics" },
        totalMarkScored: 65,
        accuracy: 78.5,
      },
      {
        subjectId: { _id: "chemistry-id", title: "Chemistry" },
        totalMarkScored: 72,
        accuracy: 82.3,
      },
      {
        subjectId: { _id: "maths-id", title: "Mathematics" },
        totalMarkScored: 68,
        accuracy: 75.8,
      }
    );
  }

  const totalScore = mockSubjects.reduce(
    (sum, subject) => sum + subject.totalMarkScored,
    0
  );

  return {
    rank: 56,
    userId: {
      _id: "current-user-id",
      name: "You",
      profilePicture: "",
    },
    totalMarkScored: totalScore,
    accuracy: 79.5,
    subjects: mockSubjects,
    marksGained: totalScore,
    marksLost: 300 - totalScore,
    unansweredMarks: 0,
  };
}
