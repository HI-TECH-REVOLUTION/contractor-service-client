"use client";

import Link from "next/link";
import {
	Users,
	Briefcase,
	FileText,
	DollarSign,
	Shield,
	Settings,
	Download,
	UserPlus,
	Activity,
	Database,
	ArrowUpRight,
	ShieldAlert,
} from "lucide-react";
import { useAuthStore, MOCK_USERS } from "@/lib/auth-store";
import { useI18n } from "@/lib/i18n";
import { cn, formatCurrency } from "@/lib/utils";
import { MOCK_PROJECTS } from "@/lib/mock-data";

const MOCK_ACTIVITIES = [
	{
		id: "1",
		user: "Nguyễn Văn Anh",
		action: "Phê duyệt báo giá vật liệu Q2",
		time: "5 phút trước",
		initials: "NA",
	},
	{
		id: "2",
		user: "Trần Minh Quân",
		action: "Tải lên bản vẽ Concept Design v1",
		time: "30 phút trước",
		initials: "TQ",
	},
	{
		id: "3",
		user: "Lê Hoàng Dũng",
		action: "Cập nhật tiến độ xây thô tầng 2",
		time: "2 giờ trước",
		initials: "LD",
	},
	{
		id: "4",
		user: "Hoàng Minh Tuấn",
		action: "Tạo dự án Văn phòng Landmark Tower",
		time: "1 ngày trước",
		initials: "HT",
	},
	{
		id: "5",
		user: "Đặng Văn Khoa",
		action: "Hoàn thành dự án Cải tạo căn hộ Vinhomes",
		time: "2 ngày trước",
		initials: "DK",
	},
	{
		id: "6",
		user: "Admin VERTEX",
		action: "Cấu hình quyền truy cập hệ thống",
		time: "3 ngày trước",
		initials: "AV",
	},
];

const ROLE_STYLES: Record<string, { label: string; bg: string; text: string }> = {
	customer: { label: "Chủ đầu tư", bg: "bg-blue-50", text: "text-blue-700" },
	designer: { label: "Nhà thiết kế", bg: "bg-purple-50", text: "text-purple-700" },
	contractor: { label: "Nhà thầu", bg: "bg-orange-50", text: "text-orange-700" },
	admin: { label: "Quản trị viên", bg: "bg-red-50", text: "text-red-700" },
};

const AVATAR_COLORS = [
	"bg-blue-500",
	"bg-purple-500",
	"bg-orange-500",
	"bg-emerald-500",
	"bg-rose-500",
	"bg-indigo-500",
];

const CONFIG_CATEGORIES = [
	{ name: "Loại dự án", count: 4, description: "Nhà ở, Thương mại, Cải tạo, Nội thất" },
	{ name: "Dịch vụ", count: 6, description: "Thiết kế, Thi công, Giám sát, ..." },
	{ name: "Khu vực", count: 8, description: "TP.HCM, Hà Nội, Đà Nẵng, ..." },
];

const totalDocuments = MOCK_PROJECTS.reduce((sum, p) => sum + p.documents.length, 0);
const activeProjects = MOCK_PROJECTS.filter(
	(p) => p.status === "active" || p.status === "in_progress",
).length;

const OVERVIEW_STATS = [
	{
		label: "Tổng người dùng",
		value: MOCK_USERS.length,
		icon: Users,
		color: "text-[#0000FE]",
		bg: "bg-blue-50",
	},
	{
		label: "Dự án hoạt động",
		value: activeProjects,
		icon: Briefcase,
		color: "text-success",
		bg: "bg-emerald-50",
	},
	{
		label: "Tài liệu",
		value: totalDocuments,
		icon: FileText,
		color: "text-purple-600",
		bg: "bg-purple-50",
	},
	{
		label: "Doanh thu tháng",
		value: 60000000,
		icon: DollarSign,
		color: "text-[#FF6600]",
		bg: "bg-orange-50",
		isCurrency: true,
	},
];

