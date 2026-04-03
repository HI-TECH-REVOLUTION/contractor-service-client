import { LightPartnerLanding } from "@/components/marketing/layouts/light-partner-landing";
import { pageDoiTacCTV } from "@/content/pages-marketing";
import { marketingPageMetadata } from "@/lib/seo-metadata";

export const metadata = marketingPageMetadata(pageDoiTacCTV);

export default function DoiTacCTVPage() {
	return (
		<LightPartnerLanding
			page={pageDoiTacCTV}
			breadcrumbs={[
				{ label: "Trang chủ", href: "/" },
				{ label: "Cộng tác viên chăm sóc nhà", href: null },
			]}
		/>
	);
}
