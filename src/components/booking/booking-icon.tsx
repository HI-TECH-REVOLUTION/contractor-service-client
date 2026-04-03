"use client";

import type { LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";

import { cn } from "@/lib/utils";

type Props = {
	name: string;
	className?: string;
	"aria-hidden"?: boolean;
};

export function BookingIcon({ name, className, ...rest }: Props) {
	const Icon = (Icons as unknown as Record<string, LucideIcon | undefined>)[name];
	if (!Icon) {
		const Fallback = Icons.LayoutGrid;
		return <Fallback className={cn("size-5", className)} {...rest} />;
	}
	return <Icon className={cn("size-5", className)} {...rest} />;
}
