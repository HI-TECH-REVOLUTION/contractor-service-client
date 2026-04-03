import Link from "next/link";
import { ChevronRight } from "lucide-react";

import type { BreadcrumbItem } from "@/components/marketing/types";
import { cn } from "@/lib/utils";

type Variant = "default" | "onDark" | "minimal";

const styles: Record<Variant, { nav: string; link: string; current: string; chevron: string }> = {
	default: {
		nav: "text-muted-foreground",
		link: "hover:text-primary",
		current: "font-medium text-foreground",
		chevron: "opacity-50",
	},
	onDark: {
		nav: "text-white/70",
		link: "hover:text-white",
		current: "font-medium text-white",
		chevron: "opacity-40",
	},
	minimal: {
		nav: "text-muted-foreground/90",
		link: "hover:text-foreground",
		current: "font-medium text-foreground",
		chevron: "opacity-40",
	},
};

export function PageBreadcrumb({
	items,
	variant = "default",
	className,
}: {
	items: BreadcrumbItem[];
	variant?: Variant;
	className?: string;
}) {
	const s = styles[variant];
	return (
		<nav
			className={cn(
				"flex flex-wrap items-center gap-1 text-sm animate-in fade-in duration-500",
				s.nav,
				className,
			)}
			aria-label="Breadcrumb"
		>
			{items.map((crumb, i) => (
				<span key={`${crumb.label}-${i}`} className="flex items-center gap-1">
					{i > 0 ? (
						<ChevronRight className={cn("size-3.5 shrink-0", s.chevron)} aria-hidden />
					) : null}
					{crumb.href ? (
						<Link href={crumb.href} className={cn("transition-colors", s.link)}>
							{crumb.label}
						</Link>
					) : (
						<span className={s.current}>{crumb.label}</span>
					)}
				</span>
			))}
		</nav>
	);
}
