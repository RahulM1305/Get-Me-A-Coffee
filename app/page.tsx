import Link from "next/link";
import Reveal from "@/components/Reveal";
import CoffeeCup from "@/components/CoffeeCup";

const heroNotes = [
  {
    name: "Aditi",
    message: "Your tutorials got me my first job. Coffee's on me!",
    amount: "₹100",
    rotate: "md:-rotate-3",
    float: "note-float-1",
  },
  {
    name: "Marcus",
    message: "Week 30 of the podcast — don't you dare stop.",
    amount: "₹50",
    rotate: "md:rotate-2 md:-translate-y-3",
    float: "note-float-2",
  },
  {
    name: "Sana",
    message: "For the late nights. Keep drawing ✍️",
    amount: "₹30",
    rotate: "md:-rotate-1",
    float: "note-float-3",
  },
];

const marqueeItems = [
  "support a creator",
  "buy a coffee",
  "fuel an idea",
  "say thanks",
  "back the work",
  "keep it going",
];

const steps = [
  {
    number: "01",
    title: "Claim your page",
    description:
      "Sign in, pick a username, and your page is live in under a minute. No forms, no waiting, no fees to start.",
  },
  {
    number: "02",
    title: "Share it anywhere",
    description:
      "Drop the link in your bio, video descriptions, newsletter footer, or README. Anywhere your people already are.",
  },
  {
    number: "03",
    title: "Coffees roll in",
    description:
      "Fans chip in a few rupees at a time, each with a note attached. Razorpay sends it straight to your account.",
  },
];

