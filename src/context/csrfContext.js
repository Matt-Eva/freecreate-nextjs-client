"use client";
import { createContext, useContext, useState, useEffect } from "react";

export const csrfContext = createContext();

export function CsrfProvider({ children }) {
  const [csrfToken, setCsrfToken] = useState(null);

  useEffect(() => {
    getCsrfToken();
  }, []);

  async function getCsrfToken() {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API + "/get-csrf", {
        credentials: "include",
      });
      if (res.ok) {
        const token = res.headers.get("X-CSRF-Token");
        setCsrfToken(token);
      } else {
        console.log(res);
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <csrfContext.Provider value={{ csrfToken }}>
      {children}
    </csrfContext.Provider>
  );
}
