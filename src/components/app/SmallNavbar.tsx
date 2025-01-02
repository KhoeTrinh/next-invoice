import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import DashboardLinks from "./DashboardLinks";

export default function SmallNavbar() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant='outline'
                    size='icon'
                    className='md:hidden'
                >
                    <Menu className='size-5' />
                </Button>
            </SheetTrigger>
            <SheetContent side='left'>
                <nav className='grid gap-2 mt-10'>
                    <DashboardLinks />
                </nav>
                <SheetTitle />
            </SheetContent>
        </Sheet>
    );
}
