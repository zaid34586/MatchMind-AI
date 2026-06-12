"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCurrentUser } from "../lib/auth";

const PROFILE_KEY = "matchmind-user-profile";
const STORAGE_KEY = "matchmind-community-posts";
const FOLLOW_KEY = "matchmind-following-users";

const defaultProfile = {
  username: "MatchMind User",
  favoriteTeam: "Brazil",
  country: "India",
};

const defaultPosts = [
  {
    id: 2,
    name: "Ayan",
    badge: "🇫🇷 France Fan",
    country: "India",
    type: "image",
    imageUrl:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "",
    text: "France attack is too dangerous. Mbappe can change the match in 5 minutes.",
    likes: 24,
    comments: 1,
    saved: false,
    liked: false,
    commentList: ["France pace sabse bada weapon hai."],
  },
  {
    id: 3,
    name: "Sara",
    badge: "🇵🇹 Portugal Fan",
    country: "India",
    type: "text",
    imageUrl: "",
    videoUrl: "",
    text: "Portugal finishing is underrated. If they control transitions, they can win.",
    likes: 15,
    comments: 1,
    saved: false,
    liked: false,
    commentList: ["Portugal wide creators strong hain."],
  },
];

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

const rooms = [
  {
    match: "Brazil vs Argentina",
    fans: 245,
    tag: "Hot Rivalry",
    slug: "brazil-argentina",
  },
  {
    match: "France vs England",
    fans: 188,
    tag: "Tactical Battle",
    slug: "france-england",
  },
  {
    match: "Spain vs Portugal",
    fans: 164,
    tag: "Iberian Derby",
    slug: "spain-portugal",
  },
];

