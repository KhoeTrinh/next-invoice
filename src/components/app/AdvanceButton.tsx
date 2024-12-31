'use client';

import { Button } from '@/components/ui/button';
import { ChildrenProps } from '@/utils/type';
import { Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';

type AdvanceButtonProps = ChildrenProps;

export default function AdvanceButton({ children }: AdvanceButtonProps) {
    const { pending } = useFormStatus();
    return (
        <>
            {pending ? (
                <Button
                    disabled
                    className='w-full'
                >
                    <Loader2 className='size-4 mr-2 animate-spin' /> Please
                    wait...
                </Button>
            ) : (
                <Button
                    type='submit'
                    className='w-full'
                >
                    {children}
                </Button>
            )}
        </>
    );
}
