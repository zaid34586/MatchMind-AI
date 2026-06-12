"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getCurrentUser, logoutUser } from "../lib/auth";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

 useEffect(() => {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    router.replace("/signin");
    return;
  }

  setUser(currentUser);
}, [router]);

  function handleLogout() {
  logoutUser();

  window.history.pushState(null, "", "/signin");

  router.replace("/signin");
}

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <div className="flex min-h-screen">
        <aside className="hidden w-[310px] border-r border-white/10 bg-[#07111f]/95 p-7 lg:block">
          <Link
            href="/"
            className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-violet-400 to-fuchsia-400"
          >
            MatchMind AI
          </Link>

         <nav className="mt-12 space-y-3">
  <SideLink active href="/dashboard" label="Dashboard" />
  <SideLink href="/analysis" label="Match Analysis" />
  <SideLink href="/worldcup" label="🏆 World Cup 2026" />
  <SideLink href="/community" label="🌍 Community" />
  <SideLink href="/profile" label="👤 Profile" />
  <SideLink href="/messages" label="💬 Messages" />
  <SideLink href="/assistant" label="AI Assistant" />
  <SideLink href="/history" label="Match History" />
  <SideLink href="/settings" label="Settings" />
</nav>

          <div className="mt-12 rounded-[28px] border border-sky-400/20 bg-gradient-to-br from-sky-500/10 to-fuchsia-500/10 p-5 shadow-[0_0_45px_rgba(56,189,248,0.12)]">
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,1)]" />
              <p className="text-sm font-black text-sky-300">AI CORE ACTIVE</p>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              MatchMind is ready to analyze tactics, momentum, confidence, and
              fan questions.
            </p>
          </div>

          <div className="mt-6 rounded-[24px] border border-white/10 bg-white/[0.05] p-5">
            <p className="text-sm text-slate-400">Signed in as</p>
            <p className="mt-2 font-black text-white">
              {user?.name || "MatchMind User"}
            </p>
            <p className="mt-1 break-all text-sm text-slate-400">
              {user?.email || "user@example.com"}
            </p>

            <button
              onClick={handleLogout}
              className="mt-5 w-full rounded-2xl border border-red-400/30 bg-red-500/10 px-5 py-3 font-black text-red-300 transition hover:bg-red-500/20"
            >
              Logout
            </button>
          </div>
        </aside>

        <section className="flex-1 overflow-hidden">
          <div className="relative min-h-screen p-6 lg:p-10">
            <Background />

            <div className="relative z-10 mx-auto max-w-7xl">
              <header className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="font-black text-sky-400">
                    AI Football Intelligence Workspace
                  </p>
                  <h1 className="mt-3 text-6xl font-black tracking-tight lg:text-7xl">
                    Welcome back{user?.name ? `, ${user.name}` : ""}
                  </h1>
                  <p className="mt-4 max-w-3xl text-xl leading-relaxed text-slate-300">
                    Track match insights, predictions, tactical reasoning, fan
                    questions, and AI explanations in one premium dashboard.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/analysis"
                    className="rounded-2xl bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-500 px-6 py-4 font-black shadow-[0_0_35px_rgba(99,102,241,0.35)] transition hover:scale-[1.03]"
                  >
                    New Analysis
                  </Link>
                  <Link
                    href="/assistant"
                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 font-black transition hover:bg-white/[0.08]"
                  >
                    Ask AI
                  </Link>
                </div>
              </header>

              <section className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                <StatCard label="Analyses" value="12" note="+3 this week" />
                <StatCard label="Predictions" value="8" note="Before match" />
                <StatCard label="Fan Questions" value="24" note="AI assistant" />
                <StatCard label="Avg Confidence" value="86%" note="High trust" />
              </section>

              <section className="mt-10 grid grid-cols-1 gap-6 xl:grid-cols-[1.25fr_0.75fr]">
                <LiveMatchCard />
                <AIActivityFeed />
              </section>

              <section className="mt-10 grid grid-cols-1 gap-6 xl:grid-cols-[0.9fr_1.1fr]">
                <TacticalRadar />
                <AssistantPreview />
              </section>

              <section className="mt-10 grid grid-cols-1 gap-6 xl:grid-cols-3">
                <QuickAction
                  icon="⚽"
                  title="Match Analysis"
                  text="Generate structured football insights before, during, or after the match."
                  href="/analysis"
                />
                <QuickAction
                  icon="🧠"
                  title="AI Assistant"
                  text="Ask simple football questions and get fan-friendly answers."
                  href="/assistant"
                />
                <QuickAction
                  icon="📊"
                  title="Insight History"
                  text="Review previous predictions, summaries, and confidence scores."
                  href="/history"
                />
              </section>

              <section className="mt-10 grid grid-cols-1 gap-6 xl:grid-cols-[1fr_1fr]">
                <RecentAnalysis />
                <InsightBoard />
              </section>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function SideLink({ href, label, active }) {
  return (
    <Link
      href={href}
      className={`block rounded-2xl px-5 py-4 text-lg font-bold transition ${
        active
          ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-[0_0_30px_rgba(59,130,246,0.25)]"
          : "text-slate-300 hover:bg-white/[0.06] hover:text-white"
      }`}
    >
      {label}
    </Link>
  );
}

