import File from '@/../public/file.svg';
import Globe from '@/../public/globe.svg';
import Hero from '@/../public/hero.png';
import PLogo from '@/../public/logo.png';
import SLogo from '@/../public/logo.svg';
import Next from '@/../public/next.svg';
import Paid_Gif from '@/../public/paid-gif.gif';
import Vercel from '@/../public/vercel.svg';
import Warning_Gif from '@/../public/warning-gif.gif';
import Window from '@/../public/window.svg';

export const ImageCollection = [
    File,
    Globe,
    Hero,
    PLogo,
    SLogo,
    Next,
    Paid_Gif,
    Vercel,
    Warning_Gif,
    Window,
];

export const Keys = [
    {
        label: 'From',
        keys: ['fromName', 'fromEmail', 'fromAddress'] as const,
    },
    {
        label: 'To',
        keys: ['clientName', 'clientEmail', 'clientAddress'] as const,
    },
];

export const LabelsNet = [
    {
        label: 'Due on Reciept',
        value: '0',
    },
    {
        label: 'Net 15',
        value: '15',
    },
    {
        label: 'Net 30',
        value: '30',
    },
    {
        label: 'Net 45',
        value: '45',
    },
    {
        label: 'Net 60',
        value: '60',
    },
];

export const LabelsCurrency = [
    {
        label: 'United States Dollar -- USD',
        value: 'USD',
    },
    {
        label: 'Euro -- EUR',
        value: 'EUR',
    },
];
export const Data = ['Description', 'Quantity', 'Rate', 'Amount'];
