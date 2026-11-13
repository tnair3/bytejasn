import type { Metadata } from "next";
import { Comfortaa, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { TransitionProvider } from "@/components/transition-provider";
import ThemeToggle from "@/components/theme-toggle";

// Runs before first paint so there's no flash of the wrong theme.
// Uses the saved choice, otherwise the system preference.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}`;

const comfortaa = Comfortaa({
  subsets: ["latin"],
  variable: "--font-comfortaa",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "tejas nair | software, music, and photography",
    template: "%s · tejas nair",
  },
  description:
    "Portfolio of Tejas Nair: projects, photography, music and more.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${comfortaa.variable} ${jetbrainsMono.variable} flex min-h-dvh flex-col font-sans antialiased`}
      >
        <TransitionProvider>
          {/* The navbar hides itself on the landing page */}
          <Navbar />
          <main className="flex flex-1 flex-col">{children}</main>
          <ThemeToggle />
        </TransitionProvider>
      </body>
    </html>
  );
}
