import type { DichVuSlug } from "@/content/dich-vu";
import { unsplashPhoto } from "@/lib/unsplash";

import type { BookingField, BookingServiceDefinition } from "./types";

const ph = (id: string, w = 480) => unsplashPhoto(id, w);

const tailBudgetAndFiles = (): BookingField[] => [
	{
		type: "section",
		id: "sec-budget",
		title: "Ngân sách dự kiến",
		description: "Có thể bỏ trống — chúng tôi sẽ tư vấn sau khi tiếp nhận.",
	},
	{
		type: "budgetRange",
		id: "budget_range",
		label: "Khoảng ngân sách (VNĐ)",
		idFrom: "budget_from",
		idTo: "budget_to",
		placeholderFrom: "Nhập số tiền",
		placeholderTo: "Nhập số tiền",
	},
	{
		type: "section",
		id: "sec-files",
		title: "Hình ảnh & file đính kèm",
	},
	{
		type: "file",
		id: "images",
		label: "Hình ảnh",
		kind: "image",
		accept: "image/png,image/jpeg,image/webp",
		maxFiles: 5,
		maxBytesPerFile: 5 * 1024 * 1024,
	},
	{
		type: "file",
		id: "attachments",
		label: "File đính kèm (PDF/DOC)",
		kind: "document",
		accept: ".pdf,.doc,.docx,application/pdf",
		maxFiles: 1,
		maxBytesPerFile: 5 * 1024 * 1024,
	},
];

