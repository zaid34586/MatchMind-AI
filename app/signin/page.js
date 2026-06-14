"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginUser } from "../lib/auth";

export default function SignInPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      <Background />

      <section className="relative z-10 mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-12 px-8 py-10 lg:grid-cols-2">
        <FootballAICore />

        <AuthCard />
      </section>
    </main>
  );
}

function AuthCard() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSignin(e) {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter email and password.");
      return;
    }

    const result = loginUser(email, password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    window.location.href = "/dashboard";
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-xl rounded-[34px] border border-white/10 bg-white/[0.07] p-8 shadow-[0_0_90px_rgba(236,72,153,0.18)] backdrop-blur-2xl">
        <Link
          href="/"
          className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-violet-400 to-fuchsia-400"
        >
          PitchPal AI
        </Link>

        <div className="mt-10">
          <p className="font-black text-sky-400">Welcome back</p>

          <h1 className="mt-3 text-6xl font-black tracking-tight">
            Sign in
          </h1>

          <p className="mt-4 text-xl leading-relaxed text-slate-300">
            Continue to your AI football dashboard.
          </p>
        </div>

        <form onSubmit={handleSignin} className="mt-10 space-y-5">
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-red-300">
              {error}
            </p>
          )}

          <button className="block w-full rounded-2xl bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-500 py-4 text-center text-lg font-black shadow-[0_0_40px_rgba(99,102,241,0.45)] transition hover:scale-[1.02]">
            Sign in
          </button>
        </form>

        <p className="mt-8 text-center text-slate-300">
          No account?{" "}
          <Link href="/signup" className="font-black text-sky-400">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

function FootballAICore() {
  return (
    <div className="relative hidden min-h-[700px] items-center justify-center lg:flex">
      <div className="absolute h-[520px] w-[520px] rounded-full bg-sky-500/10 blur-3xl" />
      <div className="absolute h-[420px] w-[420px] rounded-full bg-fuchsia-500/10 blur-3xl" />

      <div className="relative w-full max-w-md rounded-[40px] border border-white/10 bg-white/[0.06] p-8 shadow-[0_0_100px_rgba(56,189,248,0.18)] backdrop-blur-2xl">
        <div className="absolute -right-8 top-12 flex h-20 w-20 items-center justify-center rounded-full border border-sky-400/30 bg-[#020617]/80 text-3xl shadow-[0_0_35px_rgba(56,189,248,0.25)]">
          ⚽
        </div>

        <div className="relative flex h-[260px] items-center justify-center">
          <div className="absolute h-60 w-60 rounded-full border border-sky-400/30 shadow-[0_0_35px_rgba(56,189,248,0.15)]" />
          <div className="absolute h-48 w-48 rounded-full border border-fuchsia-400/30 shadow-[0_0_35px_rgba(217,70,239,0.15)]" />
          <div className="absolute h-36 w-36 rounded-full bg-gradient-to-r from-sky-500 to-fuchsia-500 opacity-25 blur-2xl" />

          <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-white/10 bg-[#030712] text-6xl shadow-[0_0_50px_rgba(99,102,241,0.45)]">
            ⚽
          </div>

          <div className="absolute left-6 top-16 h-3 w-3 rounded-full bg-sky-400 shadow-[0_0_16px_rgba(56,189,248,1)]" />
          <div className="absolute right-10 top-24 h-3 w-3 rounded-full bg-fuchsia-400 shadow-[0_0_16px_rgba(236,72,153,1)]" />
          <div className="absolute bottom-16 left-16 h-3 w-3 rounded-full bg-violet-400 shadow-[0_0_16px_rgba(167,139,250,1)]" />
        </div>

        <div className="text-center">
          <p className="text-sm font-black tracking-[0.25em] text-sky-400">
            MATCHMIND CORE
          </p>

          <h2 className="mt-3 text-5xl font-black tracking-tight">
            Football AI
          </h2>

          <p className="mt-4 text-lg leading-relaxed text-slate-300">
            A live football intelligence engine for tactics, momentum,
            predictions, and fan-friendly explanations.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <StatCard label="Possession" value="64%" />
          <StatCard label="Confidence" value="87%" />
          <StatCard label="xG" value="2.1" />
          <StatCard label="Momentum" value="High" />
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-1 text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-fuchsia-400">
        {value}
      </p>
    </div>
  );
}

function Input({ label, type, placeholder, value, onChange }) {
  return (
    <div>
      <label className="mb-2 block font-bold text-slate-200">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded-2xl border border-white/10 bg-[#030712] px-5 py-4 text-white outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-400/10"
      />
    </div>
  );
}

function Background() {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(14,165,233,0.24),transparent_35%),radial-gradient(circle_at_85%_30%,rgba(217,70,239,0.24),transparent_35%),radial-gradient(circle_at_50%_90%,rgba(99,102,241,0.16),transparent_35%)]" />
      <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:64px_64px]" />
    </>
  );
}