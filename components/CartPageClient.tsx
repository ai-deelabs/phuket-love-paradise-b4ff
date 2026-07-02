'use client';

// Cart page renderer + checkout composer. All prices/titles come from the
// build-emitted catalog payload passed as props, never from localStorage.
import { useEffect, useState } from 'react';
import { CreditCard, ShoppingCart } from 'lucide-react';
import { clearCart, getCart, removeItem, updateItem, type CartItem } from '@/lib/cart';
import { formatBaht } from '@/lib/images';

export interface CatalogVariant {
  label: string;
  adult: number;
  child: number | null;
  adultLabel: string;
  childLabel: string;
}
export interface CatalogTour {
  title: string;
  url: string;
  img: string;
  variants: Record<string, CatalogVariant>;
}
export interface CartConfig {
  lang: string;
  lineId: string;
  waNumber: string;
  email: string;
  browseUrl: string;
  ui: Record<string, string>;
}

interface Props {
  catalog: Record<string, CatalogTour>;
  config: CartConfig;
}

interface Line {
  item: CartItem;
  tour: CatalogTour;
  variant: CatalogVariant;
  total: number;
}

const fmt = formatBaht;

function Stepper({
  value,
  min,
  label,
  onChange,
}: {
  value: number;
  min: number;
  label: string;
  onChange: (next: number) => void;
}) {
  return (
    <div className="stepper">
      <button type="button" onClick={() => onChange(Math.max(min, value - 1))}>
        −
      </button>
      <span className="val">{value}</span>
      <button type="button" onClick={() => onChange(Math.min(40, value + 1))}>
        +
      </button>
      <span className="who">{label}</span>
    </div>
  );
}

