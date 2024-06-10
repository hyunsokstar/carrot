import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Karrot Market",
    default: "Karrot Market",
  },
  description: "Sell and buy all the things!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className}
        w-full mx-auto
        bg-neutral-900
        text-white
        border-2 border-pink-500
        `
        }
      >
        <div className="border-1 border-green-500">hi2</div>
        {children}
      </body>
    </html >
  );
}