const dienLanh: BookingServiceDefinition[] = [
	{
		id: "ac-clean",
		label: "Điều hòa — Vệ sinh",
		description: "Vệ sinh máy lạnh treo tường, âm trần, tủ đứng",
		icon: "Wind",
		fields: [
			{
				type: "gridImage",
				id: "ac_type",
				label: "Loại điều hòa",
				required: true,
				columns: 3,
				items: [
					{
						value: "wall",
						label: "Treo tường",
						imageSrc: ph("photo-1626806787461-102c1bfaaea1"),
					},
					{
						value: "ceiling",
						label: "Âm trần",
						imageSrc: ph("photo-1631545806609-7d1c0c0b5b8a"),
					},
					{
						value: "floor",
						label: "Tủ đứng",
						imageSrc: ph("photo-1504384308090-c54be3852f69"),
					},
				],
			},
			{
				type: "radio",
				id: "ac_power",
				label: "Công suất",
				required: true,
				options: [
					{ value: "under2", label: "Dưới 2HP", hint: "Dưới ~18.000 BTU" },
					{ value: "over2", label: "Từ 2HP trở lên", hint: "Từ ~18.000 BTU" },
				],
			},
			{
				type: "number",
				id: "ac_count",
				label: "Số lượng máy",
				required: true,
				min: 1,
				max: 50,
				placeholder: "1",
			},
			{
				type: "infoCallout",
				id: "ac-process",
				variant: "info",
				title: "Quy trình vệ sinh máy lạnh",
				body: "Tháo lưới, vệ sinh dàn lạnh/nóng, kiểm tra thoát nước và gas sơ bộ.",
				href: "/cam-nang#ve-sinh-may-lanh-dinh-ky",
				hrefLabel: "Xem cẩm nang",
			},
			{
				type: "infoCallout",
				id: "ac-warranty",
				variant: "success",
				title: "Bảo hành dịch vụ",
				body: "Dịch vụ được bảo hành theo thỏa thuận tại chỗ (thường 7–30 ngày tùy hạng mục).",
			},
			{
				type: "textarea",
				id: "ac_note",
				label: "Ghi chú thêm",
				placeholder: "Vị trí lắp đặt, tầng cao, khung giờ thuận tiện…",
				rows: 3,
			},
			...tailBudgetAndFiles(),
		],
	},
	{
		id: "ac-repair",
		label: "Điều hòa — Sửa chữa",
		description: "Không lạnh, chảy nước, kêu lạ…",
		icon: "Wrench",
		fields: [
			{
				type: "select",
				id: "ac_issue",
				label: "Triệu chứng chính",
				required: true,
				options: [
					{ value: "no_cool", label: "Không lạnh / yếu lạnh" },
					{ value: "leak", label: "Chảy nước dàn lạnh" },
					{ value: "noise", label: "Kêu lạ / rung" },
					{ value: "smell", label: "Mùi hôi" },
					{ value: "other", label: "Khác" },
				],
			},
			{
				type: "textarea",
				id: "ac_symptoms",
				label: "Mô tả chi tiết",
				required: true,
				placeholder: "Thời gian xuất hiện, đã thử gì…",
				rows: 4,
			},
			{
				type: "file",
				id: "ac_photos",
				label: "Ảnh hiện trạng",
				kind: "image",
				accept: "image/png,image/jpeg,image/webp",
				maxFiles: 4,
				maxBytesPerFile: 5 * 1024 * 1024,
			},
			...tailBudgetAndFiles(),
		],
	},
	{
		id: "ac-install",
		label: "Điều hòa — Lắp đặt mới",
		description: "Lắp block mới theo hiện trường",
		icon: "PlusCircle",
		fields: [
			{
				type: "radio",
				id: "install_type",
				label: "Loại máy",
				required: true,
				options: [
					{ value: "wall", label: "Treo tường" },
					{ value: "ceiling", label: "Âm trần" },
					{ value: "floor", label: "Tủ đứng" },
				],
			},
			{
				type: "text",
				id: "install_place",
				label: "Vị trí lắp dự kiến",
				placeholder: "VD: Phòng khách tầng 2",
			},
			{
				type: "number",
				id: "install_qty",
				label: "Số lượng",
				required: true,
				min: 1,
				max: 20,
			},
			...tailBudgetAndFiles(),
		],
	},
	{
		id: "washer",
		label: "Máy giặt — Sửa / bảo dưỡng",
		description: "Cửa trên, cửa ngang",
		icon: "Shirt",
		fields: [
			{
				type: "radio",
				id: "washer_type",
				label: "Loại máy",
				required: true,
				options: [
					{ value: "top", label: "Cửa trên" },
					{ value: "front", label: "Cửa ngang" },
				],
			},
			{
				type: "textarea",
				id: "washer_issue",
				label: "Triệu chứng",
				required: true,
				rows: 3,
			},
			{
				type: "file",
				id: "washer_img",
				label: "Ảnh máy / lỗi",
				kind: "image",
				accept: "image/png,image/jpeg,image/webp",
				maxFiles: 3,
				maxBytesPerFile: 5 * 1024 * 1024,
			},
			...tailBudgetAndFiles(),
		],
	},
	{
		id: "fridge",
		label: "Tủ lạnh — Sửa chữa",
		description: "Không lạnh, kêu, xả tuyết…",
		icon: "Refrigerator",
		fields: [
			{
				type: "textarea",
				id: "fridge_issue",
				label: "Triệu chứng",
				required: true,
				rows: 4,
			},
			{
				type: "file",
				id: "fridge_img",
				label: "Ảnh hiện trạng",
				kind: "image",
				accept: "image/png,image/jpeg,image/webp",
				maxFiles: 3,
				maxBytesPerFile: 5 * 1024 * 1024,
			},
			...tailBudgetAndFiles(),
		],
	},
];

