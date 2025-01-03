'use client';

import { CalendarIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';
import { Calendar } from '../ui/calendar';
import { useActionState, useState } from 'react';
import { Textarea } from '../ui/textarea';
import BetterButton from './BetterButton';
import { createInvoice } from '@/utils/action';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { invoiceSchema } from '@/utils/zodSchema';
import { formatCurrency, formatTime } from '@/utils/format';
import DivWithLabel from './DivWithLabel';

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
                        <p className='text-sm text-red-500'>
                            {fields.invoiceName.errors}
                        </p>
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
                            <p className='text-sm text-red-500'>
                                {fields.invoiceNumber.errors}
                            </p>
                        </DivWithLabel>
                        <DivWithLabel text='Currency'>
                            <Select
                                defaultValue='USD'
                                name={fields.currency.name}
                                key={fields.currency.key}
                                onValueChange={(value: 'USD' | 'EUR') =>
                                    setCurrency(value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder='Select Currency' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='USD'>
                                        United States Dollar -- USD
                                    </SelectItem>
                                    <SelectItem value='EUR'>
                                        Euro -- EUR
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <p className='text-sm text-red-500'>
                                {fields.currency.errors}
                            </p>
                        </DivWithLabel>
                    </div>
                    <div className='grid md:grid-cols-2 gap-6 mb-6'>
                        <DivWithLabel text='From'>
                            <div className='space-y-2'>
                                <Input
                                    name={fields.fromName.name}
                                    key={fields.fromName.key}
                                    defaultValue={fields.fromName.initialValue}
                                    placeholder='Your Name'
                                />
                                <p className='text-sm text-red-500'>
                                    {fields.fromName.errors}
                                </p>
                                <Input
                                    name={fields.fromEmail.name}
                                    key={fields.fromEmail.key}
                                    defaultValue={fields.fromEmail.initialValue}
                                    placeholder='Your Email'
                                />
                                <p className='text-sm text-red-500'>
                                    {fields.fromEmail.errors}
                                </p>
                                <Input
                                    name={fields.fromAddress.name}
                                    key={fields.fromAddress.key}
                                    defaultValue={
                                        fields.fromAddress.initialValue
                                    }
                                    placeholder='Your Address'
                                />
                                <p className='text-sm text-red-500'>
                                    {fields.fromAddress.errors}
                                </p>
                            </div>
                        </DivWithLabel>
                        <DivWithLabel text='To'>
                            <div className='space-y-2'>
                                <Input
                                    name={fields.clientName.name}
                                    key={fields.clientName.key}
                                    defaultValue={
                                        fields.clientName.initialValue
                                    }
                                    placeholder='Client Name'
                                />
                                <p className='text-sm text-red-500'>
                                    {fields.clientName.errors}
                                </p>
                                <Input
                                    name={fields.clientEmail.name}
                                    key={fields.clientEmail.key}
                                    defaultValue={
                                        fields.clientEmail.initialValue
                                    }
                                    placeholder='Client Email'
                                />
                                <p className='text-sm text-red-500'>
                                    {fields.clientEmail.errors}
                                </p>
                                <Input
                                    name={fields.clientAddress.name}
                                    key={fields.clientAddress.key}
                                    defaultValue={
                                        fields.clientAddress.initialValue
                                    }
                                    placeholder='Client Address'
                                />
                                <p className='text-sm text-red-500'>
                                    {fields.clientAddress.errors}
                                </p>
                            </div>
                        </DivWithLabel>
                    </div>
                    <div className='grid md:grid-cols-2 gap-6 mb-6'>
                        <DivWithLabel
                            text='Date'
                            special
                        >
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant='outline'
                                        className='w-[280px] md:w-auto text-left justify-start'
                                    >
                                        <CalendarIcon />
                                        {selectedDate ? (
                                            formatTime(selectedDate, {
                                                date: 'long',
                                                time: 'short',
                                            })
                                        ) : (
                                            <p>Pick a Date</p>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <Calendar
                                        mode='single'
                                        selected={selectedDate}
                                        onSelect={(date) =>
                                            setSelectedDate(date || new Date())
                                        }
                                        fromDate={new Date()}
                                    />
                                </PopoverContent>
                            </Popover>
                            <p className='text-sm text-red-500'>
                                {fields.date.errors}
                            </p>
                        </DivWithLabel>
                        <DivWithLabel text='Invoice Due'>
                            <Select
                                name={fields.dueDate.name}
                                key={fields.dueDate.key}
                                defaultValue={fields.dueDate.initialValue}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder='Select Due Date' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='0'>
                                        Due on Reciept
                                    </SelectItem>
                                    <SelectItem value='15'>Net 15</SelectItem>
                                    <SelectItem value='30'>Net 30</SelectItem>
                                    <SelectItem value='45'>Net 45</SelectItem>
                                    <SelectItem value='60'>Net 60</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className='text-sm text-red-500'>
                                {fields.dueDate.errors}
                            </p>
                        </DivWithLabel>
                    </div>

                    <div>
                        <div className='grid grid-cols-12 gap-4 mb-2 font-medium'>
                            <p className='col-span-6'>Description</p>
                            <p className='col-span-2'>Quantity</p>
                            <p className='col-span-2'>Rate</p>
                            <p className='col-span-2'>Amount</p>
                        </div>
                        <div className='grid grid-cols-12 gap-4 mb-4'>
                            <div className='col-span-6'>
                                <Textarea
                                    name={fields.invoiceItemDescription.name}
                                    key={fields.invoiceItemDescription.key}
                                    defaultValue={
                                        fields.invoiceItemDescription
                                            .initialValue
                                    }
                                    placeholder='Item name & description'
                                />
                                <p className='text-sm text-red-500'>
                                    {fields.invoiceItemDescription.errors}
                                </p>
                            </div>
                            <div className='col-span-2'>
                                <Input
                                    name={fields.invoiceItemQuantity.name}
                                    key={fields.invoiceItemQuantity.key}
                                    type='number'
                                    placeholder='0'
                                    value={quantity}
                                    onChange={(e) =>
                                        setQuantity(e.target.value)
                                    }
                                />
                                <p className='text-sm text-red-500'>
                                    {fields.invoiceItemQuantity.errors}
                                </p>
                            </div>
                            <div className='col-span-2'>
                                <Input
                                    name={fields.invoiceItemRate.name}
                                    key={fields.invoiceItemRate.key}
                                    type='number'
                                    placeholder='0'
                                    value={rate}
                                    onChange={(e) => setRate(e.target.value)}
                                />
                                <p className='text-sm text-red-500'>
                                    {fields.invoiceItemRate.errors}
                                </p>
                            </div>
                            <div className='col-span-2'>
                                <Input
                                    disabled
                                    value={calculateTotal}
                                />
                            </div>
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
                        <p className='text-sm text-red-500'>
                            {fields.note.errors}
                        </p>
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
