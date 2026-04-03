import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Phone, Wrench } from "lucide-react";

import { MarketingPageSeo } from "@/components/marketing/marketing-page-seo";
import type { BreadcrumbItem } from "@/components/marketing/types";
import { PageBreadcrumb } from "@/components/marketing/layouts/page-breadcrumb";
import { RelatedCta } from "@/components/marketing/layouts/related-cta";
import { FadeUp } from "@/components/ui/fade-up";
import { BRAND_NAME } from "@/content/site";
import { buttonVariants } from "@/lib/button-variants";
import type { MarketingPageContent } from "@/content/types";
import { cn } from "@/lib/utils";

type Props = {
	page: MarketingPageContent;
	breadcrumbs: BreadcrumbItem[];
	extraJsonLd?: Record<string, unknown>[];
};

/** Dịch vụ: hero gọn, thanh CTA, section dạng checklist + vạch primary. */
export function ServicePageLayout({ page, breadcrumbs, extraJsonLd = [] }: Props) {
	const tocSections = page.sections.filter((s) => s.level === 2 && s.id);

	return (
		<>
			<MarketingPageSeo page={page} breadcrumbs={breadcrumbs} extraJsonLd={extraJsonLd} />

			<div className="flex flex-col">
				<section className="border-b border-primary/10 bg-linear-to-b from-primary/[0.07] via-background to-background">
					<div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
						<PageBreadcrumb items={breadcrumbs} className="mb-6" />
						<div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
							<div className="min-w-0 flex-1 space-y-4 animate-in fade-in duration-500">
								<p className="inline-flex items-center gap-2 rounded-md border border-primary/20 bg-primary/5 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
									<Wrench className="size-3.5" aria-hidden />
									Dịch vụ tại nhà
								</p>
								<h1 className="font-heading text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
									{page.h1}
								</h1>
								<p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
									{page.description}
								</p>
								<div className="flex flex-wrap items-center gap-3 pt-2">
									<Link href="tel:+84900000000" className={buttonVariants({ size: "lg" })}>
										<Phone className="size-4" aria-hidden />
										Gọi đặt lịch
									</Link>
									<Link
										href="/dat-dich-vu"
										className={buttonVariants({ variant: "secondary", size: "lg" })}
									>
										Đặt online
									</Link>
									<Link
										href="/gioi-thieu"
										className={buttonVariants({ variant: "outline", size: "lg" })}
									>
										Về {BRAND_NAME}
									</Link>
								</div>
							</div>
							{page.hero?.image ? (
								<div className="relative w-full max-w-md shrink-0 lg:max-w-sm">
									<div className="absolute -inset-px rounded-2xl bg-linear-to-br from-primary/20 to-sky-400/10 blur-md" />
									<div className="relative overflow-hidden rounded-2xl border border-primary/15 bg-muted shadow-lg">
										<div className="relative aspect-4/3 w-full">
											<Image
												src={page.hero.image.src}
												alt={page.hero.image.alt}
												fill
												className="object-cover"
												sizes="(max-width: 1024px) 100vw, 320px"
												priority
											/>
										</div>
									</div>
								</div>
							) : null}
						</div>

						{tocSections.length > 1 ? (
							<FadeUp className="mt-10 hidden border-t border-primary/10 pt-8 md:block">
								<p className="mb-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
									Nội dung trang
								</p>
								<ol className="grid gap-3 sm:grid-cols-3">
									{tocSections.slice(0, 6).map((s, idx) => (
										<li key={s.id}>
											<Link
												href={`#${s.id}`}
												className="flex items-start gap-3 rounded-xl border border-border/70 bg-card/80 p-3 text-left text-sm transition-colors hover:border-primary/30 hover:bg-primary/5"
											>
												<span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
													{idx + 1}
												</span>
												<span className="font-medium leading-snug text-foreground">
													{s.heading}
												</span>
											</Link>
										</li>
									))}
								</ol>
							</FadeUp>
						) : null}
					</div>
				</section>

				<div className="mx-auto w-full max-w-6xl px-4 py-12 sm:py-16">
					<div className="space-y-4 sm:space-y-5">
						{page.sections.map((section, i) => {
							const HeadingTag = section.level === 2 ? "h2" : "h3";
							const size = section.level === 2 ? "text-xl sm:text-2xl" : "text-lg sm:text-xl";
							return (
								<article
									key={section.id ?? `${section.heading}-${i}`}
									id={section.id}
									className="scroll-mt-24"
								>
									<FadeUp
										delayMs={i * 36}
										className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm"
									>
										<div className="flex gap-0 sm:gap-0">
											<div className="w-1 shrink-0 bg-primary sm:w-1.5" aria-hidden />
											<div className="min-w-0 flex-1 p-6 sm:p-8">
												<HeadingTag
													className={cn(
														"font-heading font-semibold tracking-tight text-foreground",
														size,
													)}
												>
													{section.heading}
												</HeadingTag>
												<ul className="mt-4 space-y-3">
													{section.paragraphs.map((p, j) => (
														<li
															key={j}
															className="flex gap-3 text-sm leading-relaxed text-muted-foreground sm:text-base"
														>
															<CheckCircle2
																className="mt-0.5 size-5 shrink-0 text-primary"
																aria-hidden
															/>
															<span>{p}</span>
														</li>
													))}
												</ul>
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
								<h2 className="font-heading text-xl font-semibold text-foreground sm:text-2xl">
									Thực tế thi công
								</h2>
							</FadeUp>
							<div className="grid gap-4 sm:grid-cols-2">
								{page.gallery.map((img, idx) => (
									<FadeUp key={img.src} delayMs={idx * 46}>
										<div className="group relative aspect-video overflow-hidden rounded-xl border border-border/60 bg-muted">
											<Image
												src={img.src}
												alt={img.alt}
												fill
												className="object-cover transition duration-500 group-hover:scale-[1.02]"
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
									FAQ dịch vụ
								</h2>
							</FadeUp>
							<FadeUp delayMs={40}>
								<div className="divide-y divide-border rounded-2xl border border-border/80 bg-card">
									{page.faqs.map((f) => (
										<div key={f.question} className="p-5 sm:p-6">
											<p className="font-heading text-base font-semibold text-foreground">
												{f.question}
											</p>
											<p className="mt-2 text-sm leading-relaxed text-muted-foreground">
												{f.answer}
											</p>
										</div>
									))}
								</div>
							</FadeUp>
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