export default function CartPageClient({ catalog, config }: Props) {
  const ui = (key: string) => config.ui[key] ?? key;

  // Hydration guard: the server renders an empty list; the cart only loads
  // client-side in the effect below. `null` = not yet read from localStorage.
  const [items, setItems] = useState<CartItem[] | null>(null);
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState(false);

  useEffect(() => {
    const refresh = () => {
      const all = getCart().items;
      // stale entries from an older catalog — drop them silently
      const stale = all.filter((i) => !catalog[i.tour]?.variants[i.variant]);
      for (const i of stale) removeItem(i.id);
      setItems(all.filter((i) => catalog[i.tour]?.variants[i.variant]));
    };
    document.addEventListener('cart:change', refresh);
    window.addEventListener('storage', refresh);
    refresh();
    return () => {
      document.removeEventListener('cart:change', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, [catalog]);

  const rows: Line[] = (items ?? []).map((item) => {
    const tour = catalog[item.tour];
    const variant = tour.variants[item.variant];
    const total = variant.adult * item.adults + (variant.child ?? 0) * item.children;
    return { item, tour, variant, total };
  });

  function composeMessage(compact: boolean): string {
    const parts: string[] = [ui('msg.heading'), ''];
    rows.forEach((l, i) => {
      parts.push(`${i + 1}) ${l.tour.title}`);
      const bits = [
        `${ui('msg.program')}: ${l.variant.label}`,
        `${ui('msg.date')}: ${l.item.date || ui('msg.noDate')}`,
        `${ui('msg.adults')}: ${l.item.adults}${compact ? '' : ` × ${fmt(l.variant.adult)}`}`,
      ];
      if (l.item.children > 0 && l.variant.child !== null) {
        bits.push(
          `${ui('msg.children')}: ${l.item.children}${compact ? '' : ` × ${fmt(l.variant.child)}`}`,
        );
      }
      parts.push(`   ${bits.join(' | ')}`);
      if (!compact) parts.push(`   ${ui('msg.subtotal')}: ${fmt(l.total)}`);
    });
    const grand = rows.reduce((s, l) => s + l.total, 0);
    parts.push('', `${ui('msg.total')}: ${fmt(grand)}`, '', `${ui('msg.name')}: `, `${ui('msg.hotel')}: `, '', ui('msg.footer'));
    return parts.join('\n');
  }

  function checkoutMessage(): string {
    const full = composeMessage(false);
    // LINE deep links break on very long URLs — fall back to a compact message.
    return encodeURIComponent(full).length > 1800 ? composeMessage(true) : full;
  }

  const loaded = items !== null;
  const isEmpty = loaded && rows.length === 0;
  const grand = rows.reduce((s, l) => s + l.total, 0);
  const deposit = grand / 2;
  const msg = checkoutMessage();

  async function payDeposit() {
    setPaying(true);
    setPayError(false);
    try {
      const res = await fetch('/api/checkout/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, lang: config.lang }),
      });
      const data = (await res.json()) as { url?: string };
      if (!res.ok || !data.url) throw new Error('checkout failed');
      // cart is NOT cleared here — the customer may cancel and come back;
      // the success page clears it after payment.
      window.location.href = data.url;
    } catch {
      setPayError(true);
      setPaying(false);
    }
  }

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().slice(0, 10);

  return (
    <>
      <div className="cartpg__grid" id="cartRoot" hidden={isEmpty}>
        <div className="cart-list" id="cartList">
          {rows.map((l) => (
            <div className="cart-item" key={l.item.id}>
              <img className="cart-item__pic" src={l.tour.img} alt={l.tour.title} />
              <div className="cart-item__bd">
                <h3>
                  <a href={l.tour.url}>{l.tour.title}</a>
                </h3>
                <div className="cart-item__var">{l.variant.label}</div>
                <div className="cart-item__ctl">
                  <Stepper
                    value={l.item.adults}
                    min={1}
                    label={l.variant.adultLabel}
                    onChange={(n) => updateItem(l.item.id, { adults: n })}
                  />
                  {l.variant.child !== null && (
                    <Stepper
                      value={l.item.children}
                      min={0}
                      label={l.variant.childLabel}
                      onChange={(n) => updateItem(l.item.id, { children: n })}
                    />
                  )}
                  <span className="cart-item__date">
                    <input
                      type="date"
                      value={l.item.date}
                      aria-label={ui('common.date')}
                      min={minDate}
                      onChange={(e) => updateItem(l.item.id, { date: e.target.value })}
                    />
                  </span>
                </div>
              </div>
              <div className="cart-item__end">
                <span className="cart-item__amt">{fmt(l.total)}</span>
                <button type="button" className="cart-item__rm" onClick={() => removeItem(l.item.id)}>
                  ✕ {ui('cart.remove')}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-sum" id="cartSum" hidden={rows.length === 0}>
          {rows.length > 0 && (
            <>
              <h2>{ui('cart.summary')}</h2>
              {rows.map((l) => (
                <div className="cart-sum__row" key={l.item.id}>
                  <span>{`${l.tour.title} × ${l.item.adults + l.item.children}`}</span>
                  <span>{fmt(l.total)}</span>
                </div>
              ))}
              <div className="cart-sum__total">
                <span className="lbl">{ui('cart.grandTotal')}</span>
                <span className="amt">{fmt(grand)}</span>
              </div>
              <div className="cart-sum__row cart-sum__deposit">
                <span>{ui('cart.deposit')}</span>
                <span>{fmt(deposit)}</span>
              </div>
              <div className="cart-sum__btns">
                <a
                  className="btn-line"
                  href={`https://line.me/R/oaMessage/${encodeURIComponent(config.lineId)}/?${encodeURIComponent(msg)}`}
                  target="_blank"
                  rel="noopener"
                >
                  {ui('cart.checkoutLine')}
                </a>
                <a
                  className="btn-wa"
                  href={`https://wa.me/${config.waNumber}?text=${encodeURIComponent(msg)}`}
                  target="_blank"
                  rel="noopener"
                >
                  {ui('cart.checkoutWa')}
                </a>
              </div>
              <p className="cart-sum__alt">
                <a
                  href={`mailto:${config.email}?subject=${encodeURIComponent(ui('msg.heading'))}&body=${encodeURIComponent(msg)}`}
                >
                  {ui('cart.checkoutMail')}
                </a>
              </p>
              <p className="cart-sum__or">{ui('cart.or')}</p>
              <div className="cart-sum__btns">
                <button type="button" className="btn-pay" onClick={payDeposit} disabled={paying}>
                  <CreditCard size={17} />
                  {paying ? '…' : `${ui('cart.payDeposit')} — ${fmt(deposit)}`}
                </button>
              </div>
              {payError && <p className="cart-pay-err">{ui('cart.payError')}</p>}
              <p className="cart-note">{ui('cart.payNote')}</p>
              <p className="cart-note">{ui('cart.note')}</p>
              <p className="cart-sum__alt">
                {ui('cart.sent')}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    clearCart();
                  }}
                >
                  {ui('cart.clear')}
                </a>
              </p>
            </>
          )}
        </div>
      </div>
      <div className="cart-empty" id="cartEmpty" hidden={!isEmpty}>
        <ShoppingCart size={40} />
        <p>{ui('cart.empty')}</p>
        <a className="btn-gold" href={config.browseUrl}>
          {ui('cart.browse')}
        </a>
      </div>
    </>
  );
}
