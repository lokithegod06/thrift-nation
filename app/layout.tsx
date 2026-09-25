import type { Metadata } from 'next';
import './globals.css';
import TopNav from '@/components/TopNav';
import MobileNav from '@/components/MobileNav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'THRIFT NATION — The Underground Marketplace',
  description: 'Instagram-style social thrift marketplace. Curated vintage & streetwear.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="bg-surface text-on-surface">
        <TopNav />
        <main className="pt-20 pb-24 md:pb-0 min-h-screen">{children}</main>
        <Footer />
        <MobileNav />
      </body>
    </html>
  );
}