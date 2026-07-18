import React from "react";
import Link from "next/link";
import CoffeeCup from "./CoffeeCup";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ink text-cream mt-24">
      <div className="container mx-auto px-5 pt-16 pb-10">
        {/* Big line */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 pb-12 border-b border-cream/10">
          <div className="max-w-md">
            <div className="flex items-center gap-3 mb-5">
              <CoffeeCup size={40} stroke="#FAF6EE" fill="rgba(250,246,238,0.12)" />
              <span className="font-display font-semibold text-lg">
                Get Me a Coffee
              </span>
            </div>
            <p className="font-display text-2xl md:text-3xl leading-snug text-cream/90">
              Fuel someone&apos;s next{" "}
              <em className="text-roast not-italic font-display italic">big thing.</em>
            </p>
          </div>

          <nav className="flex flex-col sm:flex-row gap-4 sm:gap-10 text-sm">
            <Link
              href="/"
              className="nav-link w-fit text-cream/60 hover:text-cream transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="nav-link w-fit text-cream/60 hover:text-cream transition-colors duration-200"
            >
              About
            </Link>
            <Link
              href="/login"
              className="nav-link w-fit text-cream/60 hover:text-cream transition-colors duration-200"
            >
              Get started
            </Link>
          </nav>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8">
          <p className="text-xs text-cream/40">
            &copy; {currentYear} Get Me A Coffee. All rights reserved.
          </p>
          <p className="text-xs text-cream/40 font-mono tracking-wide">
            brewed with care, one cup at a time ☕
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
