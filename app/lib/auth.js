const USERS_KEY = "matchmind_users";
const CURRENT_USER_KEY = "matchmind_current_user";
const COOKIE_NAME = "matchmind_auth";

export function getUsers() {
  if (typeof window === "undefined") return [];

  try {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  } catch {
    return [];
  }
}

export function saveUser(user) {
  const users = getUsers();

  const cleanEmail = user.email.trim().toLowerCase();

  const exists = users.find((item) => item.email === cleanEmail);

  if (exists) {
    return {
      success: false,
      message: "Account already exists. Please sign in.",
    };
  }

  const newUser = {
    id: Date.now().toString(),
    name: user.name?.trim() || cleanEmail.split("@")[0],
    email: cleanEmail,
    password: user.password,
    favoriteTeam: user.favoriteTeam || "Football Fan",
    country: user.country || "India",
    createdAt: new Date().toISOString(),
  };

  localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));

  setAuthCookie();

  return {
    success: true,
    user: newUser,
  };
}

export function loginUser(email, password) {
  const users = getUsers();
  const cleanEmail = email.trim().toLowerCase();

  const user = users.find(
    (item) => item.email === cleanEmail && item.password === password
  );

  if (!user) {
    return {
      success: false,
      message: "Invalid email or password.",
    };
  }

  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  setAuthCookie();

  return {
    success: true,
    user,
  };
}

export function getCurrentUser() {
  if (typeof window === "undefined") return null;

  try {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
}

export function isLoggedIn() {
  return Boolean(getCurrentUser());
}

export function logoutUser() {
  if (typeof window === "undefined") return;

  localStorage.removeItem(CURRENT_USER_KEY);

  document.cookie = `${COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
}

function setAuthCookie() {
  if (typeof document === "undefined") return;

  document.cookie = `${COOKIE_NAME}=true; path=/; max-age=604800; SameSite=Lax`;
}