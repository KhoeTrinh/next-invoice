import { Label } from '@radix-ui/react-dropdown-menu';
import { Input } from '../ui/input';
import { ChildrenProps } from '@/utils/type';
import { FieldMetadata } from '@conform-to/react';

type BetterInputProps = ChildrenProps & {
    placeholder: string;
    safety: FieldMetadata<
        string,
        {
            firstName: string;
            lastName: string;
            address: string;
        },
        string[]
    >;
};

export default function BetterInput({
    children,
    placeholder,
    safety,
}: BetterInputProps) {
    return (
        <div className='grid gap-2'>
            <Label>{children}</Label>
            <Input
                name={safety.name}
                key={safety.key}
                defaultValue={safety.initialValue}
                placeholder={placeholder}
            />
            <p className='text-red-500 text-sm'>{safety.errors} </p>
        </div>
    );
}
