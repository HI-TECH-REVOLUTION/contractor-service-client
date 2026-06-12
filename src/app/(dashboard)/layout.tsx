import { Sidebar } from "@/components/layout/sidebar";
import { TopBar } from "@/components/layout/top-bar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen flex flex-col bg-background">
			<TopBar />
			<div className="flex flex-1">
				<Sidebar />
				<main className="flex-1 overflow-y-auto">{children}</main>
			</div>
		</div>
	);
}
