import './globals.css';

export const metadata = { title: 'SubTracker', description: 'Track subscriptions, never get surprise-charged' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen text-gray-900">{children}</body>
    </html>
  );
}
