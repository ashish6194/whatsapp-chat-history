import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WhatsApp Chat Viewer",
  description: "View your exported WhatsApp chat history",
  robots: "index, follow",
  other: {
    "google-adsense-account": "ca-pub-1021154314438944",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#00a884",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: `try{const t=localStorage.getItem('theme');const d=t==='dark'||(t==null&&matchMedia('(prefers-color-scheme:dark)').matches);if(d)document.documentElement.classList.add('dark')}catch(e){}` }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "WhatsApp Chat Viewer",
              "url": "https://whatspp-chat-one.vercel.app",
              "description": "View, search, analyze, and export your WhatsApp chat history. Upload .txt or .zip exports and browse messages with media, bookmarks, analytics, and PDF export.",
              "applicationCategory": "UtilitiesApplication",
              "operatingSystem": "Any",
              "browserRequirements": "Requires a modern web browser",
              "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
              "featureList": [
                "WhatsApp-style chat viewer",
                "Search and filter messages",
                "Media display from .zip exports",
                "PDF export",
                "Chat analytics and statistics",
                "Message bookmarks",
                "Dark mode",
                "100% client-side processing"
              ],
            }),
          }}
        />
        {children}
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1021154314438944"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