const veSinh: BookingServiceDefinition[] = [
	{
		id: "deep-clean",
		label: "Tổng vệ sinh",
		description: "Trước vào ở, sau cải tạo, dọn trọn gói",
		icon: "Sparkles",
		fields: [
			{
				type: "number",
				id: "area_m2",
				label: "Diện tích ước tính (m²)",
				required: true,
				min: 10,
				max: 2000,
				unit: "m²",
			},
			{
				type: "stepperInt",
				id: "rooms",
				label: "Số phòng cần ưu tiên",
				required: true,
				min: 1,
				max: 20,
			},
			{
				type: "checkboxGroup",
				id: "focus",
				label: "Ưu tiên khu vực",
				options: [
					{ value: "kitchen", label: "Nhà bếp" },
					{ value: "bath", label: "Nhà vệ sinh" },
					{ value: "glass", label: "Kính mặt tiền / ban công" },
					{ value: "floor", label: "Sàn toàn nhà" },
				],
			},
			{
				type: "radio",
				id: "pets",
				label: "Có thú cưng trong nhà?",
				options: [
					{ value: "no", label: "Không" },
					{ value: "yes", label: "Có" },
				],
			},
			...tailBudgetAndFiles(),
		],
	},
	{
		id: "hourly",
		label: "Dọn theo giờ",
		description: "Linh hoạt thời gian",
		icon: "Clock",
		fields: [
			{
				type: "number",
				id: "hours",
				label: "Số giờ dự kiến",
				required: true,
				min: 2,
				max: 12,
				unit: "giờ",
			},
			{
				type: "textarea",
				id: "hourly_focus",
				label: "Ưu tiên công việc",
				placeholder: "VD: lau bụi, hút bụi, bếp…",
				rows: 3,
			},
			...tailBudgetAndFiles(),
		],
	},
	{
		id: "fabric",
		label: "Giặt sofa / nệm / thảm",
		description: "Làm sạch tại nhà",
		icon: "Sofa",
		fields: [
			{
				type: "checkboxGroup",
				id: "fabric_items",
				label: "Hạng mục",
				required: true,
				options: [
					{ value: "sofa", label: "Sofa" },
					{ value: "mattress", label: "Nệm" },
					{ value: "rug", label: "Thảm" },
				],
			},
			{
				type: "number",
				id: "fabric_qty",
				label: "Số món / bộ",
				required: true,
				min: 1,
				max: 30,
			},
			{
				type: "file",
				id: "fabric_stains",
				label: "Ảnh vết bẩn (nếu có)",
				kind: "image",
				accept: "image/png,image/jpeg,image/webp",
				maxFiles: 4,
				maxBytesPerFile: 5 * 1024 * 1024,
			},
			...tailBudgetAndFiles(),
		],
	},
	{
		id: "zone-deep",
		label: "Làm sâu theo khu vực",
		description: "Bếp, WC, kính…",
		icon: "Focus",
		fields: [
			{
				type: "select",
				id: "zone",
				label: "Khu vực",
				required: true,
				options: [
					{ value: "kitchen", label: "Nhà bếp" },
					{ value: "wc", label: "Nhà vệ sinh" },
					{ value: "glass", label: "Kính" },
				],
			},
			{
				type: "number",
				id: "zone_area",
				label: "Diện tích ước tính (m²)",
				min: 1,
				max: 500,
				unit: "m²",
			},
			...tailBudgetAndFiles(),
		],
	},
];

const dienNuoc: BookingServiceDefinition[] = [
	{
		id: "electric",
		label: "Sửa điện",
		description: "Aptomat, ổ cắm, đèn…",
		icon: "Zap",
		fields: [
			{
				type: "select",
				id: "elec_issue",
				label: "Loại sự cố",
				required: true,
				options: [
					{ value: "breaker", label: "Aptomat nhảy liên tục" },
					{ value: "outlet", label: "Ổ cắm lỏng / cháy" },
					{ value: "light", label: "Đèn / công tắc" },
					{ value: "smell", label: "Mùi khét / cháy nhẹ" },
					{ value: "other", label: "Khác" },
				],
			},
			{
				type: "radio",
				id: "urgent",
				label: "Mức khẩn cấp",
				required: true,
				options: [
					{ value: "high", label: "Cần trong 24h" },
					{ value: "normal", label: "Trong vài ngày" },
				],
			},
			{
				type: "textarea",
				id: "elec_desc",
				label: "Mô tả",
				required: true,
				rows: 3,
			},
			{
				type: "file",
				id: "elec_img",
				label: "Ảnh hiện trường",
				kind: "image",
				accept: "image/png,image/jpeg,image/webp",
				maxFiles: 4,
				maxBytesPerFile: 5 * 1024 * 1024,
			},
			...tailBudgetAndFiles(),
		],
	},
	{
		id: "plumbing",
		label: "Sửa nước / thoát",
		description: "Rò rỉ, tắc nhẹ, van vòi",
		icon: "Droplets",
		fields: [
			{
				type: "select",
				id: "plumb_issue",
				label: "Loại sự cố",
				required: true,
				options: [
					{ value: "leak", label: "Rò rỉ đường ống / van" },
					{ value: "clog", label: "Tắc thoát (lavabo/sàn)" },
					{ value: "replace", label: "Thay vòi, dây cấp" },
					{ value: "other", label: "Khác" },
				],
			},
			{
				type: "textarea",
				id: "plumb_desc",
				label: "Mô tả",
				required: true,
				rows: 4,
			},
			{
				type: "file",
				id: "plumb_img",
				label: "Ảnh",
				kind: "image",
				accept: "image/png,image/jpeg,image/webp",
				maxFiles: 4,
				maxBytesPerFile: 5 * 1024 * 1024,
			},
			...tailBudgetAndFiles(),
		],
	},
	{
		id: "combo",
		label: "Kết hợp điện + nước",
		description: "Nhiều sự cố cùng lúc",
		icon: "Combine",
		fields: [
			{
				type: "textarea",
				id: "combo_elec",
				label: "Phần điện",
				required: true,
				placeholder: "Mô tả sự cố điện",
				rows: 3,
			},
			{
				type: "textarea",
				id: "combo_water",
				label: "Phần nước",
				required: true,
				placeholder: "Mô tả sự cố nước",
				rows: 3,
			},
			{
				type: "file",
				id: "combo_img",
				label: "Ảnh hiện trường",
				kind: "image",
				accept: "image/png,image/jpeg,image/webp",
				maxFiles: 5,
				maxBytesPerFile: 5 * 1024 * 1024,
			},
			...tailBudgetAndFiles(),
		],
	},
];

