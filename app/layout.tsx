import './globals.css';
import type { Metadata, Viewport } from 'next';
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister';
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: 'SubAlert — Never miss a subscription',
  description: 'Track every subscription and get alerts 7, 3, and 1 days before each charge. Forward receipts to auto-detect.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'SubAlert',
  },
  icons: {
    icon: '/favicon.png',
    apple: '/icon-192.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#6d3bd7',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <ServiceWorkerRegister />
        <Analytics />
      </body>
    </html>
  );
}
