import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from "sonner";


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Chrisna & Wini Wedding',
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
        <link rel="icon" href="/images/icon.png" />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}