import AdvanceButton from '@/components/app/AdvanceButton';
import { signOut } from '@/utils/auth';
import { requireUser } from '@/utils/hooks';

export default async function Dashboard() {
    await requireUser();
    return (
        <div>
            <h1>Dashboard</h1>
            <form
                action={async () => {
                    'use server';
                    await signOut();
                }}
            >
                <AdvanceButton>Sign out</AdvanceButton>
            </form>
        </div>
    );
}
