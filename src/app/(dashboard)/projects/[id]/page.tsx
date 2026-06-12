"use client";

import { useState } from "react";
import { use } from "react";
import Link from "next/link";
import {
	ArrowLeft,
	MapPin,
	Calendar,
	Wallet,
	Building2,
	FileText,
	Clock,
	CheckCircle2,
	Circle,
	Loader2,
	Download,
	User,
} from "lucide-react";
import { MOCK_PROJECTS, type ProjectStatus, type Milestone } from "@/lib/mock-data";
import { cn, formatCurrency, formatDate } from "@/lib/utils";

const STATUS_CONFIG: Record<ProjectStatus, { label: string; className: string }> = {
	draft: { label: "Nháp", className: "bg-gray-100 text-gray-600" },
	active: { label: "Đang hoạt động", className: "bg-blue-50 text-blue-600" },
	in_progress: { label: "Đang thực hiện", className: "bg-green-50 text-green-600" },
	completed: { label: "Hoàn thành", className: "bg-emerald-50 text-emerald-700" },
};

const MILESTONE_STATUS: Record<
	Milestone["status"],
	{ label: string; icon: typeof CheckCircle2; className: string }
> = {
	completed: { label: "Hoàn thành", icon: CheckCircle2, className: "text-success" },
	in_progress: { label: "Đang thực hiện", icon: Loader2, className: "text-primary" },
	pending: { label: "Chờ", icon: Circle, className: "text-muted-foreground" },
};

const TYPE_LABELS: Record<string, string> = {
	residential: "🏠 Nhà ở",
	commercial: "🏢 Thương mại",
	renovation: "🔨 Cải tạo",
	interior: "🎨 Nội thất",
};

type Tab = "overview" | "milestones" | "members" | "documents" | "activities";

const TABS: { key: Tab; label: string }[] = [
	{ key: "overview", label: "Tổng quan" },
	{ key: "milestones", label: "Milestone" },
	{ key: "members", label: "Thành viên" },
	{ key: "documents", label: "Tài liệu" },
	{ key: "activities", label: "Hoạt động" },
];

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = use(params);
	const [activeTab, setActiveTab] = useState<Tab>("overview");

	const project = MOCK_PROJECTS.find((p) => p.id === id);

	if (!project) {
		return (
			<div className="p-8 text-center">
				<p className="text-lg text-muted-foreground">Không tìm thấy dự án</p>
				<Link href="/projects" className="text-primary hover:underline mt-2 inline-block">
					← Quay lại danh sách
				</Link>
			</div>
		);
	}

	const statusConfig = STATUS_CONFIG[project.status];
	const avgProgress =
		project.milestones.length > 0
			? Math.round(
					project.milestones.reduce((s, m) => s + m.progress, 0) / project.milestones.length,
				)
			: 0;

	return (
		<div className="p-6 lg:p-8 max-w-6xl mx-auto">
			{/* Back */}
			<Link
				href="/projects"
				className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
			>
				<ArrowLeft className="h-4 w-4" />
				Quay lại
			</Link>

			{/* Project Header */}
			<div className="bg-card border border-border rounded-xl p-6 mb-6">
				<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
					<div>
						<div className="flex items-center gap-3 mb-2">
							<h1 className="text-2xl font-bold tracking-tight">{project.name}</h1>
							<span
								className={cn(
									"px-2.5 py-0.5 rounded-full text-xs font-medium",
									statusConfig.className,
								)}
							>
								{statusConfig.label}
							</span>
						</div>
						<p className="text-muted-foreground text-sm max-w-2xl">{project.description}</p>
					</div>
					<div className="text-right shrink-0">
						<p className="text-2xl font-bold text-foreground">{avgProgress}%</p>
						<p className="text-xs text-muted-foreground">Tiến độ tổng</p>
					</div>
				</div>
			</div>

			{/* Tab Navigation */}
			<div className="border-b border-border mb-6">
				<div className="flex gap-0 overflow-x-auto">
					{TABS.map(({ key, label }) => (
						<button
							key={key}
							onClick={() => setActiveTab(key)}
							className={cn(
								"px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer",
								activeTab === key
									? "border-primary text-primary"
									: "border-transparent text-muted-foreground hover:text-foreground hover:border-border",
							)}
						>
							{label}
						</button>
					))}
				</div>
			</div>

			{/* Tab Content */}
			{activeTab === "overview" && <OverviewTab project={project} />}
			{activeTab === "milestones" && <MilestonesTab milestones={project.milestones} />}
			{activeTab === "members" && <MembersTab members={project.members} />}
			{activeTab === "documents" && <DocumentsTab documents={project.documents} />}
			{activeTab === "activities" && <ActivitiesTab activities={project.activities} />}
		</div>
	);
}

