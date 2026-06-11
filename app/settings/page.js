"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getCurrentUser, logoutUser } from "../lib/auth";

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  function handleLogout() {
    logoutUser();
    router.push("/signin");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      <Background />

      <section className="relative z-10 mx-auto max-w-7xl px-8 py-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Link
              href="/"
              className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-violet-400 to-fuchsia-400"
            >
              MatchMind AI
            </Link>

            <p className="mt-10 font-black text-sky-400">Account Settings</p>
            <h1 className="mt-3 text-6xl font-black tracking-tight">
              Security & Profile
            </h1>
            <p className="mt-4 max-w-3xl text-xl leading-relaxed text-slate-300">
              Manage your MatchMind AI account, security status, and workspace
              access.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/dashboard"
              className="rounded-2xl border border-white/10 bg-white/[0.06] px-6 py-4 font-black transition hover:bg-white/[0.1]"
            >
              Dashboard
            </Link>

            <button
              onClick={handleLogout}
              className="rounded-2xl border border-red-400/30 bg-red-500/10 px-6 py-4 font-black text-red-300 transition hover:bg-red-500/20"
            >
              Logout
            </button>
          </div>
        </div>

        <section className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <InfoCard
            label="Full Name"
            value={user?.name || "MatchMind User"}
            note="Profile identity"
          />
          <InfoCard
            label="Email"
            value={user?.email || "user@example.com"}
            note="Login email"
          />
          <InfoCard
            label="Account Status"
            value="Active"
            note="Workspace enabled"
          />
        </section>

        <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Panel title="Security System" tag="Protected">
            <SecurityItem title="Route protection" value="Enabled" />
            <SecurityItem title="Dashboard access" value="Login required" />
            <SecurityItem title="Analysis access" value="Login required" />
            <SecurityItem title="Assistant access" value="Login required" />
            <SecurityItem title="History access" value="Login required" />
          </Panel>

          <Panel title="Account Details" tag="User">
            <SecurityItem
              title="User ID"
              value={user?.id || "Not available"}
            />
            <SecurityItem
              title="Created At"
              value={
                user?.createdAt
                  ? new Date(user.createdAt).toLocaleString()
                  : "Not available"
              }
            />
            <SecurityItem title="Session" value="Active" />
            <SecurityItem title="Auth Type" value="Local test auth" />
            <SecurityItem title="Next Upgrade" value="Database auth" />
          </Panel>
        </section>

        <section className="mt-8 rounded-[34px] border border-white/10 bg-white/[0.06] p-8 backdrop-blur-2xl">
          <p className="font-black text-sky-400">NEXT SECURITY UPGRADE</p>
          <h2 className="mt-3 text-4xl font-black">
            Move from localStorage to database authentication
          </h2>
          <p className="mt-4 max-w-4xl text-lg leading-relaxed text-slate-300">
            Current auth is good for frontend testing. Next phase will connect
            signup/login to a real database so users, history, reports, and
            account data are permanently saved.
          </p>
        </section>
      </section>
    </main>
  );
}

function InfoCard({ label, value, note }) {
  return (
    <div className="rounded-[30px] border border-white/10 bg-white/[0.06] p-7 backdrop-blur-xl">
      <p className="text-slate-400">{label}</p>
      <p className="mt-3 break-all text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-fuchsia-400">
        {value}
      </p>
      <p className="mt-3 text-sm text-slate-400">{note}</p>
    </div>
  );
}

function Panel({ title, tag, children }) {
  return (
    <div className="rounded-[34px] border border-white/10 bg-white/[0.06] p-8 backdrop-blur-2xl">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-3xl font-black">{title}</h2>
        <span className="rounded-full bg-gradient-to-r from-blue-600 to-fuchsia-500 px-4 py-2 text-sm font-black">
          {tag}
        </span>
      </div>

      <div className="mt-7 space-y-4">{children}</div>
    </div>
  );
}

function SecurityItem({ title, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#030712]/80 p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-bold text-slate-300">{title}</p>
        <p className="font-black text-sky-300">{value}</p>
      </div>
    </div>
  );
}

function Background() {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(14,165,233,0.22),transparent_35%),radial-gradient(circle_at_85%_25%,rgba(217,70,239,0.2),transparent_35%),radial-gradient(circle_at_50%_90%,rgba(99,102,241,0.12),transparent_35%)]" />
      <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:64px_64px]" />
    </>
  );
}