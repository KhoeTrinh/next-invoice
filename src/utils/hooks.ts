import { redirect } from "next/navigation";
import { auth } from "./auth";
import prisma from "./db";

export async function requireUser() {
    const session = await auth();
    if (!session?.user) {
        redirect('/login');
    }
    return session
}

export async function getUser(id: string) {
    const data = await prisma.user.findUnique({
        where: {
            id,
        },
        select: {
            firstName: true,
            lastName: true,
            address: true,
        },
    });
    if (!data?.firstName || !data?.lastName || !data?.address)
        redirect('/onboarding');
}