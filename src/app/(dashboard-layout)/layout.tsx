import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "@/components/pages/dashboard/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Settings Dashboard",
  description: "Modern settings dashboard with user permissions management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <main className="flex-1 h-screen overflow-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
