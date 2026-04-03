"use server";

import { isValidPartnerCity, isValidPartnerField } from "@/content/partner-form";
import type { PartnerFormVariant } from "@/content/types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizePhone(raw: string): string {
	return raw.replace(/\s/g, "").trim();
}

export type PartnerRegistrationResult = { ok: true } | { ok: false; error: string };

export async function submitPartnerRegistration(
	formData: FormData,
): Promise<PartnerRegistrationResult> {
	const fullName = String(formData.get("fullName") ?? "").trim();
	const city = String(formData.get("city") ?? "").trim();
	const field = String(formData.get("field") ?? "").trim();
	const phone = normalizePhone(String(formData.get("phone") ?? ""));
	const email = String(formData.get("email") ?? "").trim();
	const note = String(formData.get("note") ?? "").trim();
	const variantRaw = String(formData.get("variant") ?? "").trim();

	if (variantRaw !== "homeCare" && variantRaw !== "construction") {
		return { ok: false, error: "Loại đăng ký không hợp lệ." };
	}
	const variant = variantRaw as PartnerFormVariant;

	if (!fullName || fullName.length > 200) {
		return { ok: false, error: "Vui lòng nhập họ và tên hợp lệ." };
	}
	if (!isValidPartnerCity(city)) {
		return { ok: false, error: "Vui lòng chọn thành phố hoạt động." };
	}
	if (!isValidPartnerField(field, variant)) {
		return { ok: false, error: "Vui lòng chọn lĩnh vực hoạt động." };
	}
	const phoneDigits = phone.replace(/\D/g, "");
	if (phoneDigits.length < 8 || phone.length > 24) {
		return { ok: false, error: "Vui lòng nhập số điện thoại hợp lệ." };
	}
	if (!EMAIL_RE.test(email) || email.length > 254) {
		return { ok: false, error: "Vui lòng nhập email hợp lệ." };
	}
	if (note.length > 5000) {
		return { ok: false, error: "Chú thích quá dài." };
	}

	if (process.env.NODE_ENV === "development") {
		// Ghi nhận gửi form; tích hợp API/email sau qua biến môi trường.
		console.info("[partner-registration]", {
			variant,
			fullName,
			city,
			field,
			phone,
			email,
			noteLength: note.length,
		});
	}

	return { ok: true };
}
