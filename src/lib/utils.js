import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Helper to merge Tailwind classes
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Get score of a subject from a leaderboard entry
export function getSubjectScore(entry, subjectType) {
  const subject = entry.subjects.find((s) =>
    s.subjectId.title.toLowerCase().includes(subjectType.toLowerCase())
  );
  return subject ? subject.totalMarkScored : 0;
}

// Format accuracy number to string with %
export function formatAccuracy(accuracy) {
  return `${accuracy.toFixed(2)}%`;
}

// Generate page numbers for pagination
export function getPageNumbers(currentPage, totalPages) {
  const pageNumbers = [];

  if (currentPage > 1) pageNumbers.push(1);

  for (
    let i = Math.max(1, currentPage - 1);
    i <= Math.min(totalPages, currentPage + 1);
    i++
  ) {
    if (!pageNumbers.includes(i)) pageNumbers.push(i);
  }

  if (currentPage < totalPages - 1) {
    if (currentPage < totalPages - 2) pageNumbers.push("...");
    pageNumbers.push(totalPages);
  }

  return pageNumbers;
}

// Mock current user info from leaderboard
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
    (sum, s) => sum + s.totalMarkScored,
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

// Starting rank for current page
export function getStartingRank(currentPage, limit) {
  return currentPage === 1 ? 4 : (currentPage - 1) * limit + 1;
}

// Slice leaderboard data for table display
export function getTableData(leaderboardData, currentPage) {
  return currentPage === 1 ? leaderboardData.slice(3) : leaderboardData;
}

// Medal icon based on rank
export function getMedalIcon(rank, isCurrentUser = false) {
  if (isCurrentUser) return null;
  if (rank === 1) return "1st-place-medal";
  if (rank === 2) return "2nd-place-medal";
  if (rank === 3) return "3rd-place-medal";
  return null;
}

// Subject icon based on name
export function getSubjectIcon(subjectName) {
  const name = subjectName.toLowerCase();
  if (name.includes("phys")) return "physics-icon";
  if (name.includes("chem")) return "chemistry-icon";
  if (name.includes("math")) return "maths-icon";
  return "checks";
}

// CSS classes for leaderboard cards
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

// CSS classes for rank badges
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

// Convert numeric rank to ordinal
export function formatRankOrdinal(rank) {
  if (rank === 1) return "1st";
  if (rank === 2) return "2nd";
  if (rank === 3) return "3rd";
  return `${rank}th`;
}

// Convert current user info to leaderboard entry
export function convertCurrentUserToEntry(user) {
  return { ...user };
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
    (sum, s) => sum + s.totalMarkScored,
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

// Sorting leaderboard data
export function sortLeaderboardData(data, field, direction) {
  return [...data].sort((a, b) => {
    let aValue, bValue;

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

    return direction === "asc" ? aValue - bValue : bValue - aValue;
  });
}

// Filter leaderboard data
export function filterLeaderboardData(data, criteria) {
  let filteredData = data;

  if (criteria.searchTerm) {
    const searchLower = criteria.searchTerm.toLowerCase().trim();
    filteredData = filteredData.filter((entry) =>
      entry.userId.name.toLowerCase().includes(searchLower)
    );
  }

  if (criteria.scoreRange) {
    const { min, max } = criteria.scoreRange;
    filteredData = filteredData.filter(
      (entry) => entry.totalMarkScored >= min && entry.totalMarkScored <= max
    );
  }

  if (criteria.accuracyRange) {
    const { min, max } = criteria.accuracyRange;
    filteredData = filteredData.filter(
      (entry) => entry.accuracy >= min && entry.accuracy <= max
    );
  }

  if (criteria.subjects && criteria.subjects.length > 0) {
    filteredData = filteredData.filter((entry) => {
      return criteria.subjects.some(
        (subject) => getSubjectScore(entry, subject) > 50
      );
    });
  }

  return filteredData;
}

// Get unique subjects from leaderboard
export function getAvailableSubjects(data) {
  const subjects = new Set();
  data.forEach((entry) => {
    entry.subjects.forEach((subject) => subjects.add(subject.subjectId.title));
  });
  return Array.from(subjects);
}

// Social share utilities
export function generateShareData(currentUser) {
  return {
    title: "JEE Main Achievement",
    text: `Just achieved rank #${
      currentUser.rank
    } in JEE Main Test Series! Scored ${
      currentUser.totalMarkScored
    }/300 with ${currentUser.accuracy.toFixed(1)}% accuracy`,
    url: window.location.href,
    hashtags: ["JEEMain", "Achievement", "TestSeries"],
  };
}

export function getSocialPlatforms(shareData) {
  const { text, url, title } = shareData;

  return [
    {
      name: "WhatsApp",
      icon: "whatsapp",
      color: "var(--q3-base-green)",
      shareUrl: `https://wa.me/?text=${encodeURIComponent(
        `${text}\n\n${url}`
      )}`,
    },
    {
      name: "Twitter",
      icon: "twitter",
      color: "var(--q3-base-blue)",
      shareUrl: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${encodeURIComponent(url)}`,
    },
    {
      name: "LinkedIn",
      icon: "linkedin",
      color: "var(--q3-base-indigo)",
      shareUrl: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(
        text
      )}`,
    },
    {
      name: "Facebook",
      icon: "facebook",
      color: "var(--q3-base-blue)",
      shareUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}&quote=${encodeURIComponent(text)}`,
    },
    {
      name: "Telegram",
      icon: "telegram",
      color: "var(--q3-base-sky)",
      shareUrl: `https://t.me/share/url?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(text)}`,
    },
  ];
}

// Achievement levels
export function getAchievementLevel(rank) {
  if (rank <= 3)
    return {
      title: "Elite Champion",
      color: "var(--q3-base-yellow)",
      icon: "crown",
    };
  if (rank <= 10)
    return {
      title: "Top Performer",
      color: "var(--q3-base-orange)",
      icon: "medal",
    };
  if (rank <= 50)
    return {
      title: "High Achiever",
      color: "var(--q3-base-blue)",
      icon: "target",
    };
  return { title: "Rising Star", color: "var(--q3-base-green)", icon: "star" };
}

// Clipboard utility
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

// Open social share window
export function openSocialShare(url) {
  window.open(
    url,
    "_blank",
    "width=600,height=400,scrollbars=yes,resizable=yes"
  );
}

// Get rank suffix
export function getRankSuffix(rank) {
  if (rank === 1) return "st";
  if (rank === 2) return "nd";
  if (rank === 3) return "rd";
  return "th";
}
