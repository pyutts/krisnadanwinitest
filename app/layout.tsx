import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from "sonner";
import Script from 'next/script';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Krisna & Wini Wedding',
  description: 'Template DigSoft Wedding Modern 1', 
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mediaelement/7.0.2/mediaelementplayer.min.css" />
        <link rel="icon" href="/images/icon.png" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/mediaelement/7.0.2/mediaelement-and-player.min.js" strategy="beforeInteractive" />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}