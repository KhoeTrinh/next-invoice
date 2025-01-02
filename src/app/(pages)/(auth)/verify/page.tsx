import Alert from '@/components/app/Alert';
import BetterCard from '@/components/app/BetterCard';
import { buttonVariants } from '@/components/ui/button';
import { ArrowLeft, Mail } from 'lucide-react';
import Link from 'next/link';

export default function Verify() {
    return (
        <div className='min-h-screen w-full flex items-center justify-center'>
            <BetterCard
                show={{ header: true, content: true, footer: true }}
                className={{
                    card: 'w-[22.5rem] px-5',
                    header: 'text-center',
                    title: 'text-2xl font-bold',
                }}
                text={{
                    header: (
                        <div className='mb-4 mx-auto flex size-20 items-center justify-center rounded-full bg-blue-100'>
                            <Mail className='size-12 text-blue-500' />
                        </div>
                    ),
                    title: 'Check your Email',
                    description:
                        'We have sent an verification link to your email address',
                    content: <Alert>Be sure to check your spam folder!</Alert>,
                    footer: (
                        <Link
                            href='/'
                            className={buttonVariants({
                                className: 'w-full',
                                variant: 'outline',
                            })}
                        >
                            <ArrowLeft className='size-4 mr-2' /> Back to
                            Homepage
                        </Link>
                    ),
                }}
                special={false}
            />
        </div>
    );
}
