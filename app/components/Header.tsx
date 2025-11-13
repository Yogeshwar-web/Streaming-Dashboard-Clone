// app/components/Header.tsx
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-900 text-white p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/">
          <h1 className="text-2xl font-bold cursor-pointer">TMDB Netflix</h1>
        </Link>
        <nav className="space-x-4">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="#" className="hover:underline">Search</Link>
        </nav>
      </div>
    </header>
  );
}
