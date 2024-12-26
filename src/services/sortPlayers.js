export function sortPlayersByParticipations(players, tournaments) {
  if (!tournaments || tournaments.length === 0) {
    console.error(
      "No tournaments data provided to sortPlayersByParticipations."
    );
    return players.map((player) => ({
      player,
      participations: 0,
    }));
  }

  const participationCounts = {};

  tournaments.forEach((tournament) => {
    const placements = [
      tournament["1st"],
      tournament["2nd"],
      tournament["3rd"],
      tournament["4th"],
      tournament["5th"],
      tournament["6th"],
      tournament["7th"],
      tournament["8th"],
    ];

    placements.forEach((player) => {
      if (player) {
        participationCounts[player] = (participationCounts[player] || 0) + 1;
      }
    });
  });

  return players
    .map((player) => ({
      player,
      participations: participationCounts[player] || 0,
    }))
    .sort((a, b) => b.participations - a.participations);
}
