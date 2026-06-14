"use client";

import { useState } from "react";
import Link from "next/link";
import { predictMatch, teams } from "../lib/prediction";

export default function AnalysisPage() {
  const [homeTeam, setHomeTeam] = useState("Brazil");
  const [awayTeam, setAwayTeam] = useState("Argentina");
  const [stage, setStage] = useState("Before Match");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  function generateAnalysis(e) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      const prediction = predictMatch(homeTeam, awayTeam, stage);

      if (!prediction.success) {
        alert(prediction.message);
        setLoading(false);
        return;
      }

      setResult({
        title: `${homeTeam} vs ${awayTeam}`,
        simulation: prediction.simulation,
        winner: prediction.winner,
        confidence: `${prediction.confidence}%`,
        advantage: `${prediction.homeWin}%`,
        quick: prediction.insight,
        tactical: prediction.tacticalBattle,
        fan: prediction.fanSummary.replace(
  prediction.expectedGoals ? prediction.scorePrediction : "",
  prediction.scorePrediction
),
        keyBattle: prediction.keyBattle,
        scorePrediction: prediction.scorePrediction,
        homeWin: prediction.homeWin,
        drawChance: prediction.drawChance,
        awayWin: prediction.awayWin,
        homeTeam,
        awayTeam,
        homePlayers: prediction.homePlayers,
        awayPlayers: prediction.awayPlayers,
        stats: prediction.stats,
        matchImportance: prediction.matchImportance,
        momentum: prediction.momentum,
        brain: prediction.brain,
        finalVerdict: prediction.finalVerdict,
        strengths: prediction.strengths,
        weaknesses: prediction.weaknesses,
possessionPrediction: prediction.possessionPrediction,
tacticalAdvantage: prediction.tacticalAdvantage,
        risks: prediction.risks,

        attackScore: prediction.attackScore,
defenseScore: prediction.defenseScore,
formScore: prediction.formScore,
confidenceReason: prediction.confidenceReason,
aiMatchRating: prediction.aiMatchRating,
matchQuality: prediction.matchQuality,
entertainmentLevel: prediction.entertainmentLevel,
uncertaintyLevel: prediction.uncertaintyLevel,
momentumGap: prediction.momentumGap,
pressureIndex: prediction.pressureIndex,
rivalryHeat: prediction.rivalryHeat,
trendSignal: prediction.trendSignal,
      });

      setLoading(false);
    }, 1200);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      <Background />
      <FloatingBalls />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-8">
        <Header />

        <section className="mt-10 grid grid-cols-1 gap-8 xl:grid-cols-[430px_1fr]">
          <AnalysisForm
            homeTeam={homeTeam}
            setHomeTeam={setHomeTeam}
            awayTeam={awayTeam}
            setAwayTeam={setAwayTeam}
            stage={stage}
            setStage={setStage}
            generateAnalysis={generateAnalysis}
            loading={loading}
          />

          <ResultPanel
            homeTeam={homeTeam}
            awayTeam={awayTeam}
            stage={stage}
            loading={loading}
            result={result}
          />
        </section>
      </div>
    </main>
  );
}

function Header() {
  return (
    <header className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
      <div>
        <Link
          href="/dashboard"
          className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-violet-400 to-fuchsia-400"
        >
          PitchPal AI
        </Link>

        <p className="mt-5 font-black text-sky-400">AI Match Analysis</p>

        <h1 className="mt-3 text-6xl font-black tracking-tight md:text-7xl">
          Analyze any football match
        </h1>

        <p className="mt-4 max-w-4xl text-xl leading-relaxed text-slate-300">
          Enter two teams and get tactical insight, prediction, confidence,
          key battle, and fan-friendly explanation.
        </p>
      </div>

      <div className="flex gap-3">
        <Link
          href="/dashboard"
          className="rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 font-black backdrop-blur-xl transition hover:bg-white/[0.1]"
        >
          Dashboard
        </Link>
        <Link
          href="/assistant"
          className="rounded-2xl bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-500 px-5 py-4 font-black shadow-[0_0_35px_rgba(99,102,241,0.35)] transition hover:scale-[1.03]"
        >
          AI Assistant
        </Link>
      </div>
    </header>
  );
}

