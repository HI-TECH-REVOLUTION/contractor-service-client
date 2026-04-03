import type { DichVuSlug } from "@/content/dich-vu";

export type FieldOption = { value: string; label: string; hint?: string };

export type BookingFieldBase = {
	id: string;
	label: string;
	required?: boolean;
	/** Hiện field khi field khác có giá trị cụ thể */
	showWhen?: { fieldId: string; equals: string };
};

export type BookingFieldSelect = BookingFieldBase & {
	type: "select";
	options: FieldOption[];
	placeholder?: string;
};

export type BookingFieldRadio = BookingFieldBase & {
	type: "radio";
	options: FieldOption[];
};

export type BookingFieldGridImage = BookingFieldBase & {
	type: "gridImage";
	columns?: 2 | 3;
	items: { value: string; label: string; imageSrc: string }[];
};

export type BookingFieldNumber = BookingFieldBase & {
	type: "number";
	placeholder?: string;
	min?: number;
	max?: number;
	unit?: string;
};

export type BookingFieldText = BookingFieldBase & {
	type: "text";
	placeholder?: string;
};

export type BookingFieldTextarea = BookingFieldBase & {
	type: "textarea";
	placeholder?: string;
	rows?: number;
};

export type BookingFieldDate = BookingFieldBase & {
	type: "date";
};

export type BookingFieldBudgetRange = {
	type: "budgetRange";
	id: string;
	label: string;
	idFrom: string;
	idTo: string;
	required?: boolean;
	placeholderFrom?: string;
	placeholderTo?: string;
};

export type BookingFieldFile = BookingFieldBase & {
	type: "file";
	accept: string;
	maxFiles: number;
	maxBytesPerFile: number;
	kind: "image" | "document";
};

export type BookingFieldStepperInt = BookingFieldBase & {
	type: "stepperInt";
	min: number;
	max: number;
};

export type BookingFieldCheckboxGroup = BookingFieldBase & {
	type: "checkboxGroup";
	options: FieldOption[];
};

export type BookingFieldSection = {
	type: "section";
	id: string;
	title: string;
	description?: string;
	/** Viền nhấn (giống mockup thông số kỹ thuật) */
	accent?: boolean;
};

export type BookingFieldInfoCallout = {
	type: "infoCallout";
	id: string;
	variant?: "info" | "success";
	title: string;
	body: string;
	href?: string;
	hrefLabel?: string;
};

export type BookingField =
	| BookingFieldSelect
	| BookingFieldRadio
	| BookingFieldGridImage
	| BookingFieldNumber
	| BookingFieldText
	| BookingFieldTextarea
	| BookingFieldDate
	| BookingFieldBudgetRange
	| BookingFieldFile
	| BookingFieldStepperInt
	| BookingFieldCheckboxGroup
	| BookingFieldSection
	| BookingFieldInfoCallout;

export type BookingServiceDefinition = {
	id: string;
	label: string;
	description?: string;
	/** Tên icon lucide-react (PascalCase) */
	icon: string;
	fields: BookingField[];
};

export type BookingCategoryDefinition = {
	slug: DichVuSlug;
	services: BookingServiceDefinition[];
};

export type VietnamProvince = { id: string; name: string };
export type VietnamDistrict = { id: string; name: string };
export type VietnamWard = { id: string; name: string };

export type VietnamLocationsData = {
	provinces: VietnamProvince[];
	districtsByProvince: Record<string, VietnamDistrict[]>;
	wardsByDistrict: Record<string, VietnamWard[]>;
};

export type BookingFileEntry = {
	id: string;
	name: string;
	size: number;
	type: string;
	/** Data URL — chỉ lưu draft khi đủ nhỏ */
	dataUrl?: string;
};

export type BookingContactState = {
	fullName: string;
	phone: string;
	wardId: string;
	addressLine: string;
};

export type BookingDraftV1 = {
	version: 1;
	mainStep: 1 | 2 | 3 | 4;
	subStep: "region" | "category" | "service" | "details";
	provinceId: string;
	districtId: string;
	categorySlug: DichVuSlug | null;
	serviceId: string | null;
	formValues: Record<string, unknown>;
	scheduleDate: string;
	scheduleSlot: string;
	contact: BookingContactState;
	savedAt: string;
};
