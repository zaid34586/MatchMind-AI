"use client";

import { useState } from "react";
import Link from "next/link";

const groups = {
  "Group A": [
    { team: "Argentina", power: 92 },
    { team: "Mexico", power: 78 },
    { team: "Poland", power: 72 },
    { team: "Canada", power: 65 },
  ],
  "Group B": [
    { team: "France", power: 94 },
    { team: "USA", power: 76 },
    { team: "Morocco", power: 74 },
    { team: "Japan", power: 73 },
  ],
  "Group C": [
    { team: "Brazil", power: 91 },
    { team: "Germany", power: 82 },
    { team: "Ghana", power: 68 },
    { team: "Korea Republic", power: 67 },
  ],
  "Group D": [
    { team: "England", power: 88 },
    { team: "Portugal", power: 86 },
    { team: "Denmark", power: 75 },
    { team: "Australia", power: 63 },
  ],
};

const teamPowers = {
  France: 94,
  Argentina: 92,
  Brazil: 91,
  England: 88,
  Portugal: 86,
  Spain: 84,
  Germany: 82,
  Netherlands: 80,
  Mexico: 78,
  USA: 76,
  Denmark: 75,
  Morocco: 74,
  Japan: 73,
  Poland: 72,
  Ghana: 68,
  "Korea Republic": 67,
  Canada: 65,
  Australia: 63,
};

const starPlayers = {
  France: "Mbappe",
  Argentina: "Messi",
  Brazil: "Vinicius Jr",
  England: "Harry Kane",
  Portugal: "Ronaldo",
  Spain: "Morata",
  Germany: "Musiala",
  Netherlands: "Gakpo",
  Mexico: "Lozano",
  USA: "Pulisic",
  Denmark: "Hojlund",
  Morocco: "Hakimi",
  Japan: "Mitoma",
  Poland: "Lewandowski",
  Ghana: "Kudus",
  "Korea Republic": "Son",
  Canada: "Davies",
  Australia: "Goodwin",
};

const knockoutTeams = Object.keys(teamPowers);

const favorites = [
  { team: "France", chance: 18, rating: "A+", strength: "Elite attack" },
  { team: "Argentina", chance: 16, rating: "A", strength: "Big-match control" },
  { team: "Brazil", chance: 15, rating: "A", strength: "Explosive forwards" },
  { team: "England", chance: 13, rating: "A-", strength: "Balanced squad" },
  { team: "Spain", chance: 11, rating: "B+", strength: "Possession control" },
  { team: "Portugal", chance: 10, rating: "B+", strength: "Finishing quality" },
];

const powerRankings = knockoutTeams
  .map((team) => {
    const power = teamPowers[team];
    const attack = Math.min(99, power + (["France", "Brazil", "Argentina"].includes(team) ? 3 : 0));
    const defense = Math.max(55, power - (["Brazil", "Portugal"].includes(team) ? 4 : 1));
    const form = Math.max(50, power - (team === "Argentina" ? 2 : team === "France" ? 3 : 6));
    const chance = Math.max(3, Math.round((power / 100) * 18));

    return {
      team,
      power,
      attack,
      defense,
      form,
      chance,
      status:
        power >= 92
          ? "Elite Favorite"
          : power >= 88
          ? "Title Contender"
          : power >= 82
          ? "Strong Challenger"
          : power >= 75
          ? "Knockout Threat"
          : "Dark Horse",
    };
  })
  .sort((a, b) => b.power - a.power);