export default function Home() {
  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="relative px-5 pt-16 pb-20 md:pt-28 md:pb-28 overflow-hidden">
        <div className="container mx-auto max-w-5xl">
          <div className="max-w-3xl mx-auto text-center">
            <p className="eyebrow rise rise-1 mb-6">
              for creators &amp; the people who love their work
            </p>

            <h1 className="rise rise-2 font-display font-semibold text-5xl md:text-7xl leading-[1.05] tracking-tight mb-6">
              Great work runs on{" "}
              <span className="relative inline-block whitespace-nowrap">
                <em className="italic text-roast">coffee</em>
                <svg
                  className="squiggle"
                  viewBox="0 0 220 14"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    pathLength={1}
                    d="M3 10 C 30 2, 60 2, 85 8 S 140 14, 165 7 S 205 2, 217 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="rise rise-3 text-lg md:text-xl text-mocha max-w-xl mx-auto leading-relaxed mb-10">
              Give your fans a simple, warm way to say thanks — a page where
              anyone can buy you a coffee and leave a note that makes your day.
            </p>

            <div className="rise rise-4 flex items-center justify-center gap-4 flex-wrap">
              <Link href="/login">
                <button
                  id="hero-start-btn"
                  className="btn btn-roast text-[15px] px-7 py-3.5"
                >
                  Start my page — it&apos;s free
                  <svg className="btn-arrow w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              </Link>
              <Link href="/#how">
                <button
                  id="hero-learn-btn"
                  className="btn btn-outline text-[15px] px-7 py-3.5"
                >
                  See how it works
                </button>
              </Link>
            </div>
          </div>

          {/* Floating supporter notes */}
          <div className="rise rise-5 mt-16 md:mt-24 flex flex-col md:flex-row items-stretch justify-center gap-5 md:gap-6 max-w-4xl mx-auto">
            {heroNotes.map((note) => (
              <div key={note.name} className={`${note.float} md:w-1/3`}>
                <div
                  className={`note-card card shadow-note p-5 h-full ${note.rotate}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-full bg-roast-light text-roast-dark flex items-center justify-center text-sm font-bold">
                        {note.name.charAt(0)}
                      </span>
                      <span className="text-sm font-semibold">{note.name}</span>
                    </div>
                    <span className="font-mono text-sm font-medium text-roast">
                      {note.amount}
                    </span>
                  </div>
                  <p className="text-sm text-ink-soft leading-relaxed">
                    &ldquo;{note.message}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Marquee ─────────────────────────────────────────────── */}
      <div className="marquee bg-ink text-cream py-3.5 -rotate-1 scale-[1.02] my-8">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex items-center shrink-0"
              aria-hidden={copy === 1}
            >
              {marqueeItems.map((item) => (
                <span
                  key={`${copy}-${item}`}
                  className="flex items-center font-mono text-xs uppercase tracking-[0.22em] px-6"
                >
                  {item}
                  <span className="text-roast pl-12" aria-hidden="true">
                    ✳
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── How it works ────────────────────────────────────────── */}
      <section id="how" className="scroll-mt-24 py-24 px-5">
        <div className="container mx-auto max-w-5xl">
          <Reveal className="text-center mb-16">
            <p className="eyebrow mb-4">how it works</p>
            <h2 className="font-display font-semibold text-3xl md:text-5xl tracking-tight">
              Three steps, then it&apos;s{" "}
              <em className="italic text-roast">all yours</em>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {steps.map((step, i) => (
              <Reveal key={step.number} delay={i * 120}>
                <div className="card card-hover p-7 h-full group">
                  <span className="font-mono text-sm text-mocha block mb-8 transition-colors duration-300 group-hover:text-roast">
                    {step.number}
                  </span>
                  <h3 className="font-display font-semibold text-xl mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[15px] text-mocha leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Split feature ───────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-5">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <Reveal>
              <p className="eyebrow mb-4">your corner of the internet</p>
              <h2 className="font-display font-semibold text-3xl md:text-4xl tracking-tight leading-tight mb-5">
                A page that feels like{" "}
                <em className="italic text-roast">you</em>, not a checkout form
              </h2>
              <p className="text-mocha leading-relaxed mb-8">
                Your cover photo, your face, your supporters&apos; notes front and
                center. No corporate dashboard energy — just a warm little
                place where people who like your work can show it.
              </p>
              <ul className="space-y-3.5">
                {[
                  "Every coffee arrives with a personal note",
                  "Supporters get a spot on your page, forever",
                  "Payouts go straight to you via Razorpay",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] text-ink-soft">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-roast-light text-roast-dark flex items-center justify-center shrink-0">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Mock profile card */}
            <Reveal delay={150}>
              <div className="card shadow-lift overflow-hidden md:rotate-2 note-card">
                <div className="h-24 bg-ink relative">
                  <div
                    className="absolute inset-0 opacity-40"
                    style={{
                      backgroundImage:
                        "radial-gradient(rgba(250,246,238,0.25) 1.5px, transparent 1.5px)",
                      backgroundSize: "18px 18px",
                    }}
                  />
                </div>
                <div className="px-6 pb-6">
                  <div className="w-16 h-16 rounded-full bg-roast text-cream flex items-center justify-center text-2xl font-display font-bold border-4 border-paper -mt-8 mb-3 relative">
                    R
                  </div>
                  <p className="font-display font-semibold text-lg">@riya.sketches</p>
                  <p className="text-sm text-mocha mb-4">
                    drawing one tiny comic every day
                  </p>
                  <div className="flex items-center gap-2 mb-5">
                    <span className="px-3 py-1 rounded-full bg-cream border border-latte text-xs font-medium text-ink-soft">
                      214 supporters
                    </span>
                    <span className="px-3 py-1 rounded-full bg-roast-light text-xs font-mono font-medium text-roast-dark">
                      ₹18,420 raised
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-cream border border-latte mb-4">
                    <span className="w-7 h-7 rounded-full bg-moss/15 text-moss flex items-center justify-center text-xs font-bold shrink-0">
                      K
                    </span>
                    <p className="text-xs text-ink-soft truncate">
                      &ldquo;Day 214! Never miss a morning.&rdquo;
                    </p>
                    <span className="font-mono text-xs text-roast ml-auto shrink-0">₹30</span>
                  </div>
                  <button className="btn btn-ink w-full py-2.5 text-sm pointer-events-none" tabIndex={-1}>
                    ☕ Buy Riya a coffee
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Big CTA ─────────────────────────────────────────────── */}
      <section className="px-5 pt-8 pb-4">
        <div className="container mx-auto max-w-5xl">
          <Reveal>
            <div className="bg-ink text-cream rounded-[2rem] px-8 py-16 md:px-16 md:py-20 text-center relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(250,246,238,0.3) 1px, transparent 1px)",
                  backgroundSize: "26px 26px",
                }}
              />
              <div className="relative">
                <CoffeeCup
                  size={72}
                  stroke="#FAF6EE"
                  fill="rgba(212,85,30,0.35)"
                  className="mx-auto mb-6"
                />
                <h2 className="font-display font-semibold text-3xl md:text-5xl tracking-tight mb-4">
                  Your fans are waiting to say thanks
                </h2>
                <p className="text-cream/60 max-w-md mx-auto mb-9">
                  It takes less time to set up than it takes to brew a pot.
                </p>
                <Link href="/login">
                  <button className="btn btn-roast text-[15px] px-8 py-3.5">
                    Create your page
                    <svg className="btn-arrow w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
