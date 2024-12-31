import SubmitButton from "@/components/app/SubmitButton";
import { signOut } from "@/utils/auth";
import { requireUser } from "@/utils/hooks";

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
                <SubmitButton>Sign out</SubmitButton>
            </form>
        </div>
    );
}
