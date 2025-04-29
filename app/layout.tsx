// layout.tsx or layout.js
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`} >
        <div className="overflow-x-hidden">
        {children}
        </div>
      </body>
    </html>
  );
}
