import type { Metadata } from 'next';
import { InfoPage, InfoSection } from '@/components/InfoPage';

export const metadata: Metadata = { title: 'Terms | THRIFT NATION' };

export default function TermsPage() {
  return (
    <InfoPage eyebrow="The fine print" title="Terms of use" intro="These terms describe the basic rules for using THRIFT NATION, a marketplace where independent sellers list pre-owned clothing and accessories. By using the site, you agree to follow them.">
      <InfoSection title="Using the marketplace">
        <p>Use the site lawfully and provide accurate information when you create an account, publish a listing, or place an order. Keep your sign-in details secure and tell us if you believe your account has been accessed without permission.</p>
        <p>Listings are provided by their sellers. Sellers are responsible for the accuracy of their descriptions, photos, sizing, condition, and availability. Please review a listing carefully before ordering.</p>
      </InfoSection>
      <InfoSection title="Orders and payments">
        <p>When you place an order, you agree to provide complete and accurate delivery details. Orders and their status are shown in your account. An order may be affected if an item is no longer available or the seller cannot fulfill it.</p>
        <p>Any price and payment details shown at checkout apply to that order. Questions about an item should be directed to the seller where contact options are available.</p>
      </InfoSection>
      <InfoSection title="Listings and site access">
        <p>Do not post illegal, misleading, infringing, or harmful content. We may remove content or restrict access when needed to protect people, the marketplace, or the operation of the site.</p>
        <p>The site is provided as available. Features may change as THRIFT NATION develops.</p>
      </InfoSection>
      <p className="border-t border-primary pt-5 font-label-mono text-label-mono uppercase text-secondary">Last updated: September 25, 2026</p>
    </InfoPage>
  );
}
