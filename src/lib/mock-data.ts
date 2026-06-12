export type FurnitureCategory =
	| "living_room"
	| "bedroom"
	| "kitchen"
	| "bathroom"
	| "office"
	| "outdoor";

export interface FurnitureItem {
	id: string;
	name: string;
	nameEn: string;
	category: FurnitureCategory;
	subcategory: string;
	image: string;
	width: number;
	depth: number;
	height: number;
	color: string;
}

export const MOCK_FURNITURE: FurnitureItem[] = [
	{
		id: "f1",
		name: "Sofa 3 chỗ",
		nameEn: "3-Seat Sofa",
		category: "living_room",
		subcategory: "seating",
		image: "🛋️",
		width: 220,
		depth: 90,
		height: 85,
		color: "#6B7280",
	},
	{
		id: "f2",
		name: "Bàn trà",
		nameEn: "Coffee Table",
		category: "living_room",
		subcategory: "table",
		image: "☕",
		width: 120,
		depth: 60,
		height: 45,
		color: "#92400E",
	},
	{
		id: "f3",
		name: "Kệ TV",
		nameEn: "TV Stand",
		category: "living_room",
		subcategory: "storage",
		image: "📺",
		width: 180,
		depth: 45,
		height: 50,
		color: "#1F2937",
	},
	{
		id: "f4",
		name: "Ghế đơn",
		nameEn: "Armchair",
		category: "living_room",
		subcategory: "seating",
		image: "💺",
		width: 80,
		depth: 80,
		height: 90,
		color: "#047857",
	},
	{
		id: "f5",
		name: "Đèn sàn",
		nameEn: "Floor Lamp",
		category: "living_room",
		subcategory: "lighting",
		image: "🪔",
		width: 30,
		depth: 30,
		height: 160,
		color: "#F59E0B",
	},
	{
		id: "f6",
		name: "Thảm trải sàn",
		nameEn: "Area Rug",
		category: "living_room",
		subcategory: "decor",
		image: "🟫",
		width: 200,
		depth: 150,
		height: 2,
		color: "#DC2626",
	},
	{
		id: "f7",
		name: "Giường đôi",
		nameEn: "Double Bed",
		category: "bedroom",
		subcategory: "bed",
		image: "🛏️",
		width: 180,
		depth: 200,
		height: 50,
		color: "#E5E7EB",
	},
	{
		id: "f8",
		name: "Tủ quần áo",
		nameEn: "Wardrobe",
		category: "bedroom",
		subcategory: "storage",
		image: "🚪",
		width: 200,
		depth: 60,
		height: 220,
		color: "#78350F",
	},
	{
		id: "f9",
		name: "Bàn trang điểm",
		nameEn: "Vanity Desk",
		category: "bedroom",
		subcategory: "table",
		image: "💄",
		width: 100,
		depth: 45,
		height: 75,
		color: "#FDE68A",
	},
	{
		id: "f10",
		name: "Tủ đầu giường",
		nameEn: "Nightstand",
		category: "bedroom",
		subcategory: "storage",
		image: "🗄️",
		width: 50,
		depth: 40,
		height: 55,
		color: "#92400E",
	},
	{
		id: "f11",
		name: "Đèn ngủ",
		nameEn: "Bedside Lamp",
		category: "bedroom",
		subcategory: "lighting",
		image: "💡",
		width: 25,
		depth: 25,
		height: 45,
		color: "#FBBF24",
	},
	{
		id: "f12",
		name: "Tủ bếp dưới",
		nameEn: "Base Cabinet",
		category: "kitchen",
		subcategory: "cabinet",
		image: "🗄️",
		width: 80,
		depth: 60,
		height: 85,
		color: "#F3F4F6",
	},
	{
		id: "f13",
		name: "Tủ bếp trên",
		nameEn: "Wall Cabinet",
		category: "kitchen",
		subcategory: "cabinet",
		image: "📦",
		width: 80,
		depth: 35,
		height: 70,
		color: "#F3F4F6",
	},
	{
		id: "f14",
		name: "Bàn đảo bếp",
		nameEn: "Kitchen Island",
		category: "kitchen",
		subcategory: "table",
		image: "🏝️",
		width: 150,
		depth: 80,
		height: 90,
		color: "#D1D5DB",
	},
	{
		id: "f15",
		name: "Tủ lạnh",
		nameEn: "Refrigerator",
		category: "kitchen",
		subcategory: "appliance",
		image: "🧊",
		width: 70,
		depth: 70,
		height: 180,
		color: "#9CA3AF",
	},
	{
		id: "f16",
		name: "Bồn rửa",
		nameEn: "Sink",
		category: "kitchen",
		subcategory: "fixture",
		image: "🚰",
		width: 60,
		depth: 50,
		height: 85,
		color: "#E5E7EB",
	},
	{
		id: "f17",
		name: "Bồn tắm",
		nameEn: "Bathtub",
		category: "bathroom",
		subcategory: "fixture",
		image: "🛁",
		width: 170,
		depth: 75,
		height: 60,
		color: "#F9FAFB",
	},
	{
		id: "f18",
		name: "Bồn cầu",
		nameEn: "Toilet",
		category: "bathroom",
		subcategory: "fixture",
		image: "🚽",
		width: 40,
		depth: 65,
		height: 40,
		color: "#F9FAFB",
	},
	{
		id: "f19",
		name: "Tủ lavabo",
		nameEn: "Vanity Unit",
		category: "bathroom",
		subcategory: "storage",
		image: "🪞",
		width: 80,
		depth: 50,
		height: 85,
		color: "#D1D5DB",
	},
	{
		id: "f20",
		name: "Vòi sen đứng",
		nameEn: "Shower",
		category: "bathroom",
		subcategory: "fixture",
		image: "🚿",
		width: 90,
		depth: 90,
		height: 210,
		color: "#E5E7EB",
	},
	{
		id: "f21",
		name: "Bàn làm việc",
		nameEn: "Office Desk",
		category: "office",
		subcategory: "table",
		image: "🖥️",
		width: 140,
		depth: 70,
		height: 75,
		color: "#1F2937",
	},
	{
		id: "f22",
		name: "Ghế văn phòng",
		nameEn: "Office Chair",
		category: "office",
		subcategory: "seating",
		image: "🪑",
		width: 65,
		depth: 65,
		height: 120,
		color: "#111827",
	},
	{
		id: "f23",
		name: "Kệ sách",
		nameEn: "Bookshelf",
		category: "office",
		subcategory: "storage",
		image: "📚",
		width: 120,
		depth: 35,
		height: 180,
		color: "#78350F",
	},
	{
		id: "f24",
		name: "Tủ hồ sơ",
		nameEn: "Filing Cabinet",
		category: "office",
		subcategory: "storage",
		image: "🗃️",
		width: 45,
		depth: 60,
		height: 130,
		color: "#6B7280",
	},
	{
		id: "f25",
		name: "Ghế ngoài trời",
		nameEn: "Outdoor Chair",
		category: "outdoor",
		subcategory: "seating",
		image: "⛱️",
		width: 60,
		depth: 70,
		height: 85,
		color: "#065F46",
	},
	{
		id: "f26",
		name: "Bàn ngoài trời",
		nameEn: "Outdoor Table",
		category: "outdoor",
		subcategory: "table",
		image: "🌳",
		width: 120,
		depth: 120,
		height: 75,
		color: "#92400E",
	},
	{
		id: "f27",
		name: "Ghế dài",
		nameEn: "Bench",
		category: "outdoor",
		subcategory: "seating",
		image: "🪵",
		width: 150,
		depth: 50,
		height: 45,
		color: "#78350F",
	},
	{
		id: "f28",
		name: "Chậu cây",
		nameEn: "Plant Pot",
		category: "outdoor",
		subcategory: "decor",
		image: "🪴",
		width: 40,
		depth: 40,
		height: 60,
		color: "#15803D",
	},
];

