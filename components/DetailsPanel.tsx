import type { ReactNode } from 'react';
import Icon from './Icon';

interface Props {
  icon: string;
  label: string;
  open?: boolean;
  children: ReactNode;
}

export default function DetailsPanel({ icon, label, open = false, children }: Props) {
  return (
    <details className="tdetails" open={open}>
      <summary>
        <span className="sm-l">
          <Icon name={icon} size={15} />
          <span>{label}</span>
        </span>
        <Icon name="chevron-down" size={16} className="chev" />
      </summary>
      <div className="tdetails__inner">{children}</div>
    </details>
  );
}
