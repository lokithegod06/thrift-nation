import Link from 'next/link';

export default function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface border-t border-primary flex justify-around items-center z-50">
      {[
        { href: '/', icon: 'home' },
        { href: '/discover', icon: 'explore' },
        { href: '/drop', icon: 'add_box' },
        { href: '/orders', icon: 'receipt_long' },
        { href: '/profile', icon: 'person' },
      ].map((i) => (
        <Link key={i.href} href={i.href} className="flex flex-col items-center justify-center p-2">
          <span className="material-symbols-outlined text-primary">{i.icon}</span>
        </Link>
      ))}
    </nav>
  );
}