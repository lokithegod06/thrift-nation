import type { Metadata } from 'next';
import { InfoPage, InfoSection } from '@/components/InfoPage';

export const metadata: Metadata = { title: 'Shipping | THRIFT NATION' };

export default function ShippingPage() {
  return (
    <InfoPage eyebrow="From seller to you" title="Shipping" intro="THRIFT NATION connects buyers with independent sellers. Sellers prepare and ship the items they list, so delivery arrangements can vary from one order to another.">
      <InfoSection title="Before you order">
        <p>Check the item listing and the information shown during checkout. Make sure your name, phone number, address, and PIN code are correct; incomplete or incorrect details can delay delivery.</p>
      </InfoSection>
      <InfoSection title="After checkout">
        <p>Your order appears in the Orders area of your account, where you can check its current status. The seller is responsible for preparing the item and updating its status as it moves through fulfillment.</p>
        <p>Delivery timelines, carrier details, shipping charges, and serviceable locations are not currently specified as a standard site-wide policy. Confirm any order-specific arrangement with the seller before purchasing.</p>
      </InfoSection>
      <InfoSection title="Delivery issues">
        <p>If an order is delayed or the delivery details need correction, check the order status in your account and keep the order information handy. THRIFT NATION does not currently provide a built-in seller messaging feature or a published support contact.</p>
      </InfoSection>
      <p className="border-t border-primary pt-5 font-label-mono text-label-mono uppercase text-secondary">Last updated: September 25, 2026</p>
    </InfoPage>
  );
}
