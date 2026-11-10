import { MOCK_EXAMS } from '@/lib/mock-data';
import ExamClient from './ExamClient';

export function generateStaticParams() {
  return MOCK_EXAMS.map((e) => ({
    id: e.id,
  }));
}

export default function ExamPage() {
  return <ExamClient />;
}
