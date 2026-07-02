// Wave separators between sections, ported verbatim from the legacy design.
interface Props {
  /** CSS background of the strip (the section colour it sits on top of). */
  bg: string;
  /** Fill colour of the wave path (the neighbouring section colour). */
  fill: string;
  /** Path shape variant used across the legacy page. */
  shape?: 'hero' | 'dip' | 'rise' | 'rise-wide' | 'cap';
}

const paths: Record<string, string[]> = {
  hero: [
    'M0,0 L0,36 C240,72 480,0 720,36 C960,72 1200,0 1440,36 L1440,0 Z',
    'M0,72 L1440,72 L1440,36 C1200,0 960,72 720,36 C480,0 240,72 0,36 Z',
  ],
  dip: ['M0,0 C360,70 1080,0 1440,70 L1440,70 L0,70 Z'],
  rise: ['M0,70 C360,0 1080,70 1440,0 L1440,70 L0,70 Z'],
  'rise-wide': ['M0,70 C480,0 960,70 1440,0 L1440,70 L0,70 Z'],
  cap: ['M0,0 C360,70 1080,0 1440,70 L1440,0 L0,0 Z'],
};

export default function WaveSep({ bg, fill, shape = 'dip' }: Props) {
  const viewBox = shape === 'hero' ? '0 0 1440 72' : '0 0 1440 70';
  return (
    <div className="wsep" style={{ background: bg }}>
      <svg viewBox={viewBox} preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        {paths[shape].map((d) => (
          <path key={d} d={d} fill={fill} />
        ))}
      </svg>
    </div>
  );
}
