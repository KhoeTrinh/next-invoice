import { requireUser } from "@/utils/hooks";
import { ChildrenProps } from "@/utils/type";

type DashboardLayoutProps = ChildrenProps
export default async function DashboardLayout({ children }: DashboardLayoutProps) {
    const session = await requireUser()
    return <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        {children}
    </div>;
}
