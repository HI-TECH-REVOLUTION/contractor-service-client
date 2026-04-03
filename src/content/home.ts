import type { HomeContent } from "@/content/types";
import { unsplashPhoto } from "@/lib/unsplash";

export const homeContent: HomeContent = {
	path: "/",
	title: "HomeBase — Dịch vụ nhà cửa & thợ uy tín",
	description:
		"Đặt dịch vụ điện lạnh, vệ sinh, sửa chữa điện nước, xây dựng và chăm sóc nhà cửa. Báo giá minh bạch, thợ được kiểm chứng, đồng hành lâu dài cùng gia đình bạn.",
	heroDescription:
		"HomeBase kết nối bạn với đội ngũ kỹ thuật và nhà cung cấp dịch vụ nhà cửa đã qua kiểm chứng. Đặt lịch nhanh, chi phí rõ ràng và được hỗ trợ trong suốt quy trình — từ báo giá đến bàn giao.",
	press: {
		title: "Báo chí đánh giá mô hình kết nối dịch vụ nhà cửa minh bạch",
		excerpt:
			"Các kênh truyền thông ghi nhận xu hướng khách hàng ưu tiên nền tảng có quy trình rõ ràng, thợ có hồ sơ và chính sách hỗ trợ sau dịch vụ. HomeBase hướng tới chuẩn hóa trải nghiệm đặt lịch và chăm sóc khách hàng.",
		image: {
			src: unsplashPhoto("photo-1504711434969-e33886168f5c", 960),
			alt: "Tin tức và truyền thông về dịch vụ nhà cửa",
		},
	},
	blogTeasers: [
		{
			id: "dieu-hoa-tiet-kiem-dien",
			tag: "Kỹ thuật",
			title: "Mẹo sử dụng điều hòa tiết kiệm điện",
			excerpt:
				"Nhiệt độ hợp lý, vệ sinh dàn lạnh định kỳ và cách tối ưu luồng gió giúp giảm hóa đơn mà vẫn mát dễ chịu.",
			date: "Tháng 4, 2026",
			href: "/cam-nang#dieu-hoa-tiet-kiem-dien",
			image: {
				src: unsplashPhoto("photo-1626806787461-102c1bfaaea1", 800),
				alt: "Điều hòa không khí trong phòng khách",
			},
		},
		{
			id: "ve-sinh-may-lanh-dinh-ky",
			tag: "Dịch vụ",
			title: "Khi nào nên vệ sinh máy lạnh định kỳ?",
			excerpt:
				"Dấu hiệu hơi yếu, mùi ẩm hay tiếng ồn bất thường — thời điểm gọi thợ và lợi ích của bảo trì đúng chu kỳ.",
			date: "Tháng 4, 2026",
			href: "/cam-nang#ve-sinh-may-lanh-dinh-ky",
			image: {
				src: unsplashPhoto("photo-1527515637462-cff94eecc1ac", 800),
				alt: "Bảo trì và vệ sinh thiết bị gia đình",
			},
		},
		{
			id: "checklist-tho-dien-nuoc",
			tag: "Nhà cửa",
			title: "Checklist trước khi gọi thợ điện nước",
			excerpt:
				"Chuẩn bị mô tả sự cố, ảnh hiện trường và cầu dao an toàn giúp thợ chẩn đoán nhanh, tránh phát sinh không cần thiết.",
			date: "Tháng 3, 2026",
			href: "/cam-nang#checklist-tho-dien-nuoc",
			image: {
				src: unsplashPhoto("photo-1621905252507-b35492cc74b4", 800),
				alt: "Dụng cụ và an toàn khi sửa chữa tại nhà",
			},
		},
	],
};