export type ProjectStatus = "draft" | "active" | "in_progress" | "completed";
export type ProjectType = "residential" | "commercial" | "renovation" | "interior";

export interface ProjectMember {
	id: string;
	name: string;
	role: string;
	avatar?: string;
}

export interface Milestone {
	id: string;
	name: string;
	status: "pending" | "in_progress" | "completed";
	progress: number;
	dueDate: string;
	budget: number;
}

export interface ProjectDocument {
	id: string;
	name: string;
	type: string;
	size: string;
	uploadedAt: string;
	uploadedBy: string;
}

export interface ProjectActivity {
	id: string;
	action: string;
	user: string;
	timestamp: string;
	detail?: string;
}

export interface Project {
	id: string;
	name: string;
	description: string;
	status: ProjectStatus;
	type: ProjectType;
	location: string;
	budget: number;
	startDate: string;
	endDate?: string;
	members: ProjectMember[];
	milestones: Milestone[];
	documents: ProjectDocument[];
	activities: ProjectActivity[];
}

export const MOCK_PROJECTS: Project[] = [
	{
		id: "1",
		name: "Biệt thự Thảo Điền",
		description:
			"Xây dựng biệt thự 3 tầng hiện đại tại khu vực Thảo Điền, Quận 2 với diện tích 450m². Thiết kế theo phong cách Scandinavian kết hợp nhiệt đới.",
		status: "in_progress",
		type: "residential",
		location: "Thảo Điền, Quận 2, TP.HCM",
		budget: 12500000000,
		startDate: "2025-03-15",
		endDate: "2026-06-30",
		members: [
			{ id: "m1", name: "Nguyễn Văn Anh", role: "Chủ đầu tư" },
			{ id: "m2", name: "Trần Minh Quân", role: "Kiến trúc sư" },
			{ id: "m3", name: "Lê Hoàng Dũng", role: "Nhà thầu chính" },
			{ id: "m4", name: "Phạm Thị Hoa", role: "Giám sát" },
		],
		milestones: [
			{
				id: "ms1",
				name: "Thiết kế & Phê duyệt",
				status: "completed",
				progress: 100,
				dueDate: "2025-05-01",
				budget: 800000000,
			},
			{
				id: "ms2",
				name: "Móng & Kết cấu",
				status: "completed",
				progress: 100,
				dueDate: "2025-08-15",
				budget: 3500000000,
			},
			{
				id: "ms3",
				name: "Xây thô",
				status: "in_progress",
				progress: 65,
				dueDate: "2025-12-30",
				budget: 4200000000,
			},
			{
				id: "ms4",
				name: "Hoàn thiện & Nội thất",
				status: "pending",
				progress: 0,
				dueDate: "2026-04-30",
				budget: 3000000000,
			},
			{
				id: "ms5",
				name: "Nghiệm thu & Bàn giao",
				status: "pending",
				progress: 0,
				dueDate: "2026-06-30",
				budget: 1000000000,
			},
		],
		documents: [
			{
				id: "d1",
				name: "Bản vẽ kiến trúc v3.pdf",
				type: "PDF",
				size: "15.2 MB",
				uploadedAt: "2025-04-20",
				uploadedBy: "Trần Minh Quân",
			},
			{
				id: "d2",
				name: "Hợp đồng thi công.pdf",
				type: "PDF",
				size: "2.4 MB",
				uploadedAt: "2025-03-18",
				uploadedBy: "Lê Hoàng Dũng",
			},
			{
				id: "d3",
				name: "Báo giá vật liệu Q2.xlsx",
				type: "Excel",
				size: "1.1 MB",
				uploadedAt: "2025-06-01",
				uploadedBy: "Phạm Thị Hoa",
			},
			{
				id: "d4",
				name: "Ảnh tiến độ tháng 5.zip",
				type: "Archive",
				size: "45.8 MB",
				uploadedAt: "2025-06-05",
				uploadedBy: "Lê Hoàng Dũng",
			},
		],
		activities: [
			{
				id: "a1",
				action: "Cập nhật tiến độ",
				user: "Lê Hoàng Dũng",
				timestamp: "2025-06-10T14:30:00",
				detail: "Xây thô tầng 2 hoàn thành 65%",
			},
			{
				id: "a2",
				action: "Tải lên tài liệu",
				user: "Phạm Thị Hoa",
				timestamp: "2025-06-05T09:15:00",
				detail: "Ảnh tiến độ tháng 5",
			},
			{
				id: "a3",
				action: "Phê duyệt báo giá",
				user: "Nguyễn Văn Anh",
				timestamp: "2025-06-01T16:00:00",
				detail: "Báo giá vật liệu Q2",
			},
			{
				id: "a4",
				action: "Hoàn thành milestone",
				user: "Lê Hoàng Dũng",
				timestamp: "2025-05-20T11:00:00",
				detail: "Móng & Kết cấu đã hoàn thành",
			},
			{
				id: "a5",
				action: "Thêm thành viên",
				user: "Nguyễn Văn Anh",
				timestamp: "2025-04-15T08:30:00",
				detail: "Phạm Thị Hoa - Giám sát",
			},
		],
	},
	{
		id: "2",
		name: "Văn phòng Landmark Tower",
		description:
			"Thiết kế và thi công nội thất văn phòng 500m² tại tòa nhà Landmark Tower tầng 25. Không gian làm việc mở kết hợp phòng họp.",
		status: "active",
		type: "commercial",
		location: "Landmark 81, Bình Thạnh, TP.HCM",
		budget: 4800000000,
		startDate: "2025-06-01",
		endDate: "2025-12-31",
		members: [
			{ id: "m5", name: "Hoàng Minh Tuấn", role: "Chủ đầu tư" },
			{ id: "m6", name: "Trần Minh Quân", role: "Kiến trúc sư" },
			{ id: "m7", name: "Võ Thanh Hải", role: "Nhà thầu nội thất" },
		],
		milestones: [
			{
				id: "ms6",
				name: "Khảo sát & Thiết kế",
				status: "in_progress",
				progress: 80,
				dueDate: "2025-07-15",
				budget: 600000000,
			},
			{
				id: "ms7",
				name: "Thi công cơ bản",
				status: "pending",
				progress: 0,
				dueDate: "2025-09-30",
				budget: 2200000000,
			},
			{
				id: "ms8",
				name: "Lắp đặt nội thất",
				status: "pending",
				progress: 0,
				dueDate: "2025-11-30",
				budget: 1500000000,
			},
			{
				id: "ms9",
				name: "Nghiệm thu",
				status: "pending",
				progress: 0,
				dueDate: "2025-12-31",
				budget: 500000000,
			},
		],
		documents: [
			{
				id: "d5",
				name: "Concept Design v1.pdf",
				type: "PDF",
				size: "8.5 MB",
				uploadedAt: "2025-06-10",
				uploadedBy: "Trần Minh Quân",
			},
			{
				id: "d6",
				name: "Yêu cầu kỹ thuật.docx",
				type: "Word",
				size: "0.8 MB",
				uploadedAt: "2025-06-05",
				uploadedBy: "Hoàng Minh Tuấn",
			},
		],
		activities: [
			{
				id: "a6",
				action: "Tạo dự án",
				user: "Hoàng Minh Tuấn",
				timestamp: "2025-06-01T10:00:00",
				detail: "Dự án văn phòng Landmark Tower",
			},
			{
				id: "a7",
				action: "Mời thành viên",
				user: "Hoàng Minh Tuấn",
				timestamp: "2025-06-02T09:00:00",
				detail: "Trần Minh Quân, Võ Thanh Hải",
			},
			{
				id: "a8",
				action: "Tải lên tài liệu",
				user: "Trần Minh Quân",
				timestamp: "2025-06-10T15:00:00",
				detail: "Concept Design v1",
			},
		],
	},
	{
		id: "3",
		name: "Cải tạo căn hộ Vinhomes",
		description:
			"Cải tạo toàn bộ căn hộ 3 phòng ngủ 120m² tại Vinhomes Central Park. Thay đổi layout phòng khách và bếp, nâng cấp phòng tắm.",
		status: "completed",
		type: "renovation",
		location: "Vinhomes Central Park, Bình Thạnh",
		budget: 850000000,
		startDate: "2025-01-10",
		endDate: "2025-04-30",
		members: [
			{ id: "m8", name: "Nguyễn Thị Mai", role: "Chủ nhà" },
			{ id: "m9", name: "Đặng Văn Khoa", role: "Nhà thầu" },
		],
		milestones: [
			{
				id: "ms10",
				name: "Phá dỡ & Chuẩn bị",
				status: "completed",
				progress: 100,
				dueDate: "2025-02-01",
				budget: 100000000,
			},
			{
				id: "ms11",
				name: "Thi công sửa chữa",
				status: "completed",
				progress: 100,
				dueDate: "2025-03-15",
				budget: 450000000,
			},
			{
				id: "ms12",
				name: "Hoàn thiện & Dọn dẹp",
				status: "completed",
				progress: 100,
				dueDate: "2025-04-30",
				budget: 300000000,
			},
		],
		documents: [
			{
				id: "d7",
				name: "Biên bản nghiệm thu.pdf",
				type: "PDF",
				size: "1.2 MB",
				uploadedAt: "2025-04-28",
				uploadedBy: "Đặng Văn Khoa",
			},
			{
				id: "d8",
				name: "Ảnh trước-sau.zip",
				type: "Archive",
				size: "32.1 MB",
				uploadedAt: "2025-04-30",
				uploadedBy: "Nguyễn Thị Mai",
			},
		],
		activities: [
			{
				id: "a9",
				action: "Hoàn thành dự án",
				user: "Đặng Văn Khoa",
				timestamp: "2025-04-30T17:00:00",
				detail: "Bàn giao căn hộ hoàn chỉnh",
			},
			{
				id: "a10",
				action: "Nghiệm thu",
				user: "Nguyễn Thị Mai",
				timestamp: "2025-04-28T14:00:00",
				detail: "Đạt yêu cầu, không phát sinh",
			},
		],
	},
	{
		id: "4",
		name: "Nội thất căn hộ Masteri",
		description:
			"Thiết kế và thi công nội thất trọn gói căn hộ 2 phòng ngủ 85m² tại Masteri Thảo Điền. Phong cách minimalist Nhật Bản.",
		status: "draft",
		type: "interior",
		location: "Masteri Thảo Điền, Quận 2",
		budget: 520000000,
		startDate: "2025-07-01",
		members: [{ id: "m10", name: "Lý Thanh Tùng", role: "Chủ đầu tư" }],
		milestones: [
			{
				id: "ms13",
				name: "Tư vấn & Thiết kế",
				status: "pending",
				progress: 0,
				dueDate: "2025-08-01",
				budget: 80000000,
			},
			{
				id: "ms14",
				name: "Sản xuất & Thi công",
				status: "pending",
				progress: 0,
				dueDate: "2025-10-15",
				budget: 350000000,
			},
			{
				id: "ms15",
				name: "Lắp đặt & Bàn giao",
				status: "pending",
				progress: 0,
				dueDate: "2025-11-15",
				budget: 90000000,
			},
		],
		documents: [],
		activities: [
			{
				id: "a11",
				action: "Tạo nháp dự án",
				user: "Lý Thanh Tùng",
				timestamp: "2025-06-08T10:30:00",
				detail: "Nội thất căn hộ Masteri",
			},
		],
	},
	{
		id: "5",
		name: "Showroom Ô tô Premium",
		description:
			"Xây dựng showroom trưng bày ô tô cao cấp 1200m² tại khu vực Quận 7. Thiết kế hiện đại với hệ thống chiếu sáng chuyên dụng.",
		status: "active",
		type: "commercial",
		location: "Phú Mỹ Hưng, Quận 7, TP.HCM",
		budget: 8500000000,
		startDate: "2025-05-01",
		endDate: "2026-03-31",
		members: [
			{ id: "m11", name: "Trương Hoàng Long", role: "Chủ đầu tư" },
			{ id: "m12", name: "Trần Minh Quân", role: "Kiến trúc sư" },
			{ id: "m13", name: "Nguyễn Đức Mạnh", role: "Nhà thầu xây dựng" },
			{ id: "m14", name: "Lê Thị Lan", role: "Quản lý dự án" },
			{ id: "m15", name: "Phan Văn Bình", role: "Kỹ sư M&E" },
		],
		milestones: [
			{
				id: "ms16",
				name: "Thiết kế kiến trúc",
				status: "completed",
				progress: 100,
				dueDate: "2025-06-30",
				budget: 500000000,
			},
			{
				id: "ms17",
				name: "Xin giấy phép",
				status: "in_progress",
				progress: 70,
				dueDate: "2025-07-31",
				budget: 200000000,
			},
			{
				id: "ms18",
				name: "Thi công xây dựng",
				status: "pending",
				progress: 0,
				dueDate: "2026-01-31",
				budget: 5500000000,
			},
			{
				id: "ms19",
				name: "Lắp đặt hệ thống",
				status: "pending",
				progress: 0,
				dueDate: "2026-03-15",
				budget: 1800000000,
			},
			{
				id: "ms20",
				name: "Nghiệm thu",
				status: "pending",
				progress: 0,
				dueDate: "2026-03-31",
				budget: 500000000,
			},
		],
		documents: [
			{
				id: "d9",
				name: "3D Render Showroom.pdf",
				type: "PDF",
				size: "22.3 MB",
				uploadedAt: "2025-06-15",
				uploadedBy: "Trần Minh Quân",
			},
			{
				id: "d10",
				name: "Bảng khối lượng.xlsx",
				type: "Excel",
				size: "3.2 MB",
				uploadedAt: "2025-06-20",
				uploadedBy: "Lê Thị Lan",
			},
			{
				id: "d11",
				name: "Hồ sơ pháp lý.pdf",
				type: "PDF",
				size: "5.6 MB",
				uploadedAt: "2025-05-10",
				uploadedBy: "Trương Hoàng Long",
			},
		],
		activities: [
			{
				id: "a12",
				action: "Cập nhật tiến độ",
				user: "Lê Thị Lan",
				timestamp: "2025-06-20T16:00:00",
				detail: "Xin giấy phép đạt 70%",
			},
			{
				id: "a13",
				action: "Hoàn thành milestone",
				user: "Trần Minh Quân",
				timestamp: "2025-06-18T10:00:00",
				detail: "Thiết kế kiến trúc đã duyệt",
			},
			{
				id: "a14",
				action: "Tải lên tài liệu",
				user: "Lê Thị Lan",
				timestamp: "2025-06-20T15:30:00",
				detail: "Bảng khối lượng",
			},
		],
	},
];

