import { BRAND_NAME, getSiteUrl, ORG_DESCRIPTION } from "@/content/site";
import type { MarketingPageContent } from "@/content/types";

export type { BreadcrumbItem } from "@/components/marketing/types";

export function serviceJsonLd(page: MarketingPageContent): Record<string, unknown> {
	const base = getSiteUrl().toString();
	return {
		"@context": "https://schema.org",
		"@type": "Service",
		name: page.h1,
		description: page.serviceOfferDescription ?? page.description,
		url: new URL(page.path, base).toString(),
		provider: {
			"@type": "Organization",
			name: BRAND_NAME,
			url: base,
			description: ORG_DESCRIPTION,
		},
		areaServed: {
			"@type": "Country",
			name: "VN",
		},
	};
}
