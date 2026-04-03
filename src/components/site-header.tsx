"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { BrandLockup } from "@/components/brand-logo";
import { DICH_VU_NAV_ITEMS, dichVuNavImage } from "@/content/dich-vu-nav";
import { BRAND_NAME } from "@/content/site";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";

const mainNavHome = { href: "/", label: "Trang chủ" } as const;

const mainNavRest = [
	{ href: "/gioi-thieu", label: "Giới thiệu" },
	{ href: "/cam-nang", label: "Cẩm nang" },
	{ href: "/tuyen-dung", label: "Tuyển dụng" },
] as const;

const partnerNavItems = [
	{
		href: "/doi-tac/cong-tac-vien-cham-soc-nha",
		label: "Cộng tác viên chăm sóc nhà",
	},
	{
		href: "/doi-tac/doi-tac-xay-dung",
		label: "Đối tác xây dựng",
	},
] as const;

const dichVuNav = DICH_VU_NAV_ITEMS.map((item) => ({
	href: item.href,
	label: item.label,
	description: item.description,
	image: dichVuNavImage(item.photoPath, 200),
	imageAlt: item.imageAlt,
}));

const megaPromoImage = dichVuNavImage("photo-1581578731548-c64695cc6952", 560);
const megaPromoAlt = "Dịch vụ chăm sóc nhà cửa";

const navItemClass =
	"rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-primary";

const mobileDichVuPanelId = "mobile-nav-dich-vu-panel";
const mobileDichVuTriggerId = "mobile-nav-dich-vu-trigger";
const mobilePartnerPanelId = "mobile-nav-partner-panel";
const mobilePartnerTriggerId = "mobile-nav-partner-trigger";

