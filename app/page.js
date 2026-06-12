"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#020617] text-white overflow-hidden">
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#020617]/85 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
          <Link
            href="/"
            className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-fuchsia-400 lg:text-3xl"
          >
            MatchMind AI
          </Link>

          <div className="hidden items-center gap-8 text-slate-300 lg:flex">
            <a href="#features" className="hover:text-white">
              Features
            </a>
            <a href="#how" className="hover:text-white">
              How it works
            </a>
            <a href="#why" className="hover:text-white">
              Why it matters
            </a>
            <Link href="/signin" className="hover:text-white">
              Sign in
            </Link>
            <Link
              href="/signup"
              className="rounded-2xl bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-500 px-6 py-3 font-black shadow-[0_0_35px_rgba(99,102,241,0.35)]"
            >
              Get started
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((value) => !value)}
            className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 font-black text-white lg:hidden"
            aria-label="Open mobile menu"
          >
            ☰
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-white/10 bg-[#020617] px-5 py-5 lg:hidden">
            <div className="flex flex-col gap-3 text-slate-300">
              <a
                onClick={() => setMobileMenuOpen(false)}
                href="#features"
                className="rounded-xl px-4 py-3 hover:bg-white/[0.06] hover:text-white"
              >
                Features
              </a>
              <a
                onClick={() => setMobileMenuOpen(false)}
                href="#how"
                className="rounded-xl px-4 py-3 hover:bg-white/[0.06] hover:text-white"
              >
                How it works
              </a>
              <a
                onClick={() => setMobileMenuOpen(false)}
                href="#why"
                className="rounded-xl px-4 py-3 hover:bg-white/[0.06] hover:text-white"
              >
                Why it matters
              </a>
              <Link
                onClick={() => setMobileMenuOpen(false)}
                href="/signin"
                className="rounded-xl px-4 py-3 hover:bg-white/[0.06] hover:text-white"
              >
                Sign in
              </Link>
              <Link
                onClick={() => setMobileMenuOpen(false)}
                href="/signup"
                className="rounded-2xl bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-500 px-5 py-4 text-center font-black"
              >
                Get started
              </Link>
            </div>
          </div>
        )}
      </nav>

      <section className="relative px-4 py-16 sm:px-8 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(14,165,233,0.22),transparent_35%),radial-gradient(circle_at_85%_20%,rgba(168,85,247,0.22),transparent_35%),radial-gradient(circle_at_55%_85%,rgba(236,72,153,0.12),transparent_35%)]" />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 backdrop-blur-xl">
              <span className="h-3 w-3 rounded-full bg-green-400 animate-pulse" />
              <span className="font-bold text-sky-300">
                AI Football Match Companion
              </span>
            </div>

            <h1 className="max-w-full break-words text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Football intelligence for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-fuchsia-400">
                every fan
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-2xl leading-relaxed text-slate-300">
              MatchMind AI explains matches before, during, and after the game
              with tactical insights, predictions, summaries, and an AI football
              assistant.
            </p>

            <div className="mt-12 flex flex-wrap gap-5">
              <Link
                href="/signup"
                className="rounded-2xl bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-500 px-10 py-5 text-xl font-black shadow-[0_0_45px_rgba(99,102,241,0.4)]"
              >
                Start free
              </Link>

              <Link
                href="/analysis"
                className="rounded-2xl border border-white/10 bg-white/[0.06] px-10 py-5 text-xl font-black backdrop-blur-xl hover:border-sky-400"
              >
                Try analysis
              </Link>
            </div>

            <div className="mt-12 grid max-w-2xl grid-cols-3 gap-4">
              <HeroBadge title="Before" text="Pre-match insight" />
              <HeroBadge title="During" text="Momentum shifts" />
              <HeroBadge title="After" text="Post-match recap" />
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-10 rounded-full bg-gradient-to-r from-sky-500/20 via-violet-500/20 to-fuchsia-500/20 blur-3xl" />

            <div className="relative w-full rotate-0 rounded-[30px] border border-white/10 bg-white/[0.06] p-5 shadow-[0_0_90px_rgba(14,165,233,0.18)] backdrop-blur-2xl transition lg:rotate-1 lg:rounded-[36px] lg:p-8 lg:hover:rotate-0">
              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                <div>
                  <p className="text-slate-400">Live AI Preview</p>
                  <h2 className="mt-2 text-3xl font-black sm:text-4xl">
                    Real Madrid vs Barcelona
                  </h2>
                </div>

                <span className="rounded-full bg-gradient-to-r from-blue-600 to-fuchsia-500 px-5 py-3 text-sm font-black">
                  Before Match
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                <PreviewCard title="Team Edge" value="52%" />
                <PreviewCard title="Confidence" value="86%" />
              </div>

              <div className="mt-6 rounded-3xl border border-white/10 bg-[#030712]/90 p-6">
                <p className="mb-3 font-black text-sky-400">AI Insight</p>
                <p className="text-lg leading-relaxed text-slate-300">
                  Real Madrid may threaten with fast transitions, while
                  Barcelona may control possession. The midfield battle will
                  decide the match rhythm.
                </p>
              </div>

              <div className="mt-6 rounded-3xl bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-500 p-6">
                <p className="text-xl font-black">Fan Summary</p>
                <p className="mt-2 text-slate-100">
                  Expect pressure, tactical changes, quick attacks, and momentum
                  swings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#07111f] px-8 py-12">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-4">
          <Metric title="Pre-match" text="Team form and predictions" />
          <Metric title="Live mode" text="Momentum and tactics" />
          <Metric title="Post-match" text="Summary and lessons" />
          <Metric title="AI Assistant" text="Football Q&A" />
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-8 py-24">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="font-black text-sky-400">PRODUCT FEATURES</p>
          <h2 className="mt-4 text-5xl font-black">
            Built like a real AI football workspace
          </h2>
          <p className="mt-5 text-xl text-slate-400">
            Not just a chatbot. MatchMind AI gives structured match intelligence.
          </p>
        </div>

        <div className="grid gap-7 md:grid-cols-3">
          <Feature
            icon="⚽"
            title="Match Analysis"
            text="Generate tactical insight, team advantage, prediction, and fan summary."
          />
          <Feature
            icon="🤖"
            title="AI Assistant"
            text="Ask football questions and get simple fan-friendly explanations."
          />
          <Feature
            icon="📊"
            title="Explainable Results"
            text="Outputs are divided into clear sections for better understanding."
          />
          <Feature
            icon="🔥"
            title="Momentum Explainer"
            text="Understand pressure moments, substitutions, and tactical shifts."
          />
          <Feature
            icon="🧠"
            title="Smart Reasoning"
            text="AI adapts to before, during, and after match contexts."
          />
          <Feature
            icon="🎙️"
            title="Voice Ready"
            text="Designed for future voice-based match explanation experience."
          />
        </div>
      </section>

      <section id="how" className="bg-[#07111f] px-8 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <p className="font-black text-sky-400">HOW IT WORKS</p>
            <h2 className="mt-4 text-5xl font-black">
              From match details to clear football insight
            </h2>
          </div>

          <div className="grid gap-7 md:grid-cols-3">
            <Step
              n="01"
              title="Enter match"
              text="Choose teams and match stage: before, during, or after."
            />
            <Step
              n="02"
              title="AI analyzes"
              text="The system creates structured tactical reasoning."
            />
            <Step
              n="03"
              title="Fans understand"
              text="Users get simple predictions, insights, and summaries."
            />
          </div>
        </div>
      </section>

      <section id="why" className="mx-auto max-w-7xl px-8 py-24">
        <div className="grid gap-8 lg:grid-cols-2">
          <Panel
            type="problem"
            title="Football analysis is often too complex"
            items={[
              "Fans hear tactics but do not understand them.",
              "Momentum changes quickly and feels confusing.",
              "Analysis often uses expert-level language.",
              "Casual fans need simple, trusted explanations.",
            ]}
          />

          <Panel
            type="solution"
            title="Explainable AI for every football fan"
            items={[
              "Clear before, during, and after match understanding.",
              "Simple fan-friendly explanations.",
              "Tactical insights without confusing language.",
              "Smart assistant for football questions.",
            ]}
          />
        </div>
      </section>

      <section className="bg-[#07111f] px-4 py-16 sm:px-8 sm:py-24">
  <div className="mx-auto max-w-7xl rounded-[28px] bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-500 p-8 text-center shadow-[0_0_80px_rgba(99,102,241,0.35)] sm:rounded-[36px] sm:p-14">
    <h2 className="text-4xl font-black leading-tight sm:text-5xl">
      Ready to understand your next match better?
    </h2>
    <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-100 sm:text-xl">
      Analyze matches, ask questions, and get simple explanations that make
      football easier to follow.
    </p>
    <Link
      href="/signup"
      className="mt-10 inline-flex w-full max-w-xs items-center justify-center rounded-2xl bg-white px-8 py-5 text-lg font-black text-black sm:w-auto sm:max-w-none sm:px-10 sm:text-xl"
    >
      Create account
    </Link>
  </div>
