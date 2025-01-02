'use server';

import prisma from '@/utils/db';
import { requireUser } from '@/utils/hooks';
import { invoiceSchema, onboardingSchema } from '@/utils/zodSchema';
import { parseWithZod } from '@conform-to/zod';
import { redirect } from 'next/navigation';
import { signIn, signOut } from './auth';
import { emailClient } from './mailtrap';
import { formatCurrency, formatTime } from './format';

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
    const session = await requireUser();
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
            userId: session.user?.id,
        },
    });
    const sender = {
        email: 'Shinne@gmail.com',
        name: 'Shinee',
    };
    emailClient.send({
        from: sender,
        to: [{ email: 'kelvintrinh09@gmail.com' }],
        template_uuid: '34e8f36c-0a6b-4591-8177-2c1650743c36',
        template_variables: {
            clientName: submission.value.clientName,
            invoiceNumber: submission.value.invoiceNumber,
            dueDate: formatTime(submission.value.dueDate, {
                date: 'long',
            }),
            totalAmount: formatCurrency({
                num: submission.value.total,
                currency: submission.value.currency,
            }),
            invoiceLink: 'https://invoice-app.vercel.app/dashboard/invoices',
        },
    });

    return redirect('/dashboard/invoices');
}
