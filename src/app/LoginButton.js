"use client";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";

function LoginButton() {
  const { user } = useContext(UserContext);
  return (
    <div>
      {user.loggedIn ? (
        <Link href="/profile">profile</Link>
      ) : (
        <Link href="/login">login</Link>
      )}
    </div>
  );
}

export default LoginButton;
