import React from "react";
import PaymentPage from "@/components/PaymentPage";
import { notFound } from "next/navigation";
import connectDb from "@/db/connectDb";
import User from "@/models/User";

interface UsernamePageProps {
  // In Next.js 15+, dynamic route params are async and must be awaited
  params: Promise<{ username: string }>;
}

const UsernamePage = async ({ params }: UsernamePageProps) => {
  const { username } = await params;

  await connectDb();
  const u = await (User as any).findOne({ username });
  if (!u) return notFound();

  return <PaymentPage username={username} />;
};

export default UsernamePage;

export async function generateMetadata({ params }: UsernamePageProps) {
  const { username } = await params;
  return {
    title: `Support ${username} – Get Me A Coffee`,
    description: `Buy ${username} a coffee and support their creative work.`,
  };
}
