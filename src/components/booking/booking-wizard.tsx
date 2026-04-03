"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Trash2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { BookingBreadcrumb } from "@/components/booking/booking-breadcrumb";
import { BookingContactForm } from "@/components/booking/booking-contact-form";
import { BookingDynamicForm } from "@/components/booking/booking-dynamic-form";
import {
	type CategoryCardItem,
	BookingServiceGrid,
} from "@/components/booking/booking-service-grid";
import { BookingStepper } from "@/components/booking/booking-stepper";
import { BookingSummary } from "@/components/booking/booking-summary";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/lib/button-variants";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { dichVuBySlug, type DichVuSlug } from "@/content/dich-vu";
import { DICH_VU_NAV_ITEMS, dichVuNavImage } from "@/content/dich-vu-nav";
import {
	DEFAULT_DISTRICT_ID,
	DEFAULT_PROVINCE_ID,
	sanitizeProvinceDistrictWard,
	VIETNAM_LOCATIONS,
} from "@/content/booking/locations";
import {
	BOOKING_DRAFT_KEY,
	createEmptyDraft,
	isDichVuSlug,
	parseDraft,
} from "@/content/booking/storage";
import { getBookingService, getBookingServices } from "@/content/booking/taxonomy";
import type { BookingFileEntry, BookingServiceDefinition } from "@/content/booking/types";
import {
	contactSchema,
	hasDetailErrors,
	scheduleSchema,
	validateDetailFields,
} from "@/content/booking/validation";

type MainStep = 1 | 2 | 3 | 4;
type SubStep = "region" | "category" | "service" | "details";