const hopDong: BookingServiceDefinition[] = [
	{
		id: "b2b-building",
		label: "Bảo trì chung cư / tòa nhà",
		description: "Lịch định kỳ, báo cáo",
		icon: "Building2",
		fields: [
			{
				type: "text",
				id: "org_name",
				label: "Tên ban quản trị / chủ đầu tư",
				required: true,
			},
			{
				type: "number",
				id: "b2b_area",
				label: "Quy mô tòa nhà (m² sàn)",
				min: 100,
				max: 500000,
			},
			{
				type: "stepperInt",
				id: "b2b_floors",
				label: "Số tầng",
				min: 1,
				max: 120,
			},
			{
				type: "checkboxGroup",
				id: "b2b_scope",
				label: "Hạng mục quan tâm",
				options: [
					{ value: "elec", label: "Điện hệ thống chung" },
					{ value: "pump", label: "Máy bơm / bể ngầm" },
					{ value: "fire", label: "PCCC cơ bản (theo phạm vi)" },
					{ value: "clean", label: "Vệ sinh khu vực công cộng" },
				],
			},
			{
				type: "select",
				id: "b2b_freq",
				label: "Tần suất mong muốn",
				options: [
					{ value: "monthly", label: "Hàng tháng" },
					{ value: "quarter", label: "Hàng quý" },
					{ value: "custom", label: "Tùy chỉnh" },
				],
			},
			{
				type: "textarea",
				id: "b2b_sla",
				label: "Yêu cầu SLA / giờ phản hồi",
				rows: 3,
			},
			...tailBudgetAndFiles(),
		],
	},
	{
		id: "b2b-retail",
		label: "Văn phòng / chuỗi cửa hàng",
		description: "Nhiều điểm kinh doanh",
		icon: "Store",
		fields: [
			{
				type: "text",
				id: "retail_brand",
				label: "Tên công ty / thương hiệu",
				required: true,
			},
			{
				type: "number",
				id: "retail_branches",
				label: "Số chi nhánh / mặt bằng",
				min: 1,
				max: 500,
			},
			{
				type: "textarea",
				id: "retail_need",
				label: "Nhu cầu vận hành",
				required: true,
				rows: 4,
			},
			...tailBudgetAndFiles(),
		],
	},
	{
		id: "b2b-custom",
		label: "Gói tùy chỉnh",
		description: "Mô tả phạm vi riêng",
		icon: "FileSpreadsheet",
		fields: [
			{
				type: "textarea",
				id: "custom_scope",
				label: "Phạm vi & KPI mong muốn",
				required: true,
				rows: 6,
			},
			{
				type: "file",
				id: "tender",
				label: "Tài liệu mời thầu / RFQ (nếu có)",
				kind: "document",
				accept: ".pdf,.doc,.docx,application/pdf",
				maxFiles: 1,
				maxBytesPerFile: 5 * 1024 * 1024,
			},
			...tailBudgetAndFiles(),
		],
	},
];

