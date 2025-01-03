'use client';

import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { useActionState, useState } from 'react';
import { Textarea } from '../ui/textarea';
import BetterButton from './BetterButton';
import { createInvoice } from '@/utils/action';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { invoiceSchema } from '@/utils/zodSchema';
import { formatCurrency } from '@/utils/format';
import DivWithLabel from './DivWithLabel';
import Errors from './Errors';
import { Data, Keys, LabelsCurrency, LabelsNet } from '@/utils/collection';
import BetterSelect from './BetterSelect';
import PopOver from './Popover';
import { invoiceFieldsConfig } from '@/utils/invoiceFieldsConfig';

export default function CreateInvoice() {
    const [lastResult, action] = useActionState(createInvoice, undefined);
    const [form, fields] = useForm({
        lastResult,
        onValidate({ formData }) {
            return parseWithZod(formData, {
                schema: invoiceSchema,
            });
        },
        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput',
    });
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [rate, setRate] = useState('');
    const [quantity, setQuantity] = useState('');
    const [currency, setCurrency] = useState<'USD' | 'EUR'>('USD');
    const total = (Number(quantity) || 0) * (Number(rate) || 0);
    const calculateTotal = formatCurrency({
        num: total,
        currency,
    });
    const invoiceFields = invoiceFieldsConfig(
        fields,
        quantity,
        setQuantity,
        rate,
        setRate,
        calculateTotal
    );
    return (
        <Card className='w-full max-w-4xl mx-auto '>
            <CardContent className='p-6'>
                <form
                    action={action}
                    id={form.id}
                    onSubmit={form.onSubmit}
                    noValidate
                >
                    <input
                        type='hidden'
                        name={fields.date.name}
                        value={selectedDate.toISOString()}
                    />
                    <input
                        type='hidden'
                        name={fields.total.name}
                        value={total}
                    />
                    <div className='grid gap-1 w-fit mb-6'>
                        <DivWithLabel
                            text='Draft'
                            badge
                            className='flex items-center gap-4'
                        >
                            <Input
                                name={fields.invoiceName.name}
                                key={fields.invoiceName.key}
                                defaultValue={fields.invoiceName.initialValue}
                                placeholder='...'
                            />
                        </DivWithLabel>
                        <Errors error={fields.invoiceName.errors} />
                    </div>
                    <div className='grid md:grid-cols-3 gap-6 mb-6'>
                        <DivWithLabel text='Invoice No.'>
                            <div className='flex'>
                                <span className='px-3 border border-r-0 rounded-l-md bg-muted flex items-center'>
                                    #
                                </span>
                                <Input
                                    name={fields.invoiceNumber.name}
                                    key={fields.invoiceNumber.key}
                                    defaultValue={
                                        fields.invoiceNumber.initialValue
                                    }
                                    className='rounded-l-none'
                                    placeholder='NaN'
                                />
                            </div>
                            <Errors error={fields.invoiceNumber.errors} />
                        </DivWithLabel>
                        <DivWithLabel text='Currency'>
                            <BetterSelect
                                item={LabelsCurrency}
                                safety={{
                                    name: fields.currency.name,
                                    key: fields.currency.key,
                                }}
                                value='Select Currency'
                                onValueChange={(value: 'USD' | 'EUR') =>
                                    setCurrency(value)
                                }
                            />
                            <Errors error={fields.currency.errors} />
                        </DivWithLabel>
                    </div>
                    <div className='grid md:grid-cols-2 gap-6 mb-6'>
                        {Keys.map(({ label, keys }) => (
                            <DivWithLabel
                                text={label}
                                key={label}
                            >
                                <div className='space-y-2'>
                                    {keys.map((key) => (
                                        <div key={fields[key].key}>
                                            <Input
                                                name={fields[key].name}
                                                defaultValue={
                                                    fields[key].initialValue
                                                }
                                                placeholder={`Your ${key.replace(
                                                    /([A-Z])/g,
                                                    ' $1'
                                                )}`}
                                            />
                                            <Errors
                                                error={fields[key].errors}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </DivWithLabel>
                        ))}
                    </div>
                    <div className='grid md:grid-cols-2 gap-6 mb-6'>
                        <DivWithLabel
                            text='Date'
                            special
                        >
                            <PopOver
                                dates={selectedDate}
                                setDates={(date) =>
                                    setSelectedDate(date || new Date())
                                }
                            />
                            <Errors error={fields.date.errors} />
                        </DivWithLabel>
                        <DivWithLabel text='Invoice Due'>
                            <BetterSelect
                                item={LabelsNet}
                                safety={{
                                    name: fields.dueDate.name,
                                    key: fields.dueDate.key,
                                    initialValue: fields.dueDate.initialValue,
                                }}
                                value='Select Due Date'
                            />
                            <Errors error={fields.dueDate.errors} />
                        </DivWithLabel>
                    </div>
                    <div>
                        <div className='grid grid-cols-12 gap-4 mb-2 font-medium'>
                            {Data.map((label, index) => (
                                <p
                                    key={index}
                                    className={`col-span-${
                                        label === 'Description' ? 6 : 2
                                    }`}
                                >
                                    {label}
                                </p>
                            ))}
                        </div>
                        <div className='grid grid-cols-12 gap-4 mb-4'>
                            {invoiceFields.map(({ span, component }, index) => (
                                <div
                                    key={index}
                                    className={`col-span-${span}`}
                                >
                                    {component}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='flex justify-end'>
                        <div className='w-1/3'>
                            <div className='flex justify-between py-2'>
                                <span>Subtotal</span>
                                <span>{calculateTotal} </span>
                            </div>
                            <div className='flex justify-between py-2 border-t'>
                                <span>Total ({currency})</span>
                                <span className='font-medium underline underline-offset-2'>
                                    {calculateTotal}
                                </span>
                            </div>
                        </div>
                    </div>
                    <DivWithLabel text='Note'>
                        <Textarea
                            name={fields.note.name}
                            key={fields.note.key}
                            defaultValue={fields.note.initialValue}
                            placeholder='Add your note here...'
                        />
                        <Errors error={fields.note.errors} />
                    </DivWithLabel>
                    <div className='flex items-center justify-end mt-6 '>
                        <div>
                            <BetterButton>Sent Invoice to Client</BetterButton>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
