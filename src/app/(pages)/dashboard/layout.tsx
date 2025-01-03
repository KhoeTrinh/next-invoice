import DropDownMenu from '@/components/app/DropDownMenu';
import Navbar from '@/components/app/Navbar';
import SmallNavbar from '@/components/app/SmallNavbar';
import { Button } from '@/components/ui/button';
import { SignOut } from '@/utils/action';
import { getUser, requireUser } from '@/utils/hooks';
import { ChildrenProps } from '@/utils/type';
import { User2 } from 'lucide-react';

export default async function DashboardLayout({ children }: ChildrenProps) {
    const session = await requireUser();
    await getUser(session.user?.id || '');

    const menuItems = [
        { link: '/dashboard', text: 'Dashboard' },
        { link: '/dashboard/invoices', text: 'Invoices', separator: true },
        {
            special: (
                <form
                    action={SignOut}
                    className='w-full'
                >
                    <button
                        type='submit'
                        className='w-full text-left'
                    >
                        Logout
                    </button>
                </form>
            ),
        },
    ];

    return (
        <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
            <Navbar />

            <div className='flex flex-col'>
                <header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
                    <SmallNavbar />
                    <div className='flex items-center ml-auto'>
                        <DropDownMenu
                            text={{
                                trigger: (
                                    <Button
                                        className='rounded-full'
                                        variant='outline'
                                        size='icon'
                                    >
                                        <User2 />
                                    </Button>
                                ),
                                content: menuItems,
                            }}
                            special='My account'
                        />
                    </div>
                </header>
                <main className='flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6'>
                    {children}
                </main>
            </div>
        </div>
    );
}
