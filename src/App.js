import React, { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Container,
  Typography,
  Box,
  Select,
  MenuItem,
  Checkbox,
  Divider,
  FormControlLabel,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  IconButton,
  Menu,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings"; // Import Settings Icon
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { supabase } from "./services/supabaseClient";
import { getPlayersByGame } from "./services/fetchPlayersByGame";
import "./App.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const gameLogos = {
  "Quake World": require("./logos/quakeworld_logo.png"),
  "Quake 2": require("./logos/quake2_logo.png"),
  "Quake 3": require("./logos/quake3_logo.png"),
  "Quake 4": require("./logos/quake4_logo.png"),
  "Quake Live": require("./logos/quakelive_logo.png"),
  "Quake Champions": require("./logos/quakechampions_logo.png"),
};

function App() {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [selectedGame, setSelectedGame] = useState("None");
  const [gameList, setGameList] = useState(["None"]);
  const [settingsAnchorEl, setSettingsAnchorEl] = useState(null);
  const [pointsConfig, setPointsConfig] = useState({
    first: 100,
    second: 75,
    top4: 50,
    top8: 25,
  });
  const [pointsVisibility, setPointsVisibility] = useState({
    first: true,
    second: true,
    top4: true,
    top8: true,
  });
  const [gameWeights, setGameWeights] = useState({});
  const [gameVisibility, setGameVisibility] = useState({});
  const [tierWeights, setTierWeights] = useState({
    1: 100,
    2: 75,
    3: 50,
    4: 25,
    5: 10,
  });
  const [tierVisibility, setTierVisibility] = useState({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [lanOnly, setLanOnly] = useState(false);
  const [sortBy, setSortBy] = useState("rank"); // Default sorting by rank/points
  const [sortOrder, setSortOrder] = useState("asc"); // Default ascending order

  useEffect(() => {
    async function fetchGames() {
      const { data, error } = await supabase.from("Tournaments").select("Game");

      if (error) {
        console.error("Error fetching games:", error.message);
        return;
      }

      const uniqueGames = [...new Set(data.map((t) => t.Game))];
      setGameList(["None", ...uniqueGames]);

      const initialWeights = {};
      const initialVisibility = {};
      uniqueGames.forEach((game) => {
        initialWeights[game] = 100;
        initialVisibility[game] = true;
      });
      setGameWeights(initialWeights);
      setGameVisibility(initialVisibility);
    }

    fetchGames();
  }, []);

  useEffect(() => {
    async function fetchFilteredPlayers() {
      const fetchedPlayers = await getPlayersByGame(
        selectedGame,
        pointsConfig,
        pointsVisibility,
        gameWeights,
        gameVisibility,
        lanOnly,
        tierWeights,
        tierVisibility
      );

      const sortedPlayers = fetchedPlayers.sort((a, b) => b.points - a.points);

      sortedPlayers.forEach((player, index) => {
        player.rank = index + 1;
      });

      setPlayers(sortedPlayers);

      const searchedPlayers = sortedPlayers.filter((p) =>
        p.player.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPlayers(searchedPlayers);
    }

    fetchFilteredPlayers();
  }, [
    selectedGame,
    pointsConfig,
    pointsVisibility,
    gameWeights,
    gameVisibility,
    lanOnly,
    tierWeights,
    tierVisibility,
    searchQuery,
  ]);

  // Sorting logic
  const handleSort = (column) => {
    const isAsc = sortBy === column && sortOrder === "asc";
    setSortBy(column);
    setSortOrder(isAsc ? "desc" : "asc");

    const sorted = [...filteredPlayers].sort((a, b) => {
      if (column === "games") {
        // Sort by the number of games (longest strings first)
        return isAsc
          ? b.games.split(", ").length - a.games.split(", ").length
          : a.games.split(", ").length - b.games.split(", ").length;
      }
      if (isAsc) {
        return a[column] > b[column] ? 1 : -1;
      }
      return a[column] < b[column] ? 1 : -1;
    });

    setFilteredPlayers(sorted);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const handleSettingsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSettingsClose = () => {
    setAnchorEl(null);
  };
  const isOpen = Boolean(anchorEl);

  const handlePointsChange = (placement, value) => {
    setPointsConfig((prev) => ({
      ...prev,
      [placement]: parseInt(value) || 0,
    }));
  };

  const handleGameWeightChange = (game, value) => {
    setGameWeights((prev) => ({
      ...prev,
      [game]: parseFloat(value) || 0,
    }));
  };

  const handleGameVisibilityChange = (game) => {
    setGameVisibility((prev) => ({
      ...prev,
      [game]: !prev[game],
    }));
  };

  const handleTierWeightChange = (tier, value) => {
    setTierWeights((prev) => ({
      ...prev,
      [tier]: parseFloat(value) || 0,
    }));
  };

  const handleTierVisibilityChange = (tier) => {
    setTierVisibility((prev) => ({
      ...prev,
      [tier]: !prev[tier],
    }));
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container>
        <Typography variant="h3" align="center" gutterBottom>
          Quake Rankings
        </Typography>
        <Box display="flex" justifyContent="flex-end" alignItems="center" p={2}>
          <IconButton
            color="inherit"
            onClick={handleSettingsClick}
            aria-controls="settings-menu"
            aria-haspopup="true"
          >
            <SettingsIcon />
          </IconButton>
          <Popover
            id="settings-popover"
            open={isOpen}
            anchorEl={anchorEl}
            onClose={handleSettingsClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            className="custom-popover" // Custom class name
            PaperProps={{
              className: "custom-paper", // Class for the paper element
            }}
          >
            {/* Points Configuration */}
            <Typography className="subtitle1" variant="subtitle1" gutterBottom>
              Points Configuration
            </Typography>
            {["first", "second", "top4", "top8"].map((placement) => (
              <Box
                className="settings-boxes"
                key={placement}
                display="flex"
                alignItems="center"
                mb={1}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={pointsVisibility[placement]}
                      onChange={() =>
                        setPointsVisibility((prev) => ({
                          ...prev,
                          [placement]: !prev[placement],
                        }))
                      }
                    />
                  }
                  label={
                    <Typography variant="body2">
                      {placement.toUpperCase()}
                    </Typography>
                  }
                />
                {/* Points Input Field */}
                {pointsVisibility[placement] && (
                  <TextField
                    type="number"
                    size="small"
                    value={pointsConfig[placement]}
                    onChange={(e) =>
                      setPointsConfig((prev) => ({
                        ...prev,
                        [placement]: parseInt(e.target.value) || 0,
                      }))
                    }
                    style={{ marginLeft: "10px", width: "100px" }}
                  />
                )}
              </Box>
            ))}
            <Divider style={{ margin: "10px 0" }} />

            {/* Game Weights */}
            <Typography className="subtitle1" variant="subtitle1" gutterBottom>
              Game Weights
            </Typography>
            {Object.keys(gameWeights).map((game) => (
              <Box
                className="settings-boxes"
                key={game}
                display="flex"
                alignItems="center"
                mb={1}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={gameVisibility[game] ?? true}
                      onChange={() => handleGameVisibilityChange(game)}
                    />
                  }
                  label={
                    <Typography variant="body2">
                      {game.toUpperCase()}
                    </Typography>
                  }
                />
                {gameVisibility[game] && (
                  <TextField
                    type="number"
                    size="small"
                    value={gameWeights[game]}
                    onChange={(e) =>
                      handleGameWeightChange(game, e.target.value)
                    }
                    style={{ marginLeft: "10px", width: "100px" }}
                  />
                )}
              </Box>
            ))}
            <Divider style={{ margin: "10px 0" }} />

            {/* Tier Weights */}
            <Typography className="subtitle1" variant="subtitle1" gutterBottom>
              Tier Weights
            </Typography>
            {Object.keys(tierWeights).map((tier) => (
              <Box
                className="settings-boxes"
                key={tier}
                display="flex"
                alignItems="center"
                mb={1}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={tierVisibility[tier]}
                      onChange={() => handleTierVisibilityChange(tier)}
                    />
                  }
                  label={
                    <Typography variant="body2">{`TIER ${tier}`}</Typography>
                  }
                />
                {tierVisibility[tier] && (
                  <TextField
                    type="number"
                    size="small"
                    value={tierWeights[tier]}
                    onChange={(e) =>
                      handleTierWeightChange(tier, e.target.value)
                    }
                    style={{ marginLeft: "10px", width: "100px" }}
                  />
                )}
              </Box>
            ))}
          </Popover>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <Box>
            <Typography variant="body1">Filter by Game:</Typography>
            <Select
              value={selectedGame}
              onChange={(e) => setSelectedGame(e.target.value)}
              fullWidth
            >
              {gameList.map((game) => (
                <MenuItem key={game} value={game}>
                  {game}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box>
            <Typography variant="body1">Search Player:</Typography>
            <TextField
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter player name"
              fullWidth
            />
          </Box>
          <FormControlLabel
            control={
              <Checkbox
                checked={lanOnly}
                onChange={(e) => setLanOnly(e.target.checked)}
              />
            }
            label="LAN-Only"
          />
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {/* Rank */}
                <TableCell align="center">
                  <TableSortLabel
                    active={sortBy === "rank"}
                    direction={sortBy === "rank" ? sortOrder : "asc"}
                    onClick={() => handleSort("rank")}
                  >
                    Rank
                  </TableSortLabel>
                </TableCell>
                {/* Player */}
                <TableCell>
                  <TableSortLabel
                    active={sortBy === "player"}
                    direction={sortBy === "player" ? sortOrder : "asc"}
                    onClick={() => handleSort("player")}
                  >
                    Player
                  </TableSortLabel>
                </TableCell>
                {/* Games Played */}
                <TableCell>
                  <TableSortLabel
                    active={sortBy === "games"}
                    direction={sortBy === "games" ? sortOrder : "asc"}
                    onClick={() => handleSort("games")}
                  >
                    Games Played
                  </TableSortLabel>
                </TableCell>
                {/* 1st */}
                <TableCell align="right" className="gold-header">
                  <TableSortLabel
                    active={sortBy === "firsts"}
                    direction={sortBy === "firsts" ? sortOrder : "asc"}
                    onClick={() => handleSort("firsts")}
                  >
                    1st
                  </TableSortLabel>
                </TableCell>
                {/* 2nd */}
                <TableCell align="right" className="silver-header">
                  <TableSortLabel
                    active={sortBy === "seconds"}
                    direction={sortBy === "seconds" ? sortOrder : "asc"}
                    onClick={() => handleSort("seconds")}
                  >
                    2nd
                  </TableSortLabel>
                </TableCell>
                {/* Top4 */}
                <TableCell align="right" className="bronze-header">
                  <TableSortLabel
                    active={sortBy === "top4"}
                    direction={sortBy === "top4" ? sortOrder : "asc"}
                    onClick={() => handleSort("top4")}
                  >
                    Top4
                  </TableSortLabel>
                </TableCell>
                {/* Top8 */}
                <TableCell align="right" className="copper-header">
                  <TableSortLabel
                    active={sortBy === "top8"}
                    direction={sortBy === "top8" ? sortOrder : "asc"}
                    onClick={() => handleSort("top8")}
                  >
                    Top8
                  </TableSortLabel>
                </TableCell>
                {/* Participations */}
                <TableCell align="right">
                  <TableSortLabel
                    active={sortBy === "participations"}
                    direction={sortBy === "participations" ? sortOrder : "asc"}
                    onClick={() => handleSort("participations")}
                  >
                    Participations
                  </TableSortLabel>
                </TableCell>
                {/* Points */}
                <TableCell align="right">
                  <TableSortLabel
                    active={sortBy === "points"}
                    direction={sortBy === "points" ? sortOrder : "asc"}
                    onClick={() => handleSort("points")}
                  >
                    Points
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPlayers.map((player, index) => (
                <TableRow key={player.player}>
                  {/* Rank */}
                  <TableCell align="center" className="numbers-list">
                    {index + 1}
                  </TableCell>
                  {/* Player */}
                  <TableCell className="players-list">
                    {player.player}
                  </TableCell>
                  {/* Games Played */}
                  <TableCell className="games-list">
                    <Box display="flex" justifyContent="left" alignItems="left">
                      {player.games.split(", ").map((game) => (
                        <img
                          key={game}
                          src={gameLogos[game]}
                          alt={game}
                          title={game}
                          style={{
                            width: "30px",
                            height: "30px",
                            margin: "0 5px",
                          }}
                        />
                      ))}
                    </Box>
                  </TableCell>

                  {/* 1st */}
                  <TableCell align="right" className="numbers-list gold-list">
                    {player.firsts}
                  </TableCell>
                  {/* 2nd */}
                  <TableCell align="right" className="numbers-list silver-list">
                    {player.seconds}
                  </TableCell>
                  {/* Top4 */}
                  <TableCell align="right" className="numbers-list bronze-list">
                    {player.top4}
                  </TableCell>
                  {/* Top8 */}
                  <TableCell align="right" className="numbers-list copper-list">
                    {player.top8}
                  </TableCell>
                  {/* Participations */}
                  <TableCell align="right" className="numbers-list">
                    {player.participations}
                  </TableCell>
                  {/* Points */}
                  <TableCell align="right" className="numbers-list">
                    {Math.round(player.points)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
}

export default App;
