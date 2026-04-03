import Image from "next/image";

import { BRAND_NAME } from "@/content/site";
import { cn } from "@/lib/utils";

const LOGO_SRC = "/logo.jpg";
const LOGO_WIDTH = 200;
const LOGO_HEIGHT = 48;

/**
 * Logo: ảnh `public/logo.jpg` + tên HomeBase (`BRAND_NAME` trong site.ts).
 */
export function BrandLockup({ className }: { className?: string }) {
	return (
		<span className={cn("inline-flex min-w-0 max-w-full items-center gap-2", className)}>
			<Image
				src={LOGO_SRC}
				alt=""
				width={LOGO_WIDTH}
				height={LOGO_HEIGHT}
				className="h-9 w-auto max-h-10 shrink-0 object-contain sm:h-10"
				priority
			/>
			<span className="shrink-0 font-heading text-lg font-bold tracking-tight text-foreground sm:text-xl">
				{BRAND_NAME}
			</span>
		</span>
	);
}
