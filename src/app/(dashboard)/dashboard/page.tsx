"use client";

import {
	FolderKanban,
	ListChecks,
	Users,
	FileText,
	Plus,
	Search,
	Palette,
	ArrowUpRight,
	Clock,
} from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const STATS = [
	{
		labelKey: "dashboard.activeProjects",
		value: 3,
		icon: FolderKanban,
		color: "text-primary",
		bg: "bg-accent",
	},
	{
		labelKey: "dashboard.pendingTasks",
		value: 7,
		icon: ListChecks,
		color: "text-warning",
		bg: "bg-orange-50",
	},
	{
		labelKey: "dashboard.totalPartners",
		value: 6,
		icon: Users,
		color: "text-success",
		bg: "bg-emerald-50",
	},
	{
		labelKey: "dashboard.totalDocuments",
		value: 8,
		icon: FileText,
		color: "text-purple-600",
		bg: "bg-purple-50",
	},
];

const RECENT_ACTIVITY = [
	{
		id: 1,
		titleVi: 'Dự án "Biệt thự Thảo Điền" đã được cập nhật',
		titleEn: 'Project "Thao Dien Villa" was updated',
		time: "5 phút trước",
		timeEn: "5 minutes ago",
	},
	{
		id: 2,
		titleVi: "Báo giá mới từ đối tác Hoàng Gia",
		titleEn: "New quotation from partner Hoang Gia",
		time: "30 phút trước",
		timeEn: "30 minutes ago",
	},
	{
		id: 3,
		titleVi: "Hợp đồng #CT-2024-015 đã được ký",
		titleEn: "Contract #CT-2024-015 was signed",
		time: "2 giờ trước",
		timeEn: "2 hours ago",
	},
	{
		id: 4,
		titleVi: "Thanh toán đợt 2 đã được xác nhận",
		titleEn: "Phase 2 payment confirmed",
		time: "1 ngày trước",
		timeEn: "1 day ago",
	},
	{
		id: 5,
		titleVi: 'Đối tác mới "Kiến Trúc ABC" đã tham gia',
		titleEn: 'New partner "Kien Truc ABC" joined',
		time: "2 ngày trước",
		timeEn: "2 days ago",
	},
];

const QUICK_ACTIONS = [
	{
		labelVi: "Tạo dự án mới",
		labelEn: "Create New Project",
		icon: Plus,
		href: "/projects/new",
		color: "bg-primary text-primary-foreground",
	},
	{
		labelVi: "Tìm đối tác",
		labelEn: "Find Partners",
		icon: Search,
		href: "/partners",
		color: "bg-success text-success-foreground",
	},
	{
		labelVi: "Thiết kế nội thất",
		labelEn: "Interior Design",
		icon: Palette,
		href: "/interior-design",
		color: "bg-warning text-warning-foreground",
	},
];

export default function DashboardPage() {
	const { user } = useAuthStore();
	const { t, locale } = useI18n();

	const greeting = locale === "vi" ? `Chào, ${user?.name ?? ""}` : `Hello, ${user?.name ?? ""}`;

	return (
		<div className="p-6 lg:p-8 max-w-6xl">
			<div className="mb-8">
				<h1 className="text-2xl font-bold">{t("dashboard.title")}</h1>
				<p className="text-muted-foreground mt-1">{greeting}</p>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
				{STATS.map((stat) => {
					const Icon = stat.icon;
					return (
						<div
							key={stat.labelKey}
							className="bg-card rounded-xl border border-border p-5 shadow-sm hover:shadow-md transition-shadow"
						>
							<div className="flex items-center justify-between mb-3">
								<div className={cn("p-2 rounded-lg", stat.bg)}>
									<Icon className={cn("h-5 w-5", stat.color)} />
								</div>
								<ArrowUpRight className="h-4 w-4 text-muted-foreground" />
							</div>
							<p className="text-2xl font-bold">{stat.value}</p>
							<p className="text-sm text-muted-foreground mt-1">{t(stat.labelKey)}</p>
						</div>
					);
				})}
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<div className="lg:col-span-2 bg-card rounded-xl border border-border shadow-sm">
					<div className="px-5 py-4 border-b border-border">
						<h2 className="font-semibold">
							{locale === "vi" ? "Hoạt động gần đây" : "Recent Activity"}
						</h2>
					</div>
					<ul className="divide-y divide-border">
						{RECENT_ACTIVITY.map((item) => (
							<li key={item.id} className="px-5 py-3.5 hover:bg-muted/50 transition-colors">
								<p className="text-sm">{locale === "vi" ? item.titleVi : item.titleEn}</p>
								<div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
									<Clock className="h-3 w-3" />
									<span>{locale === "vi" ? item.time : item.timeEn}</span>
								</div>
							</li>
						))}
					</ul>
				</div>

				<div className="bg-card rounded-xl border border-border shadow-sm">
					<div className="px-5 py-4 border-b border-border">
						<h2 className="font-semibold">
							{locale === "vi" ? "Thao tác nhanh" : "Quick Actions"}
						</h2>
					</div>
					<div className="p-4 space-y-3">
						{QUICK_ACTIONS.map((action) => {
							const Icon = action.icon;
							return (
								<a
									key={action.href}
									href={action.href}
									className="flex items-center gap-3 p-3 rounded-lg border border-border hover:shadow-sm transition-all hover:-translate-y-0.5"
								>
									<div className={cn("p-2 rounded-lg", action.color)}>
										<Icon className="h-4 w-4" />
									</div>
									<span className="text-sm font-medium">
										{locale === "vi" ? action.labelVi : action.labelEn}
									</span>
								</a>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
