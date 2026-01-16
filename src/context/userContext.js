"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { CsrfContext } from "./csrfContext";

const startingContext = { isFetched: false, loggedIn: false };
export const UserContext = createContext(startingContext);

export function UserProvider({ children }) {
  const { csrfToken } = useContext(CsrfContext);
  console.log(csrfToken);
  const [user, setUser] = useState(startingContext);

  useEffect(() => {
    reauth();
  }, []);

  async function reauth() {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API + "/reauth", {
        credentials: "include",
      });
      if (res.ok) {
        setUser({
          isFetched: true,
          loggedIn: true,
        });
      } else {
        console.log(res.status);
        if (res.status === 401) {
          setUser({
            loggedIn: false,
            isFetched: true,
          });
        } else {
          const error = await res.text();
          throw new Error(error);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function login(email) {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setUser({
          ...user,
          loggedIn: true,
        });
      } else {
        const error = await res.text();
        throw new Error(error);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function logout() {
    try {
    } catch (e) {
      console.error(e);
    }
  }

  async function signup() {
    try {
    } catch (e) {
      console.error(e);
    }
  }

  async function deleteAccount() {
    try {
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <UserContext.Provider value={{ user, logout, login }}>
      {children}
    </UserContext.Provider>
  );
}
