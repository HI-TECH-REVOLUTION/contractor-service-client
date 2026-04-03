"use client";

import { cn } from "@/lib/utils";

type Props = {
	segments: string[];
	trail?: string;
	className?: string;
};

/**
 * Chuỗi path dạng mockup: phần đã chọn (cam đậm) • phần gợi ý (muted).
 */
export function BookingBreadcrumb({ segments, trail, className }: Props) {
	if (segments.length === 0 && !trail) return null;
	return (
		<p className={cn("text-sm leading-relaxed text-muted-foreground", className)}>
			{segments.map((s, i) => (
				<span key={`${s}-${i}`}>
					{i > 0 ? (
						<span className="text-muted-foreground/70" aria-hidden>
							{" "}
							•{" "}
						</span>
					) : null}
					<span className="font-medium text-[oklch(0.55_0.14_55)]">{s}</span>
				</span>
			))}
			{trail ? (
				<>
					{segments.length > 0 ? (
						<span className="text-muted-foreground/70" aria-hidden>
							{" "}
							•{" "}
						</span>
					) : null}
					<span>{trail}</span>
				</>
			) : null}
		</p>
	);
}
