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
            className={{
                card: '',
                header: '',
                title: '',
                description: '',
                content: '',
                footer: '',
            }}
            text={{
                card: null,
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
                title: null,
                description: null,
                content: <InvoiceList />,
                footer: null,
            }}
            special={true}
        />
    );
}