function AnalysisForm({
  homeTeam,
  setHomeTeam,
  awayTeam,
  setAwayTeam,
  stage,
  setStage,
  generateAnalysis,
  loading,
}) {
  return (
    <form
      onSubmit={generateAnalysis}
      className="rounded-[38px] border border-white/10 bg-white/[0.06] p-7 shadow-[0_0_80px_rgba(56,189,248,0.12)] backdrop-blur-2xl"
    >
      <div className="rounded-[30px] border border-sky-400/20 bg-[#030712]/70 p-6">
        <p className="font-black text-sky-300">MATCH SETUP</p>
        <h2 className="mt-3 text-4xl font-black">Create analysis</h2>
        <p className="mt-3 text-slate-300">
          Add teams and choose match stage.
        </p>
      </div>

      <div className="mt-7 space-y-5">
        <TeamSelect
          label="Home Team"
          value={homeTeam}
          onChange={(e) => setHomeTeam(e.target.value)}
        />

        <TeamSelect
          label="Away Team"
          value={awayTeam}
          onChange={(e) => setAwayTeam(e.target.value)}
        />

        <div>
          <label className="font-black text-slate-200">Match Stage</label>
          <div className="mt-3 grid grid-cols-1 gap-3">
            {["Before Match", "Live Match", "After Match"].map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => setStage(item)}
                className={`rounded-2xl border px-5 py-4 text-left font-black transition ${
                  stage === item
                    ? "border-sky-400 bg-gradient-to-r from-blue-600/40 to-fuchsia-500/30 text-white shadow-[0_0_25px_rgba(56,189,248,0.18)]"
                    : "border-white/10 bg-[#030712]/70 text-slate-300 hover:border-sky-400/40"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        disabled={loading}
        className="mt-7 w-full rounded-2xl bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-500 py-5 text-xl font-black shadow-[0_0_35px_rgba(99,102,241,0.35)] transition hover:scale-[1.02] disabled:opacity-70"
      >
        {loading ? "Generating AI Analysis..." : "Generate Analysis"}
      </button>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <MiniStatus title="Mode" text={stage} />
        <MiniStatus title="AI Core" text="Ready" />
      </div>
    </form>
  );
}

function TeamSelect({ label, value, onChange }) {
  return (
    <div>
      <label className="font-black text-slate-200">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="mt-3 w-full rounded-2xl border border-white/10 bg-[#030712] px-5 py-4 text-white outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-400/10"
      >
        {teams.map((team) => (
          <option key={team} value={team}>
            {team}
          </option>
        ))}
      </select>
    </div>
  );
}

function ResultPanel({ homeTeam, awayTeam, stage, loading, result }) {
  return (
    <section className="relative overflow-hidden rounded-[38px] border border-fuchsia-400/20 bg-gradient-to-br from-sky-500/10 via-violet-500/10 to-fuchsia-500/10 p-7 shadow-[0_0_90px_rgba(217,70,239,0.18)] backdrop-blur-2xl">
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />

      <div className="relative">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="font-black text-sky-300">LIVE AI PREVIEW</p>
            <h2 className="mt-3 text-5xl font-black">
              {homeTeam || "Team A"} vs {awayTeam || "Team B"}
            </h2>
          </div>

          <span className="rounded-full bg-gradient-to-r from-blue-600 to-fuchsia-500 px-5 py-3 font-black shadow-[0_0_30px_rgba(99,102,241,0.35)]">
            {stage}
          </span>
        </div>

        {!result && !loading && (
          <EmptyState homeTeam={homeTeam} awayTeam={awayTeam} stage={stage} />
        )}

        {loading && <LoadingState />}

        {result && !loading && <AnalysisResult result={result} />}
      </div>
    </section>
  );
}

function EmptyState({ homeTeam, awayTeam, stage }) {
  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <PreviewCard title="Selected Stage" value={stage} />
        <PreviewCard title="AI Status" value="Waiting" />
      </div>

      <div className="mt-5 rounded-[30px] border border-white/10 bg-[#030712]/80 p-6">
        <p className="font-black text-sky-300">Ready Preview</p>
        <p className="mt-3 text-lg leading-relaxed text-slate-300">
          MatchMind will analyze {homeTeam || "Team A"} vs{" "}
          {awayTeam || "Team B"} and generate prediction, confidence, tactical
          insight, key battle, and fan summary.
        </p>
      </div>

      <div className="mt-7 flex justify-center">
        <div className="relative flex h-52 w-52 items-center justify-center rounded-full border border-white/10 bg-[#030712]/80 shadow-[0_0_60px_rgba(56,189,248,0.18)]">
          <div className="absolute h-40 w-40 rounded-full border border-sky-400/20" />
          <div className="absolute h-28 w-28 rounded-full border border-fuchsia-400/20" />
          <div className="text-6xl">⚽</div>
        </div>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="mt-8 rounded-[32px] border border-white/10 bg-[#030712]/80 p-7">
      <p className="font-black text-sky-300">MatchMind is analyzing...</p>
      <h3 className="mt-4 text-4xl font-black">Building tactical report</h3>

      <div className="mt-7 space-y-5">
        <LoadingLine label="Reading team context" width="90%" />
        <LoadingLine label="Checking tactical patterns" width="76%" />
        <LoadingLine label="Creating fan summary" width="84%" />
        <LoadingLine label="Calculating confidence" width="68%" />
      </div>
    </div>
  );
}

function LoadingLine({ label, width }) {
  return (
    <div>
      <p className="text-slate-300">{label}</p>
      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full animate-pulse rounded-full bg-gradient-to-r from-sky-400 via-violet-400 to-fuchsia-400"
          style={{ width }}
        />
      </div>
    </div>
  );
}

function AnalysisResult({ result }) {
  return (
    <div className="mt-8 space-y-5">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <PreviewCard title="Predicted Winner" value={result.winner} />
        <PreviewCard title="Confidence" value={result.confidence} />
        <PreviewCard title="Score Prediction" value={result.scorePrediction} />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <PreviewCard title={`${result.homeTeam} Win`} value={`${result.homeWin}%`} />
        <PreviewCard title="Draw Chance" value={`${result.drawChance}%`} />
        <PreviewCard title={`${result.awayTeam} Win`} value={`${result.awayWin}%`} />
      </div>

      <ProbabilityBars result={result} />
      <ConfidenceEngine result={result} />
      <ExplainableAI result={result} />
      <MatchTimelineEngine result={result} />
      <MatchRatingEngine result={result} />
      <MomentumDashboard result={result} />
      <VisualAnalytics result={result} />
      <InsightTiles result={result} />
      <SimulationCard result={result} />
      <FinalVerdict result={result} />
      <MatchImportance result={result} />
      <MomentumEngine result={result} />
      <MatchMindBrain result={result} />

      <ResultCard title="Quick Answer" text={result.quick} />
      <ResultCard title="Tactical Reasoning" text={result.tactical} />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <ResultCard title="Key Battle" text={result.keyBattle} />
        <ResultCard title="Fan Summary" text={result.fan} highlight />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <PlayersCard title={`${result.homeTeam} Key Players`} players={result.homePlayers} />
        <PlayersCard title={`${result.awayTeam} Key Players`} players={result.awayPlayers} />
      </div>

      <StatsComparison result={result} />
      <StrengthsCard result={result} />
      <WeaknessesCard result={result} />
<PossessionPrediction result={result} />
<TacticalAdvantage result={result} />
      <RiskDetector result={result} />
    </div>
  );
}

function SimulationCard({ result }) {
  if (!result?.simulation) return null;

  return (
    <div className="rounded-[30px] border border-white/10 bg-[#030712]/80 p-6">
      <p className="font-black text-sky-300">MatchMind Simulation AI v3</p>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
        <PreviewCard title="Simulations" value={result.simulation.simulations} />
        <PreviewCard title="Home Wins" value={result.simulation.homeWins} />
        <PreviewCard title="Away Wins" value={result.simulation.awayWins} />
      </div>

      <div className="mt-4">
        <PreviewCard title="Draws" value={result.simulation.draws} />
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <p className="font-black text-sky-300">Top Predicted Scores</p>

        <div className="mt-4 space-y-3">
          {result.simulation.topScores.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-xl border border-white/10 p-3"
            >
              <span>{item.score}</span>
              <span className="font-black text-sky-300">{item.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
function FinalVerdict({ result }) {
  if (!result?.finalVerdict) return null;

  return (
    <div className="rounded-[30px] border border-fuchsia-400/30 bg-gradient-to-r from-blue-600/30 via-violet-600/30 to-fuchsia-500/30 p-6">
      <p className="font-black text-sky-300">AI Final Verdict</p>

      <h3 className="mt-3 text-3xl font-black">
        {result.finalVerdict.title}
      </h3>

      <p className="mt-4 text-lg leading-relaxed text-slate-200">
        {result.finalVerdict.summary}
      </p>
    </div>
  );
}
function MatchImportance({ result }) {
  return (
    <div className="rounded-[30px] border border-white/10 bg-[#030712]/80 p-6">
      <p className="font-black text-sky-300">Match Importance Engine</p>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
        <PreviewCard
          title="Rivalry Level"
          value={`${result.matchImportance.rivalryLevel}%`}
        />
        <PreviewCard
          title="Pressure Level"
          value={`${result.matchImportance.pressureLevel}%`}
        />
        <PreviewCard
          title="Match Impact"
          value={result.matchImportance.matchImpact}
        />
      </div>
    </div>
  );
}

function MomentumEngine({ result }) {
  return (
    <div className="rounded-[30px] border border-white/10 bg-[#030712]/80 p-6">
      <p className="font-black text-sky-300">Momentum Engine</p>

      <div className="mt-5 space-y-5">
        <Bar label={result.homeTeam} value={result.momentum.homeMomentum} />
        <Bar label={result.awayTeam} value={result.momentum.awayMomentum} />

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <p className="text-slate-400">Momentum Leader</p>
          <p className="mt-2 text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-fuchsia-400">
            {result.momentum.leader}
          </p>
        </div>
      </div>
    </div>
  );
}

function MatchMindBrain({ result }) {
  return (
    <div className="rounded-[30px] border border-white/10 bg-[#030712]/80 p-6">
      <p className="font-black text-sky-300">MatchMind Brain</p>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-4">
        <PreviewCard title="Factors Checked" value={result.brain.factorsChecked} />
        <PreviewCard title="Tactical Rules" value={result.brain.tacticalRules} />
        <PreviewCard title="Stability" value={result.brain.confidenceStability} />
        <PreviewCard title="Model Mode" value={result.brain.modelMode} />
      </div>
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
  <p className="font-black text-sky-300">AI Method</p>
  <p className="mt-3 leading-relaxed text-slate-300">
    {result.brain.aiMethod}
  </p>
</div>

<div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
  <p className="font-black text-sky-300">Explainability</p>
  <p className="mt-3 leading-relaxed text-slate-300">
    {result.brain.explainability}
  </p>
</div>
    </div>
  );
}
function StrengthsCard({ result }) {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <div className="rounded-[30px] border border-white/10 bg-[#030712]/80 p-6">
        <p className="font-black text-sky-300">
          {result.homeTeam} Strengths
        </p>

        <ul className="mt-4 space-y-3 text-lg text-slate-200">
          {result.strengths.homeStrengths.map((item) => (
            <li key={item}>✅ {item}</li>
          ))}
        </ul>
      </div>

      <div className="rounded-[30px] border border-white/10 bg-[#030712]/80 p-6">
        <p className="font-black text-sky-300">
          {result.awayTeam} Strengths
        </p>

        <ul className="mt-4 space-y-3 text-lg text-slate-200">
          {result.strengths.awayStrengths.map((item) => (
            <li key={item}>✅ {item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function WeaknessesCard({ result }) {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <div className="rounded-[30px] border border-white/10 bg-[#030712]/80 p-6">
        <p className="font-black text-sky-300">
          {result.homeTeam} Weaknesses
        </p>

        <ul className="mt-4 space-y-3 text-lg text-slate-200">
          {result.weaknesses.homeWeaknesses.map((item) => (
            <li key={item}>⚠️ {item}</li>
          ))}
        </ul>
      </div>

      <div className="rounded-[30px] border border-white/10 bg-[#030712]/80 p-6">
        <p className="font-black text-sky-300">
          {result.awayTeam} Weaknesses
        </p>

        <ul className="mt-4 space-y-3 text-lg text-slate-200">
          {result.weaknesses.awayWeaknesses.map((item) => (
            <li key={item}>⚠️ {item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function PossessionPrediction({ result }) {
  return (
    <div className="rounded-[30px] border border-white/10 bg-[#030712]/80 p-6">
      <p className="font-black text-sky-300">Possession Prediction</p>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
        <PreviewCard
          title={`${result.homeTeam} Possession`}
          value={`${result.possessionPrediction.homePossession}%`}
        />
        <PreviewCard
          title="Controller"
          value={result.possessionPrediction.controller}
        />
        <PreviewCard
          title={`${result.awayTeam} Possession`}
          value={`${result.possessionPrediction.awayPossession}%`}
        />
      </div>
    </div>
  );
}
function TacticalAdvantage({ result }) {
  return (
    <div className="rounded-[30px] border border-white/10 bg-[#030712]/80 p-6">
      <p className="font-black text-sky-300">
        Tactical Advantage Meter
      </p>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
        <PreviewCard
          title={result.homeTeam}
          value={`${result.tacticalAdvantage.home}%`}
        />

        <PreviewCard
          title="Advantage"
          value={result.tacticalAdvantage.leader}
        />

        <PreviewCard
          title={result.awayTeam}
          value={`${result.tacticalAdvantage.away}%`}
        />
      </div>
    </div>
  );
}function RiskDetector({ result }) {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <div className="rounded-[30px] border border-white/10 bg-[#030712]/80 p-6">
        <p className="font-black text-sky-300">{result.homeTeam} Risk Detector</p>
        <ul className="mt-4 space-y-3 text-lg text-slate-200">
          {result.risks.homeRisks.map((risk) => (
            <li key={risk}>⚠️ {risk}</li>
          ))}
        </ul>
      </div>

      <div className="rounded-[30px] border border-white/10 bg-[#030712]/80 p-6">
        <p className="font-black text-sky-300">{result.awayTeam} Risk Detector</p>
        <ul className="mt-4 space-y-3 text-lg text-slate-200">
          {result.risks.awayRisks.map((risk) => (
            <li key={risk}>⚠️ {risk}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ProbabilityBars({ result }) {
  return (
    <div className="rounded-[30px] border border-white/10 bg-[#030712]/80 p-6">
      <p className="font-black text-sky-300">Win Probability</p>

      <div className="mt-5 space-y-5">
        <Bar label={result.homeTeam} value={result.homeWin} />
        <Bar label="Draw" value={result.drawChance} />
        <Bar label={result.awayTeam} value={result.awayWin} />
      </div>
    </div>
  );
}

function ConfidenceEngine({ result }) {
  return (
    <div className="rounded-[30px] border border-white/10 bg-[#030712]/80 p-6">
      <p className="font-black text-sky-300">
        MatchMind Confidence Engine
      </p>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-4">
        <PreviewCard
          title="Attack Score"
          value={`${result.attackScore}%`}
        />

        <PreviewCard
          title="Defense Score"
          value={`${result.defenseScore}%`}
        />

        <PreviewCard
          title="Form Score"
          value={`${result.formScore}%`}
        />

        <PreviewCard
          title="Confidence"
          value={result.confidence}
        />
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <p className="font-black text-sky-300">
          Why MatchMind Chose This Prediction
        </p>

        <p className="mt-3 text-slate-300 leading-relaxed">
          {result.confidenceReason}
        </p>
      </div>
    </div>
  );
}
function ExplainableAI({ result }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-[30px] border border-fuchsia-400/30 bg-gradient-to-r from-blue-600/25 via-violet-600/25 to-fuchsia-500/25 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-black text-sky-300">Explainable AI</p>
          <h3 className="mt-2 text-3xl font-black">
            Why did MatchMind choose {result.winner}?
          </h3>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-2xl bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-500 px-5 py-4 font-black"
        >
          {open ? "Hide Explanation" : "Why This Prediction?"}
        </button>
      </div>

      {open && (
        <div className="mt-6 space-y-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <PreviewCard title="Form Logic" value={`${result.formScore}%`} />
            <PreviewCard title="Attack Logic" value={`${result.attackScore}%`} />
            <PreviewCard title="Defense Logic" value={`${result.defenseScore}%`} />
            <PreviewCard title="Pressure Logic" value={`${result.pressureIndex}%`} />
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#030712]/80 p-5">
            <p className="font-black text-sky-300">Decision Breakdown</p>

            <ul className="mt-4 space-y-3 text-lg text-slate-200">
              <li>✅ MatchMind checked attack, defense, form, momentum, finishing, and pressure.</li>
              <li>✅ {result.winner} got the edge because its combined prediction score was stronger.</li>
              <li>✅ Current confidence is {result.confidence}, so this is a competitive prediction, not a one-sided result.</li>
              <li>✅ Main reason: {result.confidenceReason}</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
function MatchTimelineEngine({ result }) {
  const winner = result.winner;
  const loser =
    winner === result.homeTeam ? result.awayTeam : result.homeTeam;

  const timeline = [
    {
      time: "0-15 min",
      title: `${result.homeTeam} early pressure`,
      text: `${result.homeTeam} may start with energy and try to control tempo early.`,
    },
    {
      time: "16-30 min",
      title: `${result.awayTeam} response phase`,
      text: `${result.awayTeam} can grow into the match and look for attacking spaces.`,
    },
    {
      time: "31-45 min",
      title: "First-half danger zone",
      text: `This period can create the first big chance because both teams adjust tactically.`,
    },
    {
      time: "46-60 min",
      title: "Midfield control battle",
      text: `Possession and pressing will decide which team controls the second half.`,
    },
    {
      time: "61-75 min",
      title: `${winner} momentum window`,
      text: `${winner} has the strongest chance to shift the match here based on momentum and finishing.`,
    },
    {
      time: "76-90 min",
      title: "Late pressure phase",
      text: `${loser} may push late, but ${winner} can exploit transition spaces.`,
    },
  ];

  return (
    <div className="rounded-[30px] border border-cyan-400/30 bg-[#030712]/80 p-6">
      <p className="font-black text-sky-300">AI Match Timeline Engine</p>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        {timeline.map((item) => (
          <div
            key={item.time}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
          >
            <p className="font-black text-sky-300">{item.time}</p>
            <h3 className="mt-2 text-xl font-black">{item.title}</h3>
            <p className="mt-3 text-slate-300">{item.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <PreviewCard
          title="Key Turning Point"
          value={`61-75 min ${winner} momentum shift`}
        />

        <PreviewCard
          title="Most Dangerous Period"
          value="31-45 min / 61-75 min"
        />
      </div>
    </div>
  );
}
function MatchRatingEngine({ result }) {
  return (
    <div className="rounded-[30px] border border-fuchsia-400/30 bg-gradient-to-r from-blue-600/25 via-violet-600/25 to-fuchsia-500/25 p-6">
      <p className="font-black text-sky-300">AI Match Rating Engine</p>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-4">
        <PreviewCard title="AI Rating" value={result.aiMatchRating} />
        <PreviewCard title="Match Quality" value={result.matchQuality} />
        <PreviewCard
          title="Entertainment"
          value={`${result.entertainmentLevel}%`}
        />
        <PreviewCard
          title="Uncertainty"
          value={`${result.uncertaintyLevel}%`}
        />
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <p className="font-black text-sky-300">Rating Meaning</p>
        <p className="mt-3 leading-relaxed text-slate-300">
          MatchMind rates this match by combining rivalry pressure, attacking quality,
          recent form, confidence balance, and result uncertainty.
        </p>
      </div>
    </div>
  );
}
function MomentumDashboard({ result }) {
  return (
    <div className="rounded-[30px] border border-cyan-400/30 bg-[#030712]/80 p-6">
      <p className="font-black text-sky-300">Momentum Dashboard</p>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-5">
        <PreviewCard
          title="Home Momentum"
          value={`${result.momentum.homeMomentum}%`}
        />

        <PreviewCard
          title="Away Momentum"
          value={`${result.momentum.awayMomentum}%`}
        />

        <PreviewCard
          title="Momentum Gap"
          value={`${result.momentumGap}%`}
        />

        <PreviewCard
          title="Pressure Index"
          value={`${result.pressureIndex}%`}
        />

        <PreviewCard
          title="Rivalry Heat"
          value={result.rivalryHeat}
        />
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <p className="font-black text-sky-300">Trend Signal</p>

        <p className="mt-3 text-slate-300">
          {result.trendSignal}
        </p>
      </div>
    </div>
  );
}
function VisualAnalytics({ result }) {
  return (
    <div className="rounded-[30px] border border-white/10 bg-[#030712]/80 p-6">
      <p className="font-black text-sky-300">Visual Analytics</p>

      <div className="mt-6 space-y-6">
        <VisualBar label={`${result.homeTeam} Win`} value={result.homeWin} />
        <VisualBar label="Draw Chance" value={result.drawChance} />
        <VisualBar label={`${result.awayTeam} Win`} value={result.awayWin} />

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <VisualBar label={`${result.homeTeam} Attack`} value={result.stats.homeAttack} />
          <VisualBar label={`${result.awayTeam} Attack`} value={result.stats.awayAttack} />
          <VisualBar label={`${result.homeTeam} Defense`} value={result.stats.homeDefense} />
          <VisualBar label={`${result.awayTeam} Defense`} value={result.stats.awayDefense} />
          <VisualBar label={`${result.homeTeam} Form`} value={result.stats.homeForm} />
          <VisualBar label={`${result.awayTeam} Form`} value={result.stats.awayForm} />
        </div>
      </div>
    </div>
  );
}
function InsightTiles({ result }) {
  const areas = [
    {
      label: `${result.homeTeam} Attack`,
      team: result.homeTeam,
      area: "Attack",
      value: result.stats.homeAttack,
    },
    {
      label: `${result.awayTeam} Attack`,
      team: result.awayTeam,
      area: "Attack",
      value: result.stats.awayAttack,
    },
    {
      label: `${result.homeTeam} Defense`,
      team: result.homeTeam,
      area: "Defense",
      value: result.stats.homeDefense,
    },
    {
      label: `${result.awayTeam} Defense`,
      team: result.awayTeam,
      area: "Defense",
      value: result.stats.awayDefense,
    },
    {
      label: `${result.homeTeam} Form`,
      team: result.homeTeam,
      area: "Form",
      value: result.stats.homeForm,
    },
    {
      label: `${result.awayTeam} Form`,
      team: result.awayTeam,
      area: "Form",
      value: result.stats.awayForm,
    },
    {
      label: `${result.homeTeam} Finishing`,
      team: result.homeTeam,
      area: "Finishing",
      value: result.stats.homeFinishing,
    },
    {
      label: `${result.awayTeam} Finishing`,
      team: result.awayTeam,
      area: "Finishing",
      value: result.stats.awayFinishing,
    },
  ];

  const strongest = areas.reduce((best, item) =>
    item.value > best.value ? item : best
  );

  const weakest = areas.reduce((worst, item) =>
    item.value < worst.value ? item : worst
  );

  const swingFactor =
    result.stats.homeFinishing > result.stats.awayFinishing
      ? `${result.homeTeam} finishing can decide the match`
      : result.stats.awayFinishing > result.stats.homeFinishing
      ? `${result.awayTeam} finishing can decide the match`
      : "Finishing is balanced, midfield control may decide the match";

  return (
    <div className="rounded-[30px] border border-white/10 bg-[#030712]/80 p-6">
      <p className="font-black text-sky-300">AI Summary Tiles</p>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
        <PreviewCard
          title="Strongest Area"
          value={`${strongest.team} ${strongest.area} ${strongest.value}%`}
        />

        <PreviewCard
          title="Weakest Area"
          value={`${weakest.team} ${weakest.area} ${weakest.value}%`}
        />

        <PreviewCard
          title="Swing Factor"
          value={swingFactor}
        />
      </div>
    </div>
  );
}
function VisualBar({ label, value }) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-slate-300">
        <span>{label}</span>
        <span className="font-black text-sky-300">{value}%</span>
      </div>

      <div className="h-4 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-sky-400 via-violet-400 to-fuchsia-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
function Bar({ label, value }) {
  return (
    <div>
      <div className="flex justify-between text-slate-300">
        <p>{label}</p>
        <p className="font-black text-sky-300">{value}%</p>
      </div>
      <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-sky-400 via-violet-400 to-fuchsia-400"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function PlayersCard({ title, players }) {
  return (
    <div className="rounded-[30px] border border-white/10 bg-[#030712]/80 p-6">
      <p className="font-black text-sky-300">{title}</p>
      <ul className="mt-4 space-y-3 text-lg text-slate-200">
        {players.map((player) => (
          <li key={player}>⚽ {player}</li>
        ))}
      </ul>
    </div>
  );
}

function StatsComparison({ result }) {
  const stats = [
    ["Attack", result.stats.homeAttack, result.stats.awayAttack],
    ["Defense", result.stats.homeDefense, result.stats.awayDefense],
    ["Recent Form", result.stats.homeForm, result.stats.awayForm],
    ["Possession", result.stats.homePossession, result.stats.awayPossession],
    ["Pressing", result.stats.homePressing, result.stats.awayPressing],
    ["Finishing", result.stats.homeFinishing, result.stats.awayFinishing],
  ];

  return (
    <div className="rounded-[30px] border border-white/10 bg-[#030712]/80 p-6">
      <p className="font-black text-sky-300">Team Stats Comparison</p>

      <div className="mt-5 space-y-5">
        {stats.map(([label, home, away]) => (
          <div key={label}>
            <div className="mb-2 flex justify-between text-slate-300">
              <span>{result.homeTeam}: {home}%</span>
              <span>{label}</span>
              <span>{result.awayTeam}: {away}%</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-sky-400 to-blue-600"
                  style={{ width: `${home}%` }}
                />
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-500"
                  style={{ width: `${away}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
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

function ResultCard({ title, text, highlight }) {
  return (
    <div
      className={`rounded-[30px] border p-6 ${
        highlight
          ? "border-fuchsia-400/30 bg-gradient-to-r from-blue-600/40 via-violet-600/40 to-fuchsia-500/40"
          : "border-white/10 bg-[#030712]/80"
      }`}
    >
      <p className="font-black text-sky-300">{title}</p>
      <p className="mt-3 text-lg leading-relaxed text-slate-200">{text}</p>
    </div>
  );
}

function MiniStatus({ title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#030712]/70 p-4">
      <p className="text-sm text-slate-400">{title}</p>
      <p className="mt-1 font-black text-sky-300">{text}</p>
    </div>
  );
}

function FloatingBalls() {
  return (
    <>
      <div className="ball-float absolute left-[6%] top-[28%] z-0 text-4xl opacity-20">
        ⚽
      </div>
      <div className="ball-float absolute right-[7%] top-[18%] z-0 text-3xl opacity-25 [animation-delay:1s]">
        ⚽
      </div>
      <div className="ball-float absolute bottom-[12%] left-[45%] z-0 text-5xl opacity-10 [animation-delay:2s]">
        ⚽
      </div>

      <style jsx>{`
        .ball-float {
          animation: ballFloat 6s ease-in-out infinite;
        }

        @keyframes ballFloat {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-22px) rotate(18deg);
          }
        }
      `}</style>
    </>
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