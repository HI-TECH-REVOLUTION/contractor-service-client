"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export type FadeUpProps = {
	children: React.ReactNode;
	className?: string;
	/** Hiển thị ngay (hero / above the fold), không chờ scroll */
	immediate?: boolean;
	/** Trễ khi stagger nhiều phần tử */
	delayMs?: number;
};

/** Trượt lên — giảm tốc khi vào vị trí (cảm giác swipe, không “mờ dần” lâu). */
const EASE_SWIPE = "cubic-bezier(0.2, 0.82, 0.22, 1)";
const MS_OPACITY = 90;
const MS_TRANSFORM = 580;

/**
 * Swipe up từ dưới: opacity lên gần như ngay, phần lớn cảm giác là chuyển động dọc.
 * Tắt khi prefers-reduced-motion.
 */
export function FadeUp({ children, className, immediate = false, delayMs = 0 }: FadeUpProps) {
	const ref = useRef<HTMLDivElement>(null);
	const [visible, setVisible] = useState(immediate);

	useEffect(() => {
		if (immediate) return;

		const el = ref.current;
		if (!el) return;

		const obs = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setVisible(true);
					obs.disconnect();
				}
			},
			{ root: null, rootMargin: "0px 0px -6% 0px", threshold: 0.06 },
		);

		obs.observe(el);
		return () => obs.disconnect();
	}, [immediate]);

	return (
		<div
			ref={ref}
			className={cn(
				"will-change-[opacity,transform] motion-reduce:translate-y-0 motion-reduce:opacity-100",
				visible ? "translate-y-0 opacity-100" : "translate-y-14 opacity-0 sm:translate-y-16",
				className,
			)}
			style={{
				transition: (() => {
					const d = delayMs > 0 ? `${delayMs}ms` : "0ms";
					return `opacity ${MS_OPACITY}ms ease-out ${d}, transform ${MS_TRANSFORM}ms ${EASE_SWIPE} ${d}`;
				})(),
			}}
		>
			{children}
		</div>
	);
}
