import Image from "next/image";
import { Briefcase, HeartHandshake, Sparkles, Users } from "lucide-react";

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

const sectionIcons = [Briefcase, Users, HeartHandshake, Sparkles] as const;

/** Tuyển dụng: hero chia đôi, chip giá trị, section có icon. */
export function CareersPageLayout({ page, breadcrumbs }: Props) {
	return (
		<>
			<MarketingPageSeo page={page} breadcrumbs={breadcrumbs} />

			<div className="flex flex-col">
				<section className="relative overflow-hidden border-b border-violet-200/40 bg-linear-to-br from-violet-50/90 via-background to-sky-50/40 dark:from-violet-950/20 dark:via-background dark:to-background">
					<div
						aria-hidden
						className="absolute inset-y-0 right-0 w-1/2 max-w-xl bg-linear-to-l from-violet-200/20 to-transparent dark:from-violet-600/10"
					/>
					<div className="relative mx-auto max-w-6xl px-4 py-10 sm:py-14">
						<PageBreadcrumb items={breadcrumbs} className="mb-8" />
						<div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
							<div className="space-y-6 animate-in fade-in slide-in-from-left-2 duration-500">
								{page.hero?.kicker ? (
									<p className="text-sm font-semibold uppercase tracking-widest text-violet-700 dark:text-violet-300">
										{page.hero.kicker}
									</p>
								) : null}
								<h1 className="font-heading text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
									{page.h1}
								</h1>
								<p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
									{page.description}
								</p>
								<div className="flex flex-wrap gap-2">
									{["Làm việc nhóm", "Học liên tục", "Tôn trọng thời gian"].map((t) => (
										<span
											key={t}
											className="rounded-full border border-violet-200/70 bg-white/80 px-3 py-1 text-xs font-medium text-violet-900 shadow-sm dark:border-violet-800/60 dark:bg-violet-950/40 dark:text-violet-100"
										>
											{t}
										</span>
									))}
								</div>
							</div>
							{page.hero?.image ? (
								<div className="relative animate-in fade-in slide-in-from-right-2 duration-500">
									<div className="absolute -right-4 -top-4 flex size-16 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-lg dark:bg-violet-500">
										<Briefcase className="size-8" aria-hidden />
									</div>
									<div className="relative aspect-[5/4] overflow-hidden rounded-3xl border border-violet-200/50 shadow-2xl ring-1 ring-violet-900/5 dark:border-violet-800/40">
										<Image
											src={page.hero.image.src}
											alt={page.hero.image.alt}
											fill
											className="object-cover"
											sizes="(max-width: 1024px) 100vw, 480px"
											priority
										/>
									</div>
								</div>
							) : null}
						</div>
					</div>
				</section>

				<div className="mx-auto w-full max-w-6xl px-4 py-12 sm:py-16">
					<div className="space-y-5 sm:space-y-6">
						{page.sections.map((section, i) => {
							const HeadingTag = section.level === 2 ? "h2" : "h3";
							const size = section.level === 2 ? "text-xl sm:text-2xl" : "text-lg sm:text-xl";
							const Icon = sectionIcons[i % sectionIcons.length];
							return (
								<article
									key={section.id ?? `${section.heading}-${i}`}
									id={section.id}
									className="scroll-mt-24"
								>
									<FadeUp
										delayMs={i * 40}
										className={cn(
											"overflow-hidden rounded-2xl border bg-card shadow-sm transition-shadow hover:shadow-md",
											i % 2 === 0
												? "border-violet-200/40 dark:border-violet-900/35"
												: "border-border/80",
										)}
									>
										<div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:gap-6 sm:p-8">
											<div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300">
												<Icon className="size-6" aria-hidden />
											</div>
											<div className="min-w-0 flex-1">
												<HeadingTag
													className={cn(
														"font-heading font-semibold tracking-tight text-foreground",
														size,
													)}
												>
													{section.heading}
												</HeadingTag>
												<div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
													{section.paragraphs.map((p, j) => (
														<p key={j}>{p}</p>
													))}
												</div>
											</div>
										</div>
									</FadeUp>
								</article>
							);
						})}
					</div>

					{page.gallery && page.gallery.length > 0 ? (
						<div className="mt-14 sm:mt-16">
							<FadeUp className="mb-6">
								<h2 className="font-heading text-xl font-semibold sm:text-2xl">
									Không gian làm việc
								</h2>
							</FadeUp>
							<div className="grid gap-4 sm:grid-cols-2">
								{page.gallery.map((img, idx) => (
									<FadeUp key={img.src} delayMs={idx * 48}>
										<div className="relative aspect-video overflow-hidden rounded-2xl border border-violet-200/30 bg-muted dark:border-violet-900/30">
											<Image
												src={img.src}
												alt={img.alt}
												fill
												className="object-cover"
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
								<h2 className="font-heading text-xl font-semibold sm:text-2xl">
									Thắc mắc khi ứng tuyển
								</h2>
							</FadeUp>
							<div className="grid gap-4 sm:grid-cols-2">
								{page.faqs.map((f, i) => (
									<FadeUp
										key={f.question}
										delayMs={i * 42}
										className="rounded-2xl border border-violet-200/35 bg-violet-50/30 p-5 dark:border-violet-900/40 dark:bg-violet-950/20"
									>
										<p className="font-heading text-base font-semibold text-foreground">
											{f.question}
										</p>
										<p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.answer}</p>
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
