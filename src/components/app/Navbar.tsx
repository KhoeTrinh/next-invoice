import { ImageCollection } from "@/utils/collection";
import Image from "next/image";
import Link from "next/link";
import DashboardLinks from "./DashboardLinks";

export default function Navbar() {
    return (
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
                            Invoice <span className='text-blue-600'>Next</span>
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
    );
}
