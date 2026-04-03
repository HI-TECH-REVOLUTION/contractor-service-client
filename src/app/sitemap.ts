import type { MetadataRoute } from "next";

import { DICH_VU_SLUGS } from "@/content";
import { getSiteUrl } from "@/content/site";

const STATIC_PATHS = [
	"/",
	"/gioi-thieu",
	"/cam-nang",
	"/tuyen-dung",
	"/dat-dich-vu",
	"/doi-tac/cong-tac-vien-cham-soc-nha",
	"/doi-tac/doi-tac-xay-dung",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
	const base = getSiteUrl().toString();
	const lastModified = new Date();

	const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
		url: new URL(path, base).toString(),
		lastModified,
		changeFrequency: path === "/" ? "weekly" : "monthly",
		priority: path === "/" ? 1 : 0.8,
	}));

	const dichVuEntries: MetadataRoute.Sitemap = DICH_VU_SLUGS.map((slug) => ({
		url: new URL(`/dich-vu/${slug}`, base).toString(),
		lastModified,
		changeFrequency: "monthly" as const,
		priority: 0.75,
	}));

	return [...staticEntries, ...dichVuEntries];
}
