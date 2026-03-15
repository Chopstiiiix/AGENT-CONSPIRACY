"use client";

import Link from "next/link";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export function Navbar() {
  const { isSignedIn, isLoaded } = useUser();

  return (
    <nav
      className="flex items-center justify-between px-6 py-4"
      style={{ borderBottom: "1px solid var(--border-dim)" }}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <span
          className="text-sm tracking-[3px]"
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 700,
            color: "var(--neon)",
          }}
        >
          AGENT
        </span>
        <span
          className="text-sm tracking-[3px]"
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 700,
            color: "var(--text-primary)",
          }}
        >
          CONSPIRACY
        </span>
      </Link>

      {/* Nav links */}
      <div className="flex items-center gap-6">
        <Link
          href="/browse"
          className="text-[10px] tracking-[2px] transition-colors hover:text-[var(--neon)]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}
        >
          BROWSE
        </Link>

        {isLoaded && (
          <>
            {isSignedIn ? (
              <UserButton
                appearance={{
                  baseTheme: dark,
                  elements: {
                    avatarBox: "w-8 h-8",
                    userButtonPopoverCard:
                      "bg-[var(--surface-1)] border border-[var(--border-dim)]",
                  },
                }}
              />
            ) : (
              <SignInButton mode="modal">
                <button
                  className="px-4 py-1.5 text-[10px] tracking-[2px] cursor-pointer transition-all duration-200 hover:shadow-[0_0_15px_rgba(0,255,136,0.2)]"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--neon)",
                    border: "1px solid var(--neon)",
                    background: "transparent",
                  }}
                >
                  LOG_IN
                </button>
              </SignInButton>
            )}
          </>
        )}
      </div>
    </nav>
  );
}
