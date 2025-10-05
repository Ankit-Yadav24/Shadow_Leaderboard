import { useState, useEffect } from "react";
import axios from "axios";

export const useLeaderboardData = ({ page = 1, limit = 10 } = {}) => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          "https://api.quizrr.in/api/hiring/leaderboard",
          { params: { page, limit } }
        );

        if (response.data.success) {
          setLeaderboardData(response.data.data.results);

          if (response.data.me) {
            setCurrentUser(response.data.me);
          }

          if (response.data.totalPages) {
            setTotalPages(response.data.totalPages);
          } else {
            setTotalPages(1);
          }
        } else {
          setError(response.data.message || "Failed to fetch leaderboard data");
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("An error occurred while fetching data")
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboardData();
  }, [page, limit]);

  return { leaderboardData, currentUser, totalPages, isLoading, error };
};
