"use client";
import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const CupMark = () => (
  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-roast text-cream transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-105">
    <svg width="18" height="18" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <path
        d="M24 40h48v16c0 11-9 20-20 20h-8c-11 0-20-9-20-20V40z"
        fill="currentColor"
      />
      <path
        d="M72 46h4c5 0 9 4 9 9s-4 9-9 9h-5"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path d="M34 30c-3-4 3-6 0-11M56 30c-3-4 3-6 0-11" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
    </svg>
  </span>
);

const Navbar = () => {
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 bg-cream/85 backdrop-blur-md transition-shadow duration-300 ${
        scrolled
          ? "border-b border-latte shadow-[0_8px_24px_-16px_rgba(34,26,18,0.25)]"
          : "border-b border-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-5 h-16">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <CupMark />
          <span className="font-display font-semibold text-lg tracking-tight">
            Get Me a Coffee
          </span>
        </Link>

        {/* Center links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-ink-soft">
          <Link href="/#how" className="nav-link hover:text-ink transition-colors duration-200">
            How it works
          </Link>
          <Link href="/about" className="nav-link hover:text-ink transition-colors duration-200">
            About
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {session ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                onBlur={() => {
                  setTimeout(() => setShowDropdown(false), 150);
                }}
                id="dropdownDefaultButton"
                className="flex items-center gap-2.5 pl-1.5 pr-3 py-1.5 rounded-full border border-latte bg-paper hover:border-latte-dark transition-colors duration-200"
                type="button"
              >
                <span className="w-7 h-7 rounded-full bg-ink text-cream flex items-center justify-center text-xs font-bold">
                  {session.user?.name?.charAt(0)?.toUpperCase() ||
                    session.user?.email?.charAt(0)?.toUpperCase() ||
                    "U"}
                </span>
                <span className="hidden sm:inline max-w-[120px] truncate text-xs font-medium text-ink-soft">
                  {session.user?.name || session.user?.email}
                </span>
                <svg
                  className={`w-3 h-3 text-mocha transition-transform duration-200 ${showDropdown ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 10 6"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              {/* Dropdown */}
              {showDropdown && (
                <div className="absolute right-0 top-full mt-2 w-52 card overflow-hidden shadow-lift rise">
                  <div className="px-4 py-2.5 border-b border-latte bg-cream/60">
                    <p className="text-xs text-mocha truncate">
                      {session.user?.email}
                    </p>
                  </div>
                  <ul className="py-1.5">
                    <li>
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-ink-soft hover:text-ink hover:bg-cream transition-colors duration-150"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                        </svg>
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/${session.user?.name}`}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-ink-soft hover:text-ink hover:bg-cream transition-colors duration-150"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                        Your Page
                      </Link>
                    </li>
                    <li className="border-t border-latte mt-1.5 pt-1.5">
                      <button
                        onClick={() => signOut()}
                        className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-roast hover:text-roast-dark hover:bg-roast-light/50 transition-colors duration-150"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                        </svg>
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login">
              <button className="btn btn-ink text-sm px-5 py-2">
                Sign in
                <svg className="btn-arrow w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
