"use client";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const STEPS = [
	{ id: 1, label: "Chọn dịch vụ" },
	{ id: 2, label: "Đặt lịch" },
	{ id: 3, label: "Xác nhận" },
	{ id: 4, label: "Liên hệ" },
] as const;

type Props = {
	current: 1 | 2 | 3 | 4;
	className?: string;
};

export function BookingStepper({ current, className }: Props) {
	return (
		<nav
			className={cn("w-full overflow-x-auto pb-1", className)}
			aria-label="Tiến trình đặt dịch vụ"
		>
			<ol className="flex min-w-[min(100%,36rem)] w-full items-center justify-between gap-1">
				{STEPS.map((step, i) => {
					const done = current > step.id;
					const active = current === step.id;
					return (
						<li key={step.id} className="flex flex-1 items-center gap-0.5">
							<div className="flex min-w-0 flex-1 flex-col items-center gap-1.5">
								<span
									className={cn(
										"flex size-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-semibold transition-colors",
										done && "border-primary bg-primary text-primary-foreground",
										active && !done && "border-primary text-primary",
										!active && !done && "border-muted-foreground/30 text-muted-foreground",
									)}
									aria-current={active ? "step" : undefined}
								>
									{done ? <Check className="size-4" aria-hidden /> : step.id}
								</span>
								<span
									className={cn(
										"max-w-[5.5rem] text-center text-[10px] font-medium leading-tight sm:max-w-none sm:text-xs",
										active || done ? "text-primary" : "text-muted-foreground",
									)}
								>
									{step.label}
								</span>
							</div>
							{i < STEPS.length - 1 ? (
								<div
									className={cn(
										"mx-0.5 h-px min-w-[0.5rem] flex-1 sm:min-w-[1.25rem]",
										current > step.id ? "bg-primary" : "bg-border",
									)}
									aria-hidden
								/>
							) : null}
						</li>
					);
				})}
			</ol>
		</nav>
	);
}