function StatCard({ label, value, note }) {
  return (
    <div className="group rounded-[28px] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-sky-400/40 hover:shadow-[0_0_45px_rgba(56,189,248,0.16)]">
      <p className="text-slate-400">{label}</p>
      <p className="mt-4 text-5xl font-black">{value}</p>
      <p className="mt-3 text-sm text-sky-300">{note}</p>
      <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-sky-400 to-fuchsia-400 transition group-hover:w-[92%]" />
      </div>
    </div>
  );
}

function LiveMatchCard() {
  return (
    <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.06] p-7 backdrop-blur-xl shadow-[0_0_80px_rgba(59,130,246,0.12)]">
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />

      <div className="relative flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="font-black text-sky-400">LIVE AI PREVIEW</p>
          <h2 className="mt-3 text-4xl font-black">
            Real Madrid vs Barcelona
          </h2>
          <p className="mt-3 text-slate-300">
            Before Match · Tactical prediction generated
          </p>
        </div>

        <span className="rounded-full bg-gradient-to-r from-blue-600 to-fuchsia-500 px-5 py-3 font-black shadow-[0_0_30px_rgba(99,102,241,0.35)]">
          Before Match
        </span>
      </div>

      <div className="relative mt-7 grid grid-cols-1 gap-4 md:grid-cols-2">
        <MiniMetric label="Team Advantage" value="52%" progress="52%" />
        <MiniMetric label="Confidence" value="86%" progress="86%" />
      </div>

      <div className="relative mt-5 rounded-3xl border border-white/10 bg-[#030712]/80 p-6">
        <p className="font-black text-sky-300">AI Insight</p>
        <p className="mt-3 leading-relaxed text-slate-300">
          Real Madrid may use fast transitions while Barcelona may focus on
          possession and midfield control. The key battle is who controls
          momentum after the first pressure phase.
        </p>
      </div>

      <div className="relative mt-5 rounded-3xl bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-500 p-6 shadow-[0_0_45px_rgba(168,85,247,0.28)]">
        <p className="font-black">Fan Summary</p>
        <p className="mt-2 text-white/90">
          Expect pressure, quick attacks, tactical changes, and momentum swings.
        </p>
      </div>
    </div>
  );
}

function MiniMetric({ label, value, progress }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#030712]/80 p-6">
      <p className="text-slate-400">{label}</p>
      <p className="mt-2 text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-fuchsia-400">
        {value}
      </p>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-sky-400 to-fuchsia-400"
          style={{ width: progress }}
        />
      </div>
    </div>
  );
}

