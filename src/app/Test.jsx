"use client";

import { useEffect, useState } from "react";
import axios from "axios";

function Test({ hello }) {
  const [csrfToken, setCsrfToken] = useState(null);
  //   throw new Error("problem!");

  const apiClient = axios.create({
    withCredentials: true,
  });

  useEffect(() => {
    getHello();
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

  async function getHello() {
    try {
      const res = await apiClient(process.env.NEXT_PUBLIC_API + "/hello");
      console.log(res);
      if ((res.statusText = "OK")) {
        // const data = await res.json();
        console.log(res.data);
      } else {
        // const error = await res.text();
        console.log(res);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function postHello() {
    console.log(csrfToken);
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API + "/hello",

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
          credentials: "include",
          withCredentials: true,
          body: JSON.stringify({
            message: "hello!",
          }),
        }
      );
      console.log(res);
      // if (res.statusText == "OK") {
      //   const data = await res.json();
      //   console.log(data);
      // } else {
      //   // const error = await res.text();
      //   // throw new Error(error);
      // }
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
