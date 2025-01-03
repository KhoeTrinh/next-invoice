import { FieldMetadata } from "@conform-to/react";

export type ChildrenProps = {
    children?: React.ReactNode;
};

export type IntlType = 'full' | 'long' | 'medium' | 'short';

export type Fields = {
    invoiceName: FieldMetadata<string>;
    total: FieldMetadata<number>;
    status: FieldMetadata<'PAID' | 'PENDING'>;
    date: FieldMetadata<string>;
    dueDate: FieldMetadata<number>;
    fromName: FieldMetadata<string>;
    fromEmail: FieldMetadata<string>;
    fromAddress: FieldMetadata<string>;
    clientName: FieldMetadata<string>;
    clientEmail: FieldMetadata<string>;
    clientAddress: FieldMetadata<string>;
    currency: FieldMetadata<'USD' | 'EUR'>;
    invoiceNumber: FieldMetadata<number>;
    invoiceItemDescription: FieldMetadata<string>;
    invoiceItemQuantity: FieldMetadata<number>;
    invoiceItemRate: FieldMetadata<number>;
    note: FieldMetadata<string | undefined>;
};