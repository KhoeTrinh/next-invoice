import { z } from 'zod';

export const onboardingSchema = z.object({
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    address: z.string().min(2, 'Address is required'),
});

export const invoiceSchema = z.object({
    invoiceName: z.string().min(2, 'Invoice name is required'),
    total: z.number().min(1, '$1 is minimum'),
    status: z.enum(['PAID', 'PENDING']).default('PENDING'),
    date: z.string().min(2, 'Date is required'),
    dueDate: z.number().min(1, 'Due date is required'),
    fromName: z.string().min(2, 'Your name is required'),
    fromEmail: z.string().email('Invalid email address'),
    fromAddress: z.string().min(2, 'Your address is required'),
    clientName: z.string().min(2, 'Client name is required'),
    clientEmail: z.string().email('Invalid email address'),
    clientAddress: z.string().min(2, 'Client address is required'),
    currency: z.enum(['USD', 'EUR']).default('USD'),
    invoiceNumber: z.number().min(1, 'Invoice number is required'),
    invoiceItemDescription: z
        .string()
        .min(2, 'Invoice item description is required'),
    invoiceItemQuantity: z.number().min(1, 'Quantity is required'),
    invoiceItemRate: z.number().min(1, 'Rate is required'),
    note: z.string().optional(),
});
