import type { Metadata } from "next";
import { JetBrains_Mono, Roboto } from "next/font/google";

import { PhoneFab } from "@/components/phone-fab";
import { SiteJsonLd } from "@/components/seo/site-json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { BRAND_NAME, getSiteUrl, ORG_DESCRIPTION } from "@/content/site";

import "./globals.css";

const roboto = Roboto({
	variable: "--font-sans-body",
	subsets: ["latin", "vietnamese"],
	weight: ["400", "500", "700"],
	display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
	variable: "--font-mono-body",
	subsets: ["latin", "vietnamese"],
	weight: ["400", "500"],
	display: "swap",
});

export const metadata: Metadata = {
	metadataBase: getSiteUrl(),
	title: {
		default: `${BRAND_NAME} — Dịch vụ nhà cửa & thợ uy tín`,
		template: `%s | ${BRAND_NAME}`,
	},
	description: ORG_DESCRIPTION,
	manifest: "/favicon/manifest.json",
	icons: {
		icon: [
			{ url: "/favicon/favicon.ico", sizes: "48x48" },
			{
				url: "/favicon/favicon-16x16.png",
				sizes: "16x16",
				type: "image/png",
			},
			{
				url: "/favicon/favicon-32x32.png",
				sizes: "32x32",
				type: "image/png",
			},
			{
				url: "/favicon/favicon-96x96.png",
				sizes: "96x96",
				type: "image/png",
			},
		],
		apple: [
			{ url: "/favicon/apple-icon-180x180.png", sizes: "180x180", type: "image/png" },
			{ url: "/favicon/apple-icon-152x152.png", sizes: "152x152", type: "image/png" },
			{ url: "/favicon/apple-icon-144x144.png", sizes: "144x144", type: "image/png" },
			{ url: "/favicon/apple-icon-120x120.png", sizes: "120x120", type: "image/png" },
			{ url: "/favicon/apple-icon-114x114.png", sizes: "114x114", type: "image/png" },
			{ url: "/favicon/apple-icon-76x76.png", sizes: "76x76", type: "image/png" },
			{ url: "/favicon/apple-icon-72x72.png", sizes: "72x72", type: "image/png" },
			{ url: "/favicon/apple-icon-60x60.png", sizes: "60x60", type: "image/png" },
			{ url: "/favicon/apple-icon-57x57.png", sizes: "57x57", type: "image/png" },
		],
		other: [
			{
				rel: "apple-touch-icon-precomposed",
				url: "/favicon/apple-icon-precomposed.png",
			},
		],
	},
	appleWebApp: {
		title: BRAND_NAME,
	},
	openGraph: {
		type: "website",
		locale: "vi_VN",
		siteName: BRAND_NAME,
		images: [{ url: "/logo.jpg", alt: BRAND_NAME }],
	},
	other: {
		"msapplication-TileColor": "#ffffff",
		"msapplication-config": "/favicon/browserconfig.xml",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	// next/font variable on <html> so --font-sans-body exists where @apply font-sans runs (html/body).
	return (
		<html lang="vi" className={`${roboto.variable} ${jetbrainsMono.variable}`}>
			<body className="min-h-screen antialiased">
				<SiteJsonLd />
				<SiteHeader />
				<main className="relative isolate z-0 min-h-[50vh]">{children}</main>
				<SiteFooter />
				<PhoneFab />
			</body>
		</html>
	);
}
