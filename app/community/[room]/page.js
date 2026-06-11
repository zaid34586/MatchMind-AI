"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

const PROFILE_KEY = "matchmind-user-profile";

const defaultProfile = {
  username: "Zaid",
  favoriteTeam: "Brazil",
  country: "India",
};

const roomInfo = {
  "brazil-argentina": {
    title: "Brazil vs Argentina",
    tag: "Hot Rivalry",
    fans: 245,
    defaultMessages: [
      {
        name: "Zaid",
        badge: "🇧🇷 Brazil Fan",
        country: "India",
        text: "Brazil counter attack can hurt Argentina 🔥",
      },
      {
        name: "Ayan",
        badge: "🇦🇷 Argentina Fan",
        country: "India",
        text: "Argentina midfield control will decide the match.",
      },
    ],
  },
  "france-england": {
    title: "France vs England",
    tag: "Tactical Battle",
    fans: 188,
    defaultMessages: [
      {
        name: "Ayan",
        badge: "🇫🇷 France Fan",
        country: "India",
        text: "Mbappe pace is the biggest threat.",
      },
      {
        name: "Sara",
        badge: "🏴 England Fan",
        country: "India",
        text: "England set pieces can change everything.",
      },
    ],
  },
  "spain-portugal": {
    title: "Spain vs Portugal",
    tag: "Iberian Derby",
    fans: 164,
    defaultMessages: [
      {
        name: "Sara",
        badge: "🇵🇹 Portugal Fan",
        country: "India",
        text: "Portugal finishing looks stronger.",
      },
      {
        name: "Zaid",
        badge: "🇪🇸 Spain Fan",
        country: "India",
        text: "Spain possession can slow the game down.",
      },
    ],
  },
};

const teamEmojis = {
  Brazil: "🇧🇷",
  Argentina: "🇦🇷",
  France: "🇫🇷",
  England: "🏴",
  Spain: "🇪🇸",
  Germany: "🇩🇪",
  Portugal: "🇵🇹",
  Netherlands: "🇳🇱",
};

export default function RoomPage() {
  const params = useParams();
  const roomSlug = params.room;
  const room = roomInfo[roomSlug] || roomInfo["brazil-argentina"];

  const storageKey = useMemo(() => `matchmind-room-${roomSlug}`, [roomSlug]);

  const [profile, setProfile] = useState(defaultProfile);
  const [messages, setMessages] = useState(room.defaultMessages);
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

  function getFanBadge(team) {
    return `${teamEmojis[team] || "⚽"} ${team} Fan`;
  }

  function sendMessage(e) {
    e.preventDefault();

    if (!messageText.trim()) return;

    const newMessage = {
      id: Date.now(),
      name: profile.username || "You",
      badge: getFanBadge(profile.favoriteTeam || "Brazil"),
      country: profile.country || "India",
      text: messageText,
    };

    setMessages([...messages, newMessage]);
    setMessageText("");
  }

  function resetRoom() {
    localStorage.removeItem(storageKey);
    setMessages(room.defaultMessages);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      <Background />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-8">
        <header className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <Link
              href="/community"
              className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-violet-400 to-fuchsia-400"
            >
              MatchMind Community
            </Link>

            <p className="mt-5 font-black text-sky-400">Live Match Room</p>

            <h1 className="mt-3 text-6xl font-black tracking-tight md:text-7xl">
              {room.title}
            </h1>

            <p className="mt-4 max-w-4xl text-xl leading-relaxed text-slate-300">
              {room.fans} fans discussing • {room.tag}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/community"
              className="rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 font-black transition hover:bg-white/[0.1]"
            >
              Back
            </Link>

            <Link
              href="/profile"
              className="rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 font-black transition hover:bg-white/[0.1]"
            >
              Profile
            </Link>

            <Link
              href="/analysis"
              className="rounded-2xl bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-500 px-5 py-4 font-black shadow-[0_0_35px_rgba(99,102,241,0.35)] transition hover:scale-[1.03]"
            >
              Analyze Match
            </Link>
          </div>
        </header>

        <section className="mt-10 grid grid-cols-1 gap-8 xl:grid-cols-[1fr_360px]">
          <div className="rounded-[34px] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-2xl">
            <p className="font-black text-sky-300">Fan Room Chat</p>

            <div className="mt-6 max-h-[620px] space-y-4 overflow-y-auto pr-2">
              {messages.map((message, index) => (
                <div
                  key={message.id || index}
                  className="rounded-[24px] border border-white/10 bg-[#030712]/80 p-5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xl font-black">{message.name}</p>
                      <p className="mt-1 text-sm font-bold text-sky-300">
                        {message.badge}{" "}
                        {message.country ? `• 🌍 ${message.country}` : ""}
                      </p>
                    </div>

                    <span className="rounded-full bg-white/[0.06] px-4 py-2 text-sm text-slate-300">
                      Live
                    </span>
                  </div>

                  <p className="mt-4 text-lg leading-relaxed text-slate-200">
                    {message.text}
                  </p>
                </div>
              ))}
            </div>

            <form onSubmit={sendMessage} className="mt-6">
              <div className="rounded-2xl border border-white/10 bg-[#030712]/80 p-4">
                <p className="font-black">{profile.username}</p>
                <p className="text-sm font-bold text-sky-300">
                  {getFanBadge(profile.favoriteTeam)} • 🌍 {profile.country}
                </p>
              </div>

              <div className="mt-4 flex gap-3">
                <input
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Write your match message..."
                  className="flex-1 rounded-2xl border border-white/10 bg-[#030712] px-5 py-4 text-white outline-none focus:border-sky-400"
                />

                <button className="rounded-2xl bg-gradient-to-r from-blue-600 to-fuchsia-500 px-7 py-4 font-black">
                  Send
                </button>
              </div>
            </form>
          </div>

          <aside className="space-y-6">
            <Card title="Your Room Identity">
              <div className="rounded-2xl border border-white/10 bg-[#030712]/80 p-5">
                <p className="text-2xl font-black">{profile.username}</p>
                <p className="mt-2 font-black text-sky-300">
                  {getFanBadge(profile.favoriteTeam)}
                </p>
                <p className="mt-1 text-slate-400">🌍 {profile.country}</p>

                <Link
                  href="/profile"
                  className="mt-4 block rounded-xl bg-white/[0.06] px-4 py-3 text-center font-black hover:bg-white/[0.1]"
                >
                  Edit Profile
                </Link>
              </div>
            </Card>

            <Card title="Room Status">
              <div className="space-y-3">
                <Info title="Match" value={room.title} />
                <Info title="Room Type" value={room.tag} />
                <Info title="Fans Online" value={room.fans} />
                <Info title="Messages" value={messages.length} />
              </div>
            </Card>

            
          </aside>
        </section>
      </div>
    </main>
  );
}

function Info({ title, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#030712]/80 p-4">
      <p className="text-sm text-slate-400">{title}</p>
      <p className="mt-1 font-black text-sky-300">{value}</p>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="rounded-[34px] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-2xl">
      <p className="mb-5 text-2xl font-black text-sky-300">{title}</p>
      {children}
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