export default function CommunityPage() {
  const [posts, setPosts] = useState(defaultPosts);
  const [profile, setProfile] = useState(defaultProfile);
  const [following, setFollowing] = useState([]);
  const [postText, setPostText] = useState("");
  const [imageData, setImageData] = useState("");
  const [videoData, setVideoData] = useState("");
  const [postType, setPostType] = useState("text");
  const [selectedTeam, setSelectedTeam] = useState("Brazil");
  const [commentText, setCommentText] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const currentUser = getCurrentUser();
    const savedProfile = localStorage.getItem(PROFILE_KEY);
    const savedPosts = localStorage.getItem(STORAGE_KEY);
    const savedFollowing = localStorage.getItem(FOLLOW_KEY);

    const currentUserProfile = currentUser
      ? {
          username:
            currentUser.name ||
            currentUser.email?.split("@")[0] ||
            "MatchMind User",
          favoriteTeam: currentUser.favoriteTeam || "Brazil",
          country: currentUser.country || "India",
        }
      : null;

    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile);

      if (
        currentUserProfile &&
        (!parsedProfile.username ||
          parsedProfile.username === "MatchMind User" ||
          parsedProfile.username === "Zaid")
      ) {
        localStorage.setItem(PROFILE_KEY, JSON.stringify(currentUserProfile));
        setProfile(currentUserProfile);
        setSelectedTeam(currentUserProfile.favoriteTeam || "Brazil");
      } else {
        setProfile(parsedProfile);
        setSelectedTeam(parsedProfile.favoriteTeam || "Brazil");
      }
    } else if (currentUserProfile) {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(currentUserProfile));
      setProfile(currentUserProfile);
      setSelectedTeam(currentUserProfile.favoriteTeam || "Brazil");
    }

    if (savedPosts) {
      const parsedPosts = JSON.parse(savedPosts);
      const cleanedPosts = parsedPosts.filter(
        (post) => String(post.name || "").toLowerCase() !== "zaid"
      );
      setPosts(cleanedPosts);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanedPosts));
    }

    if (savedFollowing) {
      setFollowing(JSON.parse(savedFollowing));
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      const safePosts = posts.map((post) => ({
        ...post,
        imageUrl: post.imageUrl?.startsWith("data:") ? "" : post.imageUrl,
        videoUrl: post.videoUrl?.startsWith("data:") ? "" : post.videoUrl,
      }));

      localStorage.setItem(STORAGE_KEY, JSON.stringify(safePosts));
      localStorage.setItem(FOLLOW_KEY, JSON.stringify(following));
    }
  }, [posts, following, loaded]);

  function cleanName(name) {
    return String(name || "").trim().toLowerCase();
  }

  function isOwnPost(name) {
    return cleanName(name) === cleanName(profile.username);
  }

  function isFollowingUser(name) {
    return following.some((user) => cleanName(user) === cleanName(name));
  }

  function toggleFollow(name) {
    if (!name || isOwnPost(name)) return;

    if (isFollowingUser(name)) {
      setFollowing(following.filter((user) => cleanName(user) !== cleanName(name)));
    } else {
      setFollowing([...following, name]);
    }
  }

  function getMessageSlug(name) {
    const clean = cleanName(name).replace(/\s+/g, "-");

    if (clean.includes("ayan")) return "ayan";
    if (clean.includes("sara")) return "sara";

    return clean || "fan";
  }

  function handleImageSelect(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImageData(reader.result);
    reader.readAsDataURL(file);
  }

  function handleVideoSelect(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSizeMB = 12;
    const fileSizeMB = file.size / (1024 * 1024);

    if (fileSizeMB > maxSizeMB) {
      alert("Video is too large. Please select a short reel under 12MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setVideoData(reader.result);
    reader.readAsDataURL(file);
  }

  function createPost(e) {
    e.preventDefault();

    if (!postText.trim()) return;
    if (postType === "image" && !imageData) return;
    if (postType === "reel" && !videoData) return;

    const team = profile.favoriteTeam || selectedTeam;

    const newPost = {
      id: Date.now(),
      name: profile.username || "You",
      badge: `⚽ ${team} Fan`,
      country: profile.country || "India",
      type: postType,
      imageUrl: postType === "image" ? imageData : "",
      videoUrl: postType === "reel" ? videoData : "",
      text: postText,
      likes: 0,
      comments: 0,
      saved: false,
      liked: false,
      commentList: [],
    };

    setPosts([newPost, ...posts]);
    setPostText("");
    setImageData("");
    setVideoData("");
    setPostType("text");
  }

  function likePost(id) {
    setPosts(
      posts.map((post) => {
        if (post.id !== id) return post;

        const liked = post.liked || false;

        return {
          ...post,
          liked: !liked,
          likes: liked ? Math.max(0, post.likes - 1) : post.likes + 1,
        };
      })
    );
  }

  function savePost(id) {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, saved: !post.saved } : post
      )
    );
  }

  async function sharePost(post) {
    const text = `${post.name}: ${post.text}`;
    const url = `${window.location.origin}/community`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "MatchMind AI Fan Post",
          text,
          url,
        });
        return;
      }

      await navigator.clipboard.writeText(`${text}\n${url}`);
      alert("Post link copied.");
    } catch {
      alert("Share failed.");
    }
  }

  function addComment(id) {
    const text = commentText[id];
    if (!text || !text.trim()) return;

    setPosts(
      posts.map((post) =>
        post.id === id
          ? {
              ...post,
              comments: post.comments + 1,
              commentList: [
                ...(post.commentList || []),
                `${profile.username || "You"}: ${text}`,
              ],
            }
          : post
      )
    );

    setCommentText({ ...commentText, [id]: "" });
  }

  function resetCommunity() {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(FOLLOW_KEY);
    localStorage.removeItem(PROFILE_KEY);

    const currentUser = getCurrentUser();

    const freshProfile = {
      username:
        currentUser?.name ||
        currentUser?.email?.split("@")[0] ||
        "MatchMind User",
      favoriteTeam: currentUser?.favoriteTeam || "Brazil",
      country: currentUser?.country || "India",
    };

    localStorage.setItem(PROFILE_KEY, JSON.stringify(freshProfile));
    setProfile(freshProfile);
    setSelectedTeam(freshProfile.favoriteTeam);
    setPosts(defaultPosts);
    setFollowing([]);
  }

  function selectPostType(type) {
    setPostType(type);
    if (type !== "image") setImageData("");
    if (type !== "reel") setVideoData("");
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

            <p className="mt-5 font-black text-sky-400">Fan Community</p>

            <h1 className="mt-3 text-6xl font-black tracking-tight md:text-7xl">
              Connect with football fans
            </h1>

            <p className="mt-4 max-w-4xl text-xl leading-relaxed text-slate-300">
              Share text posts, image posts, reels, follow fans, and chat with the community.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/dashboard" className="nav-btn">Dashboard</Link>
            <Link href="/messages" className="nav-btn">Messages</Link>
            <Link href="/profile" className="nav-btn">Profile</Link>
            <Link href="/analysis" className="nav-main">Match Analysis</Link>
          </div>
        </header>

        <section className="mt-10 grid grid-cols-1 gap-8 xl:grid-cols-[1fr_380px]">
          <div className="space-y-6">
            <form onSubmit={createPost} className="glass p-6">
              <p className="font-black text-sky-300">Create Fan Post</p>

              <div className="mt-4 rounded-2xl border border-white/10 bg-[#030712]/80 p-4">
                <p className="font-black">{profile.username}</p>
                <p className="text-sm font-bold text-sky-300">
                  ⚽ {profile.favoriteTeam} Fan • 🌍 {profile.country}
                </p>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                {["text", "image", "reel"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => selectPostType(type)}
                    className={`rounded-2xl px-4 py-4 font-black capitalize ${
                      postType === type
                        ? "bg-gradient-to-r from-blue-600 to-fuchsia-500"
                        : "border border-white/10 bg-[#030712]"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <select
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
                className="mt-5 w-full rounded-2xl border border-white/10 bg-[#030712] px-5 py-4 text-white outline-none"
              >
                {teams.map((team) => (
                  <option key={team} value={team}>
                    {team} Fan
                  </option>
                ))}
              </select>

              {postType === "image" && (
                <div className="mt-4 rounded-2xl border border-white/10 bg-[#030712] p-5">
                  <label className="block cursor-pointer rounded-xl bg-white/[0.06] px-5 py-4 text-center font-black hover:bg-white/[0.1]">
                    Choose Image
                    <input type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
                  </label>

                  {imageData && (
                    <img src={imageData} alt="Selected preview" className="mt-4 max-h-[300px] w-full rounded-2xl object-cover" />
                  )}
                </div>
              )}

              {postType === "reel" && (
                <div className="mt-4 rounded-2xl border border-white/10 bg-[#030712] p-5">
                  <label className="block cursor-pointer rounded-xl bg-white/[0.06] px-5 py-4 text-center font-black hover:bg-white/[0.1]">
                    Choose Short Reel Video
                    <input type="file" accept="video/*" onChange={handleVideoSelect} className="hidden" />
                  </label>

                  <p className="mt-3 text-sm text-slate-400">
                    Use a short video under 12MB for browser demo storage.
                  </p>

                  {videoData && (
                    <video src={videoData} controls className="mt-4 max-h-[360px] w-full rounded-2xl border border-white/10 object-cover" />
                  )}
                </div>
              )}

              <textarea
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder={
                  postType === "image"
                    ? "Write image caption..."
                    : postType === "reel"
                    ? "Write reel caption..."
                    : "What's happening in football today?"
                }
                className="mt-4 min-h-32 w-full rounded-2xl border border-white/10 bg-[#030712] px-5 py-4 text-white outline-none focus:border-sky-400"
              />

              <button className="mt-4 rounded-2xl bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-500 px-7 py-4 font-black">
                Post
              </button>
            </form>

            <div className="space-y-5">
              {posts.map((post) => {
                const ownPost = isOwnPost(post.name);
                const followed = isFollowingUser(post.name);

                return (
                  <article key={post.id} className="rounded-[30px] border border-white/10 bg-[#030712]/80 p-6 backdrop-blur-xl">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xl font-black">{post.name}</p>
                        <p className="mt-1 text-sm font-bold text-sky-300">
                          {post.badge} {post.country ? `• 🌍 ${post.country}` : ""}
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <span className="rounded-full bg-white/[0.06] px-4 py-2 text-sm text-slate-300">
                          {post.type === "image"
                            ? "Image Post"
                            : post.type === "reel"
                            ? "Reel Post"
                            : "Fan Post"}
                        </span>

                        {!ownPost && (
                          <button
                            type="button"
                            onClick={() => toggleFollow(post.name)}
                            className={`rounded-full px-5 py-2 text-sm font-black ${
                              followed
                                ? "border border-emerald-400/30 bg-emerald-500/10 text-emerald-300"
                                : "bg-gradient-to-r from-blue-600 to-fuchsia-500 text-white"
                            }`}
                          >
                            {followed ? "Following" : "+ Follow"}
                          </button>
                        )}
                      </div>
                    </div>

                    {post.type === "image" && post.imageUrl && (
                      <img src={post.imageUrl} alt="fan post" className="mt-5 max-h-[420px] w-full rounded-[24px] border border-white/10 object-cover" />
                    )}

                    {post.type === "reel" && post.videoUrl && (
                      <video src={post.videoUrl} controls className="mt-5 max-h-[520px] w-full rounded-[24px] border border-white/10 object-cover" />
                    )}

                    <p className="mt-5 text-lg leading-relaxed text-slate-200">
                      {post.text}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <button type="button" onClick={() => likePost(post.id)} className="action-btn">
                        {post.liked ? "💙" : "❤️"} {post.likes}
                      </button>

                      <button type="button" className="action-btn">
                        💬 {post.comments}
                      </button>

                      <button type="button" onClick={() => savePost(post.id)} className="action-btn">
                        {post.saved ? "🔖 Saved" : "🔖 Save"}
                      </button>

                      {!ownPost && (
                        <button type="button" onClick={() => toggleFollow(post.name)} className="action-btn">
                          {followed ? "✅ Following" : "➕ Follow"}
                        </button>
                      )}

                      <Link href={`/messages/${getMessageSlug(post.name)}`} className="action-btn">
                        💬 Message
                      </Link>

                      <button type="button" onClick={() => sharePost(post)} className="action-btn">
                        🔁 Share
                      </button>
                    </div>

                    <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="font-black text-sky-300">Comments</p>

                      <div className="mt-3 space-y-2">
                        {(post.commentList || []).slice(-3).map((comment, index) => (
                          <div key={index} className="rounded-xl bg-[#030712]/80 px-4 py-3 text-slate-300">
                            {comment}
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 flex gap-3">
                        <input
                          value={commentText[post.id] || ""}
                          onChange={(e) =>
                            setCommentText({
                              ...commentText,
                              [post.id]: e.target.value,
                            })
                          }
                          placeholder="Write a comment..."
                          className="flex-1 rounded-xl border border-white/10 bg-[#030712] px-4 py-3 text-white outline-none focus:border-sky-400"
                        />

                        <button type="button" onClick={() => addComment(post.id)} className="rounded-xl bg-gradient-to-r from-blue-600 to-fuchsia-500 px-5 py-3 font-black">
                          Send
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <aside className="space-y-6">
            <Card title="Your Fan Identity">
              <div className="rounded-2xl border border-white/10 bg-[#030712]/80 p-5">
                <p className="text-2xl font-black">{profile.username}</p>
                <p className="mt-2 font-black text-sky-300">
                  ⚽ {profile.favoriteTeam} Fan
                </p>
                <p className="mt-1 text-slate-400">🌍 {profile.country}</p>

                <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-sm text-slate-400">Following</p>
                  <p className="mt-1 text-2xl font-black text-sky-300">
                    {following.length}
                  </p>
                </div>

                <Link href="/profile" className="mt-4 block rounded-xl bg-white/[0.06] px-4 py-3 text-center font-black hover:bg-white/[0.1]">
                  Edit Profile
                </Link>
              </div>
            </Card>

            <Card title="Following Fans">
              {following.length === 0 ? (
                <p className="text-slate-400">No following yet. Follow fans from posts.</p>
              ) : (
                <div className="space-y-3">
                  {following.map((user) => (
                    <div key={user} className="rounded-2xl border border-white/10 bg-[#030712]/80 p-4">
                      <p className="font-black">{user}</p>
                      <p className="text-sm text-emerald-300">Following</p>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            <Card title="Trending Teams">
              <div className="space-y-3">
                {teams.slice(0, 6).map((team) => (
                  <div key={team} className="rounded-2xl border border-white/10 bg-[#030712]/80 p-4 font-bold">
                    🔥 {team}
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Match Discussion Rooms">
              <div className="space-y-4">
                {rooms.map((room) => (
                  <div key={room.match} className="rounded-2xl border border-white/10 bg-[#030712]/80 p-5">
                    <p className="font-black">{room.match}</p>
                    <p className="mt-2 text-sm text-slate-400">
                      {room.fans} fans discussing
                    </p>
                    <p className="mt-2 text-sky-300">{room.tag}</p>

                    <Link href={`/community/${room.slug}`} className="mt-4 block w-full rounded-xl bg-white/[0.06] px-4 py-3 text-center font-black hover:bg-white/[0.1]">
                      Join Room
                    </Link>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Community Controls">
              <button
                type="button"
                onClick={resetCommunity}
                className="w-full rounded-2xl border border-red-400/30 bg-red-500/10 px-5 py-4 font-black text-red-200 hover:bg-red-500/20"
              >
                Reset Local Community
              </button>

              <p className="mt-3 text-sm text-slate-400">
                Posts, follows, reels, likes, saves, and comments are saved in this browser.
              </p>
            </Card>
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
        .nav-main {
          border-radius: 1rem;
          background: linear-gradient(to right, #2563eb, #7c3aed, #d946ef);
          padding: 1rem 1.25rem;
          font-weight: 900;
        }
        .action-btn {
          border-radius: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.05);
          padding: 0.75rem 1.25rem;
          font-weight: 900;
        }
        .action-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </main>
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