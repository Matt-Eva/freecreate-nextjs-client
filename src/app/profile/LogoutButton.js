"use client";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";

function LogoutButton() {
  const { logout } = useContext(UserContext);
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push("/login");
  }
  return <button onClick={handleLogout}>LogoutButton</button>;
}

export default LogoutButton;
