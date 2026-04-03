import { JsonLd } from "@/components/seo/json-ld";
import { BRAND_NAME, getSiteUrl, ORG_DESCRIPTION } from "@/content/site";

export function SiteJsonLd() {
	const url = getSiteUrl().toString();
	return (
		<JsonLd
			data={{
				"@context": "https://schema.org",
				"@graph": [
					{
						"@type": "Organization",
						"@id": `${url}#organization`,
						name: BRAND_NAME,
						url,
						description: ORG_DESCRIPTION,
						logo: `${url}/logo.jpg`,
					},
					{
						"@type": "WebSite",
						"@id": `${url}#website`,
						name: BRAND_NAME,
						url,
						publisher: { "@id": `${url}#organization` },
					},
				],
			}}
		/>
	);
}
