import type { TourData } from '@/lib/content';
import type { Lang } from '@/lib/i18n';

interface Props {
  itinerary: TourData['itinerary'];
  lang: Lang;
}

export default function ItineraryList({ itinerary, lang }: Props) {
  return (
    <ul className="itin-list">
      {itinerary.map((step, i) => (
        <li key={i}>
          <span className="t">{step.time}</span>
          <span>{step.text[lang]}</span>
        </li>
      ))}
    </ul>
  );
}
