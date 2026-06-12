"use client";

const USERS_KEY = "matchmind_demo_users";
const SESSION_KEY = "matchmind_demo_session";

export function getDemoUsers() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function getDemoSession() {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
  } catch {
    return null;
  }
}

export function signupDemoUser({ name, email, password, favoriteTeam = "Football Fan", country = "India" }) {
  const users = getDemoUsers();
  const cleanEmail = email.trim().toLowerCase();

  const existing = users.find((user) => user.email === cleanEmail);
  if (existing) {
    return { ok: false, message: "Account already exists. Please sign in." };
  }

  const user = {
    id: Date.now().toString(),
    name: name?.trim() || cleanEmail.split("@")[0],
    email: cleanEmail,
    password,
    favoriteTeam,
    country,
    createdAt: new Date().toISOString(),
  };

  localStorage.setItem(USERS_KEY, JSON.stringify([...users, user]));
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));

  return { ok: true, user };
}

export function signinDemoUser({ email, password }) {
  const cleanEmail = email.trim().toLowerCase();
  const users = getDemoUsers();

  const user = users.find(
    (item) => item.email === cleanEmail && item.password === password
  );

  if (!user) {
    return { ok: false, message: "Invalid email or password." };
  }

  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  return { ok: true, user };
}

export function logoutDemoUser() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_KEY);
}

export function requireDemoSession(router) {
  const session = getDemoSession();

  if (!session) {
    router.replace("/signin");
    return null;
  }

  return session;
}