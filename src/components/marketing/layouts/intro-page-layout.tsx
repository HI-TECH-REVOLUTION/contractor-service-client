import Image from "next/image";
import { Building2, Leaf, Shield } from "lucide-react";

import { MarketingPageSeo } from "@/components/marketing/marketing-page-seo";
import type { BreadcrumbItem } from "@/components/marketing/types";
import { PageBreadcrumb } from "@/components/marketing/layouts/page-breadcrumb";
import { RelatedCta } from "@/components/marketing/layouts/related-cta";
import { FadeUp } from "@/components/ui/fade-up";
import type { MarketingPageContent } from "@/content/types";
import { cn } from "@/lib/utils";

type Props = {
	page: MarketingPageContent;
	breadcrumbs: BreadcrumbItem[];
};

/** Giới thiệu: hero ấm, timeline số thứ tự, accent xanh ngọc. */
export function IntroPageLayout({ page, breadcrumbs }: Props) {
	return (
		<>
			<MarketingPageSeo page={page} breadcrumbs={breadcrumbs} />

			<div className="flex flex-col">
				<section className="relative overflow-hidden border-b border-teal-200/40 bg-linear-to-b from-teal-50/90 via-emerald-50/30 to-background dark:from-teal-950/25 dark:via-background dark:to-background">
					<div
						aria-hidden
						className="pointer-events-none absolute -right-20 top-0 size-[28rem] rounded-full bg-teal-400/10 blur-3xl dark:bg-teal-500/10"
					/>
					<div className="relative mx-auto max-w-6xl px-4 pb-14 pt-8 sm:pb-20 sm:pt-10">
						<PageBreadcrumb items={breadcrumbs} className="mb-8" />
						<div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,22rem)] lg:items-end">
							<div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-500">
								{page.hero?.kicker ? (
									<p className="inline-flex items-center gap-2 rounded-full border border-teal-200/60 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-teal-800 dark:border-teal-800/50 dark:bg-teal-950/40 dark:text-teal-200">
										<Leaf className="size-3.5" aria-hidden />
										{page.hero.kicker}
									</p>
								) : null}
								<h1 className="font-heading text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-[3rem] lg:leading-[1.1]">
									{page.h1}
								</h1>
								<p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
									{page.description}
								</p>
								<ul className="flex flex-wrap gap-4 pt-2 text-sm text-muted-foreground">
									<li className="flex items-center gap-2 rounded-xl border border-border/60 bg-card/80 px-3 py-2 shadow-sm backdrop-blur-sm">
										<Shield className="size-4 text-teal-600 dark:text-teal-400" />
										Minh bạch
									</li>
									<li className="flex items-center gap-2 rounded-xl border border-border/60 bg-card/80 px-3 py-2 shadow-sm backdrop-blur-sm">
										<Building2 className="size-4 text-teal-600 dark:text-teal-400" />
										Đồng hành lâu dài
									</li>
								</ul>
							</div>
							{page.hero?.image ? (
								<div className="relative animate-in fade-in zoom-in-95 duration-500">
									<div className="absolute -inset-1 rounded-[1.35rem] bg-linear-to-br from-teal-400/25 to-emerald-300/20 blur-sm" />
									<div className="relative aspect-4/3 overflow-hidden rounded-3xl border border-white/50 shadow-xl ring-1 ring-teal-900/5 dark:border-white/10">
										<Image
											src={page.hero.image.src}
											alt={page.hero.image.alt}
											fill
											className="object-cover"
											sizes="(max-width: 1024px) 100vw, 360px"
											priority
										/>
									</div>
								</div>
							) : null}
						</div>
					</div>
				</section>

				<div className="mx-auto w-full max-w-6xl px-4 py-12 sm:py-16">
					<div className="relative space-y-0">
						<div
							aria-hidden
							className="absolute left-[1.125rem] top-8 bottom-8 hidden w-px bg-linear-to-b from-teal-300/80 via-teal-200/40 to-transparent md:block"
						/>
						{page.sections.map((section, i) => {
							const HeadingTag = section.level === 2 ? "h2" : "h3";
							const size = section.level === 2 ? "text-xl sm:text-2xl" : "text-lg sm:text-xl";
							const n = String(i + 1).padStart(2, "0");
							return (
								<article
									key={section.id ?? `${section.heading}-${i}`}
									id={section.id}
									className="scroll-mt-24 md:grid md:grid-cols-[4rem_1fr] md:gap-8"
								>
									<div className="hidden pt-1 md:flex md:justify-center">
										<span className="relative z-[1] flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-teal-500/30 bg-background font-mono text-sm font-bold text-teal-700 dark:border-teal-400/40 dark:text-teal-300">
											{n}
										</span>
									</div>
									<FadeUp
										delayMs={i * 42}
										className={cn(
											"mb-10 rounded-2xl border border-border/70 bg-card/50 p-6 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md sm:p-8 md:mb-12",
											i % 2 === 1 && "bg-teal-50/40 dark:bg-teal-950/15",
										)}
									>
										<HeadingTag
											className={cn(
												"font-heading font-semibold tracking-tight text-foreground",
												size,
											)}
										>
											<span className="mr-2 font-mono text-teal-600 dark:text-teal-400 md:hidden">
												{n}.
											</span>
											{section.heading}
										</HeadingTag>
										<div className="mt-4 space-y-3 border-l-2 border-teal-500/25 pl-4 text-sm leading-relaxed text-muted-foreground sm:text-base md:pl-5">
											{section.paragraphs.map((p, j) => (
												<p key={j}>{p}</p>
											))}
										</div>
									</FadeUp>
								</article>
							);
						})}
					</div>

					{page.gallery && page.gallery.length > 0 ? (
						<div className="mt-6 sm:mt-8">
							<FadeUp className="mb-6">
								<h2 className="font-heading text-xl font-semibold text-foreground sm:text-2xl">
									Khoảnh khắc đội ngũ
								</h2>
							</FadeUp>
							<div className="grid gap-5 sm:grid-cols-2">
								{page.gallery.map((img, idx) => (
									<FadeUp key={img.src} delayMs={idx * 50}>
										<div
											className={cn(
												"relative aspect-video overflow-hidden rounded-3xl border border-border/50 bg-muted shadow-md",
												idx === 0 && "sm:row-span-1",
											)}
										>
											<Image
												src={img.src}
												alt={img.alt}
												fill
												className="object-cover transition duration-500 hover:scale-[1.03]"
												sizes="(max-width: 640px) 100vw, 50vw"
											/>
										</div>
									</FadeUp>
								))}
							</div>
						</div>
					) : null}

					{page.faqs && page.faqs.length > 0 ? (
						<div className="mt-14 sm:mt-16">
							<FadeUp className="mb-6">
								<h2 className="font-heading text-xl font-semibold text-foreground sm:text-2xl">
									Câu hỏi thường gặp
								</h2>
							</FadeUp>
							<div className="space-y-4">
								{page.faqs.map((f, i) => (
									<FadeUp key={f.question} delayMs={i * 40}>
										<div className="rounded-xl border border-teal-200/40 bg-teal-50/20 py-4 pl-5 pr-4 dark:border-teal-900/40 dark:bg-teal-950/20">
											<p className="font-heading text-base font-semibold text-foreground">
												{f.question}
											</p>
											<p className="mt-2 text-sm leading-relaxed text-muted-foreground">
												{f.answer}
											</p>
										</div>
									</FadeUp>
								))}
							</div>
						</div>
					) : null}

					{page.relatedLinks ? (
						<FadeUp>
							<RelatedCta links={page.relatedLinks} className="mt-14 sm:mt-16" />
						</FadeUp>
					) : null}
				</div>
			</div>
		</>
	);
}
