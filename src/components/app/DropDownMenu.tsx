import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import Link from 'next/link';
import { ReactNode } from 'react';

type DropDownMenuProps = {
    text: {
        trigger: ReactNode;
        content: Array<{
            link?: string;
            text?: ReactNode;
            separator?: boolean;
            special?: ReactNode;
        }>;
    };
    special?: string;
};

export default function DropDownMenu({ text, special }: DropDownMenuProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {text.trigger || <div />}
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                {special && (
                    <>
                        <DropdownMenuLabel>{special}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                    </>
                )}
                {text.content.map((item, index) => (
                    <div key={index}>
                        <DropdownMenuItem asChild>
                            {item.special ? (
                                item.special
                            ) : (
                                <Link href={item.link || ''}>{item.text}</Link>
                            )}
                        </DropdownMenuItem>
                        {item.separator && <DropdownMenuSeparator />}
                    </div>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
