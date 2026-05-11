"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseClient } from "@/app/lib/supabaseClient";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setStatus("error");
      setError("Invalid email or password.");
      return;
    }

    router.push("/admin");
  }

  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-16">
      <div className="mx-auto max-w-md rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-neutral-900">Owner Login</h1>
        <p className="mt-2 text-sm text-neutral-600">
          Sign in to view quote requests.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <input
            type="email"
            required
            placeholder="Email"
            className="h-12 rounded-xl border border-neutral-300 px-3 text-[16px] outline-none focus:ring-2 focus:ring-neutral-800"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            required
            placeholder="Password"
            className="h-12 rounded-xl border border-neutral-300 px-3 text-[16px] outline-none focus:ring-2 focus:ring-neutral-800"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={status === "loading"}
            className="h-12 rounded-xl bg-neutral-900 text-white font-medium disabled:opacity-60"
          >
            {status === "loading" ? "Signing in..." : "Sign in"}
          </button>

          {status === "error" && (
            <p className="text-sm text-red-700">{error}</p>
          )}
        </form>
      </div>
    </main>
  );
}
