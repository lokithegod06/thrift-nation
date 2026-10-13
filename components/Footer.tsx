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
          href="https://www.instagram.com/thrift_nation_in/"
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
        <a
          href="mailto:contactthriftnation.in@gmail.com"
          aria-label="Email contactthriftnation.in@gmail.com"
          title="Email"
          className="text-on-primary/70 hover:text-on-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-on-primary"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m4 7 8 6 8-6" />
          </svg>
        </a>
        <a
          href="https://www.linkedin.com/company/thriftnation/"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          title="LinkedIn"
          className="text-on-primary/70 hover:text-on-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-on-primary"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45z" />
          </svg>
        </a>
        <a
          href="https://x.com/THRIFTNATIONIN"
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
