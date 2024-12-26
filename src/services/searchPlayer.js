export function searchPlayer(players, query) {
  if (!query.trim()) return players;
  return players.filter((p) =>
    p.player.toLowerCase().includes(query.toLowerCase())
  );
}
