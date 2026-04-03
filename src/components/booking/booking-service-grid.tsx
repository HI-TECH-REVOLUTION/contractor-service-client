"use client";

import Image from "next/image";

import { BookingIcon } from "@/components/booking/booking-icon";
import { cn } from "@/lib/utils";

export type CategoryCardItem = {
	id: string;
	label: string;
	description: string;
	imageSrc: string;
	imageAlt: string;
};

export type ServiceCardItem = {
	id: string;
	label: string;
	description?: string;
	icon: string;
};

type CategoryProps = {
	mode: "category";
	items: CategoryCardItem[];
	selectedId: string | null;
	onSelect: (id: string) => void;
};

type ServiceProps = {
	mode: "service";
	items: ServiceCardItem[];
	selectedId: string | null;
	onSelect: (id: string) => void;
};

type Props = CategoryProps | ServiceProps;

export function BookingServiceGrid(props: Props) {
	if (props.mode === "category") {
		return (
			<ul className="grid gap-3 sm:grid-cols-2">
				{props.items.map((item) => {
					const sel = props.selectedId === item.id;
					return (
						<li key={item.id}>
							<button
								type="button"
								onClick={() => props.onSelect(item.id)}
								className={cn(
									"flex w-full gap-3 rounded-xl border bg-card p-4 text-left shadow-sm transition-all",
									"hover:border-primary/25 hover:bg-primary/[0.03]",
									"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
									sel && "border-primary ring-2 ring-primary/25",
								)}
							>
								<span className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-muted ring-1 ring-border/60">
									<Image
										src={item.imageSrc}
										alt={item.imageAlt}
										fill
										className="object-cover"
										sizes="56px"
									/>
								</span>
								<span className="min-w-0">
									<span className="font-heading block font-semibold text-foreground">
										{item.label}
									</span>
									<span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
										{item.description}
									</span>
								</span>
							</button>
						</li>
					);
				})}
			</ul>
		);
	}

	return (
		<ul className="grid gap-3 sm:grid-cols-2">
			{props.items.map((item) => {
				const sel = props.selectedId === item.id;
				return (
					<li key={item.id}>
						<button
							type="button"
							onClick={() => props.onSelect(item.id)}
							className={cn(
								"flex w-full gap-3 rounded-xl border bg-card p-4 text-left shadow-sm transition-all",
								"hover:border-primary/25 hover:bg-primary/[0.03]",
								"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
								sel && "border-primary ring-2 ring-primary/25",
							)}
						>
							<span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary ring-1 ring-primary/15">
								<BookingIcon name={item.icon} className="size-5" aria-hidden />
							</span>
							<span className="min-w-0">
								<span className="font-heading block font-semibold text-foreground">
									{item.label}
								</span>
								{item.description ? (
									<span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
										{item.description}
									</span>
								) : null}
							</span>
						</button>
					</li>
				);
			})}
		</ul>
	);
}
