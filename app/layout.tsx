import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useState } from "react";
import NavBar from "./components/NavBar/NavBar";
import { Providers } from "./providers";
import "./styles/globals.css";
// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clash Of Codes",
  description: "The Live Coding Competition",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="nav">
            <NavBar />
          </div>
          <div id="root">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
