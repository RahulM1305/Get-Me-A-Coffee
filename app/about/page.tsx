import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About – Get Me A Coffee",
  description:
    "Learn how Get Me A Coffee helps creators fund their projects through fan support.",
};

const beliefs = [
  {
    title: "Small support adds up",
    description:
      "A coffee is a low-stakes way to say “I value this.” Enough coffees, and suddenly the side project has a budget.",
  },
  {
    title: "Notes matter as much as money",
    description:
      "Every contribution carries a message. On the hard weeks, those messages are what keep creators going.",
  },
  {
    title: "Creators keep control",
    description:
      "Payments go through your own Razorpay account, directly to you. We're the page, not the middleman.",
  },
];

const audiences = [
  {
    emoji: "🎨",
    title: "For creators",
    items: [
      "Direct financial support from your fanbase",
      "A personal page that takes a minute to set up",
      "Simple Razorpay integration for instant payouts",
      "A running wall of encouragement from supporters",
    ],
  },
  {
    emoji: "❤️",
    title: "For fans",
    items: [
      "Contribute directly to creators you believe in",
      "Leave a note that lands on their page",
      "No subscriptions, no commitment — just a coffee",
      "Watch the work you fund come to life",
    ],
  },
  {
    emoji: "🤝",
    title: "For communities",
    items: [
      "Rally around a shared project or creator",
      "See fellow supporters on the leaderboard",
      "Turn an audience into a backing crew",
      "Celebrate milestones together, cup by cup",
    ],
  },
];

export default function About() {
  return (
    <div className="min-h-screen py-16 md:py-24 px-5">
      <div className="container mx-auto max-w-4xl">
        {/* ── Header ──────────────────────────────────────────── */}
        <div className="mb-20 max-w-2xl">
          <p className="eyebrow rise rise-1 mb-5">about us</p>
          <h1 className="rise rise-2 font-display font-semibold text-4xl md:text-6xl tracking-tight leading-[1.08] mb-6">
            A warmer way to fund{" "}
            <em className="italic text-roast">creative work</em>
          </h1>
          <p className="rise rise-3 text-lg text-mocha leading-relaxed">
            Get Me a Coffee is a small crowdfunding platform built for
            creators. It gives your audience the simplest possible way to
            support what you make — no pledges, no tiers, no paywalls. Just a
            coffee and a kind word, from someone your work reached.
          </p>
        </div>

        {/* ── Beliefs ─────────────────────────────────────────── */}
        <section className="mb-20">
          <Reveal>
            <h2 className="font-display font-semibold text-2xl md:text-3xl tracking-tight mb-10">
              What we believe
            </h2>
          </Reveal>
          <div className="space-y-0">
            {beliefs.map((belief, i) => (
              <Reveal key={belief.title} delay={i * 100}>
                <div className="group flex flex-col sm:flex-row gap-3 sm:gap-10 py-7 border-t border-latte last:border-b">
                  <span className="font-mono text-sm text-mocha shrink-0 w-10 transition-colors duration-300 group-hover:text-roast">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display font-semibold text-xl mb-2">
                      {belief.title}
                    </h3>
                    <p className="text-mocha leading-relaxed max-w-xl">
                      {belief.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Who it's for ────────────────────────────────────── */}
        <section className="mb-20">
          <Reveal>
            <h2 className="font-display font-semibold text-2xl md:text-3xl tracking-tight mb-10">
              Who it&apos;s for
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {audiences.map((audience, i) => (
              <Reveal key={audience.title} delay={i * 120}>
                <div className="card card-hover p-6 h-full">
                  <div className="flex items-center gap-2.5 mb-5">
                    <span className="text-xl">{audience.emoji}</span>
                    <h3 className="font-display font-semibold text-lg">
                      {audience.title}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {audience.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-ink-soft leading-relaxed"
                      >
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-roast shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────── */}
        <Reveal>
          <div className="text-center card bg-roast-light/60 border-roast/20 px-8 py-14">
            <h2 className="font-display font-semibold text-2xl md:text-4xl tracking-tight mb-4">
              Sound like your kind of place?
            </h2>
            <p className="text-mocha mb-8">
              Your page is a sign-in away.
            </p>
            <Link href="/login">
              <button className="btn btn-roast text-[15px] px-8 py-3.5">
                Get started
                <svg className="btn-arrow w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
