import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../ui/card';
import { ReactNode } from 'react';

type BetterCardProps = {
    show: {
        header: boolean;
        content: boolean;
        footer: boolean;
    };
    className: {
        card: string;
        header: string;
        title: string;
        description: string;
        content: string;
        footer: string;
    };
    text: {
        card: ReactNode;
        header: ReactNode;
        title: ReactNode;
        description: ReactNode;
        content: ReactNode;
        footer: ReactNode;
    };
};

export default function BetterCard({ show, className, text }: BetterCardProps) {
    return (
        <Card className={className.card}>
            {text.card}
            {show.header && (
                <CardHeader className={className.header}>
                    {text.header}
                    <CardTitle className={className.title}>
                        {text.title}
                    </CardTitle>
                    <CardDescription className={className.description}>
                        {text.description}
                    </CardDescription>
                </CardHeader>
            )}
            {show.content && (
                <CardContent className={className.content}>
                    {text.content}
                </CardContent>
            )}
            {show.footer && (
                <CardFooter className={className.footer}>
                    {text.footer}
                </CardFooter>
            )}
        </Card>
    );
}
