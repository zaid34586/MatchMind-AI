export default function AICharacter({ mode = "signin" }) {
  const text =
    mode === "signup"
      ? "Let's create your football AI workspace."
      : "Welcome back. Your football intelligence hub is waiting.";

  return (
    <div className="relative hidden lg:flex min-h-[620px] items-center justify-center">
      <div className="absolute h-[420px] w-[420px] rounded-full bg-gradient-to-r from-sky-500/20 via-violet-500/20 to-fuchsia-500/20 blur-3xl" />

      <div className="relative w-full max-w-md rounded-[36px] border border-white/10 bg-white/[0.06] p-8 shadow-[0_0_90px_rgba(59,130,246,0.22)] backdrop-blur-2xl">
        <div className="mx-auto flex h-56 w-56 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 via-violet-500 to-fuchsia-500 shadow-[0_0_70px_rgba(99,102,241,0.45)] animate-bounce">
          <div className="flex h-44 w-44 items-center justify-center rounded-full bg-[#020617] text-7xl">
            🤖
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-[#030712]/90 p-6">
          <p className="text-sm font-black text-sky-400">MATCHMIND GUIDE</p>
          <p className="mt-3 text-2xl font-black leading-snug">{text}</p>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <MiniStat title="AI" text="Ready" />
          <MiniStat title="3" text="Modes" />
          <MiniStat title="24/7" text="Guide" />
        </div>
      </div>
    </div>
  );
}

function MiniStat({ title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-center">
      <p className="text-xl font-black text-sky-400">{title}</p>
      <p className="text-sm text-slate-400">{text}</p>
    </div>
  );
}