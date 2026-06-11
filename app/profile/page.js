"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const PROFILE_KEY = "matchmind-user-profile";
const COMMUNITY_KEY = "matchmind-community-posts";
const FOLLOW_KEY = "matchmind-following-users";

const teams = [
  "Brazil",
  "Argentina",
  "France",
  "England",
  "Spain",
  "Germany",
  "Portugal",
  "Netherlands",
];

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    username: "Zaid",
    favoriteTeam: "Brazil",
    country: "India",
    bio: "Football fan, match predictor, and MatchMind community member.",
  });

  const [posts, setPosts] = useState([]);
  const [following, setFollowing] = useState([]);
  const [activeTab, setActiveTab] = useState("Posts");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem(PROFILE_KEY);
    const savedPosts = localStorage.getItem(COMMUNITY_KEY);
    const savedFollowing = localStorage.getItem(FOLLOW_KEY);

    if (savedProfile) setProfile(JSON.parse(savedProfile));
    if (savedPosts) setPosts(JSON.parse(savedPosts));
    if (savedFollowing) setFollowing(JSON.parse(savedFollowing));
  }, []);

  const myPosts = useMemo(() => {
    return posts.filter(
      (post) =>
        (post.name || "").toLowerCase() ===
        (profile.username || "").toLowerCase()
    );
  }, [posts, profile.username]);

  const savedPosts = useMemo(() => {
    return posts.filter((post) => post.saved);
  }, [posts]);

  const myReels = useMemo(() => {
    return myPosts.filter((post) => post.type === "reel");
  }, [myPosts]);

  function saveProfile(e) {
    e.preventDefault();
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      <Background />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-8">
        <header className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <Link
              href="/dashboard"
              className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-violet-400 to-fuchsia-400"
            >
              MatchMind AI
            </Link>

            <p className="mt-5 font-black text-sky-400">
              Instagram-style Fan Profile
            </p>

            <h1 className="mt-3 text-6xl font-black tracking-tight md:text-7xl">
              Your football identity
            </h1>

            <p className="mt-4 max-w-4xl text-xl leading-relaxed text-slate-300">
              Your posts, image moments, reels, saved football content, and following.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/dashboard" className="nav-btn">
              Dashboard
            </Link>

            <Link href="/community" className="nav-btn">
              Community
            </Link>

            <Link href="/messages" className="nav-btn">
              Messages
            </Link>

            <Link href="/analysis" className="nav-main">
              Analysis
            </Link>
          </div>
        </header>

        <section className="mt-10 grid grid-cols-1 gap-8 xl:grid-cols-[420px_1fr]">
          <aside className="space-y-6">
            <form onSubmit={saveProfile} className="glass p-7">
              <p className="font-black text-sky-300">Edit Profile</p>

              <div className="mt-6 space-y-5">
                <Field label="Username">
                  <input
                    value={profile.username}
                    onChange={(e) =>
                      setProfile({ ...profile, username: e.target.value })
                    }
                    className="input"
                  />
                </Field>

                <Field label="Favorite Team">
                  <select
                    value={profile.favoriteTeam}
                    onChange={(e) =>
                      setProfile({ ...profile, favoriteTeam: e.target.value })
                    }
                    className="input"
                  >
                    {teams.map((team) => (
                      <option key={team} value={team}>
                        {team}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Country">
                  <input
                    value={profile.country}
                    onChange={(e) =>
                      setProfile({ ...profile, country: e.target.value })
                    }
                    className="input"
                  />
                </Field>

                <Field label="Fan Bio">
                  <textarea
                    value={profile.bio}
                    onChange={(e) =>
                      setProfile({ ...profile, bio: e.target.value })
                    }
                    className="input min-h-32"
                  />
                </Field>
              </div>

              <button className="mt-7 rounded-2xl bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-500 px-7 py-4 font-black">
                Save Profile
              </button>

              {saved && (
                <p className="mt-4 font-black text-emerald-300">
                  Profile saved successfully ✅
                </p>
              )}
            </form>

            <div className="glass p-7">
              <p className="font-black text-sky-300">Following Fans</p>

              <div className="mt-5 space-y-3">
                {following.length === 0 ? (
                  <p className="rounded-2xl border border-white/10 bg-[#030712]/80 p-5 text-slate-400">
                    No following yet. Follow fans from Community.
                  </p>
                ) : (
                  following.map((user) => (
                    <div
                      key={user}
                      className="rounded-2xl border border-white/10 bg-[#030712]/80 p-5"
                    >
                      <p className="font-black">{user}</p>
                      <p className="mt-1 text-sm text-emerald-300">
                        ✅ Following
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="glass p-7">
              <p className="font-black text-sky-300">Fan Level</p>

              <div className="mt-5 rounded-2xl border border-white/10 bg-[#030712]/80 p-5">
                <p className="text-slate-400">Current Rank</p>
                <p className="mt-2 text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-fuchsia-400">
                  Rising Fan
                </p>

                <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-sky-400 to-fuchsia-500"
                    style={{ width: "64%" }}
                  />
                </div>

                <p className="mt-3 text-sm text-slate-400">
                  64 XP away from Elite Fan
                </p>
              </div>
            </div>
          </aside>

          <section className="space-y-6">
            <div className="glass p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-center">
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-fuchsia-500 text-5xl font-black">
                  {profile.username?.slice(0, 1).toUpperCase() || "U"}
                </div>

                <div className="flex-1">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h2 className="text-4xl font-black">
                        {profile.username || "User"}
                      </h2>

                      <p className="mt-2 font-black text-sky-300">
                        ⚽ {profile.favoriteTeam} Fan • 🌍 {profile.country}
                      </p>
                    </div>

                    <Link href="/community" className="nav-btn text-center">
                      View Community
                    </Link>
                  </div>

                  <p className="mt-5 max-w-3xl leading-relaxed text-slate-300">
                    {profile.bio}
                  </p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-5">
                <Stat title="Posts" value={myPosts.length} />
                <Stat title="Reels" value={myReels.length} />
                <Stat title="Saved" value={savedPosts.length} />
                <Stat title="Followers" value={128 + myPosts.length * 3} />
                <Stat title="Following" value={following.length} />
              </div>
            </div>

            <div className="glass p-6">
              <div className="grid grid-cols-3 gap-3">
                {["Posts", "Reels", "Saved"].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-2xl px-5 py-4 font-black transition ${
                      activeTab === tab
                        ? "bg-gradient-to-r from-blue-600 to-fuchsia-500"
                        : "border border-white/10 bg-[#030712]/80 hover:bg-white/[0.06]"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="mt-6">
                {activeTab === "Posts" && (
                  <PostGallery
                    items={myPosts}
                    emptyText="No posts yet. Create a post from Community page."
                  />
                )}

                {activeTab === "Reels" && (
                  <PostGallery
                    items={myReels}
                    emptyText="No reels yet. Upload a reel from Community page."
                  />
                )}

                {activeTab === "Saved" && (
                  <PostGallery
                    items={savedPosts}
                    emptyText="No saved posts yet. Save posts from Community page."
                  />
                )}
              </div>
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

        .input {
          margin-top: 0.75rem;
          width: 100%;
          border-radius: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: #030712;
          padding: 1rem 1.25rem;
          color: white;
          outline: none;
        }

        .input:focus {
          border-color: rgb(56, 189, 248);
        }

        .nav-btn {
          border-radius: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.06);
          padding: 1rem 1.25rem;
          font-weight: 900;
        }

        .nav-main {
          border-radius: 1rem;
          background: linear-gradient(to right, #2563eb, #7c3aed, #d946ef);
          padding: 1rem 1.25rem;
          font-weight: 900;
        }
      `}</style>
    </main>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="font-black text-slate-200">{label}</label>
      {children}
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#030712]/80 p-5 text-center">
      <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-fuchsia-400">
        {value}
      </p>
      <p className="mt-1 text-sm font-bold text-slate-400">{title}</p>
    </div>
  );
}

function PostGallery({ items, emptyText }) {
  if (!items || items.length === 0) {
    return (
      <div className="rounded-[30px] border border-white/10 bg-[#030712]/80 p-10 text-center">
        <p className="text-xl font-black text-slate-300">{emptyText}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {items.map((post) => (
        <div
          key={post.id}
          className="overflow-hidden rounded-[28px] border border-white/10 bg-[#030712]/80"
        >
          {post.type === "image" && post.imageUrl && (
            <div className="relative h-64">
              <img
                src={post.imageUrl}
                alt={post.text || "post"}
                className="h-full w-full object-cover"
              />
              <Overlay post={post} />
            </div>
          )}

          {post.type === "reel" && post.videoUrl && (
            <div className="relative h-64">
              <video
                src={post.videoUrl}
                className="h-full w-full object-cover"
                muted
              />
              <Overlay post={post} label="🎬 Reel" />
            </div>
          )}

          {post.type === "text" && (
            <div className="min-h-64 p-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-r from-blue-600/40 to-fuchsia-500/40 text-3xl">
                📝
              </div>

              <p className="mt-5 line-clamp-6 text-xl font-black text-slate-100">
                {post.text}
              </p>

              <p className="mt-5 text-sm text-sky-300">
                ❤️ {post.likes} • 💬 {post.comments}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function Overlay({ post, label }) {
  return (
    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-black/10 to-transparent p-4">
      <div>
        {label && <p className="mb-2 text-sm font-black text-sky-300">{label}</p>}
        <p className="line-clamp-2 font-black">{post.text}</p>
        <p className="mt-2 text-sm text-sky-300">
          ❤️ {post.likes} • 💬 {post.comments}
        </p>
      </div>
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