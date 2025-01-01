import DashboardLinks from '@/components/app/DashboardLinks';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { signOut } from '@/utils/auth';
import { ImageCollection } from '@/utils/collection';
import prisma from '@/utils/db';
import { requireUser } from '@/utils/hooks';
import { ChildrenProps } from '@/utils/type';
import { Menu, User2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

type DashboardLayoutProps = ChildrenProps;

async function getUser(id: string) {
    const data = await prisma.user.findUnique({
        where: {
            id,
        },
        select: {
            firstName: true,
            lastName: true,
            address: true,
        },
    });
    if (!data?.firstName || !data?.lastName || !data?.address)
        redirect('/onboarding');
}
export default async function DashboardLayout({
    children,
}: DashboardLayoutProps) {
    await requireUser();
    return (
        <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
            <div className='hidden border-r bg-muted/40 md:block'>
                <div className='flex flex-col max-h-screen h-full gap-2'>
                    <div className='h-14 flex items-center border-b px-4 lg:h-[60px lg:px-6'>
                        <Link
                            href='/'
                            className='flex items-center gap-2'
                        >
                            <Image
                                src={ImageCollection[3]}
                                alt='Logo'
                                className='size-7'
                            />
                            <p className='text-2xl font-bold'>
                                Invoice{' '}
                                <span className='text-blue-600'>Next</span>
                            </p>
                        </Link>
                    </div>
                    <div className='flex-1'>
                        <nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
                            <DashboardLinks />
                        </nav>
                    </div>
                </div>
            </div>

            <div className='flex flex-col'>
                <header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
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
                    <div className='flex items-center ml-auto'>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    className='rounded-full'
                                    variant='outline'
                                    size='icon'
                                >
                                    <User2 />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end'>
                                <DropdownMenuLabel>
                                    My account
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href='/dashboard'>Dashboard</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href='/dashboard/invoices'>
                                        Invoices
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <form
                                        action={async () => {
                                            'use server';
                                            await signOut();
                                        }}
                                        className='w-full'
                                    >
                                        <button
                                            type='submit'
                                            className='w-full text-left'
                                        >
                                            Logout
                                        </button>
                                    </form>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>
                <main className='flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6'>
                    {children}
                </main>
            </div>
        </div>
    );
}
