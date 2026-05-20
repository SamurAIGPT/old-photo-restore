"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { LoginButton, SignUpButton, SignOutButton } from "./AuthButtons";
import { CreditBadge } from "./CreditBadge";
import { FaCameraRetro, FaMagic } from "react-icons/fa";

export function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  return (
    <header className="w-full border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md sticky top-0 z-50 text-zinc-100">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        
        {/* Logo and Brand */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white transition-all group-hover:scale-105 shadow-md shadow-indigo-900/50">
            <FaCameraRetro className="text-xs" />
          </div>
          <span className="font-bold text-white tracking-tight text-md">
            VintageRestore
          </span>
        </Link>
 
        {/* Navigation Links */}
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${
              pathname === "/"
                ? "text-white border-b-2 border-indigo-500 pb-0.5"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <span>Restore Studio</span>
            <FaMagic className="text-[10px] text-zinc-500" />
          </Link>
          <Link
            href="/pricing"
            className={`text-xs font-semibold transition-colors ${
              pathname === "/pricing"
                ? "text-white border-b-2 border-indigo-500 pb-0.5"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Pricing
          </Link>
        </nav>

        {/* Auth / Account Controls */}
        <div className="flex items-center gap-3">
          {status === "loading" ? (
            <div className="h-7 w-20 animate-pulse bg-zinc-800 rounded-full" />
          ) : session?.user ? (
            <div className="flex items-center gap-3">
              <CreditBadge credits={session.user.credits ?? 0} />
              
              <Link href="/pricing" className="inline-flex items-center px-4 py-1.5 bg-white hover:bg-zinc-100 text-zinc-950 rounded-full text-xs font-bold transition-all shadow-sm">
                Buy Credits
              </Link>

              {session.user.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name || "User Profile"}
                  className="h-6 w-6 rounded-full border border-zinc-700"
                />
              ) : (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-800 text-zinc-300 text-[10px] font-bold">
                  {session.user.name ? session.user.name[0].toUpperCase() : "U"}
                </div>
              )}
              
              <SignOutButton />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <LoginButton />
              <SignUpButton />
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
