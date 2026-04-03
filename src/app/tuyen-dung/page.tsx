import { CareersPageLayout } from "@/components/marketing/layouts/careers-page-layout";
import { pageTuyenDung } from "@/content/pages-marketing";
import { marketingPageMetadata } from "@/lib/seo-metadata";

export const metadata = marketingPageMetadata(pageTuyenDung);

export default function TuyenDungPage() {
	return (
		<CareersPageLayout
			page={pageTuyenDung}
			breadcrumbs={[
				{ label: "Trang chủ", href: "/" },
				{ label: "Tuyển dụng", href: null },
			]}
		/>
	);
}
