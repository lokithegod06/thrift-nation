import type { ReactNode } from 'react';

export function InfoPage({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto max-w-4xl px-4 py-12 md:px-12 md:py-20">
      <p className="font-label-mono text-label-mono uppercase text-secondary">{eyebrow}</p>
      <h1 className="mt-3 border-b border-primary pb-6 font-display-lg text-headline-lg uppercase md:text-display-lg">
        {title}
      </h1>
      <p className="mt-8 max-w-3xl font-body-lg text-body-lg">{intro}</p>
      <div className="mt-10 space-y-8">{children}</div>
    </article>
  );
}

export function InfoSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-headline-md text-headline-md uppercase">{title}</h2>
      <div className="mt-3 space-y-3 text-secondary leading-7">{children}</div>
    </section>
  );
}
