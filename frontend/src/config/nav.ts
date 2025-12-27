import { NavItem } from '@/types/types';
import {
  BookOpenCheck,
  FileBarChart,
  Info,
  LayoutDashboard,
  Rocket,
  Settings,
  ShieldCheck,
  Target,
} from 'lucide-react';

export const navItems: NavItem[] = [
  {
    title: 'ダッシュボード',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'G検定とは',
    href: '/dashboard/about-g',
    icon: Info,
  },
  {
    title: '教科書',
    href: '/dashboard/get-started',
    icon: Rocket,
  },
  {
    title: '要点整理',
    href: '/dashboard/summary',
    icon: BookOpenCheck,
  },
  {
    title: 'ドリル',
    href: '/dashboard/drill',
    icon: Target,
  },
  {
    title: '演習模試',
    href: '/dashboard/mock-exams',
    icon: FileBarChart,
  },
  {
    title: '本番対策',
    href: '/dashboard/actual-exam-preparation',
    icon: ShieldCheck,
  },
  {
    title: '設定',
    href: '/dashboard/settings',
    icon: Settings,
  },
];
