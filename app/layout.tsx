import ProjectGallery from "@/components/project-gallery";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://antoo.es"),
  title: {
    default: "anto",
    template: "%s | anto",
  },
  description: DATA.description,
  openGraph: {
    title: "anto",
    description: DATA.description,
    url: "https://antoo.es",
    siteName: "anto",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    title: "anto",
    card: "summary_large_image",
  },
  icons: {
    icon: [{ url: "/icon.svg" }, { url: "/icon.png", sizes: "32x32" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body
        className={cn(
          "bg-background font-sans antialiased",
          geist.variable,
          geistMono.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
        >
          <TooltipProvider delayDuration={0}>
            <div className="flex min-h-dvh flex-col lg:grid lg:h-dvh lg:grid-cols-[minmax(0,32%)_minmax(0,68%)] lg:overflow-hidden">
              <div className="relative min-h-0 lg:h-dvh lg:overflow-y-auto">
                <div className="relative z-10 mx-auto max-w-md px-4 py-8 pb-8 sm:px-5 sm:py-12">
                  {children}
                </div>
              </div>
              <ProjectGallery />
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
