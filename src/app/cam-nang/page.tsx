import { HandbookPageLayout } from "@/components/marketing/layouts/handbook-page-layout";
import { pageCamNang } from "@/content/pages-marketing";
import { marketingPageMetadata } from "@/lib/seo-metadata";

export const metadata = marketingPageMetadata(pageCamNang);

export default function CamNangPage() {
	return (
		<HandbookPageLayout
			page={pageCamNang}
			breadcrumbs={[
				{ label: "Trang chủ", href: "/" },
				{ label: "Cẩm nang nhà cửa", href: null },
			]}
		/>
	);
}
