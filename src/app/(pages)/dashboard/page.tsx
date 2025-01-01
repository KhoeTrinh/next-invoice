import BetterButton from '@/components/app/BetterButton';
import { SignOut } from '@/utils/action';
import { requireUser } from '@/utils/hooks';

export default async function Dashboard() {
    await requireUser();
    return (
        <div>
            <h1>Dashboard</h1>
            <form action={SignOut}>
                <BetterButton>Sign out</BetterButton>
            </form>
        </div>
    );
}