const xayDungFieldsDesign = (): BookingField[] => [
	{
		type: "gridImage",
		id: "project_type",
		label: "Loại hình công trình",
		required: true,
		columns: 3,
		items: [
			{ value: "townhouse", label: "Nhà phố", imageSrc: ph("photo-1512917774080-9991f1c4c750") },
			{ value: "villa", label: "Biệt thự", imageSrc: ph("photo-1600596542815-ffad4c1539a9") },
			{ value: "garden", label: "Nhà vườn", imageSrc: ph("photo-1416879595882-3373a0480b5b") },
			{ value: "apartment", label: "Căn hộ", imageSrc: ph("photo-1502672260266-1c1ef2d93688") },
			{ value: "warehouse", label: "Kho xưởng", imageSrc: ph("photo-1581092160562-40aa08f78860") },
			{ value: "other", label: "Khác", imageSrc: ph("photo-1486406146926-c627a92ad1ab") },
		],
	},
	{
		type: "gridImage",
		id: "style",
		label: "Phong cách thiết kế",
		required: true,
		columns: 2,
		items: [
			{ value: "modern", label: "Hiện đại", imageSrc: ph("photo-1618221195710-dd6b41faaea6") },
			{ value: "classic", label: "Cổ điển", imageSrc: ph("photo-1616486338812-3dadae4b4ace") },
			{
				value: "neoclassic",
				label: "Tân cổ điển",
				imageSrc: ph("photo-1615529182904-14819c35db37"),
			},
			{ value: "other_style", label: "Khác", imageSrc: ph("photo-1600210492486-724fe5c67fb0") },
		],
	},
	{
		type: "section",
		id: "sec-tech",
		title: "Thông số kỹ thuật",
		description: "Các thông tin quan trọng để báo giá sơ bộ",
		accent: true,
	},
	{
		type: "number",
		id: "build_area",
		label: "Diện tích xây dựng (m²)",
		required: true,
		min: 1,
		max: 10000,
		unit: "m²",
	},
	{
		type: "number",
		id: "build_width",
		label: "Chiều rộng (m)",
		min: 0,
		max: 500,
		unit: "m",
	},
	{
		type: "number",
		id: "build_length",
		label: "Chiều dài (m)",
		min: 0,
		max: 500,
		unit: "m",
	},
	{
		type: "stepperInt",
		id: "floors",
		label: "Số tầng",
		required: true,
		min: 0,
		max: 20,
	},
	{
		type: "select",
		id: "foundation",
		label: "Loại móng",
		options: [
			{ value: "single", label: "Đơn" },
			{ value: "strip", label: "Băng" },
			{ value: "raft", label: "Bè" },
			{ value: "unknown", label: "Chưa rõ — cần khảo sát" },
		],
	},
];

const xayDungFieldsConstruction = (withStyle: boolean): BookingField[] => {
	const base: BookingField[] = [
		{
			type: "gridImage",
			id: "project_type",
			label: "Loại hình công trình",
			required: true,
			columns: 3,
			items: [
				{ value: "townhouse", label: "Nhà phố", imageSrc: ph("photo-1512917774080-9991f1c4c750") },
				{ value: "villa", label: "Biệt thự", imageSrc: ph("photo-1600596542815-ffad4c1539a9") },
				{ value: "apartment", label: "Căn hộ", imageSrc: ph("photo-1502672260266-1c1ef2d93688") },
				{
					value: "warehouse",
					label: "Kho xưởng",
					imageSrc: ph("photo-1581092160562-40aa08f78860"),
				},
				{ value: "other", label: "Khác", imageSrc: ph("photo-1486406146926-c627a92ad1ab") },
			],
		},
	];
	if (withStyle) {
		base.push({
			type: "gridImage",
			id: "style",
			label: "Phong cách (nếu có thiết kế)",
			columns: 2,
			items: [
				{ value: "modern", label: "Hiện đại", imageSrc: ph("photo-1618221195710-dd6b41faaea6") },
				{ value: "classic", label: "Cổ điển", imageSrc: ph("photo-1616486338812-3dadae4b4ace") },
				{
					value: "neoclassic",
					label: "Tân cổ điển",
					imageSrc: ph("photo-1615529182904-14819c35db37"),
				},
				{ value: "na", label: "Chưa xác định", imageSrc: ph("photo-1600210492486-724fe5c67fb0") },
			],
		});
	}
	base.push(
		{
			type: "section",
			id: "sec-tech",
			title: "Thông số & phạm vi",
			accent: true,
		},
		{
			type: "number",
			id: "build_area",
			label: "Diện tích (m²)",
			required: true,
			min: 1,
			max: 10000,
		},
		{
			type: "stepperInt",
			id: "floors",
			label: "Số tầng",
			min: 0,
			max: 20,
		},
		{
			type: "checkboxGroup",
			id: "work_items",
			label: "Hạng mục dự kiến",
			options: [
				{ value: "demo", label: "Đập / tháo dỡ có kiểm soát" },
				{ value: "masonry", label: "Xây tô trát" },
				{ value: "waterproof", label: "Chống thấm" },
				{ value: "tile", label: "Lát nền / ốp tường" },
			],
		},
	);
	return base;
};

