'use server';

import prisma from '@/utils/db';
import { requireUser } from '@/utils/hooks';
import { invoiceSchema, onboardingSchema } from '@/utils/zodSchema';
import { parseWithZod } from '@conform-to/zod';
import { redirect } from 'next/navigation';
import { signIn, signOut } from './auth';

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

export async function SignIn(formData: FormData) {
    await signIn('nodemailer', formData);
    return redirect('/dashboard');
}

export async function SignOut() {
    await signOut();
}

export async function createInvoice(prevState: unknown, formData: FormData) {
    await requireUser();
    const submission = parseWithZod(formData, {
        schema: invoiceSchema,
    });
    if (submission.status !== 'success') return submission.reply();
    await prisma.invoice.create({
        data: {
            clientAddress: submission.value.clientAddress,
            clientName: submission.value.clientName,
            clientEmail: submission.value.clientEmail,
            currency: submission.value.currency,
            date: submission.value.date,
            dueDate: submission.value.dueDate,
            fromAddress: submission.value.fromAddress,
            fromName: submission.value.fromName,
            fromEmail: submission.value.fromEmail,
            invoiceItemDescription: submission.value.invoiceItemDescription,
            invoiceItemQuantity: submission.value.invoiceItemQuantity,
            invoiceItemRate: submission.value.invoiceItemRate,
            invoiceName: submission.value.invoiceName,
            invoiceNumber: submission.value.invoiceNumber,
            status: submission.value.status,
            total: submission.value.total,
            note: submission.value.note,
        },
    });
}
