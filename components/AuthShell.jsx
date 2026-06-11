import Link from "next/link";
import BackgroundEffects from "./BackgroundEffects";
import AICharacter from "./AICharacter";

export default function AuthShell({ type = "signin" }) {
  const isSignup = type === "signup";

  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      <BackgroundEffects />

      <section className="relative z-10 mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-12 px-8 py-10 lg:grid-cols-2">
        <AICharacter mode={type} />

        <div className="flex items-center justify-center">
          <div className="w-full max-w-xl rounded-[34px] border border-white/10 bg-white/[0.07] p-8 shadow-[0_0_90px_rgba(236,72,153,0.18)] backdrop-blur-2xl">
            <Link
              href="/"
              className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-violet-400 to-fuchsia-400"
            >
              MatchMind AI
            </Link>

            <div className="mt-10">
              <p className="font-black text-sky-400">
                {isSignup ? "Start free" : "Welcome back"}
              </p>

              <h1 className="mt-3 text-6xl font-black tracking-tight">
                {isSignup ? "Create account" : "Sign in"}
              </h1>

              <p className="mt-4 text-xl leading-relaxed text-slate-300">
                {isSignup
                  ? "Build your AI football workspace and start match analysis."
                  : "Continue to your AI football dashboard."}
              </p>
            </div>

            <form className="mt-10 space-y-5">
              {isSignup && (
                <Input label="Full name" type="text" placeholder="Mohd Zaid" />
              )}

              <Input label="Email" type="email" placeholder="you@example.com" />
              <Input
                label="Password"
                type="password"
                placeholder={isSignup ? "Create password" : "Enter password"}
              />

              <Link
                href="/dashboard"
                className="block w-full rounded-2xl bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-500 py-4 text-center text-lg font-black shadow-[0_0_40px_rgba(99,102,241,0.45)] transition hover:scale-[1.02]"
              >
                {isSignup ? "Create account" : "Sign in"}
              </Link>
            </form>

            <p className="mt-8 text-center text-slate-300">
              {isSignup ? "Already have an account? " : "No account? "}
              <Link
                href={isSignup ? "/signin" : "/signup"}
                className="font-black text-sky-400"
              >
                {isSignup ? "Sign in" : "Create one"}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function Input({ label, type, placeholder }) {
  return (
    <div>
      <label className="mb-2 block font-bold text-slate-200">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-white/10 bg-[#030712] px-5 py-4 text-white outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-400/10"
      />
    </div>
  );
}