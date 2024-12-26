import React from "react";

const PlayerList = ({ players }) => (
  <table
    style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
  >
    <thead>
      <tr>
        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Rank</th>
        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Player</th>
        <th style={{ border: "1px solid #ddd", padding: "8px" }}>1st</th>
        <th style={{ border: "1px solid #ddd", padding: "8px" }}>2nd</th>
        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Top4</th>
        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Top8</th>
        <th style={{ border: "1px solid #ddd", padding: "8px" }}>
          Participations
        </th>
        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Points</th>
        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Games</th>
      </tr>
    </thead>
    <tbody>
      {players.map((p) => (
        <tr key={p.player}>
          <td style={{ border: "1px solid #ddd", padding: "8px" }}>{p.rank}</td>
          <td style={{ border: "1px solid #ddd", padding: "8px" }}>
            {p.player}
          </td>
          <td style={{ border: "1px solid #ddd", padding: "8px" }}>
            {p.firsts}
          </td>
          <td style={{ border: "1px solid #ddd", padding: "8px" }}>
            {p.seconds}
          </td>
          <td style={{ border: "1px solid #ddd", padding: "8px" }}>{p.top4}</td>
          <td style={{ border: "1px solid #ddd", padding: "8px" }}>{p.top8}</td>
          <td style={{ border: "1px solid #ddd", padding: "8px" }}>
            {p.participations}
          </td>
          <td style={{ border: "1px solid #ddd", padding: "8px" }}>
            {p.points}
          </td>
          <td style={{ border: "1px solid #ddd", padding: "8px" }}>
            {p.games}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default PlayerList;
