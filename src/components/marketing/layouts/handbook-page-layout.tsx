import Image from "next/image";
import Link from "next/link";
import { BookOpen, Library } from "lucide-react";

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

/** Cẩm nang: phong cách tạp chí, mục lục anchor, thẻ bài viết. */
export function HandbookPageLayout({ page, breadcrumbs }: Props) {
	const toc = page.sections.filter((s) => s.id && s.level === 2);

	return (
		<>
			<MarketingPageSeo page={page} breadcrumbs={breadcrumbs} />

			<div className="flex flex-col bg-linear-to-b from-amber-50/40 via-background to-background dark:from-amber-950/10">
				<section className="border-b border-amber-200/30 dark:border-amber-900/30">
					<div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
						<PageBreadcrumb items={breadcrumbs} className="mb-6" variant="minimal" />
						<div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
							<div className="min-w-0 flex-1 space-y-5 animate-in fade-in duration-500">
								<p className="inline-flex items-center gap-2 text-sm font-medium text-amber-800/90 dark:text-amber-200/90">
									<Library className="size-4" aria-hidden />
									Kiến thức nhà cửa
								</p>
								<h1 className="font-heading text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.65rem] lg:leading-tight">
									{page.h1}
								</h1>
								<p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
									{page.description}
								</p>
							</div>
							{page.hero?.image ? (
								<div className="relative w-full max-w-md shrink-0 overflow-hidden rounded-2xl border border-amber-200/40 shadow-lg dark:border-amber-900/40 lg:max-w-sm">
									<div className="relative aspect-[5/4]">
										<Image
											src={page.hero.image.src}
											alt={page.hero.image.alt}
											fill
											className="object-cover"
											sizes="(max-width: 1024px) 100vw, 320px"
											priority
										/>
									</div>
									<div className="flex items-center gap-2 border-t border-amber-200/30 bg-amber-50/50 px-4 py-3 text-xs font-medium text-amber-900/80 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-100/80">
										<BookOpen className="size-3.5 shrink-0" aria-hidden />
										Cập nhật nội dung thường xuyên
									</div>
								</div>
							) : null}
						</div>

						{toc.length > 0 ? (
							<FadeUp className="mt-8 rounded-2xl border border-dashed border-amber-300/50 bg-amber-50/30 p-4 dark:border-amber-800/40 dark:bg-amber-950/20 sm:p-5">
								<p className="mb-3 text-xs font-semibold uppercase tracking-wide text-amber-900/70 dark:text-amber-200/70">
									Mục lục nhanh
								</p>
								<ul className="flex flex-wrap gap-2">
									{toc.map((s) => (
										<li key={s.id}>
											<Link
												href={`#${s.id}`}
												className="inline-flex rounded-full border border-amber-200/70 bg-background/90 px-3 py-1.5 text-sm text-foreground transition-colors hover:border-primary/40 hover:text-primary dark:border-amber-800/60 dark:bg-background/50"
											>
												{s.heading}
											</Link>
										</li>
									))}
								</ul>
							</FadeUp>
						) : null}
					</div>
				</section>

				<div className="mx-auto w-full max-w-6xl px-4 py-12 sm:py-16">
					<div className="mx-auto max-w-3xl space-y-6 sm:space-y-8">
						{page.sections.map((section, i) => {
							const HeadingTag = section.level === 2 ? "h2" : "h3";
							const size = section.level === 2 ? "text-xl sm:text-2xl" : "text-lg sm:text-xl";
							const isFeature = Boolean(section.id);
							return (
								<article
									key={section.id ?? `${section.heading}-${i}`}
									id={section.id}
									className="scroll-mt-24"
								>
									<FadeUp
										delayMs={i * 38}
										className={cn(
											"rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300 sm:p-8",
											isFeature
												? "border-amber-200/50 hover:-translate-y-0.5 hover:shadow-md dark:border-amber-900/40"
												: "border-border/70 hover:shadow-md",
										)}
									>
										<div className="flex items-start gap-3">
											{isFeature ? (
												<span
													className="mt-1 hidden size-2 shrink-0 rounded-full bg-amber-500 sm:block"
													aria-hidden
												/>
											) : null}
											<div className="min-w-0 flex-1">
												<HeadingTag
													className={cn(
														"font-heading font-semibold tracking-tight text-foreground",
														size,
													)}
												>
													{section.heading}
												</HeadingTag>
												<div className="mt-4 space-y-3 text-sm leading-[1.75] text-muted-foreground sm:text-base">
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
						<div className="mx-auto mt-14 max-w-4xl sm:mt-16">
							<FadeUp className="mb-6 text-center">
								<h2 className="font-heading text-xl font-semibold sm:text-2xl">Minh họa</h2>
							</FadeUp>
							<div className="columns-1 gap-4 sm:columns-2">
								{page.gallery.map((img, idx) => (
									<FadeUp key={img.src} delayMs={idx * 45}>
										<div className="relative mb-4 break-inside-avoid overflow-hidden rounded-xl border border-border/60 bg-muted shadow-sm">
											<div className="relative aspect-video w-full">
												<Image
													src={img.src}
													alt={img.alt}
													fill
													className="object-cover"
													sizes="(max-width: 640px) 100vw, 50vw"
												/>
											</div>
										</div>
									</FadeUp>
								))}
							</div>
						</div>
					) : null}

					{page.faqs && page.faqs.length > 0 ? (
						<div className="mx-auto mt-14 max-w-3xl sm:mt-16">
							<FadeUp className="mb-6 text-center">
								<h2 className="font-heading text-xl font-semibold sm:text-2xl">Hỏi — đáp</h2>
							</FadeUp>
							<div className="space-y-4">
								{page.faqs.map((f, i) => (
									<FadeUp
										key={f.question}
										delayMs={i * 40}
										className="rounded-xl border border-border/80 bg-muted/20 p-5"
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
						<FadeUp className="mx-auto max-w-3xl">
							<RelatedCta links={page.relatedLinks} variant="soft" className="mt-14 sm:mt-16" />
						</FadeUp>
					) : null}
				</div>
			</div>
		</>
	);
}
