"use client";
import React, { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerUser } from "@/actions/authactions";
import CoffeeCup from "@/components/CoffeeCup";

const GithubIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
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

const USERNAME_REGEX = /^[a-z0-9._-]{3,30}$/;

export default function Signup() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const cleanUsername = username.trim().toLowerCase();
    if (!USERNAME_REGEX.test(cleanUsername)) {
      setError(
        "Username must be 3-30 characters — lowercase letters, numbers, dots, dashes or underscores."
      );
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (password !== confirm) {
      setError("Those passwords don't match.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await registerUser({
        username: cleanUsername,
        email,
        password,
      });

      if (res?.error) {
        setError(res.error);
        return;
      }

      // Account created — sign them straight in
      const login = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (login?.ok) {
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    } catch {
      setError("Something went wrong on our end. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
              Claim your corner
            </h1>
            <p className="text-sm text-mocha leading-relaxed">
              A minute of setup, then your fans can start buying you coffees.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 space-y-3.5">
            <div>
              <label
                htmlFor="signup-username"
                className="block mb-1.5 text-[13px] font-medium text-ink-soft"
              >
                Username
              </label>
              <input
                id="signup-username"
                type="text"
                required
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="your-username"
                className="field px-4 py-2.5 text-sm"
              />
              <p className="mt-1.5 font-mono text-[11px] text-mocha/80 truncate">
                your page: /{username.trim().toLowerCase() || "your-username"}
              </p>
            </div>

            <div>
              <label
                htmlFor="signup-email"
                className="block mb-1.5 text-[13px] font-medium text-ink-soft"
              >
                Email
              </label>
              <input
                id="signup-email"
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
              <label
                htmlFor="signup-password"
                className="block mb-1.5 text-[13px] font-medium text-ink-soft"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
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

            <div>
              <label
                htmlFor="signup-confirm"
                className="block mb-1.5 text-[13px] font-medium text-ink-soft"
              >
                Confirm password
              </label>
              <input
                id="signup-confirm"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Same one again"
                className="field px-4 py-2.5 text-sm"
              />
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
                  Creating your page...
                </>
              ) : (
                "Create my account"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 px-8 py-5">
            <div className="flex-1 h-px bg-latte" />
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-mocha/70">
              or
            </span>
            <div className="flex-1 h-px bg-latte" />
          </div>

          {/* GitHub */}
          <div className="px-8">
            <button
              id="signup-github-btn"
              onClick={() => signIn("github")}
              className="btn btn-ink w-full py-3 text-sm"
            >
              <GithubIcon />
              Sign up with GitHub
            </button>
          </div>

          {/* Footer */}
          <div className="px-8 pt-6 pb-7 space-y-4">
            <p className="text-sm text-mocha text-center">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-roast hover:text-roast-dark underline underline-offset-4 decoration-roast/30 hover:decoration-roast transition-colors duration-150"
              >
                Sign in
              </Link>
            </p>
            <p className="text-xs text-mocha/70 text-center leading-relaxed">
              By creating an account, you agree to our{" "}
              <span className="underline underline-offset-2">Terms</span> and{" "}
              <span className="underline underline-offset-2">Privacy Policy</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