export default function AdminPage() {
	const { user } = useAuthStore();
	const { locale } = useI18n();

	if (user?.role !== "admin") {
		return (
			<div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
				<div className="bg-card rounded-2xl border border-border shadow-sm p-10 text-center max-w-md">
					<div className="mx-auto w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
						<ShieldAlert className="h-8 w-8 text-destructive" />
					</div>
					<h1 className="text-xl font-bold text-navy mb-2">Không có quyền truy cập</h1>
					<p className="text-sm text-gray-500 mb-6">
						Bạn cần quyền quản trị viên để truy cập trang này.
					</p>
					<Link
						href="/dashboard"
						className="inline-flex items-center px-5 py-2.5 rounded-lg bg-[#0000FE] text-white text-sm font-medium hover:bg-[#0000D4] transition-colors"
					>
						Quay về Dashboard
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="p-6 lg:p-8 max-w-7xl">
			{/* Header */}
			<div className="flex items-center justify-between mb-8">
				<div>
					<div className="flex items-center gap-3">
						<h1 className="text-2xl font-bold text-navy">Quản trị hệ thống</h1>
						<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-semibold">
							<Shield className="h-3 w-3" />
							Admin Panel
						</span>
					</div>
					<p className="text-sm text-gray-500 mt-1">
						Quản lý người dùng, dự án và cấu hình hệ thống VERTEX
					</p>
				</div>
			</div>

			{/* Overview Stats */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
				{OVERVIEW_STATS.map((stat) => {
					const Icon = stat.icon;
					return (
						<div
							key={stat.label}
							className="bg-card rounded-xl border border-[#E5E5E5] p-5 shadow-sm hover:shadow-md transition-shadow"
						>
							<div className="flex items-center justify-between mb-3">
								<div className={cn("p-2.5 rounded-lg", stat.bg)}>
									<Icon className={cn("h-5 w-5", stat.color)} />
								</div>
								<ArrowUpRight className="h-4 w-4 text-gray-400" />
							</div>
							<p className="text-2xl font-bold text-navy">
								{stat.isCurrency ? formatCurrency(stat.value) : stat.value}
							</p>
							<p className="text-sm text-gray-500 mt-1">{stat.label}</p>
						</div>
					);
				})}
			</div>

			{/* User Management Table */}
			<div className="bg-card rounded-xl border border-[#E5E5E5] shadow-sm mb-8">
				<div className="px-6 py-4 border-b border-[#E5E5E5] flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Users className="h-5 w-5 text-navy" />
						<h2 className="font-semibold text-navy">Quản lý người dùng</h2>
					</div>
					<span className="text-xs text-gray-500">{MOCK_USERS.length} người dùng</span>
				</div>
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead>
							<tr className="border-b border-[#E5E5E5] bg-[#F5F5F5]">
								<th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
									Tên
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
									Email
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
									Vai trò
								</th>
								<th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
									Trạng thái
								</th>
								<th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
									Thao tác
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-[#E5E5E5]">
							{MOCK_USERS.map((u, idx) => {
								const role = ROLE_STYLES[u.role];
								return (
									<tr key={u.id} className="hover:bg-gray-50/50 transition-colors">
										<td className="px-6 py-4">
											<div className="flex items-center gap-3">
												<div
													className={cn(
														"h-9 w-9 rounded-full flex items-center justify-center text-white text-sm font-medium",
														AVATAR_COLORS[idx % AVATAR_COLORS.length],
													)}
												>
													{u.name
														.split(" ")
														.slice(-2)
														.map((n) => n[0])
														.join("")}
												</div>
												<span className="text-sm font-medium text-navy">{u.name}</span>
											</div>
										</td>
										<td className="px-6 py-4 text-sm text-gray-600">{u.email}</td>
										<td className="px-6 py-4">
											<span
												className={cn(
													"inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
													role.bg,
													role.text,
												)}
											>
												{role.label}
											</span>
										</td>
										<td className="px-6 py-4">
											<span className="inline-flex items-center gap-1.5 text-sm text-success">
												<span className="h-2 w-2 rounded-full bg-success" />
												Active
											</span>
										</td>
										<td className="px-6 py-4 text-right">
											<div className="flex items-center justify-end gap-2">
												<button className="px-3 py-1.5 text-xs font-medium text-[#0000FE] bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
													Edit
												</button>
												<button className="px-3 py-1.5 text-xs font-medium text-destructive bg-red-50 rounded-md hover:bg-red-100 transition-colors">
													Deactivate
												</button>
											</div>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
				{/* Recent Activity */}
				<div className="bg-card rounded-xl border border-[#E5E5E5] shadow-sm">
					<div className="px-6 py-4 border-b border-[#E5E5E5] flex items-center gap-2">
						<Activity className="h-5 w-5 text-navy" />
						<h2 className="font-semibold text-navy">Hoạt động gần đây</h2>
					</div>
					<ul className="divide-y divide-[#E5E5E5]">
						{MOCK_ACTIVITIES.map((item, idx) => (
							<li key={item.id} className="px-6 py-4 hover:bg-gray-50/50 transition-colors">
								<div className="flex items-start gap-3">
									<div
										className={cn(
											"h-9 w-9 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0 mt-0.5",
											AVATAR_COLORS[idx % AVATAR_COLORS.length],
										)}
									>
										{item.initials}
									</div>
									<div className="min-w-0">
										<p className="text-sm text-navy">
											<span className="font-medium">{item.user}</span>{" "}
											<span className="text-gray-600">{item.action}</span>
										</p>
										<p className="text-xs text-gray-400 mt-1">{item.time}</p>
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>

				{/* System Config */}
				<div className="bg-card rounded-xl border border-[#E5E5E5] shadow-sm">
					<div className="px-6 py-4 border-b border-[#E5E5E5] flex items-center gap-2">
						<Database className="h-5 w-5 text-navy" />
						<h2 className="font-semibold text-navy">Cấu hình danh mục</h2>
					</div>
					<div className="p-4 space-y-3">
						{CONFIG_CATEGORIES.map((cat) => (
							<div
								key={cat.name}
								className="flex items-center justify-between p-4 rounded-lg border border-[#E5E5E5] hover:border-gray-300 transition-colors"
							>
								<div>
									<h3 className="text-sm font-semibold text-navy">{cat.name}</h3>
									<p className="text-xs text-gray-400 mt-0.5">{cat.description}</p>
								</div>
								<div className="flex items-center gap-3">
									<span className="text-xs font-medium text-gray-500 bg-[#F5F5F5] px-2.5 py-1 rounded-full">
										{cat.count} mục
									</span>
									<button className="px-3 py-1.5 text-xs font-medium text-[#0000FE] bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
										Quản lý
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Quick Actions */}
			<div className="bg-card rounded-xl border border-[#E5E5E5] shadow-sm">
				<div className="px-6 py-4 border-b border-[#E5E5E5] flex items-center gap-2">
					<Settings className="h-5 w-5 text-navy" />
					<h2 className="font-semibold text-navy">Thao tác nhanh</h2>
				</div>
				<div className="p-4 flex flex-wrap gap-3">
					<button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0000FE] text-white text-sm font-medium hover:bg-[#0000D4] transition-colors shadow-sm">
						<UserPlus className="h-4 w-4" />
						Thêm người dùng
					</button>
					<button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-success text-white text-sm font-medium hover:bg-[#008F5D] transition-colors shadow-sm">
						<Download className="h-4 w-4" />
						Xuất báo cáo
					</button>
					<button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-navy text-white text-sm font-medium hover:bg-[#161D45] transition-colors shadow-sm">
						<Settings className="h-4 w-4" />
						Cấu hình hệ thống
					</button>
				</div>
			</div>
		</div>
	);
}
