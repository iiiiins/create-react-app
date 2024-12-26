import { supabase } from "./supabaseClient";

export async function getPlayersByGame(
  selectedGame,
  pointsConfig,
  pointsVisibility,
  gameWeights,
  gameVisibility,
  lanOnly,
  tierWeights,
  tierVisibility
) {
  const query =
    selectedGame === "None"
      ? supabase.from("Tournaments").select()
      : supabase.from("Tournaments").select().eq("Game", selectedGame);

  const { data: tournaments, error } = await query;

  if (error) {
    console.error("Error fetching tournaments:", error.message);
    return [];
  }

  const playerStats = {};

  tournaments.forEach((tournament) => {
    const game = tournament.Game;
    const tier = tournament.Tier;

    // Skip tournaments for games that are not visible
    if (!gameVisibility[game]) return;

    // Skip tournaments for unchecked tiers
    if (!tierVisibility[tier]) return;

    // Skip tournaments based on LAN filter
    if (lanOnly && !tournament.LAN) return;

    // Get the game weight (default to 100 if not defined)
    const gameWeight = (gameWeights[game] || 100) / 100;

    // Get the tier weight (default to 100 if not defined)
    const tierWeight = (tierWeights[tier] || 100) / 100;

    const placements = {
      "1st": tournament["1st"],
      "2nd": tournament["2nd"],
      "3rd": tournament["3rd"],
      "4th": tournament["4th"],
      "5th": tournament["5th"],
      "6th": tournament["6th"],
      "7th": tournament["7th"],
      "8th": tournament["8th"],
    };

    for (const [placement, rawPlayerName] of Object.entries(placements)) {
      if (!rawPlayerName) continue;

      // Normalize player name (case-insensitive matching)
      const normalizedPlayerName = rawPlayerName.toLowerCase();

      if (!playerStats[normalizedPlayerName]) {
        playerStats[normalizedPlayerName] = {
          player: rawPlayerName, // Keep the original format for display
          firsts: 0,
          seconds: 0,
          top4: 0,
          top8: 0,
          participations: 0,
          points: 0,
          games: new Set(),
        };
      }

      const player = playerStats[normalizedPlayerName];

      player.participations++;

      // Calculate points based on visibility, game weight, and tier weight
      if (placement === "1st" && pointsVisibility.first) {
        player.firsts++;
        player.points += pointsConfig.first * gameWeight * tierWeight;
      }
      if (placement === "2nd" && pointsVisibility.second) {
        player.seconds++;
        player.points += pointsConfig.second * gameWeight * tierWeight;
      }
      if (
        (placement === "3rd" || placement === "4th") &&
        pointsVisibility.top4
      ) {
        player.top4++;
        player.points += pointsConfig.top4 * gameWeight * tierWeight;
      }
      if (
        (placement === "5th" ||
          placement === "6th" ||
          placement === "7th" ||
          placement === "8th") &&
        pointsVisibility.top8
      ) {
        player.top8++;
        player.points += pointsConfig.top8 * gameWeight * tierWeight;
      }

      player.games.add(game);
    }
  });

  const playersArray = Object.values(playerStats).map((player) => ({
    ...player,
    games: Array.from(player.games).join(", "),
  }));

  return playersArray;
}
