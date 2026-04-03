import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServicePageLayout } from "@/components/marketing/layouts/service-page-layout";
import { serviceJsonLd } from "@/components/marketing/seo-page";
import { DICH_VU_SLUGS, getDichVuPage } from "@/content";
import { marketingPageMetadata } from "@/lib/seo-metadata";

export function generateStaticParams() {
	return DICH_VU_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const page = getDichVuPage(slug);
	if (!page) return { title: { absolute: "Không tìm thấy" } };
	return marketingPageMetadata(page);
}

export default async function DichVuPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const page = getDichVuPage(slug);
	if (!page) notFound();

	return (
		<ServicePageLayout
			page={page}
			breadcrumbs={[
				{ label: "Trang chủ", href: "/" },
				{ label: page.h1, href: null },
			]}
			extraJsonLd={[serviceJsonLd(page)]}
		/>
	);
}
