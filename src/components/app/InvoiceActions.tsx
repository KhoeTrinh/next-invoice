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

const menuItems = [
    { link: '/', icon: Pencil, label: 'Edit Invoice' },
    { link: '/', icon: DownloadCloud, label: 'Download' },
    { link: '/', icon: Mail, label: 'Reminder Email' },
    { link: '/', icon: Trash, label: 'Delete Invoice' },
    { link: '/', icon: CheckCircle, label: 'Mark as Paid' },
];

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
                content: menuItems.map(({ link, icon: Icon, label }) => ({
                    link,
                    text: (
                        <>
                            <Icon className='size-4 mr-2' /> {label}
                        </>
                    ),
                })),
            }}
        />
    );
}