// ===== PARTNERS =====
export interface Partner {
	id: string;
	name: string;
	company: string;
	role: "designer" | "contractor" | "supplier" | "consultant";
	rating: number;
	reviewCount: number;
	location: string;
	specialties: string[];
	priceRange: string;
	completedProjects: number;
	yearsExperience: number;
	verified: boolean;
	description: string;
}

export const MOCK_PARTNERS: Partner[] = [
	{
		id: "p1",
		name: "Trần Minh Quân",
		company: "QDesign Studio",
		role: "designer",
		rating: 4.8,
		reviewCount: 47,
		location: "Quận 3, TP.HCM",
		specialties: ["Minimalist", "Modern", "Nhà phố"],
		priceRange: "45 - 85 triệu",
		completedProjects: 32,
		yearsExperience: 8,
		verified: true,
		description: "Studio thiết kế chuyên biệt thự và nhà phố cao cấp.",
	},
	{
		id: "p2",
		name: "Nguyễn Thị Hạnh",
		company: "Hạnh Interiors",
		role: "designer",
		rating: 4.9,
		reviewCount: 63,
		location: "Quận 7, TP.HCM",
		specialties: ["Indochine", "Tropical", "Resort"],
		priceRange: "60 - 120 triệu",
		completedProjects: 45,
		yearsExperience: 12,
		verified: true,
		description: "Chuyên thiết kế nội thất phong cách Đông Dương hiện đại.",
	},
	{
		id: "p3",
		name: "Lê Hoàng Dũng",
		company: "DH Construction",
		role: "contractor",
		rating: 4.7,
		reviewCount: 38,
		location: "Quận 2, TP.HCM",
		specialties: ["Nhà phố", "Biệt thự", "Cải tạo"],
		priceRange: "3.5 - 7 triệu/m²",
		completedProjects: 28,
		yearsExperience: 15,
		verified: true,
		description: "Nhà thầu uy tín 15 năm kinh nghiệm, cam kết tiến độ và chất lượng.",
	},
	{
		id: "p4",
		name: "Phạm Văn Tuấn",
		company: "T&T Builders",
		role: "contractor",
		rating: 4.5,
		reviewCount: 22,
		location: "Thủ Đức, TP.HCM",
		specialties: ["Nhà phố", "Townhouse", "Xây mới"],
		priceRange: "3.2 - 5.5 triệu/m²",
		completedProjects: 18,
		yearsExperience: 10,
		verified: true,
		description: "Đội thi công chuyên nhà phố khu vực phía Đông TP.HCM.",
	},
	{
		id: "p5",
		name: "Võ Minh Tâm",
		company: "GreenSpace Design",
		role: "designer",
		rating: 4.6,
		reviewCount: 29,
		location: "Bình Thạnh, TP.HCM",
		specialties: ["Eco-friendly", "Modern", "Văn phòng"],
		priceRange: "50 - 90 triệu",
		completedProjects: 21,
		yearsExperience: 6,
		verified: false,
		description: "Thiết kế không gian xanh, thân thiện môi trường.",
	},
	{
		id: "p6",
		name: "Hoàng Đức Mạnh",
		company: "Mạnh Architect",
		role: "consultant",
		rating: 4.9,
		reviewCount: 51,
		location: "Quận 1, TP.HCM",
		specialties: ["Kiến trúc", "Quy hoạch", "Biệt thự"],
		priceRange: "80 - 200 triệu",
		completedProjects: 55,
		yearsExperience: 20,
		verified: true,
		description: "KTS trưởng 20 năm kinh nghiệm, chuyên biệt thự cao cấp.",
	},
];

