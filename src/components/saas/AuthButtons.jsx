"use client";

import { signIn, signOut } from "next-auth/react";
import { FaGoogle, FaSignOutAlt } from "react-icons/fa";

export function LoginButton({ className }) {
  return (
    <button
      onClick={() => signIn("google")}
      className={`inline-flex items-center gap-2 px-4 py-1.5 border border-zinc-700 text-zinc-300 rounded-full font-medium hover:bg-zinc-800 hover:border-zinc-600 transition-all text-xs outline-none cursor-pointer ${className}`}
    >
      <FaGoogle className="text-[10px] text-zinc-400" />
      Sign In
    </button>
  );
}

export function SignUpButton({ className }) {
  return (
    <button
      onClick={() => signIn("google")}
      className={`inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-semibold transition-all text-xs outline-none cursor-pointer shadow-sm ${className}`}
    >
      Sign Up
    </button>
  );
}

export function SignOutButton({ className }) {
  return (
    <button
      onClick={() => signOut()}
      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs border border-zinc-700 text-zinc-400 rounded-full hover:text-zinc-200 hover:border-zinc-600 transition-all outline-none cursor-pointer ${className}`}
    >
      <FaSignOutAlt className="text-[10px]" />
      Sign Out
    </button>
  );
}
