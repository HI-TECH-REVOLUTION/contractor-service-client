import type { PartnerFormVariant } from "@/content/types";

export const PARTNER_CITY_OPTIONS: readonly { value: string; label: string }[] = [
	{ value: "tp-hcm", label: "TP. Hồ Chí Minh" },
	{ value: "ha-noi", label: "Hà Nội" },
	{ value: "da-nang", label: "Đà Nẵng" },
	{ value: "can-tho", label: "Cần Thơ" },
	{ value: "hai-phong", label: "Hải Phòng" },
	{ value: "nha-trang", label: "Nha Trang" },
	{ value: "binh-duong", label: "Bình Dương" },
	{ value: "dong-nai", label: "Đồng Nai" },
	{ value: "other", label: "Khác" },
] as const;

const HOME_CARE: readonly { value: string; label: string }[] = [
	{ value: "dien-lanh", label: "Điện lạnh" },
	{ value: "ve-sinh-nha-cua", label: "Vệ sinh nhà cửa" },
	{ value: "sua-chua-dien-nuoc", label: "Sửa chữa điện nước" },
	{ value: "hop-dong-dich-vu", label: "Hợp đồng dịch vụ" },
	{ value: "khac", label: "Khác" },
] as const;

const CONSTRUCTION: readonly { value: string; label: string }[] = [
	{ value: "xay-dung-cai-tao", label: "Xây dựng & cải tạo" },
	{ value: "noi-that-trang-tri", label: "Nội thất & trang trí" },
	{ value: "co-dien-smart-home", label: "Cơ điện & Smarthome" },
	{ value: "hop-dong-dich-vu", label: "Hợp đồng dịch vụ" },
	{ value: "canh-quan", label: "Cảnh quan ngoại thất" },
	{ value: "khac", label: "Khác" },
] as const;

export function partnerFieldOptions(
	variant: PartnerFormVariant,
): readonly { value: string; label: string }[] {
	return variant === "construction" ? CONSTRUCTION : HOME_CARE;
}

const CITY_VALUES = new Set(PARTNER_CITY_OPTIONS.map((o) => o.value));

export function isValidPartnerCity(value: string): boolean {
	return CITY_VALUES.has(value);
}

export function isValidPartnerField(value: string, variant: PartnerFormVariant): boolean {
	return partnerFieldOptions(variant).some((o) => o.value === value);
}
