import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';

type BetterSelectProps = {
    safety: {
        name: string;
        key?: string;
        initialValue?: string;
    };
    value: string;
    item: Array<{
        value: string;
        label: string;
    }>;
    onValueChange?: (value: 'USD' | 'EUR') => void;
};

export default function BetterSelect({
    safety,
    value,
    item,
    onValueChange,
}: BetterSelectProps) {
    return (
        <Select
            name={safety.name}
            key={safety.key || 'defaultKey'}
            defaultValue={safety.initialValue || 'USD'}
            onValueChange={onValueChange}
        >
            <SelectTrigger>
                <SelectValue placeholder={value} />
            </SelectTrigger>
            <SelectContent>
                {item.map((option, i) => (
                    <SelectItem
                        value={option.value}
                        key={i}
                    >
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
