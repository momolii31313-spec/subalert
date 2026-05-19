import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="h-screen w-screen overflow-hidden bg-white text-gray-900 flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
         <Image src="/icon.svg" alt="SubAlert" width={36} height={36} />
          <div className="text-lg font-semibold tracking-tight">SubAlert</div>
        </div>
        <div className="flex items-center gap-5 text-sm">
          <Link href="/login" className="text-gray-600 hover:text-gray-900 transition">
            Log in
          </Link>
          <Link
            href="/signup"
            className="bg-gray-900 text-white px-4 py-2 rounded-full font-medium hover:bg-gray-800 transition"
          >
            Get started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 max-w-7xl mx-auto w-full px-8 grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-gray-700 text-xs font-medium mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Track every subscription
          </div>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05] mb-5">
            Never get charged
            <br />
            <span className="text-gray-400">by surprise.</span>
          </h1>
          <p className="text-lg text-gray-600 mb-7 leading-relaxed max-w-lg">
            Know when each subscription renews. Cancel what you don't need.
            All in one place.
          </p>
          <div className="flex gap-3">
            <Link
              href="/signup"
              className="bg-gray-900 text-white px-7 py-3.5 rounded-full font-medium hover:bg-gray-800 transition shadow-sm"
            >
              Start free
            </Link>
            <Link
              href="/login"
              className="px-7 py-3.5 rounded-full font-medium text-gray-900 border border-gray-200 hover:bg-gray-50 transition"
            >
              Log in
            </Link>
          </div>

          <div className="flex gap-6 mt-8 text-sm text-gray-500">
            <div className="flex items-center gap-2"><CheckIcon /> Know before you're billed</div>
<div className="flex items-center gap-2"><CheckIcon /> Spend tracker</div>
<div className="flex items-center gap-2"><CheckIcon /> Email forwarding</div>
          </div>
        </div>

        {/* RIGHT — card with bell, looping pop-in */}
        <div className="relative hidden md:flex justify-center items-center">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-transparent rounded-3xl blur-3xl" />

          <div className="relative w-80 bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 animate-float">
            {/* Bell badge — top-left */}
            <div className="absolute -top-3 -left-3 w-11 h-11 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center animate-ring origin-top z-10">
              <span className="text-xl">🔔</span>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center animate-pulse">4</span>
            </div>

            <div className="flex justify-between items-center mb-5">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Upcoming</div>
              <div className="text-xs font-medium text-gray-400">4 subs</div>
            </div>

            <div className="space-y-2.5">
              <SubRow color="bg-red-500" name="Netflix" date="May 22" price="$15.99" index={0} />
              <SubRow color="bg-green-500" name="Spotify" date="May 28" price="$9.99" index={1} />
              <SubRow color="bg-blue-500" name="iCloud+" date="Jun 3" price="$2.99" index={2} />
              <SubRow color="bg-gray-900" name="ChatGPT" date="Jun 8" price="$20.00" index={3} highlight />
            </div>

            <div className="mt-5 pt-4 border-t border-gray-100 flex justify-between items-center">
              <div className="text-xs text-gray-500">Monthly total</div>
              <div className="text-base font-semibold">$48.97</div>
            </div>
          </div>
        </div>
      </section>

      <footer className="px-8 py-4 border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs text-gray-400">
          <div>© 2026 SubAlert</div>
          <div>Made for people who hate surprises.</div>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes ring {
          0%, 60%, 100% { transform: rotate(0deg); }
          10%, 30% { transform: rotate(-18deg); }
          20%, 40% { transform: rotate(18deg); }
        }
        /* Loops every 4s: items pop in across first 1.6s, then hold, then reset */
        @keyframes pop-loop {
          0% { opacity: 0; transform: translateY(15px) scale(0.95); }
          10% { opacity: 1; transform: translateY(0) scale(1); }
          90% { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(15px) scale(0.95); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-ring { animation: ring 3s ease-in-out infinite; }
        .pop-row {
          opacity: 0;
          animation: pop-loop 4s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}

function SubRow({
  color, name, date, price, highlight, index,
}: { color: string; name: string; date: string; price: string; highlight?: boolean; index: number }) {
  return (
    <div
      className={`pop-row flex items-center justify-between p-2.5 rounded-xl ${highlight ? 'bg-gray-50' : ''}`}
      style={{ animationDelay: `${index * 0.4}s` }}
    >
      <div className="flex items-center gap-2.5">
        <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center text-white text-xs font-bold`}>
          {name[0]}
        </div>
        <div>
          <div className="text-sm font-medium text-gray-900">{name}</div>
          <div className="text-xs text-gray-500">{date}</div>
        </div>
      </div>
      <div className="text-sm font-semibold text-gray-900">{price}</div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}
