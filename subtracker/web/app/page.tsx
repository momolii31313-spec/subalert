import Link from 'next/link';

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-5xl font-bold mb-4">Never get surprise-charged again.</h1>
      <p className="text-xl text-gray-600 mb-8">
        Track every subscription. Get alerts 3 days before each charge.
      </p>
      <div className="flex gap-3">
        <Link href="/signup" className="bg-black text-white px-6 py-3 rounded-lg font-medium">
          Start free
        </Link>
        <Link href="/login" className="border px-6 py-3 rounded-lg font-medium">
          Log in
        </Link>
      </div>

      <div className="mt-16 grid md:grid-cols-3 gap-6">
        <Feature title="Manual or auto" body="Add subs by hand, or forward receipts and we auto-detect." />
        <Feature title="Smart alerts" body="Email reminder 3 days before any charge or trial ends." />
        <Feature title="$0 for you" body="Free for up to 10 subs. No card required." />
      </div>
    </main>
  );
}

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div className="border rounded-lg p-5 bg-white">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{body}</p>
    </div>
  );
}
