type ErrorProps = {
    error: string | string[] | undefined;
};

export default function Errors({ error }: ErrorProps) {
    if (error === undefined) return;
    return <p className='text-sm text-red-500'>{error}</p>;
}