const xayDung: BookingServiceDefinition[] = [
	{
		id: "design-package",
		label: "Thiết kế — Trọn gói",
		description: "Kiến trúc, kết cấu, MEP, nội thất",
		icon: "PenTool",
		fields: [...xayDungFieldsDesign(), ...tailBudgetAndFiles()],
	},
	{
		id: "design-arch",
		label: "Thiết kế — Kiến trúc",
		description: "Phối cảnh, công năng",
		icon: "Landmark",
		fields: [...xayDungFieldsDesign(), ...tailBudgetAndFiles()],
	},
	{
		id: "design-struct",
		label: "Thiết kế — Kết cấu",
		description: "Móng, dầm, cột",
		icon: "DraftingCompass",
		fields: [...xayDungFieldsDesign(), ...tailBudgetAndFiles()],
	},
	{
		id: "design-mep",
		label: "Thiết kế — Điện nước (MEP)",
		description: "Điện, cấp thoát",
		icon: "Cable",
		fields: [...xayDungFieldsDesign(), ...tailBudgetAndFiles()],
	},
	{
		id: "design-interior",
		label: "Thiết kế — Nội thất",
		description: "Không gian sống",
		icon: "Armchair",
		fields: [...xayDungFieldsDesign(), ...tailBudgetAndFiles()],
	},
	{
		id: "design-landscape",
		label: "Thiết kế — Cảnh quan",
		description: "Sân vườn, tiểu cảnh",
		icon: "Trees",
		fields: [...xayDungFieldsDesign(), ...tailBudgetAndFiles()],
	},
	{
		id: "build-rough",
		label: "Thi công phần thô",
		description: "Đập, xây, tô, chống thấm",
		icon: "HardHat",
		fields: [...xayDungFieldsConstruction(false), ...tailBudgetAndFiles()],
	},
	{
		id: "build-reno",
		label: "Cải tạo có kiểm soát",
		description: "Phòng chức năng, WC, bếp",
		icon: "Hammer",
		fields: [...xayDungFieldsConstruction(true), ...tailBudgetAndFiles()],
	},
	{
		id: "build-turnkey",
		label: "Thi công trọn gói",
		description: "Từ phần thô đến bàn giao",
		icon: "Home",
		fields: [...xayDungFieldsConstruction(true), ...tailBudgetAndFiles()],
	},
];

