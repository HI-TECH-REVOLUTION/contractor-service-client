import { JsonLd } from "@/components/seo/json-ld";
import { getSiteUrl } from "@/content/site";
import type { MarketingPageContent } from "@/content/types";

import type { BreadcrumbItem } from "@/components/marketing/types";

function breadcrumbJsonLd(items: BreadcrumbItem[], pageUrl: string) {
	const base = getSiteUrl().toString();
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, i) => ({
			"@type": "ListItem",
			position: i + 1,
			name: item.label,
			item: item.href !== null ? new URL(item.href, base).toString() : pageUrl,
		})),
	};
}

type Props = {
	page: MarketingPageContent;
	breadcrumbs: BreadcrumbItem[];
	extraJsonLd?: Record<string, unknown>[];
};

/** JSON-LD chung: breadcrumb, FAQ (nếu có), extra (Service, …). */
export function MarketingPageSeo({ page, breadcrumbs, extraJsonLd = [] }: Props) {
	const base = getSiteUrl().toString();
	const pageUrl = new URL(page.path, base).toString();

	const faqSchema =
		page.faqs && page.faqs.length > 0
			? {
					"@context": "https://schema.org",
					"@type": "FAQPage",
					mainEntity: page.faqs.map((f) => ({
						"@type": "Question",
						name: f.question,
						acceptedAnswer: {
							"@type": "Answer",
							text: f.answer,
						},
					})),
				}
			: null;

	return (
		<>
			<JsonLd data={breadcrumbJsonLd(breadcrumbs, pageUrl)} />
			{faqSchema ? <JsonLd data={faqSchema} /> : null}
			{extraJsonLd.map((data, i) => (
				<JsonLd key={i} data={data} />
			))}
		</>
	);
}
