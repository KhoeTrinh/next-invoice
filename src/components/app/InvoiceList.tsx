import { getData, requireUser } from '@/utils/hooks';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../ui/table';
import InvoiceActions from './InvoiceActions';
import { formatCurrency, formatTime } from '@/utils/format';
import { Badge } from '../ui/badge';

export default async function InvoiceList() {
    const session = await requireUser();
    const data = await getData(session.user?.id as string);
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((invoice) => (
                    <TableRow key={invoice.id}>
                        <TableCell>#{invoice.invoiceNumber}</TableCell>
                        <TableCell>{invoice.clientName}</TableCell>
                        <TableCell>
                            {formatCurrency({
                                num: invoice.total,
                                currency: invoice.currency as 'USD' | 'EUR',
                            })}
                        </TableCell>
                        <TableCell>
                            <Badge>{invoice.status}</Badge>
                        </TableCell>
                        <TableCell>
                            {formatTime(invoice.createdAt, { date: 'short' })}
                        </TableCell>
                        <TableCell className='text-right'>
                            <InvoiceActions />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
