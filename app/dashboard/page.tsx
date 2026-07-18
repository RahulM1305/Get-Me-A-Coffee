import Dashboard from "@/components/Dashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard – Get Me A Coffee",
};

const DashboardPage = () => {
  return <Dashboard />;
};

export default DashboardPage;
