import type { Metadata } from "next";
import { Comfortaa } from "next/font/google";
import "../../globals.css";


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
      <body className={`${comfortaa.className} bg-dark flex flex-col h-screen p-10`}>
          <main className="h-full">
          {children}
          </main>
        </body>
    </html>
  );
}
