import chapter1 from '@/data/summary/chapter-1.json' assert { type: 'json' };
import chapter2 from '@/data/summary/chapter-2.json' assert { type: 'json' };
import chapter3 from '@/data/summary/chapter-3.json' assert { type: 'json' };
import chapter4 from '@/data/summary/chapter-4.json' assert { type: 'json' };
import chapter5 from '@/data/summary/chapter-5.json' assert { type: 'json' };
import chapter6 from '@/data/summary/chapter-6.json' assert { type: 'json' };
import chapter7 from '@/data/summary/chapter-7.json' assert { type: 'json' };
import chapter8 from '@/data/summary/chapter-8.json' assert { type: 'json' };

import type { SummaryChapter } from '../types/types';

export const summaryChapters: SummaryChapter[] = [
  chapter1 as SummaryChapter,
  chapter2 as SummaryChapter,
  chapter3 as SummaryChapter,
  chapter4 as SummaryChapter,
  chapter5 as SummaryChapter,
  chapter6 as SummaryChapter,
  chapter7 as SummaryChapter,
  chapter8 as SummaryChapter,
];
