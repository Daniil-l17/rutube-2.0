import { Trendsvideo } from '@/provaders/Trendsvideo';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Популярные видео',
};

export default function () {
  return <Trendsvideo />;
}
