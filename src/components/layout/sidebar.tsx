"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	LayoutDashboard,
	FolderKanban,
	Users,
	FileText,
	Receipt,
	FileSignature,
	CreditCard,
	Palette,
	MessageSquare,
	Bell,
	Settings,
	HelpCircle,
	ShieldCheck,
	LogOut,
	CheckCircle2,
} from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface NavItem {
	icon: React.ComponentType<{ className?: string }>;
	labelKey: string;
	href: string;
	badge?: number;
	badgeColor?: string;
	adminOnly?: boolean;
}

interface NavSection {
	titleKey: string;
	items: NavItem[];
}

const NAV_SECTIONS: NavSection[] = [
	{
		titleKey: "sidebar.project",
		items: [
			{ icon: LayoutDashboard, labelKey: "nav.dashboard", href: "/dashboard" },
			{ icon: FolderKanban, labelKey: "nav.projects", href: "/projects" },
			{ icon: Users, labelKey: "nav.partners", href: "/partners" },
		],
	},
	{
		titleKey: "sidebar.records",
		items: [
			{ icon: FileText, labelKey: "nav.documents", href: "/documents" },
			{ icon: Receipt, labelKey: "nav.quotations", href: "/quotations" },
			{ icon: FileSignature, labelKey: "nav.contracts", href: "/contracts" },
			{ icon: CreditCard, labelKey: "nav.payments", href: "/payments" },
		],
	},
	{
		titleKey: "sidebar.tools",
		items: [
			{ icon: Palette, labelKey: "nav.interior", href: "/interior-design" },
			{
				icon: MessageSquare,
				labelKey: "nav.communications",
				href: "/communications",
				badge: 3,
				badgeColor: "bg-primary",
			},
		],
	},
	{
		titleKey: "sidebar.account",
		items: [
			{
				icon: Bell,
				labelKey: "nav.notifications",
				href: "/notifications",
				badge: 5,
				badgeColor: "bg-destructive",
			},
			{ icon: Settings, labelKey: "nav.settings", href: "/settings" },
			{ icon: HelpCircle, labelKey: "nav.help", href: "/help" },
		],
	},
	{
		titleKey: "sidebar.admin",
		items: [{ icon: ShieldCheck, labelKey: "nav.admin", href: "/admin", adminOnly: true }],
	},
];

const SECTION_TITLES: Record<string, Record<string, string>> = {
	"sidebar.project": { vi: "Dự án", en: "Project" },
	"sidebar.records": { vi: "Hồ sơ", en: "Records" },
	"sidebar.tools": { vi: "Công cụ", en: "Tools" },
	"sidebar.account": { vi: "Tài khoản", en: "Account" },
	"sidebar.admin": { vi: "Quản trị", en: "Admin" },
};

export function Sidebar() {
	const pathname = usePathname();
	const { user, logout } = useAuthStore();
	const { t, locale } = useI18n();

	const initials = user?.name
		?.split(" ")
		.map((w) => w[0])
		.slice(0, 2)
		.join("")
		.toUpperCase();

	const roleLabel = user?.role ? t(`role.${user.role}`) : "";

	return (
		<aside className="hidden md:flex flex-col w-60 bg-card border-r border-border sticky top-[60px] h-[calc(100vh-60px)] shrink-0">
			<div className="p-4 border-b border-border">
				<div className="flex items-center gap-3">
					<div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center shrink-0">
						<span className="text-sm font-semibold text-primary-foreground">{initials}</span>
					</div>
					<div className="min-w-0">
						<p className="text-sm font-semibold truncate">{user?.name}</p>
						<div className="flex items-center gap-1.5 mt-0.5">
							{user?.verified && <CheckCircle2 className="h-3 w-3 text-success shrink-0" />}
							<span className="text-xs text-muted-foreground truncate">{roleLabel}</span>
						</div>
					</div>
				</div>
			</div>

			<nav className="flex-1 overflow-y-auto py-3 px-3">
				{NAV_SECTIONS.map((section) => {
					const visibleItems = section.items.filter(
						(item) => !item.adminOnly || user?.role === "admin",
					);
					if (visibleItems.length === 0) return null;

					return (
						<div key={section.titleKey} className="mb-4">
							<p className="px-2 mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
								{SECTION_TITLES[section.titleKey]?.[locale] ?? section.titleKey}
							</p>
							{visibleItems.map((item) => {
								const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
								const Icon = item.icon;

								return (
									<Link
										key={item.href}
										href={item.href}
										className={cn(
											"flex items-center gap-3 px-2.5 py-2 rounded-md text-sm transition-colors group",
											isActive
												? "bg-accent text-primary font-medium"
												: "text-foreground hover:bg-muted",
										)}
									>
										<Icon
											className={cn(
												"h-[18px] w-[18px] shrink-0",
												isActive
													? "text-primary"
													: "text-muted-foreground group-hover:text-foreground",
											)}
										/>
										<span className="truncate">{t(item.labelKey)}</span>
										{item.badge != null && item.badge > 0 && (
											<span
												className={cn(
													"ml-auto text-[11px] font-semibold text-white px-1.5 py-0.5 rounded-full leading-none",
													item.badgeColor ?? "bg-primary",
												)}
											>
												{item.badge}
											</span>
										)}
									</Link>
								);
							})}
						</div>
					);
				})}
			</nav>

			<div className="p-3 border-t border-border">
				<button
					onClick={logout}
					className="flex items-center gap-3 w-full px-2.5 py-2 rounded-md text-sm text-muted-foreground hover:bg-muted hover:text-destructive transition-colors"
				>
					<LogOut className="h-[18px] w-[18px]" />
					<span>{t("nav.logout")}</span>
				</button>
			</div>
		</aside>
	);
}
