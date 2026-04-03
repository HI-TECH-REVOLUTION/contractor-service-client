import { HomeLanding } from "@/components/home/home-landing";
import { homeContent } from "@/content/home";
import { homeMetadata } from "@/lib/seo-metadata";

export const metadata = homeMetadata(homeContent);

export default function Home() {
	return (
		<HomeLanding
			heroDescription={homeContent.heroDescription}
			press={homeContent.press}
			blogTeasers={homeContent.blogTeasers}
		/>
	);
}
