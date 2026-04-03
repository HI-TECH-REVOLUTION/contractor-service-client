import { z } from "zod";

import type { BookingField, BookingFileEntry } from "./types";

export const scheduleSchema = z.object({
	scheduleDate: z.string().min(1, "Chọn ngày mong muốn"),
	scheduleSlot: z.string().optional(),
});

export const contactSchema = z.object({
	fullName: z.string().trim().min(2, "Nhập họ và tên").max(120, "Họ tên quá dài"),
	phone: z
		.string()
		.trim()
		.min(8, "Nhập số điện thoại")
		.regex(/^[\d\s+().-]{8,}$/, "Số điện thoại không hợp lệ"),
	wardId: z.string().min(1, "Chọn phường / xã"),
	addressLine: z.string().trim().min(3, "Nhập địa chỉ cụ thể").max(500, "Địa chỉ quá dài"),
});

export type ContactInput = z.infer<typeof contactSchema>;

export function filterVisibleFields(
	fields: BookingField[],
	values: Record<string, unknown>,
): BookingField[] {
	return fields.filter((f) => {
		if (f.type === "section" || f.type === "infoCallout") return true;
		if (!("showWhen" in f) || !f.showWhen) return true;
		const v = values[f.showWhen.fieldId];
		return String(v ?? "") === f.showWhen.equals;
	});
}

function isEmpty(v: unknown): boolean {
	if (v === undefined || v === null) return true;
	if (typeof v === "string") return v.trim() === "";
	if (typeof v === "number") return Number.isNaN(v);
	if (Array.isArray(v)) return v.length === 0;
	return false;
}

/**
 * Validate dynamic detail fields; returns map fieldId -> message.
 */
export function validateDetailFields(
	fields: BookingField[],
	values: Record<string, unknown>,
	files: Record<string, BookingFileEntry[]>,
): Record<string, string> {
	const visible = filterVisibleFields(fields, values);
	const errors: Record<string, string> = {};

	for (const field of visible) {
		switch (field.type) {
			case "section":
			case "infoCallout":
				break;
			case "budgetRange": {
				// optional unless required
				break;
			}
			case "file": {
				const list = files[field.id] ?? [];
				if (field.required && list.length === 0) {
					errors[field.id] = "Vui lòng tải ít nhất một tệp";
				}
				break;
			}
			case "checkboxGroup": {
				const arr = values[field.id];
				const ok = Array.isArray(arr) && arr.length > 0;
				if (field.required && !ok) {
					errors[field.id] = "Chọn ít nhất một mục";
				}
				break;
			}
			case "number": {
				const raw = values[field.id];
				if (field.required && isEmpty(raw)) {
					errors[field.id] = "Bắt buộc";
					break;
				}
				if (!isEmpty(raw)) {
					const n = Number(raw);
					if (Number.isNaN(n)) {
						errors[field.id] = "Nhập số hợp lệ";
					} else {
						if (field.min !== undefined && n < field.min) {
							errors[field.id] = `Tối thiểu ${field.min}`;
						}
						if (field.max !== undefined && n > field.max) {
							errors[field.id] = `Tối đa ${field.max}`;
						}
					}
				}
				break;
			}
			case "stepperInt": {
				const raw = values[field.id];
				const n = typeof raw === "number" ? raw : Number(raw ?? field.min ?? 0);
				if (field.required && (Number.isNaN(n) || raw === undefined)) {
					errors[field.id] = "Bắt buộc";
					break;
				}
				if (!Number.isNaN(n)) {
					if (n < field.min || n > field.max) {
						errors[field.id] = `Trong khoảng ${field.min}–${field.max}`;
					}
				}
				break;
			}
			case "select":
			case "radio":
			case "gridImage": {
				if (field.required && isEmpty(values[field.id])) {
					errors[field.id] = "Vui lòng chọn";
				}
				break;
			}
			case "text":
			case "textarea":
			case "date": {
				if (field.required && isEmpty(values[field.id])) {
					errors[field.id] = "Bắt buộc";
				}
				break;
			}
			default:
				break;
		}
	}

	return errors;
}

export function hasDetailErrors(errors: Record<string, string>): boolean {
	return Object.keys(errors).length > 0;
}