// ===== DOCUMENTS =====
export interface Document {
	id: string;
	name: string;
	type: "pdf" | "cad" | "image" | "doc" | "spreadsheet";
	category: "design" | "contract" | "quotation" | "report" | "photo";
	size: string;
	version: number;
	status: "draft" | "pending_review" | "approved" | "rejected";
	uploadedBy: string;
	uploadedAt: string;
	projectId: string;
}

export const MOCK_DOCUMENTS: Document[] = [
	{
		id: "doc-1",
		name: "Bản vẽ mặt bằng tầng 1",
		type: "cad",
		category: "design",
		size: "2.4 MB",
		version: 3,
		status: "approved",
		uploadedBy: "Trần Minh Quân",
		uploadedAt: "2026-04-20",
		projectId: "1",
	},
	{
		id: "doc-2",
		name: "Phối cảnh 3D - Mặt tiền",
		type: "image",
		category: "design",
		size: "8.1 MB",
		version: 2,
		status: "approved",
		uploadedBy: "Trần Minh Quân",
		uploadedAt: "2026-04-22",
		projectId: "1",
	},
	{
		id: "doc-3",
		name: "BOQ sơ bộ - Giai đoạn 1",
		type: "spreadsheet",
		category: "quotation",
		size: "156 KB",
		version: 1,
		status: "pending_review",
		uploadedBy: "Lê Hoàng Dũng",
		uploadedAt: "2026-05-10",
		projectId: "1",
	},
	{
		id: "doc-4",
		name: "Hợp đồng thiết kế",
		type: "pdf",
		category: "contract",
		size: "420 KB",
		version: 1,
		status: "approved",
		uploadedBy: "Admin",
		uploadedAt: "2026-03-10",
		projectId: "1",
	},
	{
		id: "doc-5",
		name: "Biên bản khảo sát",
		type: "pdf",
		category: "report",
		size: "1.8 MB",
		version: 1,
		status: "approved",
		uploadedBy: "Trần Minh Quân",
		uploadedAt: "2026-03-12",
		projectId: "1",
	},
	{
		id: "doc-6",
		name: "Hình ảnh hiện trạng",
		type: "image",
		category: "photo",
		size: "15.2 MB",
		version: 1,
		status: "approved",
		uploadedBy: "Nguyễn Văn Anh",
		uploadedAt: "2026-03-05",
		projectId: "1",
	},
	{
		id: "doc-7",
		name: "Concept design - Option A",
		type: "pdf",
		category: "design",
		size: "5.6 MB",
		version: 2,
		status: "approved",
		uploadedBy: "Trần Minh Quân",
		uploadedAt: "2026-04-10",
		projectId: "1",
	},
	{
		id: "doc-8",
		name: "Layout nội thất - Phòng khách",
		type: "cad",
		category: "design",
		size: "1.2 MB",
		version: 1,
		status: "pending_review",
		uploadedBy: "Nguyễn Thị Hạnh",
		uploadedAt: "2026-05-28",
		projectId: "2",
	},
	{
		id: "doc-9",
		name: "Báo cáo tiến độ T5",
		type: "doc",
		category: "report",
		size: "890 KB",
		version: 1,
		status: "draft",
		uploadedBy: "Lê Hoàng Dũng",
		uploadedAt: "2026-06-01",
		projectId: "1",
	},
	{
		id: "doc-10",
		name: "Ảnh công trường tuần 22",
		type: "image",
		category: "photo",
		size: "22.4 MB",
		version: 1,
		status: "approved",
		uploadedBy: "Phạm Văn Tuấn",
		uploadedAt: "2026-06-05",
		projectId: "1",
	},
];

