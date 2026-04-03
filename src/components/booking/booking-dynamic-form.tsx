"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Minus, Plus } from "lucide-react";
import type { ReactNode } from "react";

import { BookingFileDropzone } from "@/components/booking/booking-file-dropzone";
import { Button } from "@/components/ui/button";
import type { BookingField } from "@/content/booking/types";
import { filterVisibleFields } from "@/content/booking/validation";
import { cn } from "@/lib/utils";

const inputClass =
	"w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40";

type Props = {
	fields: BookingField[];
	values: Record<string, unknown>;
	errors: Record<string, string>;
	files: Record<string, import("@/content/booking/types").BookingFileEntry[]>;
	onChange: (id: string, value: unknown) => void;
	onFilesChange: (id: string, next: import("@/content/booking/types").BookingFileEntry[]) => void;
};

type FileRenderOpts = { compact?: boolean };

export function BookingDynamicForm({
	fields,
	values,
	errors,
	files,
	onChange,
	onFilesChange,
}: Props) {
	const visible = filterVisibleFields(fields, values);

	function renderField(field: BookingField, fileOpts?: FileRenderOpts): ReactNode {
		switch (field.type) {
			case "section":
				return (
					<div
						key={field.id}
						className={cn(
							"rounded-lg px-0.5 py-0.5",
							field.accent &&
								"rounded-lg border border-[oklch(0.75_0.12_55)] bg-[oklch(0.98_0.02_55)] p-3 dark:border-amber-500/35 dark:bg-amber-500/5",
						)}
					>
						<h3 className="font-heading text-sm font-semibold text-foreground">{field.title}</h3>
						{field.description ? (
							<p className="mt-0.5 text-xs text-muted-foreground">{field.description}</p>
						) : null}
					</div>
				);
			case "infoCallout":
				return (
					<div
						key={field.id}
						className={cn(
							"flex gap-2 rounded-lg border px-3 py-2.5 text-sm",
							field.variant === "success"
								? "border-emerald-500/35 bg-emerald-500/8 text-emerald-950 dark:text-emerald-100"
								: "border-primary/25 bg-primary/6 text-foreground",
						)}
					>
						<div className="min-w-0 flex-1">
							<p className="text-sm font-semibold">{field.title}</p>
							<p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{field.body}</p>
						</div>
						{field.href ? (
							<Link
								href={field.href}
								className="inline-flex shrink-0 items-center gap-1 text-primary hover:underline"
								target="_blank"
								rel="noreferrer"
							>
								<span className="sr-only">{field.hrefLabel ?? "Mở liên kết"}</span>
								<ExternalLink className="size-4" aria-hidden />
							</Link>
						) : null}
					</div>
				);
			case "select": {
				const v = String(values[field.id] ?? "");
				return (
					<div key={field.id} className="space-y-1">
						<label className="text-sm font-medium text-foreground">
							{field.label}
							{field.required ? <span className="text-destructive"> *</span> : null}
						</label>
						<select
							className={inputClass}
							value={v}
							onChange={(e) => onChange(field.id, e.target.value)}
						>
							<option value="">{field.placeholder ?? "Chọn…"}</option>
							{field.options.map((o) => (
								<option key={o.value} value={o.value}>
									{o.label}
								</option>
							))}
						</select>
						{errors[field.id] ? (
							<p className="text-xs text-destructive">{errors[field.id]}</p>
						) : null}
					</div>
				);
			}
			case "radio": {
				const v = String(values[field.id] ?? "");
				return (
					<div key={field.id} className="space-y-1.5">
						<p className="text-sm font-medium text-foreground">
							{field.label}
							{field.required ? <span className="text-destructive"> *</span> : null}
						</p>
						<ul className="space-y-1.5">
							{field.options.map((o) => {
								const sel = v === o.value;
								return (
									<li key={o.value}>
										<button
											type="button"
											onClick={() => onChange(field.id, o.value)}
											className={cn(
												"flex w-full items-center justify-between gap-2 rounded-lg border bg-card px-3 py-2 text-left text-sm transition-colors",
												"hover:border-primary/20",
												sel && "border-primary ring-1 ring-primary/20",
											)}
										>
											<span>
												<span className="font-medium text-foreground">{o.label}</span>
												{o.hint ? (
													<span className="mt-0.5 block text-xs text-muted-foreground">
														{o.hint}
													</span>
												) : null}
											</span>
											<span
												className={cn(
													"size-3.5 shrink-0 rounded-full border-2",
													sel ? "border-primary bg-primary" : "border-muted-foreground/40",
												)}
												aria-hidden
											/>
										</button>
									</li>
								);
							})}
						</ul>
						{errors[field.id] ? (
							<p className="text-xs text-destructive">{errors[field.id]}</p>
						) : null}
					</div>
				);
			}
			case "gridImage": {
				const v = String(values[field.id] ?? "");
				const cols = field.columns ?? 2;
				return (
					<div key={field.id} className="space-y-1.5">
						<p className="text-sm font-medium text-foreground">
							{field.label}
							{field.required ? <span className="text-destructive"> *</span> : null}
						</p>
						<ul className={cn("grid gap-2", cols === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2")}>
							{field.items.map((item) => {
								const sel = v === item.value;
								return (
									<li key={item.value}>
										<button
											type="button"
											onClick={() => onChange(field.id, item.value)}
											className={cn(
												"overflow-hidden rounded-lg border bg-card text-left shadow-sm transition-all",
												"hover:border-primary/25",
												sel &&
													"ring-2 ring-[oklch(0.65_0.16_55)] ring-offset-1 ring-offset-background",
											)}
										>
											<span className="relative block aspect-4/3 w-full bg-muted">
												<Image
													src={item.imageSrc}
													alt=""
													fill
													className="object-cover"
													sizes="(max-width:640px) 50vw, 160px"
												/>
											</span>
											<span
												className={cn(
													"block px-1.5 py-1.5 text-center text-[11px] font-semibold leading-tight sm:text-xs",
													sel ? "text-[oklch(0.5_0.14_55)]" : "text-foreground",
												)}
											>
												{item.label}
											</span>
										</button>
									</li>
								);
							})}
						</ul>
						{errors[field.id] ? (
							<p className="text-xs text-destructive">{errors[field.id]}</p>
						) : null}
					</div>
				);
			}
			case "number": {
				const v =
					values[field.id] === undefined || values[field.id] === null
						? ""
						: String(values[field.id]);
				return (
					<div key={field.id} className="space-y-1">
						<label className="text-sm font-medium text-foreground">
							{field.label}
							{field.required ? <span className="text-destructive"> *</span> : null}
							{field.unit ? (
								<span className="font-normal text-muted-foreground"> ({field.unit})</span>
							) : null}
						</label>
						<input
							type="number"
							className={inputClass}
							placeholder={field.placeholder ?? "Nhập thông số"}
							min={field.min}
							max={field.max}
							value={v}
							onChange={(e) =>
								onChange(field.id, e.target.value === "" ? "" : Number(e.target.value))
							}
						/>
						{errors[field.id] ? (
							<p className="text-xs text-destructive">{errors[field.id]}</p>
						) : null}
					</div>
				);
			}
			case "text":
				return (
					<div key={field.id} className="space-y-1">
						<label className="text-sm font-medium text-foreground">
							{field.label}
							{field.required ? <span className="text-destructive"> *</span> : null}
						</label>
						<input
							type="text"
							className={inputClass}
							placeholder={field.placeholder}
							value={String(values[field.id] ?? "")}
							onChange={(e) => onChange(field.id, e.target.value)}
						/>
						{errors[field.id] ? (
							<p className="text-xs text-destructive">{errors[field.id]}</p>
						) : null}
					</div>
				);
			case "textarea":
				return (
					<div key={field.id} className="space-y-1">
						<label className="text-sm font-medium text-foreground">
							{field.label}
							{field.required ? <span className="text-destructive"> *</span> : null}
						</label>
						<textarea
							className={cn(inputClass, "min-h-18 resize-y")}
							placeholder={field.placeholder}
							rows={field.rows ?? 3}
							value={String(values[field.id] ?? "")}
							onChange={(e) => onChange(field.id, e.target.value)}
						/>
						{errors[field.id] ? (
							<p className="text-xs text-destructive">{errors[field.id]}</p>
						) : null}
					</div>
				);
			case "date":
				return (
					<div key={field.id} className="space-y-1">
						<label className="text-sm font-medium text-foreground">
							{field.label}
							{field.required ? <span className="text-destructive"> *</span> : null}
						</label>
						<input
							type="date"
							className={inputClass}
							value={String(values[field.id] ?? "")}
							onChange={(e) => onChange(field.id, e.target.value)}
						/>
						{errors[field.id] ? (
							<p className="text-xs text-destructive">{errors[field.id]}</p>
						) : null}
					</div>
				);
			case "budgetRange":
				return (
					<div key={field.id} className="grid gap-2 sm:grid-cols-2">
						<div className="space-y-1">
							<label className="text-sm font-medium text-foreground">Từ (VNĐ)</label>
							<input
								type="text"
								inputMode="numeric"
								className={inputClass}
								placeholder={field.placeholderFrom ?? "Nhập số tiền"}
								value={String(values[field.idFrom] ?? "")}
								onChange={(e) => onChange(field.idFrom, e.target.value)}
							/>
						</div>
						<div className="space-y-1">
							<label className="text-sm font-medium text-foreground">Đến (VNĐ)</label>
							<input
								type="text"
								inputMode="numeric"
								className={inputClass}
								placeholder={field.placeholderTo ?? "Nhập số tiền"}
								value={String(values[field.idTo] ?? "")}
								onChange={(e) => onChange(field.idTo, e.target.value)}
							/>
						</div>
					</div>
				);
			case "stepperInt": {
				const n = Number(values[field.id] ?? field.min);
				const val = Number.isNaN(n) ? field.min : n;
				return (
					<div key={field.id} className="space-y-1">
						<p className="text-sm font-medium text-foreground">
							{field.label}
							{field.required ? <span className="text-destructive"> *</span> : null}
						</p>
						<div className="flex items-center gap-2">
							<Button
								type="button"
								variant="outline"
								size="icon"
								aria-label="Giảm"
								disabled={val <= field.min}
								onClick={() => onChange(field.id, Math.max(field.min, val - 1))}
							>
								<Minus className="size-4" />
							</Button>
							<span className="min-w-11 rounded-lg border bg-muted/40 px-2 py-1.5 text-center text-sm font-semibold tabular-nums">
								{val}
							</span>
							<Button
								type="button"
								variant="outline"
								size="icon"
								aria-label="Tăng"
								disabled={val >= field.max}
								onClick={() => onChange(field.id, Math.min(field.max, val + 1))}
							>
								<Plus className="size-4" />
							</Button>
						</div>
						{errors[field.id] ? (
							<p className="text-xs text-destructive">{errors[field.id]}</p>
						) : null}
					</div>
				);
			}
			case "checkboxGroup": {
				const raw = values[field.id];
				const selected = new Set(Array.isArray(raw) ? (raw as string[]) : []);
				return (
					<div key={field.id} className="space-y-1.5">
						<p className="text-sm font-medium text-foreground">
							{field.label}
							{field.required ? <span className="text-destructive"> *</span> : null}
						</p>
						<ul className="space-y-1.5">
							{field.options.map((o) => {
								const on = selected.has(o.value);
								return (
									<li key={o.value}>
										<label className="flex cursor-pointer items-center gap-2 rounded-lg border border-border/80 bg-card px-2.5 py-1.5 text-sm">
											<input
												type="checkbox"
												className="size-4 rounded border-input text-primary"
												checked={on}
												onChange={(e) => {
													const next = new Set(selected);
													if (e.target.checked) next.add(o.value);
													else next.delete(o.value);
													onChange(field.id, [...next]);
												}}
											/>
											<span>{o.label}</span>
										</label>
									</li>
								);
							})}
						</ul>
						{errors[field.id] ? (
							<p className="text-xs text-destructive">{errors[field.id]}</p>
						) : null}
					</div>
				);
			}
			case "file":
				return (
					<div key={field.id} className={fileOpts?.compact ? "min-w-0" : undefined}>
						<BookingFileDropzone
							fieldId={field.id}
							label={field.label}
							accept={field.accept}
							maxFiles={field.maxFiles}
							maxBytesPerFile={field.maxBytesPerFile}
							kind={field.kind}
							files={files[field.id] ?? []}
							onChange={(next) => onFilesChange(field.id, next)}
							error={errors[field.id]}
							compact={Boolean(fileOpts?.compact)}
						/>
					</div>
				);
			default:
				return null;
		}
	}

	const nodes: ReactNode[] = [];
	for (let i = 0; i < visible.length; ) {
		const f = visible[i];
		const next = visible[i + 1];
		if (f.type === "file" && next?.type === "file") {
			nodes.push(
				<div
					key={`file-row-${f.id}-${next.id}`}
					className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-start sm:gap-3"
				>
					{renderField(f, { compact: true })}
					{renderField(next, { compact: true })}
				</div>,
			);
			i += 2;
		} else {
			nodes.push(renderField(f));
			i += 1;
		}
	}

	return <div className="w-full space-y-4">{nodes}</div>;
}
