import type { Metadata } from 'next';
import { InfoPage, InfoSection } from '@/components/InfoPage';

export const metadata: Metadata = { title: 'Privacy | THRIFT NATION' };

export default function PrivacyPage() {
  return (
    <InfoPage eyebrow="Your information" title="Privacy" intro="This page explains the information THRIFT NATION uses to run the marketplace and what is visible to other people using it.">
      <InfoSection title="Information you provide">
        <p>When you sign in or use marketplace features, information may include your account details, username, public profile, product listings, and order details. To place an order, you may provide delivery details such as your name, phone number, and address.</p>
      </InfoSection>
      <InfoSection title="How information is used">
        <p>We use account and listing information to operate profiles, show products and stores, and support orders. Order information is used to record purchases and show order status to the relevant buyer and seller.</p>
        <p>Public profile details and listings can be viewed by visitors. Delivery information is intended for fulfilling the relevant order and is not displayed as public profile information.</p>
      </InfoSection>
      <InfoSection title="Storage and your choices">
        <p>THRIFT NATION uses Supabase for account and marketplace data. Information is retained as needed to provide the service and maintain order records. You can review and update profile details through your account where those controls are available.</p>
        <p>A request to remove account information may affect order records or the ability to use marketplace features. The project does not currently publish a dedicated privacy contact address.</p>
      </InfoSection>
      <p className="border-t border-primary pt-5 font-label-mono text-label-mono uppercase text-secondary">Last updated: September 25, 2026</p>
    </InfoPage>
  );
}
