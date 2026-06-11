"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const PROFILE_KEY = "matchmind-user-profile";

const demoUsers = [
  {
    id: "ayan",
    name: "Ayan",
    team: "France",
    country: "India",
    lastMessage: "France attack is too dangerous 🔥",
  },
  {
    id: "sara",
    name: "Sara",
    team: "Portugal",
    country: "India",
    lastMessage: "Portugal finishing is underrated.",
  },
  {
    id: "zaid",
    name: "Zaid",
    team: "Brazil",
    country: "India",
    lastMessage: "Brazil can surprise Argentina.",
  },
];

export default function MessagesPage() {
  const [profile, setProfile] = useState({
    username: "Zaid",
    favoriteTeam: "Brazil",
    country: "India",
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem(PROFILE_KEY);

    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      <Background />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-8">
        <header className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <Link
              href="/dashboard"
              className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-violet-400 to-fuchsia-400"
            >
              MatchMind AI
            </Link>

            <p className="mt-5 font-black text-sky-400">Fan Messages</p>

            <h1 className="mt-3 text-6xl font-black tracking-tight md:text-7xl">
              Direct messages
            </h1>

            <p className="mt-4 max-w-4xl text-xl leading-relaxed text-slate-300">
              Chat privately with football fans and community members.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/community" className="nav-btn">
              Community
            </Link>

            <Link href="/profile" className="nav-btn">
              Profile
            </Link>
          </div>
        </header>

        <section className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[360px_1fr]">
          <aside className="glass p-6">
            <p className="text-2xl font-black text-sky-300">Your Identity</p>

            <div className="mt-5 rounded-2xl border border-white/10 bg-[#030712]/80 p-5">
              <p className="text-2xl font-black">{profile.username}</p>
              <p className="mt-2 font-black text-sky-300">
                ⚽ {profile.favoriteTeam} Fan
              </p>
              <p className="mt-1 text-slate-400">🌍 {profile.country}</p>
            </div>
          </aside>

          <section className="glass p-6">
            <p className="text-2xl font-black text-sky-300">Inbox</p>

            <div className="mt-6 space-y-4">
              {demoUsers.map((user) => (
                <Link
                  key={user.id}
                  href={`/messages/${user.id}`}
                  className="block rounded-[26px] border border-white/10 bg-[#030712]/80 p-5 transition hover:bg-white/[0.06]"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-fuchsia-500 text-2xl font-black">
                      {user.name.slice(0, 1)}
                    </div>

                    <div className="flex-1">
                      <p className="text-xl font-black">{user.name}</p>
                      <p className="mt-1 text-sm font-bold text-sky-300">
                        ⚽ {user.team} Fan • 🌍 {user.country}
                      </p>
                      <p className="mt-2 text-slate-400">{user.lastMessage}</p>
                    </div>

                    <span className="rounded-full bg-white/[0.06] px-4 py-2 text-sm text-slate-300">
                      Open
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </section>
      </div>

      <style jsx global>{`
        .glass {
          border-radius: 34px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(24px);
        }
        .nav-btn {
          border-radius: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.06);
          padding: 1rem 1.25rem;
          font-weight: 900;
        }
      `}</style>
    </main>
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