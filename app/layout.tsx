import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Accumulate Lite Client",
  description: "Cryptographically verify any blockchain account in milliseconds. 99.8% less storage. 95% less bandwidth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}