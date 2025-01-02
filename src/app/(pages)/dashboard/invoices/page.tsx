import BetterCard from '@/components/app/BetterCard';
import InvoiceList from '@/components/app/InvoiceList';
import { buttonVariants } from '@/components/ui/button';
import {
    CardDescription,
    CardTitle,
} from '@/components/ui/card';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';

export default function Invoices() {
    return (
        <BetterCard
            show={{ header: true, content: true, footer: false }}
            className={{}}
            text={{
                header: (
                    <div className='flex items-center justify-between'>
                        <div>
                            <CardTitle className='text-2xl font-bold'>
                                Invoices
                            </CardTitle>
                            <CardDescription>
                                Manage your invoices right here
                            </CardDescription>
                        </div>
                        <Link
                            href='/dashboard/invoices/create'
                            className={buttonVariants()}
                        >
                            <PlusIcon /> Create Invoice
                        </Link>
                    </div>
                ),
                content: <InvoiceList />,
            }}
            special={true}
        />
    );
}
