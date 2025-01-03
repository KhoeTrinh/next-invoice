import Errors from "@/components/app/Errors";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Fields } from "./type";

export const invoiceFieldsConfig = (
    fields: Fields,
    quantity: string,
    setQuantity: (value: string) => void,
    rate: string,
    setRate: (value: string) => void,
    calculateTotal: string
) => [
    {
        span: 6,
        component: (
            <>
                <Textarea
                    name={fields.invoiceItemDescription.name}
                    key={fields.invoiceItemDescription.key}
                    defaultValue={fields.invoiceItemDescription.initialValue}
                    placeholder='Item name & description'
                />
                <Errors error={fields.invoiceItemDescription.errors} />
            </>
        ),
    },
    {
        span: 2,
        component: (
            <>
                <Input
                    name={fields.invoiceItemQuantity.name}
                    key={fields.invoiceItemQuantity.key}
                    type='number'
                    placeholder='0'
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <Errors error={fields.invoiceItemQuantity.errors} />
            </>
        ),
    },
    {
        span: 2,
        component: (
            <>
                <Input
                    name={fields.invoiceItemRate.name}
                    key={fields.invoiceItemRate.key}
                    type='number'
                    placeholder='0'
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                />
                <Errors error={fields.invoiceItemRate.errors} />
            </>
        ),
    },
    {
        span: 2,
        component: (
            <Input
                disabled
                value={calculateTotal}
            />
        ),
    },
];