// ===== QUOTATIONS =====
export interface QuotationItem {
	id: string;
	description: string;
	unit: string;
	quantity: number;
	unitPrice: number;
	total: number;
}

export interface Quotation {
	id: string;
	projectId: string;
	partnerId: string;
	partnerName: string;
	status: "draft" | "sent" | "accepted" | "rejected" | "revised";
	totalAmount: number;
	items: QuotationItem[];
	createdAt: string;
	validUntil: string;
}

export const MOCK_QUOTATIONS: Quotation[] = [
	{
		id: "q1",
		projectId: "1",
		partnerId: "p1",
		partnerName: "QDesign Studio",
		status: "accepted",
		totalAmount: 75000000,
		createdAt: "2026-03-08",
		validUntil: "2026-04-08",
		items: [
			{
				id: "qi1",
				description: "Thiết kế concept (2 phương án)",
				unit: "gói",
				quantity: 1,
				unitPrice: 25000000,
				total: 25000000,
			},
			{
				id: "qi2",
				description: "Thiết kế chi tiết các tầng",
				unit: "gói",
				quantity: 1,
				unitPrice: 35000000,
				total: 35000000,
			},
			{
				id: "qi3",
				description: "Hồ sơ thi công + giám sát",
				unit: "gói",
				quantity: 1,
				unitPrice: 15000000,
				total: 15000000,
			},
		],
	},
	{
		id: "q2",
		projectId: "1",
		partnerId: "p3",
		partnerName: "DH Construction",
		status: "sent",
		totalAmount: 1850000000,
		createdAt: "2026-05-15",
		validUntil: "2026-06-15",
		items: [
			{
				id: "qi4",
				description: "Phần thô (móng, khung, sàn, mái)",
				unit: "m²",
				quantity: 320,
				unitPrice: 3800000,
				total: 1216000000,
			},
			{
				id: "qi5",
				description: "Hoàn thiện (trát, sơn, lát)",
				unit: "m²",
				quantity: 320,
				unitPrice: 1500000,
				total: 480000000,
			},
			{
				id: "qi6",
				description: "Hệ thống MEP cơ bản",
				unit: "gói",
				quantity: 1,
				unitPrice: 154000000,
				total: 154000000,
			},
		],
	},
	{
		id: "q3",
		projectId: "2",
		partnerId: "p2",
		partnerName: "Hạnh Interiors",
		status: "draft",
		totalAmount: 120000000,
		createdAt: "2026-05-20",
		validUntil: "2026-06-20",
		items: [
			{
				id: "qi7",
				description: "Thiết kế nội thất toàn bộ",
				unit: "gói",
				quantity: 1,
				unitPrice: 80000000,
				total: 80000000,
			},
			{
				id: "qi8",
				description: "Render 3D (8 góc)",
				unit: "góc",
				quantity: 8,
				unitPrice: 5000000,
				total: 40000000,
			},
		],
	},
];

