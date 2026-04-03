import Link from "next/link";

import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";

export function RelatedCta({
	links,
	className,
	variant = "default",
}: {
	links: Array<{ href: string; label: string }>;
	className?: string;
	variant?: "default" | "dark" | "soft";
}) {
	if (!links.length) return null;

	const wrap = {
		default:
			"border-primary/15 bg-linear-to-br from-primary/5 to-sky-50/50 dark:from-primary/10 dark:to-background",
		dark: "border-white/10 bg-white/5",
		soft: "border-border/60 bg-muted/40",
	}[variant];

	return (
		<div
			className={cn(
				"mt-14 flex flex-col items-center gap-4 rounded-2xl border px-6 py-10 text-center sm:mt-16",
				wrap,
				className,
			)}
		>
			<p
				className={cn(
					"font-heading text-lg font-semibold",
					variant === "dark" ? "text-white" : "text-foreground",
				)}
			>
				Tiếp theo bạn có thể
			</p>
			<div className="flex flex-wrap justify-center gap-3">
				{links.map((l) => (
					<Link
						key={l.href}
						href={l.href}
						className={buttonVariants({
							variant: variant === "dark" ? "secondary" : "default",
							size: "lg",
						})}
					>
						{l.label}
					</Link>
				))}
			</div>
			<Link
				href="tel:+84900000000"
				className={buttonVariants({
					variant: variant === "dark" ? "outline" : "outline",
					size: "lg",
					className:
						variant === "dark"
							? "border-white/30 bg-transparent text-white hover:bg-white/10"
							: undefined,
				})}
			>
				Gọi hotline
			</Link>
		</div>
	);
}
