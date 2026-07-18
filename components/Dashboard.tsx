"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchuser, updateProfile } from "@/actions/useractions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";

interface FormState {
  name?: string;
  email?: string;
  username?: string;
  profilepic?: string;
  coverpic?: string;
  razorpayid?: string;
  razorpaysecret?: string;
}

const fieldConfig = [
  { id: "name", label: "Display name", type: "text", placeholder: "Your display name" },
  { id: "email", label: "Email address", type: "email", placeholder: "your@email.com" },
  { id: "username", label: "Username", type: "text", placeholder: "your-username" },
  { id: "profilepic", label: "Profile picture URL", type: "text", placeholder: "https://..." },
  { id: "coverpic", label: "Cover picture URL", type: "text", placeholder: "https://..." },
  { id: "razorpayid", label: "Razorpay Key ID", type: "text", placeholder: "rzp_live_..." },
  { id: "razorpaysecret", label: "Razorpay Secret", type: "text", placeholder: "Your secret key" },
];

const sections = [
  {
    title: "Profile",
    note: "How you show up on your page",
    fields: fieldConfig.slice(0, 3),
  },
  {
    title: "Media",
    note: "Images that give your page its personality",
    fields: fieldConfig.slice(3, 5),
  },
  {
    title: "Payments",
    note: "Connect Razorpay so coffees land in your account",
    fields: fieldConfig.slice(5),
  },
];

const Dashboard = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [form, setForm] = useState<FormState>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!session) {
      router.push("/login");
    } else {
      getData();
    }
  }, []);

  const getData = async () => {
    const u = await fetchuser((session as any).user.name);
    setForm(u);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSaving(true);
    try {
      await updateProfile(e as any, (session as any).user.name);
      toast("Profile updated successfully!", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="min-h-screen py-14 md:py-20 px-5">
        <div className="container mx-auto max-w-2xl">
          {/* Header */}
          <div className="mb-12 rise rise-1">
            <p className="eyebrow mb-4">settings</p>
            <h1 className="font-display font-semibold text-3xl md:text-4xl tracking-tight mb-2">
              Your dashboard
            </h1>
            <p className="text-mocha text-[15px]">
              Manage your profile and payment settings.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit as any}
            action={handleSubmit as any}
            className="rise rise-2 space-y-6"
          >
            {sections.map((section) => (
              <div key={section.title} className="card p-7">
                <div className="mb-6">
                  <h2 className="font-display font-semibold text-lg mb-1">
                    {section.title}
                  </h2>
                  <p className="text-sm text-mocha">{section.note}</p>
                </div>
                <div className="space-y-5">
                  {section.fields.map((field) => (
                    <div key={field.id}>
                      <label
                        htmlFor={field.id}
                        className="block mb-2 text-[13px] font-medium text-ink-soft"
                      >
                        {field.label}
                      </label>
                      <input
                        value={(form as any)[field.id] ?? ""}
                        onChange={handleChange}
                        type={field.type}
                        name={field.id}
                        id={field.id}
                        placeholder={field.placeholder}
                        className="field px-4 py-2.5 text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSaving}
              className="btn btn-roast w-full py-3.5 text-sm"
            >
              {isSaving ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Saving...
                </>
              ) : (
                "Save changes"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
