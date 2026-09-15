import type { Metadata } from "next";
import { AppShell } from "@/components/layout/app-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: "AHS Sales & Reservations Hub",
  description:
    "Internal management hub for sales, 1:1s, reservations, and goals.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-[#d5dcc8] selection:text-[#1c2217]">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
