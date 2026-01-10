"use client";

import { useEffect } from "react";

function Test({ hello }) {
  //   throw new Error("problem!");

  useEffect(() => {
    getHello();
  }, []);

  async function getHello() {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API + "/hello");
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

  async function postHello() {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API + "/hello", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "hello",
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
