import { cva, type VariantProps } from "class-variance-authority";

/**
 * Chuẩn UI nút (tham khảo CTA "Đặt ngay" hero Home):
 * pill `rounded-full`, primary có `shadow-md`, focus ring + ring-offset.
 *
 * Kích thước: `sm` | `md` (mặc định) | `lg`
 */
export const buttonVariants = cva(
	"group/button inline-flex shrink-0 items-center justify-center border border-transparent bg-clip-padding font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/30 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
	{
		variants: {
			variant: {
				default:
					"rounded-full bg-primary text-primary-foreground shadow-md hover:bg-primary/90 [a]:hover:bg-primary/90",
				outline:
					"rounded-full border-primary/35 bg-background text-primary shadow-sm hover:bg-primary/5 hover:text-primary dark:bg-background/90",
				secondary:
					"rounded-full bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/85 aria-expanded:bg-secondary",
				ghost:
					"rounded-full shadow-none hover:bg-muted hover:text-foreground aria-expanded:bg-muted dark:hover:bg-muted/50",
				destructive:
					"rounded-full bg-destructive/10 text-destructive shadow-none hover:bg-destructive/20 focus-visible:ring-destructive/30 dark:bg-destructive/20 dark:hover:bg-destructive/30",
				link: "inline text-primary underline-offset-4 hover:bg-transparent hover:underline",
			},
			size: {
				sm: "h-9 min-h-9 gap-1.5 px-4 text-sm [&_svg:not([class*='size-'])]:size-3.5",
				md: "h-10 min-h-10 gap-2 px-6 text-sm",
				lg: "h-11 min-h-11 gap-2 px-8 text-sm",
				"icon-sm":
					"size-8 min-h-8 min-w-8 gap-0 rounded-full p-0 [&_svg:not([class*='size-'])]:size-3.5",
				icon: "size-9 min-h-9 min-w-9 gap-0 rounded-full p-0",
				"icon-lg":
					"size-11 min-h-11 min-w-11 gap-0 rounded-full p-0 [&_svg:not([class*='size-'])]:size-5",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "md",
		},
		compoundVariants: [
			{
				variant: "link",
				size: "sm",
				class:
					"!h-auto !min-h-0 w-fit !rounded-none border-0 !px-0 !py-0 text-sm font-medium shadow-none focus-visible:!ring-0 focus-visible:!ring-offset-0",
			},
			{
				variant: "link",
				size: "md",
				class:
					"!h-auto !min-h-0 w-fit !rounded-none border-0 !px-0 !py-0 text-sm font-medium shadow-none focus-visible:!ring-0 focus-visible:!ring-offset-0",
			},
			{
				variant: "link",
				size: "lg",
				class:
					"!h-auto !min-h-0 w-fit !rounded-none border-0 !px-0 !py-0 text-sm font-medium shadow-none focus-visible:!ring-0 focus-visible:!ring-offset-0",
			},
		],
	},
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
