"use client";
import { useState, useContext } from "react";
import { UserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";

function Login() {
  const { user, login, logout } = useContext(UserContext);
  const router = useRouter();

  const [emailInput, setEmailInput] = useState("");
  async function handleLoginSubmit(e) {
    e.preventDefault();
    await login(emailInput);
    router.push("/profile");
  }

  function handleEmailInput(e) {
    setEmailInput(e.target.value);
  }
  return (
    <div>
      <form onSubmit={handleLoginSubmit}>
        <input type="text" value={emailInput} onChange={handleEmailInput} />
        <input type="submit" value="login" />
      </form>
      <form></form>
    </div>
  );
}

export default Login;
