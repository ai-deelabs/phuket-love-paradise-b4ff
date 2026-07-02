import { icons, type LucideProps } from 'lucide-react';

interface Props extends LucideProps {
  name: string;
  size?: number;
}

/** kebab-case lucide name → PascalCase component key ("circle-check" → "CircleCheck"). */
const toPascal = (name: string) =>
  name.replace(/(^|-)([a-z0-9])/g, (_, __, c: string) => c.toUpperCase());

export default function Icon({ name, size = 16, ...rest }: Props) {
  const Cmp = icons[toPascal(name) as keyof typeof icons];
  if (!Cmp) throw new Error(`Unknown lucide icon: ${name}`);
  return <Cmp size={size} {...rest} />;
}
