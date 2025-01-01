'use client';

import { CalendarIcon } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';
import { Calendar } from '../ui/calendar';
import { useState } from 'react';
import { Textarea } from '../ui/textarea';
import BetterButton from './BetterButton';

export default function CreateInvoice() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    return (
        <Card className='w-full max-w-4xl mx-auto '>
            <CardContent className='p-6'>
                <div className='grid gap-1 w-fit mb-6'>
                    <div className='flex items-center gap-4'>
                        <Badge variant='secondary'>Draft</Badge>
                        <Input placeholder='...' />
                    </div>
                </div>
                <div className='grid md:grid-cols-3 gap-6 mb-6'>
                    <div>
                        <Label>Invoice No.</Label>
                        <div className='flex'>
                            <span className='px-3 border border-r-0 rounded-l-md bg-muted flex items-center'>
                                #
                            </span>
                            <Input
                                className='rounded-l-none'
                                placeholder='NaN'
                            />
                        </div>
                    </div>
                    <div>
                        <Label>Currency</Label>
                        <Select defaultValue='USD'>
                            <SelectTrigger>
                                <SelectValue placeholder='Select Currency' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='USD'>
                                    United States Dollar -- USD
                                </SelectItem>
                                <SelectItem value='EUR'>Euro -- EUR</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className='grid md:grid-cols-2 gap-6 mb-6'>
                    <div>
                        <Label>From</Label>
                        <div className='space-y-2'>
                            <Input placeholder='Your Name' />
                            <Input placeholder='Your Email' />
                            <Input placeholder='Your Address' />
                        </div>
                    </div>
                    <div>
                        <Label>To</Label>
                        <div className='space-y-2'>
                            <Input placeholder='Client Name' />
                            <Input placeholder='Client Email' />
                            <Input placeholder='Client Address' />
                        </div>
                    </div>
                </div>
                <div className='grid md:grid-cols-2 gap-6 mb-6'>
                    <div>
                        <div>
                            <Label>Date</Label>
                        </div>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant='outline'
                                    className='w-[280px] text-left justify-start'
                                >
                                    <CalendarIcon />
                                    {selectedDate ? (
                                        new Intl.DateTimeFormat('en-US', {
                                            dateStyle: 'long',
                                        }).format(selectedDate)
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
                    </div>
                    <div>
                        <Label>Invoice Due</Label>
                        <Select>
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
                    </div>
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
                            <Textarea placeholder='Item name & description' />
                        </div>
                        <div className='col-span-2'>
                            <Input
                                type='number'
                                placeholder='0'
                            />
                        </div>
                        <div className='col-span-2'>
                            <Input
                                type='number'
                                placeholder='0'
                            />
                        </div>
                        <div className='col-span-2'>
                            <Input
                                type='number'
                                placeholder='0'
                                disabled
                            />
                        </div>
                    </div>
                </div>
                <div className='flex justify-end'>
                    <div className='w-1/3'>
                        <div className='flex justify-between py-2'>
                            <span>Subtotal</span>
                            <span>$1M</span>
                        </div>
                        <div className='flex justify-between py-2 border-t'>
                            <span>Total (USD)</span>
                            <span className='font-medium underline underline-offset-2'>
                                $1B
                            </span>
                        </div>
                    </div>
                </div>

                <div>
                    <Label>Note</Label>
                    <Textarea placeholder='Add your note here...' />
                </div>
                <div className='flex items-center justify-end mt-6 '>
                    <div>
                        <BetterButton>Sent Invoice to Client</BetterButton>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
