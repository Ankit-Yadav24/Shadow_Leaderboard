import clsx from "clsx";
import { twMerge } from "tailwind-merge";

// Utility to merge class names
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Get score for a specific subject from a leaderboard entry
export function getSubjectScore(entry, subjectType) {
  const subject = entry.subjects.find((s) =>
    s.subjectId.title.toLowerCase().includes(subjectType.toLowerCase())
  );
  return subject ? subject.totalMarkScored : 0;
}

// Format accuracy as string with 2 decimals
export function formatAccuracy(accuracy) {
  return `${accuracy.toFixed(2)}%`;
}

// Pagination helper
export function getPageNumbers(currentPage, totalPages) {
  const pageNumbers = [];

  if (currentPage > 1) {
    pageNumbers.push(1);
  }

  for (
    let i = Math.max(1, currentPage - 1);
    i <= Math.min(totalPages, currentPage + 1);
    i++
  ) {
    if (!pageNumbers.includes(i)) {
      pageNumbers.push(i);
    }
  }

  if (currentPage < totalPages - 1) {
    if (currentPage < totalPages - 2) {
      pageNumbers.push("...");
    }
    pageNumbers.push(totalPages);
  }

  return pageNumbers;
}

// Mock current user info
export function getMockCurrentUser(data) {
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

  const totalScore = mockSubjects.reduce(
    (sum, subject) => sum + subject.totalMarkScored,
    0
  );

  return {
    rank: 56,
    userId: { _id: "current-user-id", name: "You", profilePicture: "" },
    totalMarkScored: totalScore,
    accuracy: 79.5,
    subjects: mockSubjects,
    marksGained: totalScore,
    marksLost: 300 - totalScore,
    unansweredMarks: 0,
  };
}

// Starting rank calculation
export function getStartingRank(currentPage, limit) {
  return currentPage === 1 ? 4 : (currentPage - 1) * limit + 1;
}

// Get table data
export function getTableData(leaderboardData, currentPage) {
  return currentPage === 1 ? leaderboardData.slice(3) : leaderboardData;
}

// Medal icon based on rank
export function getMedalIcon(rank, isCurrentUser = false) {
  if (isCurrentUser) return null;

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

// Subject icon mapping
export function getSubjectIcon(subjectName) {
  const name = subjectName.toLowerCase();
  if (name.includes("phys")) return "physics-icon";
  if (name.includes("chem")) return "chemistry-icon";
  if (name.includes("math")) return "maths-icon";
  return "checks";
}

// Card class based on rank
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

// Badge class based on rank
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

// Rank ordinal string
export function formatRankOrdinal(rank) {
  if (rank === 1) return "1st";
  if (rank === 2) return "2nd";
  if (rank === 3) return "3rd";
  return `${rank}th`;
}

// Convert current user info to leaderboard entry
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

// Mock leaderboard entry
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
    userId: { _id: "current-user-id", name: "You", profilePicture: "" },
    totalMarkScored: totalScore,
    accuracy: 79.5,
    subjects: mockSubjects,
    marksGained: totalScore,
    marksLost: 300 - totalScore,
    unansweredMarks: 0,
  };
}

// Sorting types
export function sortLeaderboardData(data, field, direction) {
  return [...data].sort((a, b) => {
    let aValue;
    let bValue;

    switch (field) {
      case "rank":
        aValue = a.rank;
        bValue = b.rank;
        break;
      case "name":
        aValue = a.userId.name.toLowerCase();
        bValue = b.userId.name.toLowerCase();
        break;
      case "totalScore":
        aValue = a.totalMarkScored;
        bValue = b.totalMarkScored;
        break;
      case "physics":
        aValue = getSubjectScore(a, "physics");
        bValue = getSubjectScore(b, "physics");
        break;
      case "chemistry":
        aValue = getSubjectScore(a, "chemistry");
        bValue = getSubjectScore(b, "chemistry");
        break;
      case "maths":
        aValue = getSubjectScore(a, "maths");
        bValue = getSubjectScore(b, "maths");
        break;
      case "accuracy":
        aValue = a.accuracy;
        bValue = b.accuracy;
        break;
      default:
        return 0;
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    const comparison = aValue - bValue;
    return direction === "asc" ? comparison : -comparison;
  });
}

// Filter leaderboard data
export function filterLeaderboardData(data, criteria) {
  return data.filter((entry) => {
    if (criteria.searchTerm) {
      const searchLower = criteria.searchTerm.toLowerCase().trim();
      if (!entry.userId.name.toLowerCase().includes(searchLower)) return false;
    }
    if (criteria.scoreRange) {
      const { min, max } = criteria.scoreRange;
      if (entry.totalMarkScored < min || entry.totalMarkScored > max)
        return false;
    }
    if (criteria.accuracyRange) {
      const { min, max } = criteria.accuracyRange;
      if (entry.accuracy < min || entry.accuracy > max) return false;
    }
    if (criteria.subjects && criteria.subjects.length > 0) {
      const hasGoodSubjectScores = criteria.subjects.some(
        (subject) => getSubjectScore(entry, subject) > 50
      );
      if (!hasGoodSubjectScores) return false;
    }
    return true;
  });
}

// Get all available subjects from data
export function getAvailableSubjects(data) {
  const subjects = new Set();
  data.forEach((entry) => {
    entry.subjects.forEach((subject) => subjects.add(subject.subjectId.title));
  });
  return Array.from(subjects);
}
