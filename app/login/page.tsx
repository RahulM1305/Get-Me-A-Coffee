"use client";
import React, { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CoffeeCup from "@/components/CoffeeCup";

const GithubIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 48 48">
    <path fill="#FBBC05" d="M9.827 24c0-1.524.253-2.986.705-4.356L2.622 13.604A23.76 23.76 0 00.214 24c0 3.737.868 7.261 2.406 10.388l7.925-6.007A13.812 13.812 0 019.827 24z" />
    <path fill="#EB4335" d="M23.714 10.133c3.311 0 6.302 1.174 8.652 3.093l6.836-6.827C34.965 2.773 29.624.533 23.714.533 14.427.533 6.445 5.844 2.622 13.604l7.905 6.04c1.822-5.532 7.017-9.511 13.187-9.511z" />
    <path fill="#34A853" d="M23.714 37.867c-6.17 0-11.365-3.978-13.187-9.51l-7.905 6.04C6.445 42.155 14.427 47.467 23.714 47.467c5.731 0 11.204-2.035 15.311-5.848l-7.507-5.804c-2.118 1.335-4.785 2.052-7.804 2.052z" />
    <path fill="#4285F4" d="M46.145 24c0-1.387-.213-2.88-.534-4.267H23.714v9.067H36.32c-.688 3.09-2.404 5.467-4.854 7.014l7.507 5.804c4.314-3.998 7.172-9.963 7.172-17.618z" />
  </svg>
);

const XIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.254 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
);

const EyeIcon = ({ open }: { open: boolean }) =>
  open ? (
    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
  ) : (
    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect after session resolves — never during render
  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (res?.error) {
        setError("Invalid email or password. Give it another shot.");
      } else if (res?.ok) {
        router.push("/dashboard");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // While loading, show a subtle spinner so page isn't blank
  if (status === "loading") {
    return (
      <div className="min-h-[calc(100vh-120px)] flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-latte-dark border-t-roast animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm rise rise-1">
        {/* Card */}
        <div className="card shadow-lift overflow-hidden">
          {/* Header */}
          <div className="p-8 pb-6 text-center">
            <CoffeeCup size={56} className="mx-auto mb-4 text-ink" />
            <h1 className="font-display font-semibold text-2xl tracking-tight mb-2">
              Pull up a chair
            </h1>
            <p className="text-sm text-mocha leading-relaxed">
              Sign in to your page and see who bought you a coffee.
            </p>
          </div>

          {/* Email / password form */}
          <form onSubmit={handleSubmit} className="px-8 space-y-3.5">
            <div>
              <label
                htmlFor="login-email"
                className="block mb-1.5 text-[13px] font-medium text-ink-soft"
              >
                Email
              </label>
              <input
                id="login-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="field px-4 py-2.5 text-sm"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="login-password"
                  className="text-[13px] font-medium text-ink-soft"
                >
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  className="field px-4 py-2.5 pr-11 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-mocha hover:text-ink transition-colors duration-150"
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2.5 px-4 py-3 rounded-xl bg-roast-light/60 border border-roast/25 text-[13px] text-roast-dark leading-snug rise">
                <svg className="w-4 h-4 mt-px shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0 3.75h.008v.008H12v-.008zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-roast w-full py-3 text-sm"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 px-8 py-5">
            <div className="flex-1 h-px bg-latte" />
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-mocha/70">
              or continue with
            </span>
            <div className="flex-1 h-px bg-latte" />
          </div>

          {/* Providers */}
          <div className="px-8 grid grid-cols-3 gap-2.5">
            <button
              id="login-github-btn"
              onClick={() => signIn("github")}
              title="Continue with GitHub"
              className="btn btn-outline py-2.5"
            >
              <GithubIcon />
            </button>
            <button
              disabled
              title="Google — coming soon"
              className="flex items-center justify-center py-2.5 rounded-full bg-cream border border-latte cursor-not-allowed opacity-45"
            >
              <GoogleIcon />
            </button>
            <button
              disabled
              title="X (Twitter) — coming soon"
              className="flex items-center justify-center py-2.5 rounded-full bg-cream border border-latte text-ink cursor-not-allowed opacity-45"
            >
              <XIcon />
            </button>
          </div>

          {/* Footer */}
          <div className="px-8 pt-6 pb-7 space-y-4">
            <p className="text-sm text-mocha text-center">
              New here?{" "}
              <Link
                href="/signup"
                className="font-semibold text-roast hover:text-roast-dark underline underline-offset-4 decoration-roast/30 hover:decoration-roast transition-colors duration-150"
              >
                Create a free account
              </Link>
            </p>
            <p className="text-xs text-mocha/70 text-center leading-relaxed">
              By signing in, you agree to our{" "}
              <span className="underline underline-offset-2">Terms</span> and{" "}
              <span className="underline underline-offset-2">Privacy Policy</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