function DichVuLinksMobile({
	onNavigate,
	expanded,
	onExpandedChange,
}: {
	onNavigate?: () => void;
	expanded: boolean;
	onExpandedChange: (next: boolean) => void;
}) {
	return (
		<div className="pl-0">
			<button
				type="button"
				id={mobileDichVuTriggerId}
				className={cn(
					navItemClass,
					"flex w-full items-center justify-between gap-2 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring",
				)}
				aria-expanded={expanded}
				aria-controls={mobileDichVuPanelId}
				onClick={() => onExpandedChange(!expanded)}
			>
				<span>Dịch vụ</span>
				<ChevronDown
					className={cn(
						"size-4 shrink-0 text-muted-foreground transition-transform duration-200",
						expanded && "rotate-180",
					)}
					aria-hidden
				/>
			</button>
			<ul
				id={mobileDichVuPanelId}
				role="list"
				hidden={!expanded}
				className={cn(
					"mt-0.5 flex flex-col gap-0.5 border-l border-border/60 pl-2",
					!expanded && "hidden",
				)}
			>
				{dichVuNav.map((item) => (
					<li key={item.href}>
						<Link
							href={item.href}
							onClick={onNavigate}
							className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
						>
							<span className="relative size-9 shrink-0 overflow-hidden rounded-md bg-muted">
								<Image
									src={item.image}
									alt=""
									width={36}
									height={36}
									className="size-full object-cover"
								/>
							</span>
							<span className="font-medium text-foreground">{item.label}</span>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

function ServicesMegaMenu() {
	return (
		<div className="group/dichvu relative">
			<button
				type="button"
				className={cn(
					navItemClass,
					"inline-flex items-center gap-1.5 text-foreground outline-none",
					"group-hover/dichvu:bg-accent group-hover/dichvu:text-primary",
					"aria-expanded:opacity-100",
				)}
				aria-expanded="false"
				aria-haspopup="true"
			>
				Dịch vụ
				<ChevronDown
					className="size-4 shrink-0 transition-transform duration-200 group-hover/dichvu:rotate-180"
					aria-hidden
				/>
			</button>

			{/* pt-3 = cầu nối chuột giữa nút và panel; pointer-events khi hover để không rơi hover */}
			<div
				className={cn(
					"absolute left-1/2 top-full z-[60] w-[min(calc(100vw-2rem),72rem)] -translate-x-1/2",
					"pt-3",
					"pointer-events-none opacity-0",
					"invisible translate-y-1",
					"transition-all duration-200 ease-out",
					"group-hover/dichvu:pointer-events-auto group-hover/dichvu:visible group-hover/dichvu:translate-y-0 group-hover/dichvu:opacity-100",
					"group-focus-within/dichvu:pointer-events-auto group-focus-within/dichvu:visible group-focus-within/dichvu:translate-y-0 group-focus-within/dichvu:opacity-100",
				)}
			>
				<div
					className={cn(
						"rounded-xl border border-border/80 bg-popover/95 p-6 shadow-xl ring-1 ring-primary/5 backdrop-blur-md",
						"dark:bg-popover/98",
					)}
				>
					<div className="mb-4 flex items-end justify-between gap-4 border-b border-border/60 pb-4">
						<div>
							<p className="font-heading text-lg font-semibold text-foreground">Tất cả dịch vụ</p>
							<p className="text-sm text-muted-foreground">
								Chọn hạng mục — báo giá minh bạch, thợ đã qua kiểm chứng
							</p>
						</div>
						<Link
							href="/dat-dich-vu"
							className="hidden shrink-0 text-sm font-medium text-primary hover:underline sm:inline"
						>
							Đặt dịch vụ
						</Link>
					</div>
					<div className="flex flex-col gap-6 lg:flex-row lg:items-stretch">
						<ul className="grid flex-1 gap-2 sm:grid-cols-2">
							{dichVuNav.map((item) => (
								<li key={item.href}>
									<Link
										href={item.href}
										className={cn(
											"flex gap-3 rounded-lg border border-transparent p-3 transition-all",
											"hover:border-primary/15 hover:bg-primary/6",
											"focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
										)}
									>
										<span className="relative size-[3.25rem] shrink-0 overflow-hidden rounded-md bg-muted ring-1 ring-border/60">
											<Image
												src={item.image}
												alt={item.imageAlt}
												fill
												className="object-cover"
												sizes="52px"
											/>
										</span>
										<span className="min-w-0">
											<span className="font-heading block font-semibold leading-snug text-foreground">
												{item.label}
											</span>
											<span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
												{item.description}
											</span>
										</span>
									</Link>
								</li>
							))}
						</ul>
						<aside className="hidden shrink-0 flex-col justify-between lg:flex lg:w-[13.5rem] xl:w-[15rem]">
							<div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-border/60 bg-muted shadow-sm ring-1 ring-primary/10">
								<Image
									src={megaPromoImage}
									alt={megaPromoAlt}
									fill
									className="object-cover"
									sizes="240px"
								/>
							</div>
							<p className="mt-3 text-center text-xs font-medium leading-snug text-muted-foreground">
								Dịch vụ nhà — đồng hành cùng bạn
							</p>
						</aside>
					</div>
				</div>
			</div>
		</div>
	);
}

function PartnerLinksMobile({
	onNavigate,
	expanded,
	onExpandedChange,
}: {
	onNavigate?: () => void;
	expanded: boolean;
	onExpandedChange: (next: boolean) => void;
}) {
	return (
		<div className="pl-0">
			<button
				type="button"
				id={mobilePartnerTriggerId}
				className={cn(
					navItemClass,
					"flex w-full items-center justify-between gap-2 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring",
				)}
				aria-expanded={expanded}
				aria-controls={mobilePartnerPanelId}
				onClick={() => onExpandedChange(!expanded)}
			>
				<span>Trở thành đối tác</span>
				<ChevronDown
					className={cn(
						"size-4 shrink-0 text-muted-foreground transition-transform duration-200",
						expanded && "rotate-180",
					)}
					aria-hidden
				/>
			</button>
			<ul
				id={mobilePartnerPanelId}
				role="list"
				hidden={!expanded}
				className={cn(
					"mt-0.5 flex flex-col gap-0.5 border-l border-border/60 pl-2",
					!expanded && "hidden",
				)}
			>
				{partnerNavItems.map((item) => (
					<li key={item.href}>
						<Link
							href={item.href}
							onClick={onNavigate}
							className="block rounded-md px-2 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-primary"
						>
							{item.label}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

function PartnerDropdown() {
	return (
		<div className="group/partner relative">
			<button
				type="button"
				className={cn(
					navItemClass,
					"inline-flex items-center gap-1.5 text-foreground outline-none",
					"group-hover/partner:bg-accent group-hover/partner:text-primary",
				)}
				aria-expanded="false"
				aria-haspopup="true"
			>
				Trở thành đối tác
				<ChevronDown
					className="size-4 shrink-0 transition-transform duration-200 group-hover/partner:rotate-180"
					aria-hidden
				/>
			</button>
			<div
				className={cn(
					"absolute right-0 top-full z-[60] min-w-[17.5rem] pt-2",
					"pointer-events-none opacity-0",
					"invisible translate-y-1",
					"transition-all duration-200 ease-out",
					"group-hover/partner:pointer-events-auto group-hover/partner:visible group-hover/partner:translate-y-0 group-hover/partner:opacity-100",
					"group-focus-within/partner:pointer-events-auto group-focus-within/partner:visible group-focus-within/partner:translate-y-0 group-focus-within/partner:opacity-100",
				)}
			>
				<div
					className={cn(
						"rounded-xl border border-border/80 bg-popover/95 p-2 shadow-xl ring-1 ring-primary/5 backdrop-blur-md",
						"dark:bg-popover/98",
					)}
				>
					<ul className="flex flex-col gap-0.5" role="list">
						{partnerNavItems.map((item) => (
							<li key={item.href}>
								<Link
									href={item.href}
									className={cn(
										"block rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors",
										"hover:bg-primary/6 hover:text-primary",
										"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
									)}
								>
									{item.label}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}

export function SiteHeader() {
	const [open, setOpen] = useState(false);
	const [dichVuOpen, setDichVuOpen] = useState(false);
	const [partnerOpen, setPartnerOpen] = useState(false);

	function handleSheetOpenChange(next: boolean) {
		setOpen(next);
		if (!next) {
			setDichVuOpen(false);
			setPartnerOpen(false);
		}
	}

	return (
		<header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
			<div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2.5 sm:py-3">
				<Link
					href="/"
					aria-label={`Trang chủ — ${BRAND_NAME}`}
					className="flex shrink-0 items-center gap-2 transition-opacity hover:opacity-90"
				>
					<BrandLockup />
				</Link>

				<nav className="hidden items-center gap-0.5 lg:flex" aria-label="Chính">
					<Link href={mainNavHome.href} className={navItemClass}>
						{mainNavHome.label}
					</Link>
					<ServicesMegaMenu />
					{mainNavRest.map((item) => (
						<Link key={item.href} href={item.href} className={navItemClass}>
							{item.label}
						</Link>
					))}
					<div className="ml-1 flex items-center gap-2">
						<PartnerDropdown />
						<Link
							href="/dat-dich-vu"
							className={buttonVariants({
								size: "md",
								className: "shrink-0 font-semibold",
							})}
						>
							Đặt dịch vụ
						</Link>
					</div>
				</nav>

				<Sheet open={open} onOpenChange={handleSheetOpenChange}>
					<SheetTrigger
						render={
							<Button variant="outline" size="icon" className="lg:hidden" aria-label="Mở menu" />
						}
					>
						<Menu className="size-5" />
					</SheetTrigger>
					<SheetContent side="left" className="w-[min(100%,20rem)] gap-2 p-0">
						<SheetHeader className="border-b border-border/60 p-3 pb-3">
							<SheetTitle>Menu</SheetTitle>
						</SheetHeader>
						<div className="flex flex-col gap-3 px-2 pb-6 pt-1">
							<div className="px-0.5">
								<Link
									href="/dat-dich-vu"
									onClick={() => setOpen(false)}
									className={buttonVariants({
										size: "md",
										className: "w-full justify-center font-semibold",
									})}
								>
									Đặt dịch vụ
								</Link>
							</div>
							<ul className="flex flex-col gap-0.5">
								<li>
									<Link
										href={mainNavHome.href}
										onClick={() => setOpen(false)}
										className={cn(navItemClass, "block")}
									>
										{mainNavHome.label}
									</Link>
								</li>
							</ul>
							<DichVuLinksMobile
								expanded={dichVuOpen}
								onExpandedChange={setDichVuOpen}
								onNavigate={() => setOpen(false)}
							/>
							<ul className="flex flex-col gap-0.5">
								{mainNavRest.map((item) => (
									<li key={item.href}>
										<Link
											href={item.href}
											onClick={() => setOpen(false)}
											className={cn(navItemClass, "block")}
										>
											{item.label}
										</Link>
									</li>
								))}
							</ul>
							<PartnerLinksMobile
								expanded={partnerOpen}
								onExpandedChange={setPartnerOpen}
								onNavigate={() => setOpen(false)}
							/>
						</div>
					</SheetContent>
				</Sheet>
			</div>
		</header>
	);
}
