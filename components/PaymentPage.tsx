"use client";
import React, { useEffect, useState } from "react";
import Script from "next/script";
import { useSession } from "next-auth/react";
import { fetchuser, fetchpayments, initiate } from "@/actions/useractions";
import { useSearchParams, useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import CoffeeCup from "@/components/CoffeeCup";

interface PaymentForm {
  name: string;
  message: string;
  amount: string;
}

interface User {
  coverpic?: string;
  profilepic?: string;
  razorpayid?: string;
}

interface Payment {
  name: string;
  amount: number;
  message: string;
}

declare const Razorpay: any;

const QUICK_AMOUNTS = [
  { label: "☕ ₹10", value: 1000 },
  { label: "☕☕ ₹20", value: 2000 },
  { label: "☕☕☕ ₹30", value: 3000 },
];

/* Warm palette rotated across supporter avatars */
const AVATAR_COLORS = [
  { bg: "#F7E4D4", fg: "#B54312" },
  { bg: "#E3EBDD", fg: "#4C7A4C" },
  { bg: "#F3E8CE", fg: "#8A6A1E" },
  { bg: "#E9E0F0", fg: "#6B4E8E" },
  { bg: "#DDE9EC", fg: "#3E6A7A" },
];

const avatarColor = (name: string) =>
  AVATAR_COLORS[(name?.charCodeAt(0) ?? 0) % AVATAR_COLORS.length];

const PaymentPage = ({ username }: { username: string }) => {
  const [paymentform, setPaymentform] = useState<PaymentForm>({
    name: "",
    message: "",
    amount: "",
  });
  const [currentUser, setCurrentUser] = useState<User>({});
  const [payments, setPayments] = useState<Payment[]>([]);
  const [coverError, setCoverError] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (searchParams.get("paymentdone") === "true") {
      toast("☕ Thanks for your support!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });
    }
    router.push(`/${username}`);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };

  const getData = async () => {
    const u = await fetchuser(username);
    setCurrentUser(u);
    const dbpayments = await fetchpayments(username);
    setPayments(dbpayments);
  };

  const pay = async (amount: number) => {
    const a = await initiate(amount, username, paymentform);
    const orderId = a.id;
    const options = {
      key: currentUser.razorpayid,
      amount,
      currency: "INR",
      name: "Get Me A Coffee",
      description: `Supporting ${username}`,
      order_id: orderId,
      callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      prefill: {
        name: paymentform.name,
        email: "",
        contact: "",
      },
      theme: { color: "#D4551E" },
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();
  };

  const totalRaised = payments.reduce((a, b) => a + b.amount, 0);
  const isPayDisabled =
    (paymentform.name?.length ?? 0) < 3 ||
    (paymentform.message?.length ?? 0) < 4 ||
    (paymentform.amount?.length ?? 0) < 1;

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      {/* ── Cover ──────────────────────────────────────────────── */}
      <div className="relative w-full h-48 md:h-72 bg-ink">
        {/* Clipped layer for the image/pattern so the avatar below can overhang */}
        <div className="absolute inset-0 overflow-hidden">
          {currentUser.coverpic && !coverError ? (
            <img
              className="w-full h-full object-cover"
              src={currentUser.coverpic}
              alt="Cover"
              onError={() => setCoverError(true)}
            />
          ) : (
            <div
              className="w-full h-full"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(250,246,238,0.22) 1.5px, transparent 1.5px)",
                backgroundSize: "20px 20px",
              }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
        </div>

        {/* Avatar */}
        <div className="absolute -bottom-14 left-1/2 -translate-x-1/2">
          <div className="w-28 h-28 rounded-full border-4 border-cream overflow-hidden shadow-lift bg-paper">
            {currentUser.profilepic && !avatarError ? (
              <img
                className="w-full h-full object-cover"
                src={currentUser.profilepic}
                alt={username}
                onError={() => setAvatarError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl font-display font-bold bg-roast text-cream">
                {username.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Creator info ───────────────────────────────────────── */}
      <div className="flex flex-col items-center mt-[70px] mb-12 px-4 rise rise-1">
        <h1 className="font-display font-semibold text-2xl md:text-3xl tracking-tight">
          @{username}
        </h1>
        <p className="text-mocha text-sm mt-1.5">
          Help {username} get a coffee — every cup counts.
        </p>
        <div className="flex items-center gap-2.5 mt-4">
          <span className="px-3.5 py-1.5 rounded-full bg-paper border border-latte text-xs font-medium text-ink-soft">
            {payments.length} supporter{payments.length !== 1 ? "s" : ""}
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-roast-light text-xs font-mono font-medium text-roast-dark">
            ₹{totalRaised.toLocaleString()} raised
          </span>
        </div>
      </div>

      {/* ── Main content ───────────────────────────────────────── */}
      <div className="container mx-auto px-4 pb-24">
        <div className="flex flex-col md:flex-row gap-6 max-w-4xl mx-auto items-start">
          {/* Supporters */}
          <div className="w-full md:w-1/2 card overflow-hidden rise rise-2">
            <div className="px-6 py-5 border-b border-latte flex items-center justify-between">
              <h2 className="font-display font-semibold text-lg">Supporters</h2>
              <span className="font-mono text-xs text-mocha">
                {payments.length} total
              </span>
            </div>
            <div className="p-3">
              {payments.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CoffeeCup size={64} className="text-latte-dark mb-4" fill="transparent" />
                  <p className="text-mocha text-sm">
                    No coffees yet — be the first!
                  </p>
                </div>
              ) : (
                <ul>
                  {payments.map((p, i) => {
                    const color = avatarColor(p.name);
                    return (
                      <li
                        key={i}
                        className="supporter-row flex items-start gap-3.5 p-3.5 rounded-xl"
                      >
                        <span
                          className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                          style={{ background: color.bg, color: color.fg }}
                        >
                          {p.name?.charAt(0)?.toUpperCase() || "?"}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold truncate">
                              {p.name}
                            </p>
                            {i === 0 && (
                              <span className="px-1.5 py-0.5 rounded-full bg-roast-light text-roast-dark text-[10px] font-mono font-medium shrink-0">
                                top
                              </span>
                            )}
                          </div>
                          <p className="text-[13px] text-mocha leading-snug mt-0.5">
                            &ldquo;{p.message}&rdquo;
                          </p>
                        </div>
                        <span className="font-mono text-sm font-medium text-roast shrink-0">
                          ₹{p.amount}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>

          {/* Payment form */}
          <div className="w-full md:w-1/2 card overflow-hidden shadow-card rise rise-3">
            <div className="px-6 py-5 border-b border-latte">
              <h2 className="font-display font-semibold text-lg">
                Buy {username} a coffee
              </h2>
            </div>
            <div className="p-6 space-y-3.5">
              <input
                onChange={handleChange}
                value={paymentform.name}
                name="name"
                type="text"
                className="field px-4 py-3 text-sm"
                placeholder="Your name"
              />
              <input
                onChange={handleChange}
                value={paymentform.message}
                name="message"
                type="text"
                className="field px-4 py-3 text-sm"
                placeholder="Say something nice..."
              />
              <input
                onChange={handleChange}
                value={paymentform.amount}
                name="amount"
                type="number"
                min="1"
                className="field px-4 py-3 text-sm"
                placeholder="Amount (₹)"
              />

              <button
                onClick={() => pay(Number.parseInt(paymentform.amount) * 100)}
                type="button"
                disabled={isPayDisabled}
                className="btn btn-roast w-full py-3 text-sm"
              >
                Support now
                <svg className="btn-arrow w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>

              {/* Quick amounts */}
              <div className="pt-3 border-t border-latte">
                <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-mocha mb-2.5">
                  or pour one instantly
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {QUICK_AMOUNTS.map(({ label, value }) => (
                    <button
                      key={value}
                      onClick={() => pay(value)}
                      className="btn btn-outline py-2 text-xs"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-[11px] text-mocha/70 text-center pt-1">
                Payments handled securely by Razorpay.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
