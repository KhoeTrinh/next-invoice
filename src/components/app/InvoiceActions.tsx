import {
    CheckCircle,
    DownloadCloud,
    Mail,
    MoreHorizontal,
    Pencil,
    Trash,
} from 'lucide-react';
import { Button } from '../ui/button';
import DropDownMenu from './DropDownMenu';

export default function InvoiceActions() {
    return (
        <DropDownMenu
            text={{
                trigger: (
                    <Button
                        size='icon'
                        variant='secondary'
                    >
                        <MoreHorizontal className='size-4' />
                    </Button>
                ),
                content: [
                    {
                        link: '/',
                        text: (
                            <>
                                <Pencil className='size-4 mr-2' /> Edit Invoice
                            </>
                        ),
                    },
                    {
                        link: '/',
                        text: (
                            <>
                                <DownloadCloud className='size-4 mr-2' />{' '}
                                Download
                            </>
                        ),
                    },
                    {
                        link: '/',
                        text: (
                            <>
                                <Mail className='size-4 mr-2' /> Reminder Email
                            </>
                        ),
                    },
                    {
                        link: '/',
                        text: (
                            <>
                                <Trash className='size-4 mr-2' /> Delete Invoice
                            </>
                        ),
                    },
                    {
                        link: '/',
                        text: (
                            <>
                                <CheckCircle className='size-4 mr-2' /> Mark as
                                Paid
                            </>
                        ),
                    },
                ],
            }}
        />
    );
}
