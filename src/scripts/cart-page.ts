// Cart page renderer + checkout composer. All prices/titles come from the
// build-emitted catalog JSON embedded in the page, never from localStorage.
import { clearCart, getCart, removeItem, updateItem, type CartItem } from './cart';

interface CatalogVariant {
  label: string;
  adult: number;
  child: number | null;
  adultLabel: string;
  childLabel: string;
}
interface CatalogTour {
  title: string;
  url: string;
  img: string;
  variants: Record<string, CatalogVariant>;
}
interface Config {
  lang: string;
  lineId: string;
  waNumber: string;
  email: string;
  browseUrl: string;
  ui: Record<string, string>;
}

const catalog = JSON.parse(document.getElementById('plp-catalog')!.textContent!) as Record<
  string,
  CatalogTour
>;
const config = JSON.parse(document.getElementById('plp-config')!.textContent!) as Config;
const ui = (key: string) => config.ui[key] ?? key;

const listEl = document.getElementById('cartList')!;
const sumEl = document.getElementById('cartSum')!;
const emptyEl = document.getElementById('cartEmpty')!;
const rootEl = document.getElementById('cartRoot')!;

const fmt = (n: number) => `฿${n.toLocaleString('en-US')}`;

interface Line {
  item: CartItem;
  tour: CatalogTour;
  variant: CatalogVariant;
  total: number;
}

function lines(): Line[] {
  const out: Line[] = [];
  for (const item of getCart().items) {
    const tour = catalog[item.tour];
    const variant = tour?.variants[item.variant];
    if (!tour || !variant) {
      // stale entry from an older catalog — drop it silently
      removeItem(item.id);
      continue;
    }
    const total = variant.adult * item.adults + (variant.child ?? 0) * item.children;
    out.push({ item, tour, variant, total });
  }
  return out;
}

function stepper(value: number, min: number, label: string, onChange: (next: number) => void) {
  const wrap = document.createElement('div');
  wrap.className = 'stepper';
  const minus = document.createElement('button');
  minus.type = 'button';
  minus.textContent = '−';
  const val = document.createElement('span');
  val.className = 'val';
  val.textContent = String(value);
  const plus = document.createElement('button');
  plus.type = 'button';
  plus.textContent = '+';
  const who = document.createElement('span');
  who.className = 'who';
  who.textContent = label;
  minus.addEventListener('click', () => onChange(Math.max(min, value - 1)));
  plus.addEventListener('click', () => onChange(Math.min(40, value + 1)));
  wrap.append(minus, val, plus, who);
  return wrap;
}

function composeMessage(rows: Line[], compact: boolean): string {
  const parts: string[] = [ui('msg.heading'), ''];
  rows.forEach((l, i) => {
    parts.push(`${i + 1}) ${l.tour.title}`);
    const bits = [
      `${ui('msg.program')}: ${l.variant.label}`,
      `${ui('msg.date')}: ${l.item.date || ui('msg.noDate')}`,
      `${ui('msg.adults')}: ${l.item.adults}${compact ? '' : ` × ${fmt(l.variant.adult)}`}`,
    ];
    if (l.item.children > 0 && l.variant.child !== null) {
      bits.push(`${ui('msg.children')}: ${l.item.children}${compact ? '' : ` × ${fmt(l.variant.child)}`}`);
    }
    parts.push(`   ${bits.join(' | ')}`);
    if (!compact) parts.push(`   ${ui('msg.subtotal')}: ${fmt(l.total)}`);
  });
  const grand = rows.reduce((s, l) => s + l.total, 0);
  parts.push('', `${ui('msg.total')}: ${fmt(grand)}`, '', `${ui('msg.name')}: `, `${ui('msg.hotel')}: `, '', ui('msg.footer'));
  return parts.join('\n');
}

function checkoutMessage(rows: Line[]): string {
  const full = composeMessage(rows, false);
  // LINE deep links break on very long URLs — fall back to a compact message.
  return encodeURIComponent(full).length > 1800 ? composeMessage(rows, true) : full;
}

