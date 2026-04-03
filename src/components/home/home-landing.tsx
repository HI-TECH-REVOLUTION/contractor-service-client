import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
	ArrowRight,
	Building2,
	CheckCircle2,
	Hammer,
	Paintbrush,
	Play,
	Shield,
	Sparkles,
	Trees,
	Wind,
	Zap,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { FadeUp } from "@/components/ui/fade-up";
import { DICH_VU_NAV_ITEMS, dichVuNavImage } from "@/content/dich-vu-nav";
import { BRAND_NAME } from "@/content/site";
import type { HomeBlogTeaser, HomePress } from "@/content/types";
import { buttonVariants } from "@/lib/button-variants";
import { unsplashPhoto } from "@/lib/unsplash";
import { cn } from "@/lib/utils";

const IMG_HERO = unsplashPhoto("photo-1581578731548-c64695cc6952", 900);
const IMG_TRUST = unsplashPhoto("photo-1504307651254-35680f356dfd", 900);

const serviceShortcuts = [
	{ href: "/dich-vu/sua-chua-dien-nuoc", label: "Điện nước", Icon: Zap },
	{ href: "/dich-vu/dien-lanh", label: "Điện lạnh", Icon: Wind },
	{ href: "/dich-vu/ve-sinh-nha-cua", label: "Vệ sinh", Icon: Sparkles },
	{ href: "/dich-vu/xay-dung-va-cai-tao", label: "Xây dựng", Icon: Building2 },
	{ href: "/dich-vu/noi-that-va-trang-tri", label: "Nội thất", Icon: Paintbrush },
	{ href: "/dich-vu/co-dien-va-smart-home", label: "Smarthome", Icon: Hammer },
	{ href: "/dich-vu/canh-quan-ngoai-that", label: "Cảnh quan", Icon: Trees },
	{ href: "/dich-vu/hop-dong-dich-vu", label: "Doanh nghiệp", Icon: Shield },
] as const;

const serviceCardIconByHref: Record<string, LucideIcon> = {
	"/dich-vu/dien-lanh": Wind,
	"/dich-vu/ve-sinh-nha-cua": Sparkles,
	"/dich-vu/sua-chua-dien-nuoc": Zap,
	"/dich-vu/hop-dong-dich-vu": Shield,
	"/dich-vu/xay-dung-va-cai-tao": Building2,
	"/dich-vu/noi-that-va-trang-tri": Paintbrush,
	"/dich-vu/co-dien-va-smart-home": Hammer,
	"/dich-vu/canh-quan-ngoai-that": Trees,
};

const trustPoints = [
	"Gọi thợ nhanh, chỉ vài thao tác",
	"Chi phí rõ ràng, tối ưu ngân sách",
	"Quy trình an toàn, yên tâm sử dụng",
	"Đội ngũ chuyên nghiệp, có cam kết dịch vụ",
] as const;

const outletNames = [
	"VNExpress",
	"Báo Xây dựng",
	"Báo Đà Nẵng",
	"Diễn đàn DN",
	"Việt Nam Biz",
] as const;

const stats = [
	{ value: "30.000+", label: "Đơn hàng hoàn thành" },
	{ value: "500+", label: "Nhà cung cấp" },
	{ value: "99%", label: "Khách hài lòng" },
] as const;

export type HomeLandingProps = {
	heroDescription: string;
	press: HomePress;
	blogTeasers: HomeBlogTeaser[];
};

