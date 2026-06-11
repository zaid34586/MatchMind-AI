import Link from "next/link";

const matches = [
  {
    match: "Real Madrid vs Barcelona",
    stage: "Before Match",
    confidence: "86%",
    result: "Prediction generated",
    summary: "Fast transitions vs possession control.",
  },
  {
    match: "Man City vs Liverpool",
    stage: "Live Match",
    confidence: "91%",
    result: "Momentum analyzed",
    summary: "High press and quick counter patterns.",
  },
  {
    match: "India vs Australia",
    stage: "After Match",
    confidence: "79%",
    result: "Fan summary created",
    summary: "Simple recap with key moments.",
  },
];

export default function HistoryPage() {
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

            <p className="mt-5 font-black text-sky-400">Match History</p>

            <h1 className="mt-3 text-6xl font-black tracking-tight md:text-7xl">
              Previous AI reports
            </h1>

            <p className="mt-4 max-w-4xl text-xl leading-relaxed text-slate-300">
              Review your match predictions, tactical summaries, confidence
              scores, and fan-friendly explanations.
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/dashboard"
              className="rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 font-black backdrop-blur-xl"
            >
              Dashboard
            </Link>
            <Link
              href="/analysis"
              className="rounded-2xl bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-500 px-5 py-4 font-black shadow-[0_0_35px_rgba(99,102,241,0.35)]"
            >
              New Analysis
            </Link>
          </div>
        </header>

        <section className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          <TopCard title="Total Reports" value="12" />
          <TopCard title="Avg Confidence" value="86%" />
          <TopCard title="Fan Summaries" value="24" />
        </section>

        <section className="mt-10 rounded-[38px] border border-white/10 bg-white/[0.06] p-7 shadow-[0_0_80px_rgba(56,189,248,0.12)] backdrop-blur-2xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-black text-sky-300">AI REPORT ARCHIVE</p>
              <h2 className="mt-3 text-4xl font-black">Recent matches</h2>
            </div>

            <div className="flex flex-wrap gap-3">
              {["All", "Before", "Live", "After"].map((item) => (
                <button
                  key={item}
                  className="rounded-full border border-white/10 bg-[#030712]/70 px-5 py-3 font-black text-slate-300 transition hover:border-sky-400/40 hover:text-white"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 space-y-5">
            {matches.map((item) => (
              <HistoryCard key={item.match} item={item} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function TopCard({ title, value }) {
  return (
    <div className="rounded-[30px] border border-white/10 bg-white/[0.06] p-7 backdrop-blur-xl">
      <p className="text-slate-400">{title}</p>
      <p className="mt-3 text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-fuchsia-400">
        {value}
      </p>
    </div>
  );
}

function HistoryCard({ item }) {
  return (
    <div className="rounded-[30px] border border-white/10 bg-[#030712]/80 p-6 transition hover:border-sky-400/40 hover:shadow-[0_0_45px_rgba(56,189,248,0.15)]">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-2xl font-black">{item.match}</p>
          <p className="mt-2 text-slate-400">{item.summary}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <SmallInfo label="Stage" value={item.stage} />
          <SmallInfo label="Confidence" value={item.confidence} />
          <SmallInfo label="Status" value={item.result} />
        </div>
      </div>

      <div className="mt-5 flex justify-end">
        <Link
          href="/analysis"
          className="rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-3 font-black"
        >
          View Report
        </Link>
      </div>
    </div>
  );
}

function SmallInfo({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-1 font-black text-sky-300">{value}</p>
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