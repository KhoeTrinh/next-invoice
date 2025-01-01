import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { auth } from '@/utils/auth';
import BetterButton from '@/components/app/BetterButton';
import { redirect } from 'next/navigation';
import { SignIn } from '@/utils/action';
import BetterCard from '@/components/app/BetterCard';

export default async function Login() {
    const session = await auth();
    if (session?.user) {
        redirect('/dashboard');
    }
    return (
        <div className='flex h-screen w-full items-center justify-center px-4'>
            <BetterCard
                show={{ header: true, content: true, footer: false }}
                className={{
                    card: 'max-w-sm',
                    header: '',
                    title: 'text-2xl',
                    description: '',
                    content: '',
                    footer: '',
                }}
                text={{
                    card: null,
                    header: null,
                    title: 'Login',
                    description:
                        'Enter your email below to login in to your account',
                    content: (
                        <form
                            action={SignIn}
                            className='flex flex-col gap-y-4'
                        >
                            <div className='flex flex-col gap-y-2'>
                                <Label>Email</Label>
                                <Input
                                    name='email'
                                    type='email'
                                    required
                                    placeholder='example@gmail.com'
                                />
                            </div>
                            <BetterButton>Submit</BetterButton>
                        </form>
                    ),
                    footer: null,
                }}
                special={false}
            />
        </div>
    );
}
