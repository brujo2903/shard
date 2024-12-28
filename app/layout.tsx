import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { BackgroundProvider } from '@/components/layout/BackgroundProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'shard',
  description: 'Create, customize, and deploy AI agents with ease using Shard.',
  icons: {
    icon: [
      {
        url: 'https://i.imgur.com/L2fOzwL.png',
        href: 'https://i.imgur.com/L2fOzwL.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="https://i.imgur.com/L2fOzwL.png" />
      </head>
      <body suppressHydrationWarning className={inter.className}>
        <BackgroundProvider>
          <Header />
          {children}
        </BackgroundProvider>
      </body>
    </html>
  );
}