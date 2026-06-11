"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const quickActions = [
  "Predict Real Madrid vs Barcelona",
  "Explain why Barcelona lost control after halftime",
  "Compare two teams simply",
  "Explain momentum shift",
  "Tell me key players to watch",
];

const robotLines = [
  "Hey Zaid 👋 ready to analyze?",
  "I can explain tactics in simple words ⚽",
  "Ask me anything about the match!",
  "Let’s make football easy to understand.",
];

export default function AssistantPage() {
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [robotLine, setRobotLine] = useState(robotLines[0]);
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hi Zaid 👋 I am your MatchMind AI football coach. Ask me anything about tactics, momentum, players, predictions, or fan-friendly match explanations.",
    },
  ]);

  const chatEndRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setRobotLine(robotLines[Math.floor(Math.random() * robotLines.length)]);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  function generateAnswer(question) {
    return `Quick Answer: ${question} can be understood by looking at momentum, tactics, player energy, and pressure.

Main Reasons:
1. Tactical change: The opponent may have adjusted pressing, formation, or passing lanes.
2. Momentum shift: One big chance, goal, mistake, or card can change confidence.
3. Fatigue: Intense pressing can reduce speed and decision-making after some time.
4. Space control: The team that controls midfield space usually controls the match.
5. Substitutions: Fresh players can change tempo and create new problems.

Fan Explanation:
In simple words, football control changes when one team starts winning space, confidence, and timing. If a team slows down or loses midfield control, the opponent can take over the match.

What to watch next:
Look at pressing intensity, midfield positioning, substitutions, and who wins second balls.`;
  }

  function askAI(e, quickQuestion) {
    e?.preventDefault();

    const question = quickQuestion || input;
    if (!question.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setInput("");
    setIsThinking(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: generateAnswer(question),
        },
      ]);
      setIsThinking(false);
    }, 900);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      <Background />
      <FootballParticles />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-8">
        <Header />

        <section className="mt-10 grid grid-cols-1 gap-8 xl:grid-cols-[1fr_430px]">
          <ChatPanel
            messages={messages}
            input={input}
            setInput={setInput}
            askAI={askAI}
            isThinking={isThinking}
            chatEndRef={chatEndRef}
          />

          <RobotPanel robotLine={robotLine} askAI={askAI} />
        </section>
      </div>

      <style jsx>{`
        .robot-float {
          animation: robotEntry 1.1s ease-out, robotFloat 3s ease-in-out infinite;
        }

        .robot-eye {
          animation: blink 3s infinite;
        }

        .speech-pop {
          animation: speechPop 0.5s ease-out;
        }

        .football-float {
          animation: footballFloat 6s ease-in-out infinite;
        }

        @keyframes robotEntry {
          0% {
            opacity: 0;
            transform: translateY(80px) scale(0.7) rotate(-8deg);
          }
          60% {
            opacity: 1;
            transform: translateY(-15px) scale(1.05) rotate(4deg);
          }
          100% {
            transform: translateY(0) scale(1) rotate(0);
          }
        }

        @keyframes robotFloat {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-14px);
          }
        }

        @keyframes blink {
          0%,
          92%,
          100% {
            transform: scaleY(1);
          }
          95% {
            transform: scaleY(0.15);
          }
        }

        @keyframes speechPop {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes footballFloat {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-22px) rotate(18deg);
          }
        }
      `}</style>
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
          MatchMind AI
        </Link>

        <p className="mt-5 font-black text-sky-400">AI Football Assistant</p>

        <h1 className="mt-3 text-6xl font-black tracking-tight md:text-7xl">
          Your Personal Football AI Coach
        </h1>

        <p className="mt-4 max-w-4xl text-xl leading-relaxed text-slate-300">
          Ask football questions, understand tactics, compare teams, explain
          momentum, and get simple fan-friendly answers.
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
          href="/analysis"
          className="rounded-2xl bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-500 px-5 py-4 font-black shadow-[0_0_35px_rgba(99,102,241,0.35)] transition hover:scale-[1.03]"
        >
          Match Analysis
        </Link>
      </div>
    </header>
  );
}

function ChatPanel({
  messages,
  input,
  setInput,
  askAI,
  isThinking,
  chatEndRef,
}) {
  return (
    <section className="rounded-[38px] border border-white/10 bg-white/[0.06] p-6 shadow-[0_0_80px_rgba(56,189,248,0.12)] backdrop-blur-2xl">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex items-center gap-3">
          <span className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,1)]" />
          <p className="font-black text-sky-300">Assistant online</p>
        </div>

        <p className="rounded-full bg-white/10 px-4 py-2 text-sm text-slate-300">
          Fan mode active
        </p>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
        {quickActions.map((action) => (
          <button
            key={action}
            onClick={(e) => askAI(e, action)}
            className="rounded-2xl border border-white/10 bg-[#030712]/70 px-4 py-3 text-left text-sm font-bold text-slate-300 transition hover:border-sky-400/50 hover:bg-sky-400/10 hover:text-white"
          >
            ⚡ {action}
          </button>
        ))}
      </div>

      <div className="mt-6 h-[500px] space-y-5 overflow-y-auto pr-2">
        {messages.map((msg, index) => (
          <MessageBubble key={index} msg={msg} />
        ))}

        {isThinking && (
          <div className="flex justify-start">
            <div className="rounded-[26px] border border-white/10 bg-[#030712]/90 p-5 text-lg text-slate-300">
              <p className="font-black text-sky-300">MatchMind is thinking...</p>
              <div className="mt-3 flex gap-2">
                <span className="h-2 w-2 animate-bounce rounded-full bg-sky-400" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-violet-400 [animation-delay:120ms]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-fuchsia-400 [animation-delay:240ms]" />
              </div>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      <form onSubmit={askAI} className="mt-6 flex flex-col gap-4 md:flex-row">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Example: Why did Barcelona lose control after halftime?"
          className="flex-1 rounded-2xl border border-white/10 bg-[#030712] px-5 py-4 text-white outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-400/10"
        />

        <button className="rounded-2xl bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-500 px-8 py-4 font-black shadow-[0_0_35px_rgba(99,102,241,0.35)] transition hover:scale-[1.03]">
          Ask AI
        </button>
      </form>
    </section>
  );
}

