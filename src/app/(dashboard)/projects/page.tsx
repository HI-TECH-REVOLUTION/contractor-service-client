"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Plus, Search, MapPin, Calendar, Users } from "lucide-react";
import { MOCK_PROJECTS, type ProjectStatus } from "@/lib/mock-data";
import { useI18n } from "@/lib/i18n";
import { cn, formatCurrency, formatDate } from "@/lib/utils";

const STATUS_CONFIG: Record<ProjectStatus, { label: string; className: string }> = {
	draft: { label: "Nháp", className: "bg-gray-100 text-gray-600" },
	active: { label: "Đang hoạt động", className: "bg-blue-50 text-blue-600" },
	in_progress: { label: "Đang thực hiện", className: "bg-green-50 text-green-600" },
	completed: { label: "Hoàn thành", className: "bg-emerald-50 text-emerald-700" },
};

type FilterTab = "all" | "in_progress" | "completed" | "draft";

const FILTER_TABS: { key: FilterTab; labelKey: string }[] = [
	{ key: "all", labelKey: "projects.all" },
	{ key: "in_progress", labelKey: "projects.active" },
	{ key: "completed", labelKey: "projects.completed" },
	{ key: "draft", labelKey: "projects.draft" },
];

function getAverageProgress(milestones: { progress: number }[]) {
	if (milestones.length === 0) return 0;
	return Math.round(milestones.reduce((sum, m) => sum + m.progress, 0) / milestones.length);
}

export default function ProjectsPage() {
	const { t } = useI18n();
	const [activeTab, setActiveTab] = useState<FilterTab>("all");
	const [searchQuery, setSearchQuery] = useState("");

	const filteredProjects = useMemo(() => {
		return MOCK_PROJECTS.filter((p) => {
			const matchesTab =
				activeTab === "all" ||
				(activeTab === "in_progress"
					? p.status === "in_progress" || p.status === "active"
					: p.status === activeTab);
			const matchesSearch =
				searchQuery === "" ||
				p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				p.location.toLowerCase().includes(searchQuery.toLowerCase());
			return matchesTab && matchesSearch;
		});
	}, [activeTab, searchQuery]);

	return (
		<div className="p-6 lg:p-8 max-w-6xl mx-auto">
			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
				<h1 className="text-2xl font-bold tracking-tight">{t("projects.title")}</h1>
				<Link
					href="/projects/new"
					className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition w-fit"
				>
					<Plus className="h-4 w-4" />
					{t("projects.create")}
				</Link>
			</div>

			{/* Filters & Search */}
			<div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
				<div className="flex gap-1 bg-card border border-border rounded-lg p-1">
					{FILTER_TABS.map(({ key, labelKey }) => (
						<button
							key={key}
							onClick={() => setActiveTab(key)}
							className={cn(
								"px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer",
								activeTab === key
									? "bg-primary text-primary-foreground"
									: "text-muted-foreground hover:text-foreground hover:bg-muted",
							)}
						>
							{t(labelKey)}
						</button>
					))}
				</div>

				<div className="relative flex-1 max-w-sm">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
					<input
						type="text"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder={t("projects.search")}
						className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition text-sm"
					/>
				</div>
			</div>

			{/* Project List */}
			<div className="space-y-3">
				{filteredProjects.length === 0 ? (
					<div className="text-center py-16 text-muted-foreground">
						<p className="text-lg font-medium">{t("common.noData")}</p>
					</div>
				) : (
					filteredProjects.map((project) => {
						const progress = getAverageProgress(project.milestones);
						const statusConfig = STATUS_CONFIG[project.status];

						return (
							<Link
								key={project.id}
								href={`/projects/${project.id}`}
								className="block bg-card border border-border rounded-xl p-5 hover:border-primary/30 hover:shadow-sm transition-all group"
							>
								<div className="flex flex-col lg:flex-row lg:items-start gap-4">
									{/* Left: Main info */}
									<div className="flex-1 min-w-0">
										<div className="flex items-start gap-3 mb-2">
											<h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors truncate">
												{project.name}
											</h3>
											<span
												className={cn(
													"shrink-0 px-2.5 py-0.5 rounded-full text-xs font-medium",
													statusConfig.className,
												)}
											>
												{statusConfig.label}
											</span>
										</div>

										<p className="text-sm text-muted-foreground line-clamp-2 mb-3">
											{project.description}
										</p>

										<div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
											<span className="inline-flex items-center gap-1.5">
												<MapPin className="h-3.5 w-3.5" />
												{project.location}
											</span>
											<span className="font-medium text-foreground">
												{formatCurrency(project.budget)}
											</span>
											<span className="inline-flex items-center gap-1.5">
												<Calendar className="h-3.5 w-3.5" />
												{formatDate(project.startDate)}
											</span>
										</div>
									</div>

									{/* Right: Members + Progress */}
									<div className="flex items-center gap-6 lg:flex-col lg:items-end lg:gap-3">
										{/* Members */}
										<div className="flex items-center gap-2">
											<div className="flex -space-x-2">
												{project.members.slice(0, 4).map((member, i) => (
													<div
														key={member.id}
														className={cn(
															"h-8 w-8 rounded-full border-2 border-card flex items-center justify-center text-xs font-semibold",
															[
																"bg-primary text-primary-foreground",
																"bg-success text-success-foreground",
																"bg-warning text-warning-foreground",
																"bg-navy text-white",
															][i % 4],
														)}
														title={member.name}
													>
														{member.name
															.split(" ")
															.map((w) => w[0])
															.slice(-2)
															.join("")}
													</div>
												))}
												{project.members.length > 4 && (
													<div className="h-8 w-8 rounded-full border-2 border-card bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
														+{project.members.length - 4}
													</div>
												)}
											</div>
											<span className="text-xs text-muted-foreground hidden sm:inline">
												<Users className="h-3.5 w-3.5 inline mr-1" />
												{project.members.length}
											</span>
										</div>

										{/* Progress */}
										<div className="w-32 lg:w-36">
											<div className="flex items-center justify-between mb-1">
												<span className="text-xs text-muted-foreground">Tiến độ</span>
												<span className="text-xs font-semibold text-foreground">{progress}%</span>
											</div>
											<div className="h-2 bg-muted rounded-full overflow-hidden">
												<div
													className={cn(
														"h-full rounded-full transition-all",
														progress === 100 ? "bg-success" : "bg-primary",
													)}
													style={{ width: `${progress}%` }}
												/>
											</div>
										</div>
									</div>
								</div>
							</Link>
						);
					})
				)}
			</div>
		</div>
	);
}
