import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  async function login({ email, password }) {
    await new Promise((r) => setTimeout(r, 300));

    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const fakeToken = btoa(`${email}:${Date.now()}`);
    const fakeUser = { id: 1, name: email.split("@")[0], email };

    const payload = { user: fakeUser, token: fakeToken };
    setUser(payload);
    localStorage.setItem("user", JSON.stringify(payload));
    return payload;
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
