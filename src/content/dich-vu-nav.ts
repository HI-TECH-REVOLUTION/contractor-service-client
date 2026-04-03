import { unsplashPhoto } from "@/lib/unsplash";

/**
 * Danh sách dịch vụ trên menu — dùng chung header mega-menu & trang chủ.
 * `photoPath` là segment sau images.unsplash.com/ (vd: photo-xxx-yyy).
 */
export type DichVuNavItem = {
	href: string;
	label: string;
	description: string;
	photoPath: string;
	imageAlt: string;
};

export const DICH_VU_NAV_ITEMS: readonly DichVuNavItem[] = [
	{
		href: "/dich-vu/dien-lanh",
		label: "Điện lạnh",
		description: "Vệ sinh, lắp đặt & sửa điều hòa, máy giặt, tủ lạnh",
		photoPath: "photo-1626806787461-102c1bfaaea1",
		imageAlt: "Điều hòa không khí",
	},
	{
		href: "/dich-vu/ve-sinh-nha-cua",
		label: "Vệ sinh nhà cửa",
		description: "Tổng vệ sinh, theo giờ, sofa & thảm",
		photoPath: "photo-1584622650111-993a426fbf0a",
		imageAlt: "Vệ sinh nhà cửa",
	},
	{
		href: "/dich-vu/sua-chua-dien-nuoc",
		label: "Sửa chữa điện nước",
		description: "Chập điện, ống nước, thiết bị vệ sinh",
		photoPath: "photo-1581578731548-c64695cc6952",
		imageAlt: "Thợ sửa chữa tại nhà",
	},
	{
		href: "/dich-vu/hop-dong-dich-vu",
		label: "Hợp đồng dịch vụ",
		description: "Bảo trì định kỳ cho doanh nghiệp & tòa nhà",
		photoPath: "photo-1497366754035-f200968a6e72",
		imageAlt: "Văn phòng & tòa nhà",
	},
	{
		href: "/dich-vu/xay-dung-va-cai-tao",
		label: "Xây dựng & cải tạo",
		description: "Thiết kế, thi công phần thô & trọn gói",
		photoPath: "photo-1504307651254-35680f356dfd",
		imageAlt: "Công trình xây dựng",
	},
	{
		href: "/dich-vu/noi-that-va-trang-tri",
		label: "Nội thất & trang trí",
		description: "Thi công nội thất, sơn, trần vách, nhôm kính",
		photoPath: "photo-1618221195710-dd6b41faaea6",
		imageAlt: "Phòng khách hiện đại",
	},
	{
		href: "/dich-vu/co-dien-va-smart-home",
		label: "Cơ điện & Smarthome",
		description: "Điện nước công trình, nhà thông minh",
		photoPath: "photo-1513506003901-1e6a229e2d15",
		imageAlt: "Nhà thông minh",
	},
	{
		href: "/dich-vu/canh-quan-ngoai-that",
		label: "Cảnh quan ngoại thất",
		description: "Sân vườn, hồ bơi, chăm sóc cảnh quan",
		photoPath: "photo-1416879595882-3373a0480b5b",
		imageAlt: "Sân vườn cảnh quan",
	},
] as const;

export function dichVuNavImage(photoPath: string, width: number): string {
	return unsplashPhoto(photoPath, width);
}
