import type { Metadata } from "next";

import { BRAND_NAME, getSiteUrl } from "@/content/site";
import type { HomeContent, MarketingPageContent } from "@/content/types";

function absoluteUrl(path: string): string {
	const base = getSiteUrl();
	const p = path.startsWith("/") ? path : `/${path}`;
	return new URL(p, base).toString();
}

export function marketingPageMetadata(page: MarketingPageContent): Metadata {
	const url = absoluteUrl(page.path);
	const ogImage = page.hero?.image;

	return {
		title: {
			absolute: page.title,
		},
		description: page.description,
		keywords: page.keywords,
		alternates: { canonical: url },
		openGraph: {
			title: page.title,
			description: page.description,
			url,
			locale: "vi_VN",
			type: "website",
			siteName: BRAND_NAME,
			...(ogImage ? { images: [{ url: ogImage.src, alt: ogImage.alt }] } : {}),
		},
		twitter: {
			card: "summary_large_image",
			title: page.title,
			description: page.description,
			...(ogImage ? { images: [ogImage.src] } : {}),
		},
	};
}

export function homeMetadata(home: HomeContent): Metadata {
	const url = absoluteUrl(home.path);
	const ogImage = home.press.image;

	return {
		title: {
			absolute: home.title,
		},
		description: home.description,
		alternates: { canonical: url },
		openGraph: {
			title: home.title,
			description: home.description,
			url,
			locale: "vi_VN",
			type: "website",
			siteName: BRAND_NAME,
			images: [{ url: ogImage.src, alt: ogImage.alt }],
		},
		twitter: {
			card: "summary_large_image",
			title: home.title,
			description: home.description,
			images: [ogImage.src],
		},
	};
}
