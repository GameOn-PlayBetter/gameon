"use client";

import React, { useState } from "react";
import { Drawer } from "./Drawer";
import { useRouter } from "next/navigation";

export function LoginDrawer({ open, onOpenChange }: { open: boolean; onOpenChange: (val: boolean) => void }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    onOpenChange(false); // Close the drawer
    router.push("/refer-friends"); // Simulate redirect after login
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <Drawer.Content className="p-6 gap-4">
        <h2 className="text-2xl font-bold mb-4">Log in to Earn Tokens</h2>
        <input
          className="w-full rounded px-4 py-2 border border-gray-300"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full rounded px-4 py-2 border border-gray-300 mt-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          onClick={handleLogin}
        >
          Log In
        </button>
      </Drawer.Content>
    </Drawer>
  );
}