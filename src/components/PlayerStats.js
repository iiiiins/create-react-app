import React from "react";

const PlayerStats = ({ stats }) => (
  <div>
    <h3>Player Stats for {stats.player}</h3>
    <p>1st Place: {stats.firsts}</p>
    <p>2nd Place: {stats.seconds}</p>
    <p>Top 4 Finishes: {stats.top4}</p>
    <p>Top 8 Finishes: {stats.top8}</p>
    <p>Total Participations: {stats.participations}</p>
  </div>
);

export default PlayerStats;
