import InvoiceList from '@/components/app/InvoiceList';
import { buttonVariants } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';

export default function Invoices() {
    return (
        <Card>
            <CardHeader>
                <div className='flex items-center justify-between'>
                    <div className=''>
                        <CardTitle className='text-2xl font-bold'>
                            Invoices
                        </CardTitle>
                        <CardDescription>
                            Manage your invoices right here
                        </CardDescription>
                    </div>
                    <Link href='' className={buttonVariants()}>
                        <PlusIcon /> Create Invoice
                    </Link>
                </div>
            </CardHeader>
            <CardContent>
                <InvoiceList />
            </CardContent>
        </Card>
    );
}