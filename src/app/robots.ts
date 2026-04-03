import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
	const base = getSiteUrl().toString();
	return {
		rules: { userAgent: "*", allow: "/" },
		sitemap: new URL("/sitemap.xml", base).toString(),
	};
}
