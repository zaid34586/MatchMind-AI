export function getUsers() {
  if (typeof window === "undefined") return [];

  const users = localStorage.getItem("matchmind_users");
  return users ? JSON.parse(users) : [];
}

export function saveUser(user) {
  const users = getUsers();

  const exists = users.find((item) => item.email === user.email);

  if (exists) {
    return {
      success: false,
      message: "Account already exists. Please sign in.",
    };
  }

  const newUser = {
    id: Date.now().toString(),
    name: user.name,
    email: user.email,
    password: user.password,
    createdAt: new Date().toISOString(),
  };

  localStorage.setItem("matchmind_users", JSON.stringify([...users, newUser]));
  localStorage.setItem("matchmind_current_user", JSON.stringify(newUser));

  document.cookie =
    "matchmind_auth=true; path=/; max-age=604800; SameSite=Lax";

  return {
    success: true,
    user: newUser,
  };
}

export function loginUser(email, password) {
  const users = getUsers();

  const user = users.find(
    (item) => item.email === email && item.password === password
  );

  if (!user) {
    return {
      success: false,
      message: "Invalid email or password.",
    };
  }

  localStorage.setItem("matchmind_current_user", JSON.stringify(user));

  document.cookie =
    "matchmind_auth=true; path=/; max-age=604800; SameSite=Lax";

  return {
    success: true,
    user,
  };
}

export function getCurrentUser() {
  if (typeof window === "undefined") return null;

  const user = localStorage.getItem("matchmind_current_user");
  return user ? JSON.parse(user) : null;
}

export function logoutUser() {
  if (typeof window === "undefined") return;

  localStorage.removeItem("matchmind_current_user");

  document.cookie =
    "matchmind_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
}