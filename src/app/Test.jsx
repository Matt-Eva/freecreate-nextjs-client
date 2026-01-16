"use client";

import { useEffect, useState, useContext } from "react";
import { csrfContext } from "@/context/csrfContext";
import axios from "axios";

function Test({ hello }) {
  const { csrfToken } = useContext(csrfContext);

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

  return (
    <div>
      Test
      <button onClick={postHello}>test post</button>
    </div>
  );
}

export default Test;
