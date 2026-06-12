import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
	variable: "--font-sans",
	subsets: ["latin", "vietnamese"],
	weight: ["400", "500", "600", "700", "800", "900"],
	display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
	variable: "--font-mono",
	subsets: ["latin", "vietnamese"],
	weight: ["400", "500", "700"],
	display: "swap",
});

export const metadata: Metadata = {
	title: {
		default: "VERTEX — Nền tảng kết nối xây dựng",
		template: "%s | VERTEX",
	},
	description:
		"Nền tảng kết nối khách hàng với đối tác xây dựng, thiết kế và thi công uy tín tại Việt Nam.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="vi" className={`${inter.variable} ${jetbrainsMono.variable}`}>
			<body className="min-h-screen antialiased">{children}</body>
		</html>
	);
}
