"use client";

import { useEffect, useState, useContext } from "react";
import { CsrfContext } from "@/context/csrfContext";
import { UserContext } from "@/context/userContext";
import axios from "axios";

function Test({ hello }) {
  const { csrfToken } = useContext(CsrfContext);
  const { user, login } = useContext(UserContext);
  const [emailInput, setEmailInput] = useState("");

  useEffect(() => {
    getHello();
  }, []);

  async function getHello() {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API + "/hello");
      console.log(res);
      if (res.ok) {
        const data = await res.json();
        console.log(data);
      } else {
        const error = await res.text();
        console.log(error);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function postHello() {
    console.log(csrfToken);
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API + "/hello", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify({
          message: "hello!",
        }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data);
      } else {
        const error = await res.text();
        throw new Error(error);
      }
    } catch (e) {
      console.error(e);
    }
  }

  function handleLoginSubmit(e) {
    e.preventDefault();
    login(emailInput);
  }

  function handleEmailInput(e) {
    setEmailInput(e.target.value);
  }

  return (
    <div>
      Test
      {user.loggedIn ? <p>profile</p> : <p>login</p>}
      <button onClick={postHello}>test post</button>
      <form onSubmit={handleLoginSubmit}>
        <input type="text" value={emailInput} onChange={handleEmailInput} />
        <input type="submit" value="login" />
      </form>
    </div>
  );
}

export default Test;
