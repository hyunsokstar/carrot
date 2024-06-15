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
  //@ts-ignore
  // potato,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className}
        w-1/2 mx-auto
        bg-neutral-900
        text-white
        border-2 border-pink-500
        `
        }
      >
        {/* {potato} */}
        {children}
      </body>
    </html >
  );
}
