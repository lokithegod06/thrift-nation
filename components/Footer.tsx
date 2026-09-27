import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full py-8 px-4 md:px-12 flex flex-col md:flex-row justify-between items-center uppercase bg-primary text-on-primary border-t border-primary">
      <span className="font-headline-md text-headline-md mb-4 md:mb-0">THRIFT NATION</span>
      <div className="flex gap-6 mb-4 md:mb-0">
        {[
          ['TERMS', '/terms'],
          ['PRIVACY', '/privacy'],
          ['SHIPPING', '/shipping'],
          ['CONTACT', '/contact'],
        ].map(([label, href]) => (
          <Link key={href} href={href} className="font-label-mono text-label-mono text-on-primary/70 hover:text-on-primary">
            {label}
          </Link>
        ))}
      </div>
      <span className="font-label-mono text-label-mono text-on-primary/60">
        ©{new Date().getFullYear()} THRIFT NATION.
      </span>
    </footer>
  );
}
