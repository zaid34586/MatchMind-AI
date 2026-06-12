"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

const PROFILE_KEY = "matchmind-user-profile";

const users = {
  ayan: {
    id: "ayan",
    name: "Ayan",
    team: "France",
    country: "India",
    messages: [
      { from: "Ayan", text: "France attack is too dangerous 🔥" },
      { from: "You", text: "Yes, Mbappe can change the match anytime." },
    ],
  },
  sara: {
    id: "sara",
    name: "Sara",
    team: "Portugal",
    country: "India",
    messages: [
      { from: "Sara", text: "Portugal finishing is underrated." },
      { from: "You", text: "Yes, Ronaldo and Leao can create big moments." },
    ],
  },
  
};

export default function DirectMessagePage() {
  const params = useParams();
  const userId = params.id;
  const user = users[userId] || users.ayan;

  const storageKey = useMemo(() => `matchmind-dm-${user.id}`, [user.id]);

  const [profile, setProfile] = useState({
    username: "MatchMind User",
    favoriteTeam: "Brazil",
    country: "India",
  });

  const [messages, setMessages] = useState(user.messages);
  const [messageText, setMessageText] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem(PROFILE_KEY);
    const savedMessages = localStorage.getItem(storageKey);

    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }

    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }

    setLoaded(true);
  }, [storageKey]);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(storageKey, JSON.stringify(messages));
    }
  }, [messages, loaded, storageKey]);

  function sendMessage(e) {
    e.preventDefault();

    if (!messageText.trim()) return;

    const newMessage = {
      id: Date.now(),
      from: profile.username || "You",
      text: messageText,
    };

    setMessages([...messages, newMessage]);
    setMessageText("");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      <Background />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-8">
        <header className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <Link
              href="/messages"
              className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-violet-400 to-fuchsia-400"
            >
              MatchMind Messages
            </Link>

            <p className="mt-5 font-black text-sky-400">Private Chat</p>

            <h1 className="mt-3 text-6xl font-black tracking-tight md:text-7xl">
              {user.name}
            </h1>

            <p className="mt-4 text-xl text-slate-300">
              ⚽ {user.team} Fan • 🌍 {user.country}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/messages" className="nav-btn">
              Inbox
            </Link>

            <Link href="/community" className="nav-btn">
              Community
            </Link>
          </div>
        </header>

        <section className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
          <div className="glass p-6">
            <p className="text-2xl font-black text-sky-300">Chat</p>

            <div className="mt-6 max-h-[580px] space-y-4 overflow-y-auto pr-2">
              {messages.map((message, index) => {
                const isMe =
                  message.from === "You" || message.from === profile.username;

                return (
                  <div
                    key={message.id || index}
                    className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[78%] rounded-[24px] border border-white/10 p-5 ${
                        isMe
                          ? "bg-gradient-to-r from-blue-600/70 to-fuchsia-500/70"
                          : "bg-[#030712]/80"
                      }`}
                    >
                      <p className="text-sm font-black text-sky-200">
                        {isMe ? profile.username : user.name}
                      </p>

                      <p className="mt-2 text-lg leading-relaxed">
                        {message.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <form onSubmit={sendMessage} className="mt-6 flex gap-3">
              <input
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder={`Message ${user.name}...`}
                className="flex-1 rounded-2xl border border-white/10 bg-[#030712] px-5 py-4 text-white outline-none focus:border-sky-400"
              />

              <button className="rounded-2xl bg-gradient-to-r from-blue-600 to-fuchsia-500 px-7 py-4 font-black">
                Send
              </button>
            </form>
          </div>

          <aside className="space-y-6">
            <div className="glass p-6">
              <p className="text-2xl font-black text-sky-300">Chat With</p>

              <div className="mt-5 rounded-2xl border border-white/10 bg-[#030712]/80 p-5">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-fuchsia-500 text-3xl font-black">
                  {user.name.slice(0, 1)}
                </div>

                <p className="mt-4 text-2xl font-black">{user.name}</p>
                <p className="mt-2 font-black text-sky-300">
                  ⚽ {user.team} Fan
                </p>
                <p className="mt-1 text-slate-400">🌍 {user.country}</p>
              </div>
            </div>

            <div className="glass p-6">
              <p className="text-2xl font-black text-sky-300">You</p>

              <div className="mt-5 rounded-2xl border border-white/10 bg-[#030712]/80 p-5">
                <p className="text-2xl font-black">{profile.username}</p>
                <p className="mt-2 font-black text-sky-300">
                  ⚽ {profile.favoriteTeam} Fan
                </p>
                <p className="mt-1 text-slate-400">🌍 {profile.country}</p>
              </div>
            </div>
          </aside>
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