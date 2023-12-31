import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../../src/app/globals.css";
import Footer from "../_components/footer/footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={inter.className}>
        <Toaster />
        {children}
        <Footer />
      </body>
    </html>
  );
}