function slugFromHref(href: string): DichVuSlug {
	const s = href.replace(/^\/dich-vu\//, "");
	return isDichVuSlug(s) ? s : "dien-lanh";
}

function defaultValuesForService(service: BookingServiceDefinition): Record<string, unknown> {
	const o: Record<string, unknown> = {};
	for (const f of service.fields) {
		if (f.type === "checkboxGroup") o[f.id] = [];
		if (f.type === "stepperInt") o[f.id] = f.min;
	}
	return o;
}

function formatScheduleDisplay(isoDate: string, slot: string): string {
	if (!isoDate) return "";
	try {
		const [y, m, d] = isoDate.split("-").map(Number);
		const dt = new Date(y, (m ?? 1) - 1, d ?? 1);
		const day = dt.toLocaleDateString("vi-VN", { weekday: "long" });
		const rest = dt.toLocaleDateString("vi-VN");
		return `${day}, ${rest}${slot ? ` — ${slot}` : ""}`;
	} catch {
		return isoDate;
	}
}

const SLOT_OPTIONS = [
	{ value: "", label: "Khung giờ (tuỳ chọn)" },
	{ value: "Sáng (8h–12h)", label: "Sáng (8h–12h)" },
	{ value: "Chiều (13h–17h)", label: "Chiều (13h–17h)" },
	{ value: "Tối (sau 18h)", label: "Tối (sau 18h)" },
	{ value: "Linh hoạt", label: "Linh hoạt theo hẹn" },
];

export function BookingWizard() {
	const [hydrated, setHydrated] = useState(false);
	const [toast, setToast] = useState<string | null>(null);

	const [mainStep, setMainStep] = useState<MainStep>(1);
	const [subStep, setSubStep] = useState<SubStep>("region");
	const [provinceId, setProvinceId] = useState(DEFAULT_PROVINCE_ID);
	const [districtId, setDistrictId] = useState(DEFAULT_DISTRICT_ID);
	const [categorySlug, setCategorySlug] = useState<DichVuSlug | null>(null);
	const [serviceId, setServiceId] = useState<string | null>(null);
	const [formValues, setFormValues] = useState<Record<string, unknown>>({});
	const [filesByField, setFilesByField] = useState<Record<string, BookingFileEntry[]>>({});
	const [detailErrors, setDetailErrors] = useState<Record<string, string>>({});
	const [scheduleDate, setScheduleDate] = useState("");
	const [scheduleSlot, setScheduleSlot] = useState("");
	const [scheduleError, setScheduleError] = useState<string | null>(null);
	const [contact, setContact] = useState(createEmptyDraft().contact);
	const [contactErrors, setContactErrors] = useState<Record<string, string>>({});

	useEffect(() => {
		const raw = localStorage.getItem(BOOKING_DRAFT_KEY);
		const draft = parseDraft(raw);
		if (draft) {
			const loc = sanitizeProvinceDistrictWard(
				draft.provinceId,
				draft.districtId,
				draft.contact?.wardId ?? "",
			);
			/* eslint-disable react-hooks/set-state-in-effect -- one-time client hydration from localStorage */
			setMainStep(draft.mainStep);
			setSubStep(draft.subStep);
			setProvinceId(loc.provinceId);
			setDistrictId(loc.districtId);
			if (draft.categorySlug && isDichVuSlug(draft.categorySlug)) {
				setCategorySlug(draft.categorySlug);
			}
			setServiceId(draft.serviceId);
			setFormValues(draft.formValues ?? {});
			setScheduleDate(draft.scheduleDate ?? "");
			setScheduleSlot(draft.scheduleSlot ?? "");
			setContact({
				...createEmptyDraft().contact,
				...draft.contact,
				wardId: loc.wardId,
			});
			/* eslint-enable react-hooks/set-state-in-effect */
		}
		setHydrated(true);
	}, []);

	useEffect(() => {
		if (!hydrated) return;
		const payload = {
			...createEmptyDraft(),
			mainStep,
			subStep,
			provinceId,
			districtId,
			categorySlug,
			serviceId,
			formValues,
			scheduleDate,
			scheduleSlot,
			contact,
			savedAt: new Date().toISOString(),
		};
		const t = window.setTimeout(() => {
			try {
				localStorage.setItem(BOOKING_DRAFT_KEY, JSON.stringify(payload));
			} catch {
				/* quota */
			}
		}, 450);
		return () => window.clearTimeout(t);
	}, [
		hydrated,
		mainStep,
		subStep,
		provinceId,
		districtId,
		categorySlug,
		serviceId,
		formValues,
		scheduleDate,
		scheduleSlot,
		contact,
	]);

	useEffect(() => {
		if (!toast) return;
		const t = window.setTimeout(() => setToast(null), 4200);
		return () => window.clearTimeout(t);
	}, [toast]);

	const categoryItems: CategoryCardItem[] = useMemo(
		() =>
			DICH_VU_NAV_ITEMS.map((item) => {
				const slug = slugFromHref(item.href);
				return {
					id: slug,
					label: dichVuBySlug[slug].h1,
					description: item.description,
					imageSrc: dichVuNavImage(item.photoPath, 480),
					imageAlt: item.imageAlt,
				};
			}),
		[],
	);

	const service = useMemo(() => {
		if (!categorySlug || !serviceId) return null;
		return getBookingService(categorySlug, serviceId);
	}, [categorySlug, serviceId]);

	const serviceItems = useMemo(() => {
		if (!categorySlug) return [];
		return getBookingServices(categorySlug).map((s) => ({
			id: s.id,
			label: s.label,
			description: s.description,
			icon: s.icon,
		}));
	}, [categorySlug]);

	const onSelectCategory = (id: string) => {
		if (!isDichVuSlug(id)) return;
		setCategorySlug(id);
		setServiceId(null);
		setFormValues({});
		setFilesByField({});
		setDetailErrors({});
	};

	const onSelectService = (id: string) => {
		setServiceId(id);
		const svc = categorySlug ? getBookingService(categorySlug, id) : undefined;
		setFormValues(svc ? defaultValuesForService(svc) : {});
		setFilesByField({});
		setDetailErrors({});
	};

	const onFormChange = useCallback((id: string, value: unknown) => {
		setFormValues((prev) => ({ ...prev, [id]: value }));
	}, []);

	const onFilesChange = useCallback((id: string, next: BookingFileEntry[]) => {
		setFilesByField((prev) => ({ ...prev, [id]: next }));
	}, []);

	const resetAll = () => {
		localStorage.removeItem(BOOKING_DRAFT_KEY);
		setMainStep(1);
		setSubStep("region");
		setProvinceId(DEFAULT_PROVINCE_ID);
		setDistrictId(DEFAULT_DISTRICT_ID);
		setCategorySlug(null);
		setServiceId(null);
		setFormValues({});
		setFilesByField({});
		setDetailErrors({});
		setScheduleDate("");
		setScheduleSlot("");
		setScheduleError(null);
		setContact(createEmptyDraft().contact);
		setContactErrors({});
		setToast("Đã xoá bản nháp và bắt đầu lại.");
	};

	const goBack = () => {
		if (mainStep === 1) {
			if (subStep === "category") setSubStep("region");
			else if (subStep === "service") setSubStep("category");
			else if (subStep === "details") setSubStep("service");
		} else if (mainStep === 2) {
			setMainStep(1);
			setSubStep("details");
		} else if (mainStep === 3) {
			setMainStep(2);
		} else if (mainStep === 4) {
			setMainStep(3);
		}
	};

	const goNext = () => {
		if (mainStep === 1) {
			if (subStep === "region") setSubStep("category");
			else if (subStep === "category") {
				if (!categorySlug) return;
				setSubStep("service");
			} else if (subStep === "service") {
				if (!serviceId) return;
				setSubStep("details");
			} else if (subStep === "details") {
				if (!service) return;
				const errs = validateDetailFields(service.fields, formValues, filesByField);
				setDetailErrors(errs);
				if (hasDetailErrors(errs)) return;
				setMainStep(2);
				setScheduleError(null);
			}
		} else if (mainStep === 2) {
			const r = scheduleSchema.safeParse({ scheduleDate, scheduleSlot });
			if (!r.success) {
				setScheduleError(r.error.issues[0]?.message ?? "Lỗi");
				return;
			}
			setScheduleError(null);
			setMainStep(3);
		} else if (mainStep === 3) {
			setMainStep(4);
		}
	};

	const submitBooking = () => {
		const r = contactSchema.safeParse(contact);
		if (!r.success) {
			const e: Record<string, string> = {};
			for (const issue of r.error.issues) {
				const k = String(issue.path[0] ?? "");
				if (k) e[k] = issue.message;
			}
			setContactErrors(e);
			return;
		}
		setContactErrors({});
		try {
			localStorage.setItem(
				BOOKING_DRAFT_KEY,
				JSON.stringify({
					...createEmptyDraft(),
					mainStep: 4,
					subStep: "details",
					provinceId,
					districtId,
					categorySlug,
					serviceId,
					formValues,
					scheduleDate,
					scheduleSlot,
					contact,
					savedAt: new Date().toISOString(),
					submittedAt: new Date().toISOString(),
				}),
			);
		} catch {
			/* ignore */
		}
		setToast(
			"Đã lưu yêu cầu (bản demo). Đội ngũ HomeBase sẽ liên hệ theo số điện thoại bạn cung cấp.",
		);
	};

	const canContinue = (() => {
		if (mainStep === 1) {
			if (subStep === "region") return true;
			if (subStep === "category") return Boolean(categorySlug);
			if (subStep === "service") return Boolean(serviceId);
			return true;
		}
		if (mainStep === 2) return Boolean(scheduleDate);
		return true;
	})();

	const categoryLabel = categorySlug ? dichVuBySlug[categorySlug].h1 : "";
	const serviceLabel = service?.label ?? "";

	const breadcrumbSegments =
		mainStep === 1 && categorySlug
			? subStep === "service" || subStep === "details"
				? [categoryLabel]
				: []
			: mainStep > 1 && categorySlug
				? [categoryLabel, serviceLabel]
				: [];

	const breadcrumbTrail = (() => {
		if (mainStep !== 1) return "";
		if (subStep === "region") return "Vui lòng chọn khu vực";
		if (subStep === "category") return "Vui lòng chọn loại hình";
		if (subStep === "service") return "Vui lòng chọn dịch vụ";
		return "Thông số & chi tiết";
	})();

	const scheduleDisplay = formatScheduleDisplay(scheduleDate, scheduleSlot);

	if (!hydrated) {
		return (
			<div className="mx-auto max-w-[50.4rem] px-4 py-10 text-center text-sm text-muted-foreground">
				Đang tải…
			</div>
		);
	}

	return (
		<div className="border-b border-primary/10 bg-linear-to-b from-primary/[0.07] via-background to-background pb-16 pt-8 sm:pt-10">
			<div className="mx-auto w-full max-w-[50.4rem] px-4">
				<div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
					<div>
						<h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
							Đặt dịch vụ
						</h1>
						<p className="mt-1 text-sm text-muted-foreground">
							Chọn loại hình, mô tả nhu cầu và gửi yêu cầu — chúng tôi lưu bản nháp trên trình duyệt
							của bạn.
						</p>
					</div>
					<div className="flex flex-wrap gap-2">
						<Button type="button" variant="outline" size="sm" onClick={resetAll}>
							<Trash2 className="size-4" aria-hidden />
							Xoá bản nháp
						</Button>
						<Link href="/" className={buttonVariants({ variant: "ghost", size: "sm" })}>
							Về trang chủ
						</Link>
					</div>
				</div>

				<BookingStepper current={mainStep} className="mb-8" />

				<Card className="shadow-md ring-primary/5">
					<CardHeader className="border-b border-border/60">
						<CardTitle className="text-lg sm:text-xl">
							{mainStep === 1 && subStep === "region"
								? "Địa chỉ khu vực"
								: mainStep === 1 && subStep === "category"
									? "Bạn đang cần giúp đỡ trong việc?"
									: mainStep === 1 && subStep === "service"
										? "Chọn loại dịch vụ"
										: mainStep === 1 && subStep === "details"
											? "Bạn đang cần giúp đỡ trong việc?"
											: mainStep === 2
												? "Đặt lịch"
												: mainStep === 3
													? "Xác nhận thông tin"
													: "Hoàn tất đặt dịch vụ"}
						</CardTitle>
						<CardDescription>
							{mainStep === 1 && subStep === "region"
								? "Chọn tỉnh/thành và quận/huyện. Phường/xã sẽ chọn ở bước thông tin liên hệ."
								: null}
						</CardDescription>
						{mainStep === 1 &&
						(subStep === "category" || subStep === "service" || subStep === "details") ? (
							<BookingBreadcrumb
								className="mt-2"
								segments={breadcrumbSegments}
								trail={breadcrumbTrail}
							/>
						) : null}
					</CardHeader>

					<CardContent className="pt-6">
						{mainStep === 1 && subStep === "region" ? (
							<div className="grid gap-4 sm:grid-cols-2">
								<div className="space-y-2">
									<label className="text-sm font-medium">Tỉnh / Thành phố</label>
									<select
										className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
										value={provinceId}
										onChange={(e) => {
											const p = e.target.value;
											setProvinceId(p);
											const d = VIETNAM_LOCATIONS.districtsByProvince[p]?.[0]?.id ?? "";
											setDistrictId(d);
										}}
									>
										{VIETNAM_LOCATIONS.provinces.map((p) => (
											<option key={p.id} value={p.id}>
												{p.name}
											</option>
										))}
									</select>
								</div>
								<div className="space-y-2">
									<label className="text-sm font-medium">Quận / Huyện</label>
									<select
										className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
										value={districtId}
										onChange={(e) => setDistrictId(e.target.value)}
									>
										{(VIETNAM_LOCATIONS.districtsByProvince[provinceId] ?? []).map((d) => (
											<option key={d.id} value={d.id}>
												{d.name}
											</option>
										))}
									</select>
								</div>
							</div>
						) : null}

						{mainStep === 1 && subStep === "category" ? (
							<BookingServiceGrid
								mode="category"
								items={categoryItems}
								selectedId={categorySlug}
								onSelect={onSelectCategory}
							/>
						) : null}

						{mainStep === 1 && subStep === "service" && categorySlug ? (
							<BookingServiceGrid
								mode="service"
								items={serviceItems}
								selectedId={serviceId}
								onSelect={onSelectService}
							/>
						) : null}

						{mainStep === 1 && subStep === "details" && service ? (
							<div className="space-y-4">
								<BookingDynamicForm
									fields={service.fields}
									values={formValues}
									errors={detailErrors}
									files={filesByField}
									onChange={onFormChange}
									onFilesChange={onFilesChange}
								/>
								<div className="flex flex-col items-end gap-0.5 border-t border-border/60 pt-3">
									<p className="text-xs text-muted-foreground">Tổng tiền</p>
									<p className="text-lg font-bold text-foreground sm:text-xl">Liên hệ báo giá</p>
								</div>
							</div>
						) : null}

						{mainStep === 2 ? (
							<div className="space-y-4">
								<p className="text-sm text-muted-foreground">
									{categorySlug === "hop-dong-dich-vu"
										? "Thời gian mong muốn được gọi lại / khảo sát."
										: "Chọn ngày và khung giờ thuận tiện để đội ngũ sắp xếp."}
								</p>
								<div className="space-y-2">
									<label className="text-sm font-medium">Ngày</label>
									<input
										type="date"
										className="w-full max-w-xs rounded-lg border border-input bg-background px-3 py-2 text-sm"
										value={scheduleDate}
										onChange={(e) => setScheduleDate(e.target.value)}
									/>
								</div>
								<div className="space-y-2">
									<label className="text-sm font-medium">Khung giờ</label>
									<select
										className="w-full max-w-xs rounded-lg border border-input bg-background px-3 py-2 text-sm"
										value={scheduleSlot}
										onChange={(e) => setScheduleSlot(e.target.value)}
									>
										{SLOT_OPTIONS.map((o) => (
											<option key={o.value || "any"} value={o.value}>
												{o.label}
											</option>
										))}
									</select>
								</div>
								{scheduleError ? <p className="text-sm text-destructive">{scheduleError}</p> : null}
							</div>
						) : null}

						{mainStep === 3 && service && categorySlug ? (
							<BookingSummary
								title="Xác nhận thông tin"
								categoryLabel={categoryLabel}
								serviceLabel={serviceLabel}
								fields={service.fields}
								values={formValues}
								files={filesByField}
								scheduleDate={scheduleDisplay}
								scheduleSlot=""
							/>
						) : null}

						{mainStep === 4 ? (
							<BookingContactForm
								provinceId={provinceId}
								districtId={districtId}
								contact={contact}
								onProvinceChange={(id) => {
									setProvinceId(id);
									const d = VIETNAM_LOCATIONS.districtsByProvince[id]?.[0]?.id ?? "";
									setDistrictId(d);
									setContact((c) => ({ ...c, wardId: "" }));
								}}
								onDistrictChange={(id) => {
									setDistrictId(id);
									setContact((c) => ({ ...c, wardId: "" }));
								}}
								onContactChange={(patch) => setContact((c) => ({ ...c, ...patch }))}
								errors={contactErrors}
							/>
						) : null}
					</CardContent>

					<CardFooter className="flex flex-col gap-3 border-t sm:flex-row sm:justify-between">
						<Button
							type="button"
							variant="outline"
							size="md"
							className="w-full gap-2 sm:w-auto"
							onClick={goBack}
							disabled={mainStep === 1 && subStep === "region"}
						>
							<ArrowLeft className="size-4" aria-hidden />
							Trở lại
						</Button>
						{mainStep < 4 ? (
							<Button
								type="button"
								size="lg"
								className="w-full gap-2 sm:w-auto"
								disabled={!canContinue}
								onClick={goNext}
							>
								{mainStep === 3 ? "Xác nhận" : "Tiếp tục"}
								<ArrowRight className="size-4" aria-hidden />
							</Button>
						) : (
							<Button
								type="button"
								size="lg"
								className="w-full gap-2 sm:w-auto"
								onClick={submitBooking}
							>
								Đặt dịch vụ
								<ArrowRight className="size-4" aria-hidden />
							</Button>
						)}
					</CardFooter>
				</Card>
			</div>

			{toast ? (
				<div
					className="fixed bottom-6 left-1/2 z-100 w-[min(calc(100%-2rem),24rem)] -translate-x-1/2 rounded-xl border border-primary/20 bg-popover px-4 py-3 text-sm text-popover-foreground shadow-lg"
					role="status"
				>
					{toast}
				</div>
			) : null}
		</div>
	);
}
