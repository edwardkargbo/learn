import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import LightRay from "@/Components/LightRays";
import { Navbar } from "@/Components/navbar";
import MasterNav from "@/Components/masternav";
import Footer from "@/Components/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "University Website",
  description: "This is a university website built with Next.js and React.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <body>
        <nav>
          {/* <LightRay
            raysOrigin="top-center"
            raysColor=""
            raysSpeed={9}
            lightSpread={0.8}
            rayLength={1}
            followMouse={true}
            mouseInfluence={0.1}
            fadeDistance={1}
            saturation={1}
            noiseAmount={0}
            distortion={0}
            pulsating={false}
          /> */}
          <MasterNav />
          <Navbar />
        </nav>

        <main> {children}</main>
        {/* <footer className="relative flex items-center justify-center w-full h-32 bg-linear-to-b from-[#2e026d] to-[#15162c] text-white">
          <LightRay
            raysOrigin="top-center"
            raysColor=""
            raysSpeed={9}
            lightSpread={0.8}
            rayLength={1}
            followMouse={true}
            mouseInfluence={0.1}
            fadeDistance={1}
            saturation={1}
            noiseAmount={0}
            distortion={0}
            pulsating={false}
          />
          <section>
            <h1>Welcome to My App </h1>
          </section>
        </footer> */}
        <Footer />
      </body>
    </html>
  );
}