export default function WorldCupPage() {
  const [selectedGroup, setSelectedGroup] = useState("Group A");
  const [groupResult, setGroupResult] = useState(null);

  const [round, setRound] = useState("Round of 16");
  const [teamA, setTeamA] = useState("Brazil");
  const [teamB, setTeamB] = useState("Argentina");
  const [knockoutResult, setKnockoutResult] = useState(null);

  const [tournamentResult, setTournamentResult] = useState(null);

  function predictGroup() {
    const teams = [...groups[selectedGroup]].sort((a, b) => b.power - a.power);

    const predicted = teams.map((item, index) => ({
      ...item,
      qualification:
        index === 0
          ? Math.min(item.power + 4, 98)
          : index === 1
          ? Math.min(item.power - 7, 88)
          : Math.max(item.power - 28, 18),
    }));

    setGroupResult({
      group: selectedGroup,
      winner: predicted[0],
      runnerUp: predicted[1],
      darkHorse: predicted[2],
      teams: predicted,
    });
  }

  function predictKnockout() {
    if (teamA === teamB) {
      alert("Please select two different teams.");
      return;
    }

    setKnockoutResult(getKnockoutPrediction(teamA, teamB, round));
  }

  function runTournamentSimulation() {
    const rankedTeams = [...knockoutTeams]
      .map((team) => ({ team, power: teamPowers[team] }))
      .sort((a, b) => b.power - a.power);

    const champion = rankedTeams[0];
    const runnerUp = rankedTeams[1];
    const semiFinalists = rankedTeams.slice(0, 4);
    const darkHorse = rankedTeams[7];

    setTournamentResult({
      champion,
      runnerUp,
      semiFinalists,
      darkHorse,
      goldenBootFavorite: starPlayers[champion.team],
      confidence: Math.min(94, Math.max(65, Math.round(champion.power - runnerUp.power + 78))),
      finalScore: champion.power - runnerUp.power >= 4 ? "2 - 0" : "2 - 1",
      tournamentStrength: "Elite tournament favorite",
      reason: `${champion.team} is predicted to win the World Cup because MatchMind sees the best combination of squad power, knockout depth, attacking quality, and pressure handling.`,
    });
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      <Background />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-8">
        <header className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <Link
              href="/dashboard"
              className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-violet-400 to-fuchsia-400"
            >
              MatchMind AI
            </Link>

            <p className="mt-5 font-black text-sky-400">Phase 7 — World Cup 2026 Mode</p>

            <h1 className="mt-3 text-6xl font-black tracking-tight md:text-7xl">
              World Cup 2026 Hub
            </h1>

            <p className="mt-4 max-w-4xl text-xl leading-relaxed text-slate-300">
              Predict group stage, knockouts, finalists, tournament winner, and
              power rankings using MatchMind AI.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/dashboard" className="nav-btn">
              Dashboard
            </Link>
            <Link href="/analysis" className="nav-main">
              Match Analysis
            </Link>
          </div>
        </header>

        <section className="mt-10 grid grid-cols-1 gap-8 xl:grid-cols-[1fr_380px]">
          <div className="space-y-6">
            <div className="glass p-7">
              <p className="font-black text-sky-300">Group Stage Predictor</p>
              <h2 className="mt-3 text-4xl font-black">Predict World Cup Group</h2>

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-[1fr_220px]">
                <select value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value)} className="input">
                  {Object.keys(groups).map((group) => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>

                <button onClick={predictGroup} className="nav-main">Predict Group</button>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                {groups[selectedGroup].map((item) => (
                  <PowerCard key={item.team} team={item.team} power={item.power} />
                ))}
              </div>
            </div>

            {groupResult && (
              <div className="glass p-7">
                <p className="font-black text-sky-300">AI Group Prediction Result</p>

                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
                  <PreviewCard title="Group Winner" value={groupResult.winner.team} />
                  <PreviewCard title="Runner Up" value={groupResult.runnerUp.team} />
                  <PreviewCard title="Dark Horse" value={groupResult.darkHorse.team} />
                </div>

                <div className="mt-6 rounded-[28px] border border-white/10 bg-[#030712]/80 p-6">
                  <p className="font-black text-sky-300">Qualification Chances</p>
                  <div className="mt-5 space-y-5">
                    {groupResult.teams.map((item) => (
                      <VisualBar key={item.team} label={item.team} value={item.qualification} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="glass p-7">
              <p className="font-black text-sky-300">Knockout Predictor</p>
              <h2 className="mt-3 text-4xl font-black">Predict Knockout Match</h2>

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                <select value={round} onChange={(e) => setRound(e.target.value)} className="input">
                  <option>Round of 16</option>
                  <option>Quarter Final</option>
                  <option>Semi Final</option>
                  <option>Final</option>
                </select>

                <select value={teamA} onChange={(e) => setTeamA(e.target.value)} className="input">
                  {knockoutTeams.map((team) => <option key={team} value={team}>{team}</option>)}
                </select>

                <select value={teamB} onChange={(e) => setTeamB(e.target.value)} className="input">
                  {knockoutTeams.map((team) => <option key={team} value={team}>{team}</option>)}
                </select>
              </div>

              <button onClick={predictKnockout} className="nav-main mt-5 w-full">
                Predict Knockout
              </button>
            </div>

            {knockoutResult && (
              <div className="glass p-7">
                <p className="font-black text-sky-300">AI Knockout Prediction Result</p>

                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-4">
                  <PreviewCard title="Round" value={knockoutResult.round} />
                  <PreviewCard title="Winner" value={knockoutResult.winner} />
                  <PreviewCard title="Confidence" value={`${knockoutResult.confidence}%`} />
                  <PreviewCard title="Score" value={knockoutResult.score} />
                </div>

                <div className="mt-6 rounded-[28px] border border-white/10 bg-[#030712]/80 p-6">
                  <p className="font-black text-sky-300">Qualification Probability</p>
                  <div className="mt-5 space-y-5">
                    <VisualBar label={knockoutResult.teamA} value={knockoutResult.teamAChance} />
                    <VisualBar label={knockoutResult.teamB} value={knockoutResult.teamBChance} />
                  </div>
                </div>

                <div className="mt-6 rounded-[28px] border border-fuchsia-400/30 bg-gradient-to-r from-blue-600/25 via-violet-600/25 to-fuchsia-500/25 p-6">
                  <p className="font-black text-sky-300">MatchMind Explanation</p>
                  <p className="mt-3 text-lg leading-relaxed text-slate-200">{knockoutResult.reason}</p>
                  <p className="mt-3 font-black text-sky-300">Pressure: {knockoutResult.stagePressure}</p>
                </div>
              </div>
            )}

            <div className="glass p-7">
              <p className="font-black text-sky-300">Tournament Winner Engine</p>
              <h2 className="mt-3 text-4xl font-black">Run Full Tournament Simulation</h2>
              <p className="mt-3 text-slate-300">
                MatchMind will simulate the strongest World Cup path and predict champion,
                runner-up, semi-finalists, golden boot favorite, and final score.
              </p>
              <button onClick={runTournamentSimulation} className="nav-main mt-6 w-full">
                Run Tournament Simulation
              </button>
            </div>

            {tournamentResult && (
              <div className="glass p-7">
                <p className="font-black text-sky-300">AI Tournament Prediction Result</p>

                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-4">
                  <PreviewCard title="Champion" value={tournamentResult.champion.team} />
                  <PreviewCard title="Runner Up" value={tournamentResult.runnerUp.team} />
                  <PreviewCard title="Confidence" value={`${tournamentResult.confidence}%`} />
                  <PreviewCard title="Final Score" value={tournamentResult.finalScore} />
                </div>

                <div className="mt-6 rounded-[28px] border border-white/10 bg-[#030712]/80 p-6">
                  <p className="font-black text-sky-300">Semi Finalists</p>
                  <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-4">
                    {tournamentResult.semiFinalists.map((item, index) => (
                      <PreviewCard key={item.team} title={`#${index + 1}`} value={item.team} />
                    ))}
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <PreviewCard title="Golden Boot Favorite" value={tournamentResult.goldenBootFavorite} />
                  <PreviewCard title="Dark Horse" value={tournamentResult.darkHorse.team} />
                </div>

                <div className="mt-6 rounded-[28px] border border-fuchsia-400/30 bg-gradient-to-r from-blue-600/25 via-violet-600/25 to-fuchsia-500/25 p-6">
                  <p className="font-black text-sky-300">Tournament Explanation</p>
                  <p className="mt-3 text-lg leading-relaxed text-slate-200">{tournamentResult.reason}</p>
                  <p className="mt-3 font-black text-sky-300">Mode: {tournamentResult.tournamentStrength}</p>
                </div>
              </div>
            )}

            <div className="glass p-7">
              <p className="font-black text-sky-300">AI Power Rankings</p>
              <h2 className="mt-3 text-4xl font-black">World Cup Team Power Table</h2>

              <div className="mt-6 space-y-4">
                {powerRankings.map((item, index) => (
                  <div key={item.team} className="rounded-[24px] border border-white/10 bg-[#030712]/80 p-5">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="text-2xl font-black">#{index + 1} {item.team}</p>
                        <p className="mt-1 text-sky-300 font-black">{item.status}</p>
                      </div>
                      <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-fuchsia-400">
                        {item.power}
                      </p>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-4">
                      <MiniStat title="Attack" value={`${item.attack}%`} />
                      <MiniStat title="Defense" value={`${item.defense}%`} />
                      <MiniStat title="Form" value={`${item.form}%`} />
                      <MiniStat title="Win Chance" value={`${item.chance}%`} />
                    </div>

                    <VisualBar label="Power Score" value={item.power} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <Card title="Top Favorites">
              <div className="space-y-4">
                {favorites.map((item, index) => (
                  <div key={item.team} className="rounded-2xl border border-white/10 bg-[#030712]/80 p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-xl font-black">#{index + 1} {item.team}</p>
                      <span className="rounded-full bg-white/[0.06] px-3 py-1 text-sm font-black text-sky-300">{item.rating}</span>
                    </div>
                    <p className="mt-2 text-slate-400">{item.strength}</p>
                    <VisualBar label="Winner Chance" value={item.chance} />
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Phase 7 Roadmap">
              <div className="space-y-3 text-slate-300">
                <p>✅ 7.1 World Cup Hub</p>
                <p>✅ 7.2 Group Stage Predictor</p>
                <p>✅ 7.3 Knockout Predictor</p>
                <p>✅ 7.4 Tournament Winner Engine</p>
                <p>✅ 7.5 Power Rankings</p>
              </div>
            </Card>
          </aside>
        </section>
      </div>

      <style jsx global>{`
        .glass {
          border-radius: 34px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(24px);
        }
        .input {
          border-radius: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: #030712;
          padding: 1rem 1.25rem;
          color: white;
          outline: none;
        }
        .nav-btn {
          border-radius: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.06);
          padding: 1rem 1.25rem;
          font-weight: 900;
        }
        .nav-main {
          border-radius: 1rem;
          background: linear-gradient(to right, #2563eb, #7c3aed, #d946ef);
          padding: 1rem 1.25rem;
          font-weight: 900;
        }
      `}</style>
    </main>
  );
}

function getKnockoutPrediction(teamA, teamB, round) {
  const powerA = teamPowers[teamA];
  const powerB = teamPowers[teamB];
  const gap = powerA - powerB;

  const teamAChance = Math.max(25, Math.min(75, Math.round(50 + gap * 1.4)));
  const teamBChance = 100 - teamAChance;

  const winner = teamAChance >= teamBChance ? teamA : teamB;
  const loser = winner === teamA ? teamB : teamA;
  const confidence = Math.max(teamAChance, teamBChance);

  const score =
    confidence >= 68
      ? winner === teamA
        ? "2 - 0"
        : "0 - 2"
      : winner === teamA
      ? "2 - 1"
      : "1 - 2";

  const stagePressure =
    round === "Final"
      ? "Extreme pressure"
      : round === "Semi Final"
      ? "Very high pressure"
      : round === "Quarter Final"
      ? "High pressure"
      : "Knockout pressure";

  return {
    round,
    teamA,
    teamB,
    winner,
    loser,
    confidence,
    score,
    teamAChance,
    teamBChance,
    stagePressure,
    reason: `${winner} is predicted to beat ${loser} because MatchMind gives them stronger tournament power, knockout readiness, and pressure handling for the ${round}.`,
  };
}

function PowerCard({ team, power }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-[#030712]/80 p-5">
      <p className="text-2xl font-black">{team}</p>
      <p className="mt-2 text-slate-400">Team Power: {power}%</p>
      <VisualBar label="Power" value={power} />
    </div>
  );
}

function PreviewCard({ title, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#030712]/80 p-5">
      <p className="text-slate-400">{title}</p>
      <p className="mt-2 break-words text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-fuchsia-400">
        {value}
      </p>
    </div>
  );
}

function MiniStat({ title, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <p className="text-sm text-slate-400">{title}</p>
      <p className="mt-1 text-xl font-black text-sky-300">{value}</p>
    </div>
  );
}

function VisualBar({ label, value }) {
  return (
    <div className="mt-4">
      <div className="flex justify-between text-sm text-slate-300">
        <span>{label}</span>
        <span className="font-black text-sky-300">{value}%</span>
      </div>
      <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-sky-400 to-fuchsia-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="glass p-6">
      <p className="mb-5 text-2xl font-black text-sky-300">{title}</p>
      {children}
    </div>
  );
}

function Background() {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(14,165,233,0.24),transparent_35%),radial-gradient(circle_at_85%_25%,rgba(236,72,153,0.22),transparent_35%),radial-gradient(circle_at_50%_90%,rgba(99,102,241,0.15),transparent_35%)]" />
      <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:64px_64px]" />
    </>
  );
}