export function HomeLanding({ heroDescription, press, blogTeasers }: HomeLandingProps) {
	return (
		<div className="flex flex-col">
			{/* Hero + nền trừu tượng (mesh, blob, lưới) */}
			<section className="relative overflow-hidden">
				<div className="pointer-events-none absolute inset-0" aria-hidden>
					<div className="absolute inset-0 bg-gradient-to-br from-sky-100/85 via-background to-amber-50/45 dark:from-sky-950/50 dark:via-background dark:to-primary/8" />
					<div
						className="absolute inset-0 opacity-[0.85] dark:opacity-60"
						style={{
							backgroundImage: `
								radial-gradient(ellipse 100% 80% at 15% -10%, rgb(59 130 246 / 0.22), transparent 52%),
								radial-gradient(ellipse 80% 60% at 95% 10%, rgb(14 165 233 / 0.16), transparent 48%),
								radial-gradient(ellipse 70% 50% at 50% 100%, rgb(251 191 36 / 0.14), transparent 55%),
								radial-gradient(ellipse 50% 40% at 0% 55%, rgb(99 102 241 / 0.08), transparent 50%)
							`,
						}}
					/>
					<div className="absolute -left-[20%] top-[8%] h-[min(85vw,32rem)] w-[min(85vw,32rem)] rounded-full bg-primary/20 blur-[100px] dark:bg-primary/25" />
					<div className="absolute -right-[15%] bottom-[5%] h-[min(75vw,26rem)] w-[min(75vw,26rem)] rounded-full bg-sky-300/35 blur-[90px] dark:bg-sky-500/20" />
					<div className="absolute left-1/2 top-0 h-[420px] w-[min(140%,56rem)] -translate-x-1/2 rounded-b-[100%] bg-gradient-to-b from-primary/[0.07] to-transparent dark:from-primary/10" />
					<div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(0_0_0_/_0.028)_1px,transparent_1px),linear-gradient(to_bottom,rgb(0_0_0_/_0.028)_1px,transparent_1px)] bg-size-[56px_56px] mask-[linear-gradient(to_bottom,black_50%,transparent)] dark:bg-[linear-gradient(to_right,rgb(255_255_255_/_0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255_/_0.04)_1px,transparent_1px)]" />
					<div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent dark:via-primary/30" />
				</div>

				<div className="relative z-10 mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-2 md:items-center md:gap-10 md:py-24">
					<FadeUp immediate className="space-y-4 md:space-y-6">
						<h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-[2.75rem] lg:leading-tight">
							Ngôi Nhà Của Bạn, <span className="text-primary">Sứ Mệnh</span> Của Chúng Tôi.
						</h1>
						<p className="max-w-lg text-lg text-muted-foreground">{heroDescription}</p>
						<div className="flex flex-wrap gap-3">
							<Link
								href="/dat-dich-vu"
								className={buttonVariants({ variant: "default", size: "lg" })}
							>
								Đặt ngay
							</Link>
							<Link
								href="/gioi-thieu"
								className={buttonVariants({
									variant: "outline",
									size: "lg",
									className: "gap-2",
								})}
							>
								<Play className="size-4 fill-primary text-primary" />
								Tìm hiểu
							</Link>
						</div>
					</FadeUp>

					<FadeUp immediate className="relative flex justify-center md:justify-end">
						<div className="relative w-full max-w-md">
							<div
								aria-hidden
								className="absolute -right-6 -top-6 size-40 rounded-full bg-primary/20 blur-2xl dark:bg-primary/30"
							/>
							<div
								aria-hidden
								className="absolute -bottom-4 -left-4 size-32 rounded-full bg-sky-300/50 blur-2xl dark:bg-sky-500/25"
							/>
							<div className="relative overflow-hidden rounded-[2rem] border border-primary/15 bg-card shadow-xl ring-1 ring-primary/10">
								<div className="relative aspect-[4/5] w-full max-h-[400px]">
									<Image
										src={IMG_HERO}
										alt="Thợ sửa chữa và chăm sóc nhà cửa"
										fill
										className="object-cover"
										sizes="(max-width: 768px) 100vw, 400px"
										priority
									/>
								</div>
								<p className="border-t border-border/60 bg-card/95 px-4 py-3 text-center text-sm font-semibold text-foreground backdrop-blur-sm">
									Dịch vụ nhà — đồng hành cùng bạn
								</p>
							</div>
						</div>
					</FadeUp>
				</div>
			</section>

			{/* Icon shortcuts */}
			<section className="border-y bg-card py-6 sm:py-10">
				<div className="mx-auto grid max-w-6xl grid-cols-2 gap-2 px-4 sm:grid-cols-4 sm:gap-4 lg:grid-cols-8">
					{serviceShortcuts.map(({ href, label, Icon }, i) => (
						<FadeUp key={href} delayMs={i * 28}>
							<Link
								href={href}
								className="group flex flex-col items-center gap-2 rounded-xl p-2 text-center transition-colors hover:bg-primary/5 sm:p-3"
							>
								<span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-105">
									<Icon className="size-6" aria-hidden />
								</span>
								<span className="text-xs font-medium text-foreground sm:text-sm">{label}</span>
							</Link>
						</FadeUp>
					))}
				</div>
			</section>

			{/* Dịch vụ — đồng bộ menu, grid rộng */}
			<section className="border-y border-border/60 bg-linear-to-b from-muted/35 via-background to-muted/25 py-10 sm:py-20">
				<div className="mx-auto max-w-7xl px-4 sm:px-6">
					<FadeUp className="mx-auto mb-6 max-w-2xl text-center sm:mb-12">
						<h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
							Dịch Vụ <span className="text-primary">Phổ Biến</span>
						</h2>
						<p className="mt-3 text-base text-muted-foreground sm:text-lg">
							Đầy đủ hạng mục như trên menu — báo giá minh bạch, chọn và đặt lịch nhanh.
						</p>
					</FadeUp>
					<div className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
						{DICH_VU_NAV_ITEMS.map((item, i) => {
							const Icon = serviceCardIconByHref[item.href] ?? Sparkles;
							const imgSrc = dichVuNavImage(item.photoPath, 800);
							return (
								<FadeUp key={item.href} delayMs={i * 40} className="h-full min-h-0">
									<Link
										href={item.href}
										className={cn(
											"group flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm",
											"transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-lg",
										)}
									>
										<div className="relative aspect-5/3 w-full shrink-0 bg-muted">
											<Image
												src={imgSrc}
												alt={item.imageAlt}
												fill
												className="object-cover transition duration-300 group-hover:scale-[1.02]"
												sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
											/>
										</div>
										<div className="flex min-h-0 flex-1 flex-col p-4 sm:p-5">
											<div className="mb-3 flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/10">
												<Icon className="size-5" aria-hidden />
											</div>
											<h3 className="font-heading text-lg font-semibold leading-snug text-foreground sm:text-xl">
												{item.label}
											</h3>
											<p className="mt-2 min-h-0 flex-1 text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">
												<span className="line-clamp-2">{item.description}</span>
											</p>
											<span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-primary">
												Xem chi tiết
												<ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
											</span>
										</div>
									</Link>
								</FadeUp>
							);
						})}
					</div>
				</div>
			</section>

			{/* Tin cậy */}
			<section className="bg-sky-50/80 py-10 dark:bg-sky-950/20 md:py-16">
				<div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-2 md:items-center md:gap-10">
					<FadeUp className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-primary/10 shadow-lg ring-1 ring-primary/5">
						<Image
							src={IMG_TRUST}
							alt="Đội ngũ kỹ thuật tại công trình"
							fill
							className="object-cover"
							sizes="(max-width: 768px) 100vw, 50vw"
						/>
					</FadeUp>
					<FadeUp delayMs={40} className="space-y-4 md:space-y-6">
						<h2 className="font-heading text-3xl font-bold sm:text-4xl">
							Lựa Chọn <span className="text-primary">Tin Dùng</span>
							<br />
							Cho Mọi Nhu Cầu Nhà Cửa
						</h2>
						<ul className="space-y-3">
							{trustPoints.map((t) => (
								<li key={t} className="flex gap-3 text-muted-foreground">
									<CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
									<span>{t}</span>
								</li>
							))}
						</ul>
						<Link
							href="/gioi-thieu"
							className={buttonVariants({
								variant: "default",
								size: "sm",
								className: "px-6",
							})}
						>
							Xem thêm
						</Link>
					</FadeUp>
				</div>
			</section>

			{/* Báo chí */}
			<section className="mx-auto max-w-6xl px-4 py-10 md:py-16">
				<FadeUp className="mb-5 text-center md:mb-8">
					<h2 className="font-heading text-3xl font-bold sm:text-4xl">
						Báo chí nói gì về <span className="text-primary">chúng tôi</span>
					</h2>
				</FadeUp>
				<FadeUp
					delayMs={35}
					className="mb-6 flex flex-wrap items-center justify-center gap-4 opacity-70 grayscale md:mb-10 md:gap-6"
				>
					{outletNames.map((name) => (
						<span key={name} className="text-sm font-semibold tracking-wide text-muted-foreground">
							{name}
						</span>
					))}
				</FadeUp>
				<FadeUp delayMs={70}>
					<Card className="mx-auto max-w-3xl overflow-hidden transition-shadow duration-200 hover:shadow-md">
						<div className="grid md:grid-cols-5">
							<div className="relative aspect-video bg-muted md:aspect-auto md:col-span-2">
								<Image
									src={press.image.src}
									alt={press.image.alt}
									fill
									className="object-cover"
									sizes="(max-width: 768px) 100vw, 320px"
								/>
							</div>
							<CardContent className="flex flex-col justify-center gap-3 p-6 md:col-span-3">
								<p className="font-heading text-lg font-semibold text-foreground">{press.title}</p>
								<p className="text-sm leading-relaxed text-muted-foreground">{press.excerpt}</p>
							</CardContent>
						</div>
					</Card>
				</FadeUp>
			</section>

			{/* Số liệu */}
			<section className="border-y bg-primary py-10 text-primary-foreground md:py-14">
				<div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 sm:grid-cols-3 md:gap-10">
					{stats.map(({ value, label }, i) => (
						<FadeUp key={label} delayMs={i * 55} className="text-center">
							<p className="font-heading text-4xl font-bold sm:text-5xl">{value}</p>
							<p className="mt-2 text-sm text-primary-foreground/85">{label}</p>
						</FadeUp>
					))}
				</div>
			</section>

			{/* Cẩm nang */}
			<section className="mx-auto max-w-6xl px-4 py-10 md:py-16">
				<FadeUp className="mb-2 text-center">
					<h2 className="font-heading text-3xl font-bold sm:text-4xl">
						Cẩm nang <span className="text-primary">nhà cửa</span>
					</h2>
				</FadeUp>
				<FadeUp delayMs={30} className="mb-5 text-center md:mb-8">
					<p className="text-sm text-muted-foreground">
						Kiến thức và mẹo hay từ {BRAND_NAME} cho ngôi nhà của bạn
					</p>
				</FadeUp>

				<FadeUp
					delayMs={50}
					className="mb-6 flex flex-wrap items-center justify-center gap-3 rounded-xl border border-dashed border-primary/25 bg-primary/5 px-3 py-4 md:mb-10 md:gap-4 md:px-4 md:py-6"
				>
					<span className="text-sm font-medium text-muted-foreground">
						Tải app để đặt lịch nhanh hơn
					</span>
					<div className="flex gap-3">
						<span className="rounded-md bg-foreground/90 px-4 py-2 text-xs font-semibold text-background">
							App Store
						</span>
						<span className="rounded-md bg-foreground/90 px-4 py-2 text-xs font-semibold text-background">
							Google Play
						</span>
					</div>
				</FadeUp>

				<div className="grid gap-4 md:grid-cols-3">
					{blogTeasers.map(({ id, tag, title, excerpt, date, href, image }, i) => (
						<FadeUp key={id} delayMs={i * 45}>
							<Card className="overflow-hidden transition-shadow duration-200 hover:shadow-md">
								<div className="relative aspect-[16/10] bg-muted">
									<Image
										src={image.src}
										alt={image.alt}
										fill
										className="object-cover"
										sizes="(max-width: 768px) 100vw, 33vw"
									/>
								</div>
								<CardContent className="space-y-2 pt-4">
									<span className="text-xs font-semibold uppercase tracking-wide text-primary">
										{tag}
									</span>
									<p className="font-medium leading-snug text-foreground">{title}</p>
									<p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
										{excerpt}
									</p>
									<p className="text-xs text-muted-foreground">{date}</p>
									<Link
										href={href}
										className="inline-block text-sm font-medium text-primary hover:underline"
									>
										Đọc thêm
									</Link>
								</CardContent>
							</Card>
						</FadeUp>
					))}
				</div>

				<FadeUp className="mt-6 text-center md:mt-10">
					<Link
						href="/cam-nang"
						className={buttonVariants({
							variant: "default",
							size: "lg",
							className: "px-10",
						})}
					>
						Xem tất cả bài viết
					</Link>
				</FadeUp>
			</section>
		</div>
	);
}
