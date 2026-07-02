import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getTours } from '@/lib/content';
import { LOCALES, type Lang } from '@/lib/i18n';
import { cartUrl, paymentSuccessUrl } from '@/lib/routes';

interface CheckoutItem {
  tour: string;
  variant: string;
  date: string;
  adults: number;
  children: number;
}

interface PricedLine {
  title: string;
  variantLabel: string;
  date: string;
  adults: number;
  children: number;
  total: number;
}

const DEPOSIT_NAME: Record<Lang, string> = {
  th: 'มัดจำ 50% — การจองทัวร์ Phuket Love Paradise',
  en: '50% booking deposit — Phuket Love Paradise',
  ru: 'Депозит 50% — бронирование Phuket Love Paradise',
};

/** Re-price the cart from build data — client prices are never trusted. */
function priceItems(items: CheckoutItem[], lang: Lang): PricedLine[] {
  const tours = getTours();
  const lines: PricedLine[] = [];
  for (const item of items) {
    const tour = tours.find((t) => t.id === item.tour);
    const variant = tour?.data.variants.find((v) => v.id === item.variant);
    if (!tour || !variant) continue;
    const adults = Math.min(40, Math.max(1, Math.floor(item.adults) || 1));
    const children =
      variant.child === null ? 0 : Math.min(40, Math.max(0, Math.floor(item.children) || 0));
    lines.push({
      title: tour.data.title[lang],
      variantLabel: `${variant.group ? `${variant.group[lang]} · ` : ''}${variant.label[lang]}`,
      date: typeof item.date === 'string' ? item.date.slice(0, 10) : '',
      adults,
      children,
      total: variant.adult * adults + (variant.child ?? 0) * children,
    });
  }
  return lines;
}

export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json({ error: 'payment not configured' }, { status: 500 });
  }

  let body: { items?: CheckoutItem[]; lang?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid request' }, { status: 400 });
  }

  const lang: Lang = (LOCALES as readonly string[]).includes(body.lang ?? '')
    ? (body.lang as Lang)
    : 'th';
  const items = Array.isArray(body.items) ? body.items.slice(0, 30) : [];
  const lines = priceItems(items, lang);
  if (lines.length === 0) {
    return NextResponse.json({ error: 'empty cart' }, { status: 400 });
  }

  const total = lines.reduce((sum, l) => sum + l.total, 0);
  const depositSatang = Math.round((total * 100) / 2);

  // Order summary for staff, chunked to Stripe's 500-char metadata value limit.
  const metadata: Record<string, string> = {
    lang,
    total_thb: String(total),
    deposit_thb: String(depositSatang / 100),
  };
  lines.slice(0, 15).forEach((l, i) => {
    const text = `${l.title} | ${l.variantLabel} | ${l.date || 'no date'} | adults ${l.adults}${l.children ? `, children ${l.children}` : ''} | THB ${l.total.toLocaleString('en-US')}`;
    metadata[`order_${i + 1}`] = text.slice(0, 500);
  });
  if (lines.length > 15) metadata.order_more = `…and ${lines.length - 15} more item(s)`;

  const origin = request.headers.get('origin') ?? new URL(request.url).origin;
  const description = lines
    .map((l) => l.title)
    .join(' + ')
    .slice(0, 300);

  try {
    const stripe = new Stripe(secretKey);
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'thb',
            unit_amount: depositSatang,
            product_data: {
              name: DEPOSIT_NAME[lang],
              description,
            },
          },
        },
      ],
      phone_number_collection: { enabled: true },
      metadata,
      success_url: `${origin}${paymentSuccessUrl(lang)}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}${cartUrl(lang)}`,
    });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('stripe checkout error:', err);
    return NextResponse.json({ error: 'payment failed to start' }, { status: 500 });
  }
}
