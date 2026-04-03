/** URL gốc site — dùng cho metadataBase, OG, sitemap (set khi deploy). */
export function getSiteUrl(): URL {
	const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";
	try {
		return new URL(raw.endsWith("/") ? raw.slice(0, -1) : raw);
	} catch {
		return new URL("http://localhost:3000");
	}
}

/** Tên thương hiệu hiển thị (tiếng Anh, ngắn gọn). */
export const BRAND_NAME = "HomeBase";

export const ORG_DESCRIPTION =
	"Nền tảng kết nối dịch vụ nhà cửa uy tín: điện lạnh, vệ sinh, sửa chữa điện nước, xây dựng và chăm sóc nhà trọn gói.";
