import { CalendarIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { formatTime } from '@/utils/format';
import { Calendar } from '../ui/calendar';
import { SelectSingleEventHandler } from 'react-day-picker';

type PopOverProps = {
    dates: Date | undefined;
    setDates: (date: Date) => void;
};

export default function PopOver({ dates, setDates }: PopOverProps) {
    const handleDateSelect: SelectSingleEventHandler = (day) => {
        if (day) setDates(day);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant='outline'
                    className='w-[280px] md:w-auto text-left justify-start'
                >
                    <CalendarIcon />
                    {dates ? (
                        formatTime(dates, {
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
                    selected={dates}
                    onSelect={handleDateSelect}
                    fromDate={new Date()}
                />
            </PopoverContent>
        </Popover>
    );
}
