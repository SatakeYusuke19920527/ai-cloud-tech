import chapter1 from '@/data/drill/chapter-1.json' assert { type: 'json' };
import chapter2 from '@/data/drill/chapter-2.json' assert { type: 'json' };
import chapter3 from '@/data/drill/chapter-3.json' assert { type: 'json' };
import chapter4 from '@/data/drill/chapter-4.json' assert { type: 'json' };
import chapter5 from '@/data/drill/chapter-5.json' assert { type: 'json' };
import chapter6 from '@/data/drill/chapter-6.json' assert { type: 'json' };
import chapter7 from '@/data/drill/chapter-7.json' assert { type: 'json' };
import chapter8 from '@/data/drill/chapter-8.json' assert { type: 'json' };
import { DrillChapter } from '@/types/types';

export const drillChapters: DrillChapter[] = [
  chapter1 as DrillChapter,
  chapter2 as DrillChapter,
  chapter3 as DrillChapter,
  chapter4 as DrillChapter,
  chapter5 as DrillChapter,
  chapter6 as DrillChapter,
  chapter7 as DrillChapter,
  chapter8 as DrillChapter,
];
