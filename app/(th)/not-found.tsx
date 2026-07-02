import type { Metadata } from 'next';
import { catalogUrl } from '@/lib/routes';

export const metadata: Metadata = {
  title: 'ไม่พบหน้านี้ | Phuket Love Paradise',
  description: 'ไม่พบหน้าที่คุณต้องการ',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="sec" style={{ paddingTop: '9rem', textAlign: 'center', minHeight: '60vh' }}>
      <div className="container">
        <div className="sec-label center">404</div>
        <h1 className="sec-title">ไม่พบหน้านี้ — Page Not Found</h1>
        <p className="sec-desc" style={{ margin: '0 auto 2rem' }}>
          หน้าที่คุณกำลังมองหาอาจถูกย้ายหรือไม่มีอยู่ · The page you are looking for may have moved.
        </p>
        <a className="btn-navy" href={catalogUrl('th')}>
          ดูทัวร์ทั้งหมด · View All Tours
        </a>
      </div>
    </section>
  );
}
