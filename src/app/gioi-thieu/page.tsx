import { IntroPageLayout } from "@/components/marketing/layouts/intro-page-layout";
import { pageGioiThieu } from "@/content/pages-marketing";
import { marketingPageMetadata } from "@/lib/seo-metadata";

export const metadata = marketingPageMetadata(pageGioiThieu);

export default function GioiThieuPage() {
	return (
		<IntroPageLayout
			page={pageGioiThieu}
			breadcrumbs={[
				{ label: "Trang chủ", href: "/" },
				{ label: "Giới thiệu", href: null },
			]}
		/>
	);
}
