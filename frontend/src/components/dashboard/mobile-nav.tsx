import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Button } from '../ui/button';
import DashboardNav from './nav';

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 hover:bg-transparent md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">メニューを開く</span>
        </Button>
      </SheetTrigger>
      <SheetContent side={'left'} className="pl-1 pr-0">
        <SheetHeader className="py-3 text-left px-10">
          <SheetTitle>メニュー</SheetTitle>
        </SheetHeader>
        <div className="px-7">
          <DashboardNav />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
