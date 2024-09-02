import type { Metadata } from "next";
import { Comfortaa } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const comfortaa =Comfortaa ({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Qualendario",
  description: "Reserve your arena",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${comfortaa.className} bg-gray flex flex-col h-screen `}>
          <Header />
          <main className="flex">
            <Sidebar/>
            {children}
          </main>
        </body>
    </html>
  );
}