function AIActivityFeed() {
  const items = [
    ["Analyzing match context", "Completed"],
    ["Checking momentum factors", "Completed"],
    ["Generating fan summary", "Live"],
    ["Confidence score updated", "86%"],
  ];

  return (
    <div className="rounded-[36px] border border-fuchsia-400/20 bg-fuchsia-500/[0.06] p-7 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <span className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,1)]" />
        <p className="font-black text-fuchsia-300">AI ACTIVITY FEED</p>
      </div>

      <h2 className="mt-4 text-4xl font-black">Live Brain</h2>
      <p className="mt-3 text-slate-300">
        Real-time system actions appear here as MatchMind processes football
        intelligence.
      </p>

      <div className="mt-7 space-y-4">
        {items.map(([title, status]) => (
          <div
            key={title}
            className="rounded-3xl border border-white/10 bg-[#030712]/80 p-5"
          >
            <div className="flex items-center justify-between gap-4">
              <p className="font-bold">{title}</p>
              <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-sky-300">
                {status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TacticalRadar() {
  const stats = [
    ["Attack", "78%"],
    ["Defense", "61%"],
    ["Possession", "64%"],
    ["Pressure", "82%"],
    ["Momentum", "87%"],
  ];

  return (
    <div className="rounded-[36px] border border-white/10 bg-white/[0.06] p-7 backdrop-blur-xl">
      <p className="font-black text-sky-400">TACTICAL RADAR</p>
      <h2 className="mt-3 text-4xl font-black">Match Intelligence</h2>

      <div className="mt-7 space-y-5">
        {stats.map(([label, value]) => (
          <div key={label}>
            <div className="flex justify-between">
              <p className="text-slate-300">{label}</p>
              <p className="font-black text-sky-300">{value}</p>
            </div>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-400 via-violet-400 to-fuchsia-400"
                style={{ width: value }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AssistantPreview() {
  return (
    <div className="rounded-[36px] border border-sky-400/20 bg-sky-500/[0.06] p-7 backdrop-blur-xl">
      <div className="text-5xl">🧠</div>
      <h2 className="mt-5 text-4xl font-black">AI Assistant Preview</h2>
      <p className="mt-4 leading-relaxed text-slate-300">
        Ask match-related questions and get simple football explanations.
      </p>

      <div className="mt-6 rounded-3xl border border-white/10 bg-[#030712]/80 p-5">
        <p className="text-sm font-black text-sky-400">Example Question</p>
        <p className="mt-3 text-xl font-bold">
          “Why did Barcelona lose control after halftime?”
        </p>
      </div>

      <Link
        href="/assistant"
        className="mt-6 block rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 py-4 text-center font-black transition hover:scale-[1.02]"
      >
        Open Assistant
      </Link>
    </div>
  );
}

function QuickAction({ icon, title, text, href }) {
  return (
    <Link
      href={href}
      className="rounded-[30px] border border-white/10 bg-white/[0.05] p-7 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-fuchsia-400/40 hover:shadow-[0_0_50px_rgba(217,70,239,0.16)]"
    >
      <div className="text-4xl">{icon}</div>
      <h3 className="mt-5 text-3xl font-black">{title}</h3>
      <p className="mt-3 leading-relaxed text-slate-300">{text}</p>
    </Link>
  );
}

function RecentAnalysis() {
  const items = [
    ["Real Madrid vs Barcelona", "Before Match", "86%"],
    ["India vs Australia", "Fan Summary", "79%"],
    ["Man City vs Liverpool", "Post Match", "91%"],
  ];

  return (
    <div className="rounded-[36px] border border-white/10 bg-white/[0.06] p-7 backdrop-blur-xl">
      <h2 className="text-3xl font-black">Recent Match Analysis</h2>

      <div className="mt-6 space-y-4">
        {items.map(([title, type, score]) => (
          <Link
            href="/history"
            key={title}
            className="block rounded-3xl border border-white/10 bg-[#030712]/80 p-5 transition hover:border-sky-400/40"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xl font-black">{title}</p>
                <p className="mt-1 text-slate-400">{type}</p>
              </div>
              <p className="text-2xl font-black text-sky-300">{score}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function InsightBoard() {
  return (
    <div className="rounded-[36px] border border-white/10 bg-white/[0.06] p-7 backdrop-blur-xl">
      <h2 className="text-3xl font-black">Insight Board</h2>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <BoardCard title="Momentum" value="High Pressure" />
        <BoardCard title="Tactical Risk" value="Wide Space" />
        <BoardCard title="Fan Mode" value="Simple Output" />
        <BoardCard title="AI Status" value="Ready" />
      </div>
    </div>
  );
}

function BoardCard({ title, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#030712]/80 p-5">
      <p className="text-slate-400">{title}</p>
      <p className="mt-2 text-xl font-black text-sky-300">{value}</p>
    </div>
  );
}

function Background() {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_15%,rgba(14,165,233,0.18),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(217,70,239,0.18),transparent_35%),radial-gradient(circle_at_50%_90%,rgba(99,102,241,0.13),transparent_35%)]" />
      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:64px_64px]" />
    </>
  );
}