import type { Metadata } from "next";
import { COMPANY_NAME } from "../constants";
import { Raleway } from "next/font/google";
import "./globals.css";

const raleway = Raleway({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: COMPANY_NAME,
  description: `Inventory Management for ${COMPANY_NAME}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-zinc-200 ${raleway.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
