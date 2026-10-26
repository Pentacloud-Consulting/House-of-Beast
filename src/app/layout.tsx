import type { Metadata } from "next";
import { Bodoni_Moda, Space_Grotesk, Inter } from "next/font/google";
import "@/app/globals.css";
import { AudioProvider } from "@/context/AudioContext";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { GrainOverlay } from "@/components/layout/GrainOverlay";
import { Navbar } from "@/components/layout/Navbar";
import { AudioPlayer } from "@/components/layout/AudioPlayer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  display: "swap"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap"
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  title: "HOUSE OF BEATS // Music-Led Lifestyle Brand",
  description:
    "We are not a classic hotel. We are more than a hotel. A music-led lifestyle brand. #FINDTHEBEAT",
  keywords: ["House of Beats", "Music Hotel", "Lifestyle Brand", "Berlin", "Amsterdam", "DJs", "Culture"]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bodoniModa.variable} ${spaceGrotesk.variable} ${inter.variable} dark`}
    >
      <body className="bg-black text-white selection:bg-[--mint] selection:text-black antialiased relative">
        <AudioProvider>
          <SmoothScroll>
            <ScrollProgress />
            <GrainOverlay />
            <Navbar />
            <main className="relative z-10">{children}</main>
            <AudioPlayer />
            <CustomCursor />
          </SmoothScroll>
        </AudioProvider>
      </body>
    </html>
  );
}
