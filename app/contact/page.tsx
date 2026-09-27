import type { Metadata } from 'next';
import Link from 'next/link';
import { InfoPage, InfoSection } from '@/components/InfoPage';

export const metadata: Metadata = { title: 'Contact | THRIFT NATION' };

export default function ContactPage() {
  return (
    <InfoPage eyebrow="Get in touch" title="Contact" intro="Need help with a listing or an order? Start with the store that listed the item, and include the order or product details so they can identify it.">
      <InfoSection title="Order questions">
        <p>Sign in and open your Orders page to find the order status and details. For item-specific questions or delivery arrangements, contact the seller using the contact method available on their store.</p>
        <p><Link href="/orders" className="font-label-mono text-label-mono uppercase underline underline-offset-4">View your orders</Link></p>
      </InfoSection>
      <InfoSection title="Account questions">
        <p>Sign in to manage your profile and store information. If you cannot access your account, the site currently has no published support email or contact form.</p>
        <p><Link href="/login" className="font-label-mono text-label-mono uppercase underline underline-offset-4">Go to sign in</Link></p>
      </InfoSection>
    </InfoPage>
  );
}