// ===== CONTRACTS =====
export interface Contract {
	id: string;
	projectId: string;
	partnerId: string;
	partnerName: string;
	status: "draft" | "sent" | "signed" | "active" | "completed" | "terminated";
	totalValue: number;
	startDate: string;
	endDate: string;
	signedAt?: string;
}

export const MOCK_CONTRACTS: Contract[] = [
	{
		id: "c1",
		projectId: "1",
		partnerId: "p1",
		partnerName: "QDesign Studio",
		status: "active",
		totalValue: 75000000,
		startDate: "2026-03-15",
		endDate: "2026-07-15",
		signedAt: "2026-03-12",
	},
	{
		id: "c2",
		projectId: "1",
		partnerId: "p3",
		partnerName: "DH Construction",
		status: "draft",
		totalValue: 1850000000,
		startDate: "2026-06-01",
		endDate: "2026-12-31",
	},
	{
		id: "c3",
		projectId: "2",
		partnerId: "p2",
		partnerName: "Hạnh Interiors",
		status: "signed",
		totalValue: 120000000,
		startDate: "2026-06-15",
		endDate: "2026-09-15",
		signedAt: "2026-06-10",
	},
];

// ===== PAYMENTS =====
export interface Payment {
	id: string;
	projectId: string;
	contractId: string;
	amount: number;
	status: "pending" | "processing" | "completed" | "failed";
	method: "bank_transfer" | "escrow" | "cash";
	description: string;
	createdAt: string;
	paidAt?: string;
}

