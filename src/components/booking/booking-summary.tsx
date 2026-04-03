"use client";

import type { BookingField } from "@/content/booking/types";
import { filterVisibleFields } from "@/content/booking/validation";

function optionLabel(field: BookingField, value: string): string {
	if (field.type === "gridImage") {
		return field.items.find((x) => x.value === value)?.label ?? value;
	}
	if (field.type === "select" || field.type === "radio") {
		return field.options.find((x) => x.value === value)?.label ?? value;
	}
	return value;
}

type FileEntry = { name: string; size: number };

type Props = {
	title: string;
	categoryLabel: string;
	serviceLabel: string;
	fields: BookingField[];
	values: Record<string, unknown>;
	files: Record<string, FileEntry[]>;
	scheduleDate: string;
	scheduleSlot: string;
};

export function BookingSummary({
	title,
	categoryLabel,
	serviceLabel,
	fields,
	values,
	files,
	scheduleDate,
	scheduleSlot,
}: Props) {
	const visible = filterVisibleFields(fields, values);
	const rows: { label: string; value: string }[] = [];

	for (const field of visible) {
		switch (field.type) {
			case "budgetRange": {
				const from = String(values[field.idFrom] ?? "").trim();
				const to = String(values[field.idTo] ?? "").trim();
				if (from || to) {
					rows.push({
						label: field.label,
						value: [from, to].filter(Boolean).join(" – ") + (from || to ? " ₫" : ""),
					});
				}
				break;
			}
			case "select":
			case "radio":
			case "gridImage": {
				const v = String(values[field.id] ?? "").trim();
				if (v)
					rows.push({
						label: field.label,
						value: optionLabel(field, v),
					});
				break;
			}
			case "number":
			case "stepperInt":
			case "text":
			case "textarea":
			case "date": {
				const v = values[field.id];
				if (v !== undefined && v !== null && String(v).trim() !== "") {
					let s = String(v);
					if (field.type === "number" && field.unit) s += ` ${field.unit}`;
					rows.push({ label: field.label, value: s });
				}
				break;
			}
			case "checkboxGroup": {
				const arr = values[field.id];
				if (Array.isArray(arr) && arr.length) {
					const labels = arr.map((val) => {
						const opt = field.options.find((o) => o.value === val);
						return opt?.label ?? String(val);
					});
					rows.push({ label: field.label, value: labels.join(", ") });
				}
				break;
			}
			case "file": {
				const list = files[field.id] ?? [];
				if (list.length) {
					rows.push({
						label: field.label,
						value: list.map((f) => `${f.name} (${(f.size / 1024).toFixed(0)} KB)`).join("; "),
					});
				}
				break;
			}
			default:
				break;
		}
	}

	return (
		<div className="space-y-6">
			<div>
				<h2 className="font-heading text-lg font-semibold text-foreground">{title}</h2>
				<p className="mt-1 text-sm text-muted-foreground">Kiểm tra lại trước khi gửi yêu cầu.</p>
			</div>
			<dl className="space-y-3 rounded-xl border bg-muted/20 p-4">
				<div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between">
					<dt className="text-sm text-muted-foreground">Loại hình</dt>
					<dd className="text-sm font-medium text-foreground">{categoryLabel}</dd>
				</div>
				<div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between">
					<dt className="text-sm text-muted-foreground">Dịch vụ</dt>
					<dd className="text-sm font-medium text-foreground">{serviceLabel}</dd>
				</div>
				{scheduleDate ? (
					<div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between">
						<dt className="text-sm text-muted-foreground">Thời gian bắt đầu dự kiến</dt>
						<dd className="text-sm font-medium text-foreground">
							{scheduleDate}
							{scheduleSlot ? ` — ${scheduleSlot}` : ""}
						</dd>
					</div>
				) : null}
				{rows.map((r, i) => (
					<div
						key={`${r.label}-${i}`}
						className="flex flex-col gap-0.5 border-t border-border/60 pt-3 first:border-t-0 first:pt-0 sm:flex-row sm:justify-between"
					>
						<dt className="text-sm text-muted-foreground">{r.label}</dt>
						<dd className="max-w-xl text-sm font-medium text-foreground">{r.value}</dd>
					</div>
				))}
			</dl>
		</div>
	);
}