const noiThat: BookingServiceDefinition[] = [
	{
		id: "paint",
		label: "Sơn nước",
		description: "Lót, hoàn thiện trong nhà",
		icon: "Paintbrush",
		fields: [
			{
				type: "select",
				id: "paint_space",
				label: "Loại không gian",
				required: true,
				options: [
					{ value: "whole", label: "Toàn bộ nhà" },
					{ value: "living", label: "Phòng khách" },
					{ value: "bed", label: "Phòng ngủ" },
					{ value: "other", label: "Khác" },
				],
			},
			{
				type: "number",
				id: "paint_area",
				label: "Diện tích sơn (m²)",
				min: 1,
				max: 5000,
			},
			{
				type: "radio",
				id: "paint_plan",
				label: "Đã có bản phối màu / thiết kế?",
				options: [
					{ value: "yes", label: "Có" },
					{ value: "no", label: "Cần tư vấn" },
				],
			},
			{
				type: "file",
				id: "paint_wall",
				label: "Ảnh tường hiện trạng",
				kind: "image",
				accept: "image/png,image/jpeg,image/webp",
				maxFiles: 5,
				maxBytesPerFile: 5 * 1024 * 1024,
			},
			...tailBudgetAndFiles(),
		],
	},
	{
		id: "ceiling",
		label: "Trần thạch cao / vách ngăn",
		icon: "LayoutPanelTop",
		fields: [
			{
				type: "number",
				id: "ceiling_area",
				label: "Diện tích ước tính (m²)",
				required: true,
				min: 1,
				max: 2000,
			},
			{
				type: "radio",
				id: "ceiling_type",
				label: "Loại trần",
				options: [
					{ value: "drop", label: "Trần chìm / thả" },
					{ value: "flat", label: "Trần phẳng trang trí" },
				],
			},
			...tailBudgetAndFiles(),
		],
	},
	{
		id: "cabinet",
		label: "Đóng tủ (bếp / quần áo)",
		icon: "Cabinet",
		fields: [
			{
				type: "checkboxGroup",
				id: "cab_type",
				label: "Loại tủ",
				required: true,
				options: [
					{ value: "kitchen", label: "Tủ bếp" },
					{ value: "wardrobe", label: "Tủ quần áo" },
				],
			},
			{
				type: "number",
				id: "cab_m",
				label: "Ước tính mét dài (m)",
				min: 1,
				max: 100,
				unit: "m",
			},
			{
				type: "file",
				id: "cab_ref",
				label: "Ảnh mẫu / hiện trạng",
				kind: "image",
				accept: "image/png,image/jpeg,image/webp",
				maxFiles: 5,
				maxBytesPerFile: 5 * 1024 * 1024,
			},
			...tailBudgetAndFiles(),
		],
	},
	{
		id: "aluminum",
		label: "Cửa nhôm kính",
		icon: "Grid2x2",
		fields: [
			{
				type: "number",
				id: "al_slots",
				label: "Số vị trí cửa",
				required: true,
				min: 1,
				max: 50,
			},
			{
				type: "select",
				id: "al_glass",
				label: "Loại kính mong muốn",
				options: [
					{ value: "clear", label: "Trong suốt" },
					{ value: "frost", label: "Mờ / cường lực" },
					{ value: "mixed", label: "Hỗn hợp / cần tư vấn" },
				],
			},
			...tailBudgetAndFiles(),
		],
	},
	{
		id: "package-finish",
		label: "Gói hoàn thiện",
		description: "Nhiều hạng mục kết hợp",
		icon: "Layers",
		fields: [
			{
				type: "checkboxGroup",
				id: "pkg_items",
				label: "Hạng mục",
				required: true,
				options: [
					{ value: "paint", label: "Sơn" },
					{ value: "ceiling", label: "Trần vách" },
					{ value: "cab", label: "Tủ" },
					{ value: "al", label: "Nhôm kính" },
				],
			},
			{
				type: "textarea",
				id: "pkg_note",
				label: "Mô tả nhanh",
				rows: 4,
			},
			...tailBudgetAndFiles(),
		],
	},
];

const coDien: BookingServiceDefinition[] = [
	{
		id: "mep-extend",
		label: "Cơ điện công trình",
		description: "Mở rộng mạch, ống luồn dây",
		icon: "Cpu",
		fields: [
			{
				type: "checkboxGroup",
				id: "mep_work",
				label: "Hạng mục",
				required: true,
				options: [
					{ value: "circuit", label: "Mở rộng mạch điện" },
					{ value: "conduit", label: "Đi ống luồn dây" },
					{ value: "outdoor_light", label: "Chiếu sáng ngoài trời (IP)" },
				],
			},
			{
				type: "text",
				id: "mep_load",
				label: "Tải thiết bị dự kiến (VD: bếp từ 7kW)",
			},
			{
				type: "file",
				id: "mep_panel",
				label: "Ảnh tủ điện hiện trạng",
				kind: "image",
				accept: "image/png,image/jpeg,image/webp",
				maxFiles: 3,
				maxBytesPerFile: 5 * 1024 * 1024,
			},
			...tailBudgetAndFiles(),
		],
	},
	{
		id: "smart-home",
		label: "Smarthome",
		description: "Công tắc, khóa, camera",
		icon: "HouseWifi",
		fields: [
			{
				type: "checkboxGroup",
				id: "smart_dev",
				label: "Thiết bị quan tâm",
				options: [
					{ value: "switch", label: "Công tắc thông minh" },
					{ value: "lock", label: "Khóa điện tử" },
					{ value: "cam", label: "Camera an ninh" },
					{ value: "sensor", label: "Cảm biến cửa / chuyển động" },
				],
			},
			{
				type: "select",
				id: "smart_eco",
				label: "Hệ sinh thái ưu tiên",
				options: [
					{ value: "any", label: "Cần tư vấn" },
					{ value: "apple", label: "HomeKit" },
					{ value: "google", label: "Google Home" },
					{ value: "other", label: "Khác" },
				],
			},
			{
				type: "radio",
				id: "smart_wifi",
				label: "Wi-Fi tại nhà",
				options: [
					{ value: "good", label: "Ổn định nhiều phòng" },
					{ value: "weak", label: "Yếu / cần khảo sát" },
				],
			},
			...tailBudgetAndFiles(),
		],
	},
	{
		id: "smart-consult",
		label: "Tư vấn + triển khai",
		icon: "MessageSquareText",
		fields: [
			{
				type: "textarea",
				id: "consult_need",
				label: "Nhu cầu",
				required: true,
				rows: 5,
			},
			...tailBudgetAndFiles(),
		],
	},
];