function MessageBubble({ msg }) {
  const isUser = msg.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[86%] whitespace-pre-line rounded-[26px] p-5 text-lg leading-relaxed ${
          isUser
            ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-[0_0_30px_rgba(99,102,241,0.25)]"
            : "border border-white/10 bg-[#030712]/90 text-slate-200"
        }`}
      >
        {msg.text}
      </div>
    </div>
  );
}

function RobotPanel({ robotLine, askAI }) {
  return (
    <aside className="relative overflow-hidden rounded-[38px] border border-fuchsia-400/20 bg-gradient-to-br from-sky-500/10 via-violet-500/10 to-fuchsia-500/10 p-7 shadow-[0_0_90px_rgba(217,70,239,0.18)] backdrop-blur-2xl">
      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-sky-500/20 blur-3xl" />

      <div className="relative">
        <div className="speech-pop mb-5 rounded-[26px] border border-white/10 bg-[#030712]/90 p-5 shadow-[0_0_35px_rgba(56,189,248,0.12)]">
          <p className="text-sm font-black text-sky-400">MATCHMIND COACH</p>
          <p className="mt-2 text-xl font-black">{robotLine}</p>
        </div>

        <div className="robot-float mx-auto flex h-72 w-72 items-center justify-center rounded-full border border-white/10 bg-[#030712]/70 shadow-[0_0_70px_rgba(56,189,248,0.22)]">
          <CuteRobot />
        </div>

        <div className="mt-8 rounded-[30px] border border-white/10 bg-[#030712]/80 p-6">
          <p className="text-sm font-black text-sky-400">FOOTBALL AI CORE</p>
          <h2 className="mt-3 text-4xl font-black">Ready to coach</h2>
          <p className="mt-4 leading-relaxed text-slate-300">
            I can explain tactics, predict match flow, simplify football terms,
            and make match analysis easy for fans.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <MiniCard title="Prediction" text="Ready" />
          <MiniCard title="Tactics" text="Ready" />
          <MiniCard title="Momentum" text="Live" />
          <MiniCard title="Fan Mode" text="Simple" />
        </div>

        <button
          onClick={(e) => askAI(e, "Give me a simple football match analysis")}
          className="mt-6 w-full rounded-2xl bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-500 py-4 font-black shadow-[0_0_35px_rgba(99,102,241,0.35)] transition hover:scale-[1.02]"
        >
          Ask Coach
        </button>
      </div>
    </aside>
  );
}

function CuteRobot() {
  return (
    <div className="relative flex flex-col items-center">
      <div className="absolute -top-8 h-16 w-16 rounded-full bg-sky-400/20 blur-2xl" />

      <div className="relative h-32 w-36 rounded-[42px] border border-white/20 bg-gradient-to-b from-white to-slate-300 shadow-[0_0_35px_rgba(56,189,248,0.25)]">
        <div className="absolute left-4 right-4 top-8 h-16 rounded-[28px] bg-[#020617]">
          <div className="robot-eye absolute left-6 top-5 h-4 w-4 rounded-full bg-sky-400 shadow-[0_0_15px_rgba(56,189,248,1)]" />
          <div className="robot-eye absolute right-6 top-5 h-4 w-4 rounded-full bg-fuchsia-400 shadow-[0_0_15px_rgba(236,72,153,1)]" />
          <div className="absolute bottom-3 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-white/70" />
        </div>
      </div>

      <div className="mt-2 h-32 w-36 rounded-[34px] bg-gradient-to-b from-blue-500 via-violet-600 to-[#111827] shadow-[0_0_40px_rgba(99,102,241,0.35)]">
        <div className="mx-auto mt-6 w-24 rounded-full bg-white/15 py-3 text-center font-black">
          COACH
        </div>
        <div className="mx-auto mt-7 h-9 w-24 rounded-2xl bg-[#020617]">
          <div className="mx-auto h-2 w-16 translate-y-3 rounded-full bg-sky-400 shadow-[0_0_15px_rgba(56,189,248,1)]" />
          <div className="mx-auto h-2 w-12 translate-y-5 rounded-full bg-fuchsia-400 shadow-[0_0_15px_rgba(236,72,153,1)]" />
        </div>
      </div>

      <div className="absolute -left-8 top-32 h-20 w-8 rounded-full bg-blue-500" />
      <div className="absolute -right-8 top-32 h-20 w-8 rounded-full bg-sky-500" />

      <div className="football-float absolute -right-16 top-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#020617] text-2xl shadow-[0_0_25px_rgba(56,189,248,0.25)]">
        ⚽
      </div>
    </div>
  );
}

function MiniCard({ title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#030712]/70 p-4">
      <p className="font-black text-sky-300">{title}</p>
      <p className="mt-1 text-sm text-slate-400">{text}</p>
    </div>
  );
}

function FootballParticles() {
  return (
    <>
      <div className="football-float absolute left-[6%] top-[28%] z-0 text-4xl opacity-20">
        ⚽
      </div>
      <div className="football-float absolute right-[7%] top-[18%] z-0 text-3xl opacity-25 [animation-delay:1s]">
        ⚽
      </div>
      <div className="football-float absolute bottom-[12%] left-[45%] z-0 text-5xl opacity-10 [animation-delay:2s]">
        ⚽
      </div>
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