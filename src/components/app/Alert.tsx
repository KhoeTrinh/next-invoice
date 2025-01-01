import { ChildrenProps } from '@/utils/type';
import { AlertCircle } from 'lucide-react';

type AlertProps = ChildrenProps;
export default function Alert({ children }: AlertProps) {
    return (
        <div className='mt-4 rounded-md bg-yellow-50 border-yellow-300 p-4'>
            <div className='flex items-center'>
                <AlertCircle className='size-5 text-yellow-400' />
                <p className='text-sm font-medium text-yellow-700 ml-3'>
                    {children}
                </p>
            </div>
        </div>
    );
}
