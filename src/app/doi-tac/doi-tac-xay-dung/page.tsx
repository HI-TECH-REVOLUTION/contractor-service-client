import { LightPartnerLanding } from "@/components/marketing/layouts/light-partner-landing";
import { pageDoiTacXayDung } from "@/content/pages-marketing";
import { marketingPageMetadata } from "@/lib/seo-metadata";

export const metadata = marketingPageMetadata(pageDoiTacXayDung);

export default function DoiTacXayDungPage() {
	return (
		<LightPartnerLanding
			page={pageDoiTacXayDung}
			breadcrumbs={[
				{ label: "Trang chủ", href: "/" },
				{ label: "Đối tác xây dựng", href: null },
			]}
		/>
	);
}
