import { IntlType } from './type';

type formatCurrencyProps = {
    num: number;
    currency: 'USD' | 'EUR';
};

export function formatCurrency({ num, currency }: formatCurrencyProps) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
    }).format(num);
}

export function formatTime(
    time: Date | number,
    format: { date?: IntlType; time?: IntlType }
) {
    const options: Intl.DateTimeFormatOptions = {
        ...(format.date && { dateStyle: format.date }),
        ...(format.time && { timeStyle: format.time }),
    };

    return new Intl.DateTimeFormat('en-US', options).format(time);
}
