interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <ol className="crumbs">
      {items.map((c, i) => (
        <li key={i}>{c.href ? <a href={c.href}>{c.label}</a> : c.label}</li>
      ))}
    </ol>
  );
}