</section>

      <footer className="border-t border-white/10 bg-[#020617] px-8 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
          <div>
            <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-fuchsia-400">
              MatchMind AI
            </h3>
            <p className="mt-4 text-slate-400">
              AI-powered football companion for fans.
            </p>
          </div>

          <Footer
            title="Product"
            items={["Features", "Match Analysis", "AI Assistant", "Dashboard"]}
          />
          <Footer title="Company" items={["About", "Contact", "Support"]} />
          <Footer
            title="Legal"
            items={["Privacy Policy", "Terms of Service"]}
          />
        </div>
      </footer>
    </main>
  );
}

function HeroBadge({ title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-xl">
      <p className="font-black text-sky-400">{title}</p>
      <p className="mt-1 text-sm text-slate-400">{text}</p>
    </div>
  );
}

function PreviewCard({ title, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#030712] p-6">
      <p className="text-slate-400">{title}</p>
      <h3 className="mt-2 text-3xl font-black text-sky-400 sm:text-4xl">{value}</h3>
    </div>
  );
}

function Metric({ title, text }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-7 text-center backdrop-blur-xl">
      <h3 className="text-2xl font-black text-sky-400">{title}</h3>
      <p className="mt-2 text-slate-400">{text}</p>
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="rounded-[30px] border border-white/10 bg-white/[0.06] p-8 backdrop-blur-xl transition hover:-translate-y-2 hover:border-sky-400/60">
      <div className="mb-6 text-4xl">{icon}</div>
      <h3 className="text-2xl font-black">{title}</h3>
      <p className="mt-4 text-lg leading-relaxed text-slate-300">{text}</p>
    </div>
  );
}

