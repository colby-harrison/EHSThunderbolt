import React from "react";

const sportsScores = [
  { teamA: "EHS Tigers", scoreA: 35, teamB: "RHS Panthers", scoreB: 28, date: "Feb 20, 2025" },
  { teamA: "EHS Eagles", scoreA: 21, teamB: "CHS Wolves", scoreB: 17, date: "Feb 18, 2025" },
  { teamA: "EHS Hawks", scoreA: 42, teamB: "MHS Cougars", scoreB: 38, date: "Feb 16, 2025" },
];

const SportsScores = () => {
  return (
    <section className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Recent Sports Scores</h2>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Matchup</th>
            <th className="p-3 text-left">Score</th>
          </tr>
        </thead>
        <tbody>
          {sportsScores.map((game, index) => (
            <tr key={index} className="border-t border-gray-200">
              <td className="p-3">{game.date}</td>
              <td className="p-3">{game.teamA} vs {game.teamB}</td>
              <td className="p-3 font-bold">{game.scoreA} - {game.scoreB}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default SportsScores;