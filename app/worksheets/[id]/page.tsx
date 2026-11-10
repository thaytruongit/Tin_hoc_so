import { MOCK_WORKSHEETS } from '@/lib/mock-data';
import WorksheetClient from './WorksheetClient';

export function generateStaticParams() {
  return MOCK_WORKSHEETS.map((w) => ({
    id: w.id,
  }));
}

export default function WorksheetPage() {
  return <WorksheetClient />;
}
