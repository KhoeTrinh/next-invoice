import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../ui/table';
import InvoiceActions from './InvoiceActions';

export default function InvoiceList() {
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
                <TableRow>
                    <TableCell>#1</TableCell>
                    <TableCell>Khoa</TableCell>
                    <TableCell>$1M</TableCell>
                    <TableCell>Pending</TableCell>
                    <TableCell>1/1/2025</TableCell>
                    <TableCell className='text-right'>
                        <InvoiceActions />
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}
