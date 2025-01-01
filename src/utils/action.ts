'use server';

import prisma from '@/utils/db';
import { requireUser } from '@/utils/hooks';
import { onboardingSchema } from '@/utils/zodSchema';
import { parseWithZod } from '@conform-to/zod';
import { redirect } from 'next/navigation';

export async function onboardUser(prevState: unknown, formData: FormData) {
    const session = await requireUser();

    const submission = parseWithZod(formData, {
        schema: onboardingSchema,
    });
    if (submission.status !== 'success') return submission.reply();
    await prisma.user.update({
        where: { id: session.user?.id },
        data: {
            firstName: submission.value.firstName,
            lastName: submission.value.lastName,
            address: submission.value.address,
        },
    });
    return redirect('/dashboard');
}
