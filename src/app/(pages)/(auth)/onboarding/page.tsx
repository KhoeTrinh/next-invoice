'use client';

import BetterInput from '@/components/app/BetterInput';
import { onboardUser } from '@/utils/action';
import { useActionState } from 'react';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { onboardingSchema } from '@/utils/zodSchema';
import BetterCard from '@/components/app/BetterCard';
import BetterButton from '@/components/app/BetterButton';

export default function Onboarding() {
    const [lastResult, action] = useActionState(onboardUser, null);
    const [form, fields] = useForm({
        lastResult,

        onValidate({ formData }) {
            return parseWithZod(formData, {
                schema: onboardingSchema,
            });
        },

        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput',
    });
    return (
        <div className='min-h-screen w-screen flex items-center justify-center'>
            <BetterCard
                show={{ header: true, content: true, footer: false }}
                className={{
                    card: 'max-w-sm mx-auto',
                    header: '',
                    title: 'text-xl',
                    description: '',
                    content: '',
                    footer: '',
                }}
                text={{
                    card: null,
                    header: null,
                    title: 'You are almost finished!',
                    description: 'Enter your information to create an account',
                    content: (
                        <form
                            action={action}
                            id={form.id}
                            onSubmit={form.onSubmit}
                            noValidate
                            className='grid gap-4'
                        >
                            <div className='grid grid-cols-2 gap-4'>
                                <BetterInput
                                    placeholder='Shinne...'
                                    safety={fields.firstName}
                                >
                                    First Name
                                </BetterInput>
                                <BetterInput
                                    placeholder='Trinh...'
                                    safety={fields.lastName}
                                >
                                    Last Name
                                </BetterInput>
                            </div>
                            <BetterInput
                                placeholder='_-_-_ st.** City._-_'
                                safety={fields.address}
                            >
                                Address
                            </BetterInput>
                            <BetterButton>Finish Onboarding</BetterButton>
                        </form>
                    ),
                    footer: null,
                }}
                special={false}
            />
        </div>
    );
}
