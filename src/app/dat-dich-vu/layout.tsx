import type { Metadata } from "next";

import { BRAND_NAME } from "@/content/site";

export const metadata: Metadata = {
	title: `Đặt dịch vụ — ${BRAND_NAME}`,
	description:
		"Đặt dịch vụ nhà cửa trực tuyến: chọn loại hình, mô tả nhu cầu, đặt lịch và gửi thông tin liên hệ.",
};

export default function DatDichVuLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return children;
}
