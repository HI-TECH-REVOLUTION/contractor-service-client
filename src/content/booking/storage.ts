import type { DichVuSlug } from "@/content/dich-vu";

import { DEFAULT_DISTRICT_ID, DEFAULT_PROVINCE_ID } from "@/content/booking/locations";
import type { BookingContactState, BookingDraftV1 } from "./types";

export const BOOKING_DRAFT_KEY = "homebase-booking-draft";

const FILE_FIELD_IDS = new Set([
	"images",
	"attachments",
	"ac_photos",
	"washer_img",
	"fridge_img",
	"fabric_stains",
	"elec_img",
	"plumb_img",
	"combo_img",
	"tender",
	"paint_wall",
	"cab_ref",
	"mep_panel",
	"garden_pic",
]);

/** Bỏ qua file entries khi serialize localStorage (tránh quota). */
export function stripFilesFromValues(values: Record<string, unknown>): Record<string, unknown> {
	const next = { ...values };
	for (const id of FILE_FIELD_IDS) {
		delete next[id];
	}
	return next;
}

export function createEmptyDraft(): BookingDraftV1 {
	return {
		version: 1,
		mainStep: 1,
		subStep: "region",
		provinceId: DEFAULT_PROVINCE_ID,
		districtId: DEFAULT_DISTRICT_ID,
		categorySlug: null,
		serviceId: null,
		formValues: {},
		scheduleDate: "",
		scheduleSlot: "",
		contact: {
			fullName: "",
			phone: "",
			wardId: "",
			addressLine: "",
		},
		savedAt: new Date().toISOString(),
	};
}

export function parseDraft(raw: string | null): BookingDraftV1 | null {
	if (!raw) return null;
	try {
		const data = JSON.parse(raw) as unknown;
		if (typeof data === "object" && data !== null && (data as BookingDraftV1).version === 1) {
			const d = data as BookingDraftV1;
			return {
				...createEmptyDraft(),
				...d,
				formValues: typeof d.formValues === "object" && d.formValues !== null ? d.formValues : {},
				contact: {
					...createEmptyDraft().contact,
					...(typeof d.contact === "object" && d.contact !== null ? d.contact : {}),
				},
			};
		}
	} catch {
		return null;
	}
	return null;
}

export function isDichVuSlug(s: string): s is DichVuSlug {
	return [
		"dien-lanh",
		"ve-sinh-nha-cua",
		"sua-chua-dien-nuoc",
		"hop-dong-dich-vu",
		"xay-dung-va-cai-tao",
		"noi-that-va-trang-tri",
		"co-dien-va-smart-home",
		"canh-quan-ngoai-that",
	].includes(s);
}
