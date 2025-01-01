"use client"

import AdvanceButton from '@/components/app/AdvanceButton';
import BetterInput from '@/components/app/BetterInput';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { onboardUser } from '@/utils/action';
import { useActionState } from 'react';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { onboardingSchema } from '@/utils/zodSchema';

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
            <Card className='max-w-sm mx-auto'>
                <CardHeader>
                    <CardTitle className='text-xl'>
                        You are almost finished!
                    </CardTitle>
                    <CardDescription>
                        Enter your information to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
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
                        <BetterInput placeholder='_-_-_ st.** City._-_' safety={fields.address}>
                            Address
                        </BetterInput>
                        <AdvanceButton>Finish Onboarding</AdvanceButton>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