const canhQuan: BookingServiceDefinition[] = [
	{
		id: "garden-hard",
		label: "Sân vườn / lát sân / hàng rào cây",
		icon: "Fence",
		fields: [
			{
				type: "number",
				id: "garden_area",
				label: "Diện tích (m²)",
				required: true,
				min: 1,
				max: 50000,
			},
			{
				type: "select",
				id: "garden_pave",
				label: "Loại lát / nền",
				options: [
					{ value: "stone", label: "Đá tự nhiên" },
					{ value: "tile", label: "Gạch sân" },
					{ value: "wood", label: "Gỗ / composite" },
					{ value: "unsure", label: "Cần tư vấn" },
				],
			},
			{
				type: "file",
				id: "garden_pic",
				label: "Ảnh hiện trạng",
				kind: "image",
				accept: "image/png,image/jpeg,image/webp",
				maxFiles: 5,
				maxBytesPerFile: 5 * 1024 * 1024,
			},
			...tailBudgetAndFiles(),
		],
	},
	{
		id: "irrigation",
		label: "Hệ thống tưới",
		icon: "Droplet",
		fields: [
			{
				type: "number",
				id: "irr_area",
				label: "Diện tích vườn (m²)",
				required: true,
				min: 1,
				max: 20000,
			},
			{
				type: "radio",
				id: "irr_type",
				label: "Loại tưới",
				required: true,
				options: [
					{ value: "drip", label: "Nhỏ giọt" },
					{ value: "spray", label: "Phun mưa" },
				],
			},
			...tailBudgetAndFiles(),
		],
	},
	{
		id: "pool",
		label: "Bể bơi — vệ sinh / xử lý nước",
		icon: "Waves",
		fields: [
			{
				type: "select",
				id: "pool_job",
				label: "Nhu cầu",
				required: true,
				options: [
					{ value: "clean", label: "Vệ sinh định kỳ" },
					{ value: "water", label: "Xử lý nước / hóa chất" },
					{ value: "both", label: "Cả hai" },
				],
			},
			{
				type: "number",
				id: "pool_vol",
				label: "Thể tích ước tính (m³)",
				min: 1,
				max: 5000,
			},
			...tailBudgetAndFiles(),
		],
	},
	{
		id: "tree-care",
		label: "Chăm sóc cây định kỳ",
		icon: "Leaf",
		fields: [
			{
				type: "select",
				id: "tree_cycle",
				label: "Chu kỳ",
				required: true,
				options: [
					{ value: "weekly", label: "Hàng tuần" },
					{ value: "monthly", label: "Hàng tháng" },
					{ value: "season", label: "Theo mùa" },
				],
			},
			{
				type: "textarea",
				id: "tree_type",
				label: "Loại cây / ghi chú",
				rows: 3,
			},
			...tailBudgetAndFiles(),
		],
	},
];

export const BOOKING_BY_SLUG: Record<DichVuSlug, BookingServiceDefinition[]> = {
	"dien-lanh": dienLanh,
	"ve-sinh-nha-cua": veSinh,
	"sua-chua-dien-nuoc": dienNuoc,
	"hop-dong-dich-vu": hopDong,
	"xay-dung-va-cai-tao": xayDung,
	"noi-that-va-trang-tri": noiThat,
	"co-dien-va-smart-home": coDien,
	"canh-quan-ngoai-that": canhQuan,
};

export function getBookingServices(slug: DichVuSlug): BookingServiceDefinition[] {
	return BOOKING_BY_SLUG[slug] ?? [];
}

export function getBookingService(
	slug: DichVuSlug,
	serviceId: string,
): BookingServiceDefinition | undefined {
	return getBookingServices(slug).find((s) => s.id === serviceId);
}