function render(): void {
  const rows = lines();

  if (rows.length === 0) {
    rootEl.hidden = true;
    emptyEl.hidden = false;
    return;
  }
  rootEl.hidden = false;
  emptyEl.hidden = true;
  sumEl.hidden = false;

  listEl.textContent = '';
  for (const l of rows) {
    const card = document.createElement('div');
    card.className = 'cart-item';

    const pic = document.createElement('img');
    pic.className = 'cart-item__pic';
    pic.src = l.tour.img;
    pic.alt = l.tour.title;

    const bd = document.createElement('div');
    bd.className = 'cart-item__bd';
    const h3 = document.createElement('h3');
    const a = document.createElement('a');
    a.href = l.tour.url;
    a.textContent = l.tour.title;
    h3.append(a);
    const varEl = document.createElement('div');
    varEl.className = 'cart-item__var';
    varEl.textContent = l.variant.label;

    const ctl = document.createElement('div');
    ctl.className = 'cart-item__ctl';
    ctl.append(
      stepper(l.item.adults, 1, l.variant.adultLabel, (n) => updateItem(l.item.id, { adults: n })),
    );
    if (l.variant.child !== null) {
      ctl.append(
        stepper(l.item.children, 0, l.variant.childLabel, (n) =>
          updateItem(l.item.id, { children: n }),
        ),
      );
    }
    const dateWrap = document.createElement('span');
    dateWrap.className = 'cart-item__date';
    const date = document.createElement('input');
    date.type = 'date';
    date.value = l.item.date;
    date.setAttribute('aria-label', ui('common.date'));
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    date.min = tomorrow.toISOString().slice(0, 10);
    date.addEventListener('change', () => updateItem(l.item.id, { date: date.value }));
    dateWrap.append(date);
    ctl.append(dateWrap);

    bd.append(h3, varEl, ctl);

    const end = document.createElement('div');
    end.className = 'cart-item__end';
    const amt = document.createElement('span');
    amt.className = 'cart-item__amt';
    amt.textContent = fmt(l.total);
    const rm = document.createElement('button');
    rm.type = 'button';
    rm.className = 'cart-item__rm';
    rm.textContent = `✕ ${ui('cart.remove')}`;
    rm.addEventListener('click', () => removeItem(l.item.id));
    end.append(amt, rm);

    card.append(pic, bd, end);
    listEl.append(card);
  }

  // summary panel
  sumEl.textContent = '';
  const h2 = document.createElement('h2');
  h2.textContent = ui('cart.summary');
  sumEl.append(h2);
  for (const l of rows) {
    const row = document.createElement('div');
    row.className = 'cart-sum__row';
    const name = document.createElement('span');
    name.textContent = `${l.tour.title} × ${l.item.adults + l.item.children}`;
    const price = document.createElement('span');
    price.textContent = fmt(l.total);
    row.append(name, price);
    sumEl.append(row);
  }
  const grand = rows.reduce((s, l) => s + l.total, 0);
  const totalRow = document.createElement('div');
  totalRow.className = 'cart-sum__total';
  const lbl = document.createElement('span');
  lbl.className = 'lbl';
  lbl.textContent = ui('cart.grandTotal');
  const amt = document.createElement('span');
  amt.className = 'amt';
  amt.textContent = fmt(grand);
  totalRow.append(lbl, amt);
  sumEl.append(totalRow);

  const msg = checkoutMessage(rows);
  const btns = document.createElement('div');
  btns.className = 'cart-sum__btns';
  const lineBtn = document.createElement('a');
  lineBtn.className = 'btn-line';
  lineBtn.href = `https://line.me/R/oaMessage/${encodeURIComponent(config.lineId)}/?${encodeURIComponent(msg)}`;
  lineBtn.target = '_blank';
  lineBtn.rel = 'noopener';
  lineBtn.textContent = ui('cart.checkoutLine');
  const waBtn = document.createElement('a');
  waBtn.className = 'btn-wa';
  waBtn.href = `https://wa.me/${config.waNumber}?text=${encodeURIComponent(msg)}`;
  waBtn.target = '_blank';
  waBtn.rel = 'noopener';
  waBtn.textContent = ui('cart.checkoutWa');
  btns.append(lineBtn, waBtn);
  sumEl.append(btns);

  const alt = document.createElement('p');
  alt.className = 'cart-sum__alt';
  const mail = document.createElement('a');
  mail.href = `mailto:${config.email}?subject=${encodeURIComponent(ui('msg.heading'))}&body=${encodeURIComponent(msg)}`;
  mail.textContent = ui('cart.checkoutMail');
  alt.append(mail);
  sumEl.append(alt);

  const note = document.createElement('p');
  note.className = 'cart-note';
  note.textContent = ui('cart.note');
  sumEl.append(note);

  const sent = document.createElement('p');
  sent.className = 'cart-sum__alt';
  sent.append(document.createTextNode(ui('cart.sent')));
  const clear = document.createElement('a');
  clear.href = '#';
  clear.textContent = ui('cart.clear');
  clear.addEventListener('click', (e) => {
    e.preventDefault();
    clearCart();
  });
  sent.append(clear);
  sumEl.append(sent);
}

document.addEventListener('cart:change', render);
window.addEventListener('storage', render);
render();
