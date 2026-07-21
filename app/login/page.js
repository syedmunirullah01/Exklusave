"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error || !res?.ok) {
        toast.error("Invalid email or password. Please try again.");
      } else {
        toast.success("Logged in successfully! Redirecting...");
        // Force full page navigation so Vercel attaches session cookies cleanly
        window.location.href = "/admin";
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-900 text-white rounded-2xl p-8 shadow-xl border border-zinc-800">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2 text-white">Admin Console</h1>
          <p className="text-zinc-400 text-sm">
            Sign in to manage Persuekey
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-300">Email Address</label>
            <Input
              type="email"
              required
              placeholder="admin@persuekey.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="bg-zinc-800 border-zinc-700 text-white text-xs"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-300">Password</label>
            <Input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="bg-zinc-800 border-zinc-700 text-white text-xs"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full py-3 mt-4 flex items-center justify-center font-bold bg-emerald-600 hover:bg-emerald-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
