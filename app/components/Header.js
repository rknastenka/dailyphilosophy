import Link from 'next/link';

export default function Header() {
  return (
    <header className="header">
      <Link href="/" className="logo">DAILY PHILOSOPHY</Link>
    </header>
  );
}