function OverviewTab({ project }: { project: (typeof MOCK_PROJECTS)[number] }) {
	return (
		<div className="space-y-6">
			{/* Info Grid */}
			<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
				{[
					{ icon: Wallet, label: "Ngân sách", value: formatCurrency(project.budget) },
					{ icon: MapPin, label: "Địa điểm", value: project.location },
					{
						icon: Calendar,
						label: "Thời gian",
						value: `${formatDate(project.startDate)}${project.endDate ? ` – ${formatDate(project.endDate)}` : ""}`,
					},
					{
						icon: Building2,
						label: "Loại dự án",
						value: TYPE_LABELS[project.type] || project.type,
					},
				].map(({ icon: Icon, label, value }) => (
					<div key={label} className="bg-card border border-border rounded-xl p-4">
						<div className="flex items-center gap-2 mb-2">
							<Icon className="h-4 w-4 text-muted-foreground" />
							<span className="text-xs text-muted-foreground font-medium">{label}</span>
						</div>
						<p className="text-sm font-semibold text-foreground truncate" title={value}>
							{value}
						</p>
					</div>
				))}
			</div>

			{/* Milestone Progress */}
			<div className="bg-card border border-border rounded-xl p-5">
				<h3 className="text-sm font-semibold mb-4">Tiến độ Milestone</h3>
				<div className="space-y-3">
					{project.milestones.map((ms) => {
						const cfg = MILESTONE_STATUS[ms.status];
						const StatusIcon = cfg.icon;
						return (
							<div key={ms.id} className="flex items-center gap-3">
								<StatusIcon className={cn("h-4 w-4 shrink-0", cfg.className)} />
								<span className="text-sm w-48 truncate">{ms.name}</span>
								<div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
									<div
										className={cn(
											"h-full rounded-full",
											ms.progress === 100
												? "bg-success"
												: ms.progress > 0
													? "bg-primary"
													: "bg-muted",
										)}
										style={{ width: `${ms.progress}%` }}
									/>
								</div>
								<span className="text-xs font-medium w-10 text-right">{ms.progress}%</span>
							</div>
						);
					})}
				</div>
			</div>

			{/* Two-column: Team + Documents */}
			<div className="grid lg:grid-cols-2 gap-6">
				{/* Team */}
				<div className="bg-card border border-border rounded-xl p-5">
					<h3 className="text-sm font-semibold mb-4">Thành viên</h3>
					<div className="space-y-3">
						{project.members.map((member, i) => (
							<div key={member.id} className="flex items-center gap-3">
								<div
									className={cn(
										"h-9 w-9 rounded-full flex items-center justify-center text-xs font-semibold",
										[
											"bg-primary text-primary-foreground",
											"bg-success text-success-foreground",
											"bg-warning text-warning-foreground",
											"bg-navy text-white",
										][i % 4],
									)}
								>
									{member.name
										.split(" ")
										.map((w) => w[0])
										.slice(-2)
										.join("")}
								</div>
								<div>
									<p className="text-sm font-medium">{member.name}</p>
									<p className="text-xs text-muted-foreground">{member.role}</p>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Recent Documents */}
				<div className="bg-card border border-border rounded-xl p-5">
					<h3 className="text-sm font-semibold mb-4">Tài liệu gần đây</h3>
					{project.documents.length === 0 ? (
						<p className="text-sm text-muted-foreground">Chưa có tài liệu</p>
					) : (
						<div className="space-y-3">
							{project.documents.slice(0, 3).map((doc) => (
								<div
									key={doc.id}
									className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
								>
									<div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
										<FileText className="h-4 w-4 text-primary" />
									</div>
									<div className="flex-1 min-w-0">
										<p className="text-sm font-medium truncate">{doc.name}</p>
										<p className="text-xs text-muted-foreground">
											{doc.size} · {doc.uploadedBy}
										</p>
									</div>
									<span className="text-xs text-muted-foreground">
										{formatDate(doc.uploadedAt)}
									</span>
								</div>
							))}
						</div>
					)}
				</div>
			</div>

			{/* Activity Timeline */}
			<div className="bg-card border border-border rounded-xl p-5">
				<h3 className="text-sm font-semibold mb-4">Hoạt động gần đây</h3>
				<div className="space-y-4">
					{project.activities.slice(0, 5).map((activity, i) => (
						<div key={activity.id} className="flex gap-3">
							<div className="flex flex-col items-center">
								<div className="h-2 w-2 rounded-full bg-primary mt-2" />
								{i < Math.min(project.activities.length, 5) - 1 && (
									<div className="w-px flex-1 bg-border mt-1" />
								)}
							</div>
							<div className="pb-4">
								<p className="text-sm font-medium">{activity.action}</p>
								{activity.detail && (
									<p className="text-xs text-muted-foreground mt-0.5">{activity.detail}</p>
								)}
								<p className="text-xs text-muted-foreground mt-1">
									{activity.user} · {formatDate(activity.timestamp)}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

function MilestonesTab({
	milestones,
}: {
	milestones: (typeof MOCK_PROJECTS)[number]["milestones"];
}) {
	return (
		<div className="bg-card border border-border rounded-xl overflow-hidden">
			<div className="overflow-x-auto">
				<table className="w-full text-sm">
					<thead>
						<tr className="border-b border-border bg-muted/50">
							<th className="text-left font-medium text-muted-foreground px-5 py-3">Tên</th>
							<th className="text-left font-medium text-muted-foreground px-5 py-3">Trạng thái</th>
							<th className="text-left font-medium text-muted-foreground px-5 py-3">Tiến độ</th>
							<th className="text-left font-medium text-muted-foreground px-5 py-3">Hạn</th>
							<th className="text-right font-medium text-muted-foreground px-5 py-3">Ngân sách</th>
						</tr>
					</thead>
					<tbody>
						{milestones.map((ms) => {
							const cfg = MILESTONE_STATUS[ms.status];
							const StatusIcon = cfg.icon;
							return (
								<tr
									key={ms.id}
									className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
								>
									<td className="px-5 py-3.5 font-medium">{ms.name}</td>
									<td className="px-5 py-3.5">
										<span className={cn("inline-flex items-center gap-1.5", cfg.className)}>
											<StatusIcon className="h-3.5 w-3.5" />
											{cfg.label}
										</span>
									</td>
									<td className="px-5 py-3.5">
										<div className="flex items-center gap-2">
											<div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
												<div
													className={cn(
														"h-full rounded-full",
														ms.progress === 100 ? "bg-success" : "bg-primary",
													)}
													style={{ width: `${ms.progress}%` }}
												/>
											</div>
											<span className="text-xs font-medium">{ms.progress}%</span>
										</div>
									</td>
									<td className="px-5 py-3.5 text-muted-foreground">{formatDate(ms.dueDate)}</td>
									<td className="px-5 py-3.5 text-right font-medium">
										{formatCurrency(ms.budget)}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}

function MembersTab({ members }: { members: (typeof MOCK_PROJECTS)[number]["members"] }) {
	return (
		<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{members.map((member, i) => (
				<div
					key={member.id}
					className="bg-card border border-border rounded-xl p-5 flex items-center gap-4"
				>
					<div
						className={cn(
							"h-12 w-12 rounded-full flex items-center justify-center text-sm font-semibold shrink-0",
							[
								"bg-primary text-primary-foreground",
								"bg-success text-success-foreground",
								"bg-warning text-warning-foreground",
								"bg-navy text-white",
							][i % 4],
						)}
					>
						{member.name
							.split(" ")
							.map((w) => w[0])
							.slice(-2)
							.join("")}
					</div>
					<div className="min-w-0">
						<p className="font-semibold text-sm truncate">{member.name}</p>
						<p className="text-xs text-muted-foreground">{member.role}</p>
					</div>
				</div>
			))}
		</div>
	);
}

function DocumentsTab({ documents }: { documents: (typeof MOCK_PROJECTS)[number]["documents"] }) {
	if (documents.length === 0) {
		return (
			<div className="text-center py-16 text-muted-foreground">
				<FileText className="h-10 w-10 mx-auto mb-3 opacity-50" />
				<p className="text-sm">Chưa có tài liệu nào</p>
			</div>
		);
	}

	return (
		<div className="bg-card border border-border rounded-xl divide-y divide-border">
			{documents.map((doc) => (
				<div
					key={doc.id}
					className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors"
				>
					<div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
						<FileText className="h-5 w-5 text-primary" />
					</div>
					<div className="flex-1 min-w-0">
						<p className="text-sm font-medium truncate">{doc.name}</p>
						<p className="text-xs text-muted-foreground">
							{doc.type} · {doc.size} · Tải lên bởi {doc.uploadedBy}
						</p>
					</div>
					<span className="text-xs text-muted-foreground hidden sm:block">
						{formatDate(doc.uploadedAt)}
					</span>
					<button className="p-2 rounded-md hover:bg-muted text-muted-foreground transition-colors cursor-pointer">
						<Download className="h-4 w-4" />
					</button>
				</div>
			))}
		</div>
	);
}

function ActivitiesTab({
	activities,
}: {
	activities: (typeof MOCK_PROJECTS)[number]["activities"];
}) {
	return (
		<div className="bg-card border border-border rounded-xl p-5">
			<div className="space-y-4">
				{activities.map((activity, i) => (
					<div key={activity.id} className="flex gap-3">
						<div className="flex flex-col items-center">
							<div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
								<Clock className="h-4 w-4 text-primary" />
							</div>
							{i < activities.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
						</div>
						<div className="pb-5">
							<p className="text-sm font-medium">{activity.action}</p>
							{activity.detail && (
								<p className="text-sm text-muted-foreground mt-0.5">{activity.detail}</p>
							)}
							<p className="text-xs text-muted-foreground mt-1.5">
								<User className="h-3 w-3 inline mr-1" />
								{activity.user} · {formatDate(activity.timestamp)}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