export const MOCK_PAYMENTS: Payment[] = [
	{
		id: "pay1",
		projectId: "1",
		contractId: "c1",
		amount: 25000000,
		status: "completed",
		method: "bank_transfer",
		description: "Đợt 1 - Thiết kế concept",
		createdAt: "2026-03-20",
		paidAt: "2026-03-21",
	},
	{
		id: "pay2",
		projectId: "1",
		contractId: "c1",
		amount: 35000000,
		status: "completed",
		method: "escrow",
		description: "Đợt 2 - Thiết kế chi tiết",
		createdAt: "2026-05-01",
		paidAt: "2026-05-02",
	},
	{
		id: "pay3",
		projectId: "1",
		contractId: "c1",
		amount: 15000000,
		status: "pending",
		method: "escrow",
		description: "Đợt 3 - Hồ sơ thi công",
		createdAt: "2026-06-10",
	},
	{
		id: "pay4",
		projectId: "1",
		contractId: "c2",
		amount: 370000000,
		status: "pending",
		method: "escrow",
		description: "Tạm ứng thi công (20%)",
		createdAt: "2026-06-01",
	},
	{
		id: "pay5",
		projectId: "2",
		contractId: "c3",
		amount: 40000000,
		status: "processing",
		method: "bank_transfer",
		description: "Đợt 1 - Thiết kế nội thất",
		createdAt: "2026-06-12",
	},
];

