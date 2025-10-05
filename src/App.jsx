import "./App.css";
import LeaderboardPage from "./Pages/Leaderboard";
import { ThemeProvider } from "./components/theme/themeProvider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <LeaderboardPage />
    </ThemeProvider>
  );
}

export default App;
