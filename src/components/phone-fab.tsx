"use client";

import { Phone } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Placeholder hotline — thay `href` khi có số thật. */
const PHONE_HREF = "tel:+84900000000";

export function PhoneFab() {
	return (
		<a
			href={PHONE_HREF}
			className={cn(
				buttonVariants({ variant: "default", size: "icon-lg" }),
				"fixed bottom-5 right-5 z-50 size-14 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95",
			)}
			aria-label="Gọi hotline hỗ trợ"
		>
			<Phone className="size-6" aria-hidden />
		</a>
	);
}