// ===== NOTIFICATIONS =====
export interface Notification {
	id: string;
	type: "payment" | "message" | "document" | "project" | "system";
	title: string;
	description: string;
	read: boolean;
	createdAt: string;
	link?: string;
}

export const MOCK_NOTIFICATIONS: Notification[] = [
	{
		id: "n1",
		type: "document",
		title: "Tài liệu mới cần duyệt",
		description: 'Trần Minh Quân đã upload "BOQ sơ bộ - Giai đoạn 1"',
		read: false,
		createdAt: "2026-06-10T14:30:00",
		link: "/documents",
	},
	{
		id: "n2",
		type: "payment",
		title: "Thanh toán đã xác nhận",
		description: "Đợt 2 thiết kế chi tiết - 35,000,000 VND đã hoàn tất",
		read: false,
		createdAt: "2026-06-09T10:00:00",
		link: "/payments",
	},
	{
		id: "n3",
		type: "message",
		title: "Tin nhắn mới từ KTS Quân",
		description: '"Anh ơi, em gửi bản cập nhật mặt bằng tầng 2..."',
		read: true,
		createdAt: "2026-06-08T16:45:00",
		link: "/communications",
	},
	{
		id: "n4",
		type: "project",
		title: "Milestone hoàn thành",
		description: 'Giai đoạn "Thiết kế concept" dự án Biệt thự Thảo Điền đã hoàn tất',
		read: true,
		createdAt: "2026-06-05T09:00:00",
		link: "/projects/1",
	},
	{
		id: "n5",
		type: "system",
		title: "Cập nhật nền tảng",
		description: "VERTEX vừa ra mắt tính năng Thiết kế nội thất 3D",
		read: true,
		createdAt: "2026-06-01T08:00:00",
	},
	{
		id: "n6",
		type: "document",
		title: "Tài liệu được phê duyệt",
		description: '"Phối cảnh 3D - Mặt tiền v2" đã được chủ đầu tư duyệt',
		read: true,
		createdAt: "2026-05-30T11:00:00",
		link: "/documents",
	},
];

// ===== ACTIVITIES =====
export interface ActivityLog {
	id: string;
	userId: string;
	userName: string;
	action: string;
	target: string;
	createdAt: string;
}

export const MOCK_ACTIVITIES: ActivityLog[] = [
	{
		id: "act1",
		userId: "2",
		userName: "Trần Minh Quân",
		action: "uploaded",
		target: "BOQ sơ bộ - Giai đoạn 1",
		createdAt: "2026-06-10T14:30:00",
	},
	{
		id: "act2",
		userId: "1",
		userName: "Nguyễn Văn Anh",
		action: "approved",
		target: "Phối cảnh 3D - Mặt tiền v2",
		createdAt: "2026-06-09T16:00:00",
	},
	{
		id: "act3",
		userId: "3",
		userName: "Lê Hoàng Dũng",
		action: "submitted",
		target: "Báo giá thi công",
		createdAt: "2026-06-08T11:20:00",
	},
	{
		id: "act4",
		userId: "2",
		userName: "Trần Minh Quân",
		action: "completed",
		target: "Milestone: Thiết kế concept",
		createdAt: "2026-06-05T09:00:00",
	},
	{
		id: "act5",
		userId: "1",
		userName: "Nguyễn Văn Anh",
		action: "paid",
		target: "Đợt 2 - Thiết kế chi tiết",
		createdAt: "2026-06-02T10:30:00",
	},
	{
		id: "act6",
		userId: "4",
		userName: "Admin VERTEX",
		action: "verified",
		target: "Hồ sơ DH Construction",
		createdAt: "2026-05-30T08:00:00",
	},
];
