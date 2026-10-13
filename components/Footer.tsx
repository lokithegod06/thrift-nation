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
      <nav aria-label="Social links" className="flex items-center gap-4 mb-4 md:mb-0">
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
          title="Instagram"
          className="text-on-primary/70 hover:text-on-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-on-primary"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" />
          </svg>
        </a>
        <Link
          href="/contact"
          aria-label="Email THRIFT NATION"
          title="Email"
          className="text-on-primary/70 hover:text-on-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-on-primary"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m4 7 8 6 8-6" />
          </svg>
        </Link>
        <a
          href="https://x.com/"
          target="_blank"
          rel="noreferrer"
          aria-label="X"
          title="X"
          className="text-on-primary/70 hover:text-on-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-on-primary"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-7.5L5.4 22H2.2l7.3-8.4L1.8 2h6.5l4.4 6.9L18.9 2Zm-1.1 18h1.7L7.3 3.9H5.5L17.8 20Z" />
          </svg>
        </a>
      </nav>
      <span className="font-label-mono text-label-mono text-on-primary/60">
        ©{new Date().getFullYear()} THRIFT NATION.
      </span>
    </footer>
  );
}
