import { ChildrenProps } from '@/utils/type';
import { Badge } from '../ui/badge';
import { Label } from '../ui/label';

type DivWithLabelProps = ChildrenProps & {
    text: string;
    special?: boolean;
    badge?: boolean;
    className?: string;
};

export default function DivWithLabel({
    text,
    special,
    badge,
    className,
    children,
}: DivWithLabelProps) {
    return (
        <div className={className}>
            {badge ? (
                <Badge variant='secondary'>{text}</Badge>
            ) : special ? (
                <div>
                    <Label>{text}</Label>
                </div>
            ) : (
                <Label>{text}</Label>
            )}
            {children}
        </div>
    );
}
