import Image from "next/image";
import { Handshake, Rocket, Target } from "lucide-react";

import { MarketingPageSeo } from "@/components/marketing/marketing-page-seo";
import type { BreadcrumbItem } from "@/components/marketing/types";
import { PageBreadcrumb } from "@/components/marketing/layouts/page-breadcrumb";
import { RelatedCta } from "@/components/marketing/layouts/related-cta";
import type { MarketingPageContent } from "@/content/types";
import { cn } from "@/lib/utils";

type Props = {
	page: MarketingPageContent;
	breadcrumbs: BreadcrumbItem[];
};

/** Đối tác: hero tối, band gradient, nội dung sáng tách lớp. */
export function PartnerPageLayout({ page, breadcrumbs }: Props) {
	return (
		<>
			<MarketingPageSeo page={page} breadcrumbs={breadcrumbs} />

			<div className="flex flex-col">
				<section className="relative isolate min-h-[min(52vh,520px)] overflow-hidden bg-slate-950 text-white">
					{page.hero?.image ? (
						<>
							<Image
								src={page.hero.image.src}
								alt={page.hero.image.alt}
								fill
								className="object-cover opacity-40"
								sizes="100vw"
								priority
							/>
							<div
								className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/85 to-slate-900/40"
								aria-hidden
							/>
						</>
					) : (
						<div
							className="absolute inset-0 bg-linear-to-br from-slate-900 via-slate-950 to-slate-900"
							aria-hidden
						/>
					)}
					<div className="relative mx-auto flex min-h-[min(52vh,520px)] max-w-6xl flex-col justify-end px-4 pb-12 pt-24 sm:pb-16 sm:pt-28">
						<PageBreadcrumb items={breadcrumbs} variant="onDark" className="mb-8" />
						<div className="max-w-2xl space-y-5 animate-in fade-in slide-in-from-bottom-3 duration-500">
							<div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/90 backdrop-blur-md">
								<Handshake className="size-3.5" aria-hidden />
								{page.hero?.kicker ?? "Chương trình đối tác"}
							</div>
							<h1 className="font-heading text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.65rem] lg:leading-tight">
								{page.h1}
							</h1>
							<p className="text-base leading-relaxed text-white/80 sm:text-lg">
								{page.description}
							</p>
							<div className="flex flex-wrap gap-3 pt-2">
								<span className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm text-white/90 backdrop-blur-sm">
									<Target className="size-4 text-sky-300" aria-hidden />
									Quy trình rõ ràng
								</span>
								<span className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm text-white/90 backdrop-blur-sm">
									<Rocket className="size-4 text-sky-300" aria-hidden />
									Mở rộng thu nhập
								</span>
							</div>
						</div>
					</div>
				</section>

				<div className="relative z-1 -mt-6 rounded-t-3xl border-x border-t border-border/60 bg-background shadow-[0_-12px_40px_-24px_rgba(0,0,0,0.15)]">
					<div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
						<div className="mx-auto max-w-3xl space-y-8 sm:space-y-10">
							{page.sections.map((section, i) => {
								const HeadingTag = section.level === 2 ? "h2" : "h3";
								const size = section.level === 2 ? "text-xl sm:text-2xl" : "text-lg sm:text-xl";
								return (
									<article
										key={section.id ?? `${section.heading}-${i}`}
										id={section.id}
										className={cn(
											"scroll-mt-24 rounded-2xl border p-6 sm:p-8",
											i === 0
												? "border-primary/20 bg-linear-to-br from-primary/5 to-transparent shadow-sm"
												: "border-border/70 bg-card/80 shadow-sm",
										)}
									>
										<HeadingTag
											className={cn(
												"font-heading font-semibold tracking-tight text-foreground",
												size,
											)}
										>
											{section.heading}
										</HeadingTag>
										<div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
											{section.paragraphs.map((p, j) => (
												<p key={j}>{p}</p>
											))}
										</div>
									</article>
								);
							})}
						</div>

						{page.gallery && page.gallery.length > 0 ? (
							<div className="mx-auto mt-14 max-w-4xl sm:mt-16">
								<h2 className="mb-6 font-heading text-xl font-semibold text-foreground sm:text-2xl">
									Hình ảnh minh họa
								</h2>
								<div className="grid gap-4 sm:grid-cols-2">
									{page.gallery.map((img) => (
										<div
											key={img.src}
											className="relative aspect-video overflow-hidden rounded-xl border border-border/60 bg-muted"
										>
											<Image
												src={img.src}
												alt={img.alt}
												fill
												className="object-cover"
												sizes="(max-width: 640px) 100vw, 50vw"
											/>
										</div>
									))}
								</div>
							</div>
						) : null}

						{page.faqs && page.faqs.length > 0 ? (
							<div className="mx-auto mt-14 max-w-3xl sm:mt-16">
								<h2 className="mb-6 text-center font-heading text-xl font-semibold text-foreground sm:text-2xl">
									Câu hỏi về hợp tác
								</h2>
								<div className="space-y-3">
									{page.faqs.map((f) => (
										<details
											key={f.question}
											className="group rounded-xl border border-border/80 bg-muted/30 px-4 py-3 open:bg-muted/50"
										>
											<summary className="cursor-pointer list-none font-heading text-base font-semibold text-foreground marker:hidden [&::-webkit-details-marker]:hidden">
												<span className="flex items-center justify-between gap-2">
													{f.question}
													<span className="text-muted-foreground transition group-open:rotate-180">
														▼
													</span>
												</span>
											</summary>
											<p className="mt-3 text-sm leading-relaxed text-muted-foreground">
												{f.answer}
											</p>
										</details>
									))}
								</div>
							</div>
						) : null}

						{page.relatedLinks ? (
							<RelatedCta links={page.relatedLinks} className="mx-auto mt-14 max-w-2xl sm:mt-16" />
						) : null}
					</div>
				</div>
			</div>
		</>
	);
}