function Step({ n, title, text }) {
  return (
    <div className="rounded-[30px] border border-white/10 bg-white/[0.06] p-8 backdrop-blur-xl">
      <h3 className="text-6xl font-black text-sky-400">{n}</h3>
      <h4 className="mt-8 text-2xl font-black">{title}</h4>
      <p className="mt-4 text-lg text-slate-300">{text}</p>
    </div>
  );
}

function Panel({ type, title, items }) {
  const isProblem = type === "problem";

  return (
    <div className="rounded-[32px] border border-white/10 bg-white/[0.06] p-10 backdrop-blur-xl">
      <p
        className={`mb-4 font-black ${
          isProblem ? "text-red-400" : "text-sky-400"
        }`}
      >
        {isProblem ? "THE PROBLEM" : "THE MATCHMIND WAY"}
      </p>
      <h2 className="text-4xl font-black">{title}</h2>
      <ul className="mt-8 space-y-5 text-lg text-slate-300">
        {items.map((item) => (
          <li key={item}>{isProblem ? "✕" : "✓"} {item}</li>
        ))}
      </ul>
    </div>
  );
}

function Footer({ title, items }) {
  return (
    <div>
      <h4 className="font-black">{title}</h4>
      <ul className="mt-4 space-y-3 text-slate-400">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}