import Image from "next/image";

import { MarketingPageSeo } from "@/components/marketing/marketing-page-seo";
import { PartnerRegistrationForm } from "@/components/marketing/partner-registration-form";
import type { BreadcrumbItem } from "@/components/marketing/types";
import { PageBreadcrumb } from "@/components/marketing/layouts/page-breadcrumb";
import { RelatedCta } from "@/components/marketing/layouts/related-cta";
import { FadeUp } from "@/components/ui/fade-up";
import type { PartnerMarketingPageContent } from "@/content/types";
import { cn } from "@/lib/utils";

type Props = {
	page: PartnerMarketingPageContent;
	breadcrumbs: BreadcrumbItem[];
};

export function LightPartnerLanding({ page, breadcrumbs }: Props) {
	const { partnerLanding, hero } = page;
	const lead = partnerLanding.lead ?? page.description;
	const heroImage = hero?.image;

	return (
		<>
			<MarketingPageSeo page={page} breadcrumbs={breadcrumbs} />

			<div className="flex flex-col bg-background">
				<section className="border-b border-border/60 bg-background">
					<div className="mx-auto max-w-6xl px-4 pb-10 pt-8 sm:pb-14 sm:pt-10">
						<PageBreadcrumb
							items={breadcrumbs}
							variant="default"
							className="mb-8 justify-center sm:justify-start"
						/>

						<div className="mx-auto max-w-3xl text-center">
							<h1 className="font-heading text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.35rem] lg:leading-tight">
								{page.h1}
							</h1>
							<p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
								{lead}
							</p>
						</div>

						<p className="mx-auto mt-10 max-w-3xl text-center text-sm font-medium text-foreground sm:text-base">
							{partnerLanding.chipIntro}
						</p>
						<ul className="mx-auto mt-4 flex max-w-3xl flex-wrap items-center justify-center gap-2 sm:gap-3">
							{partnerLanding.chips.map((label) => (
								<li key={label}>
									<span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/60 px-4 py-2 text-sm font-medium text-foreground">
										<span className="size-2 shrink-0 rounded-full bg-orange-500" aria-hidden />
										{label}
									</span>
								</li>
							))}
						</ul>

						{heroImage ? (
							<div className="relative mx-auto mt-10 max-w-4xl">
								<div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-border/60 bg-muted shadow-sm ring-1 ring-primary/5">
									<Image
										src={heroImage.src}
										alt={heroImage.alt}
										fill
										className="object-cover"
										sizes="(max-width: 896px) 100vw, 896px"
										priority
									/>
								</div>
							</div>
						) : null}
					</div>
				</section>

				<div className="mx-auto w-full max-w-6xl px-4 py-12 sm:py-16">
					<FadeUp className="mx-auto max-w-3xl">
						<PartnerRegistrationForm
							formTitle={partnerLanding.formTitle}
							variant={partnerLanding.formVariant}
						/>
					</FadeUp>

					<div className="mx-auto mt-14 max-w-3xl space-y-8 sm:mt-16 sm:space-y-10">
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
										delayMs={i * 44}
										className={cn(
											"rounded-2xl border p-6 sm:p-8",
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
									</FadeUp>
								</article>
							);
						})}
					</div>

					{page.faqs && page.faqs.length > 0 ? (
						<div className="mx-auto mt-14 max-w-3xl sm:mt-16">
							<FadeUp className="mb-6 text-center">
								<h2 className="font-heading text-xl font-semibold text-foreground sm:text-2xl">
									Câu hỏi thường gặp
								</h2>
							</FadeUp>
							<div className="space-y-3">
								{page.faqs.map((f, i) => (
									<FadeUp key={f.question} delayMs={i * 36}>
										<details className="group rounded-xl border border-border/80 bg-muted/30 px-4 py-3 open:bg-muted/50">
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
									</FadeUp>
								))}
							</div>
						</div>
					) : null}

					{page.relatedLinks ? (
						<FadeUp className="mx-auto max-w-2xl">
							<RelatedCta links={page.relatedLinks} className="mt-14 sm:mt-16" />
						</FadeUp>
					) : null}
				</div>
			</div>
		</>
	);
}
