"use client";

import { useState } from "react";
import { FileText, ChevronDown, ChevronUp, Check, X, Calendar, Clock } from "lucide-react";
import { MOCK_QUOTATIONS, MOCK_PROJECTS } from "@/lib/mock-data";
import { cn, formatCurrency, formatDate } from "@/lib/utils";

type StatusFilter = "all" | "draft" | "sent" | "accepted" | "rejected";

const STATUS_CONFIG = {
	draft: { label: "Nháp", bg: "bg-gray-100", text: "text-gray-700" },
	sent: { label: "Đã gửi", bg: "bg-blue-50", text: "text-blue-700" },
	accepted: { label: "Chấp nhận", bg: "bg-green-50", text: "text-green-700" },
	rejected: { label: "Từ chối", bg: "bg-red-50", text: "text-red-700" },
	revised: { label: "Đã sửa", bg: "bg-orange-50", text: "text-orange-700" },
} as const;

const FILTERS: { value: StatusFilter; label: string }[] = [
	{ value: "all", label: "Tất cả" },
	{ value: "draft", label: "Nháp" },
	{ value: "sent", label: "Đã gửi" },
	{ value: "accepted", label: "Chấp nhận" },
	{ value: "rejected", label: "Từ chối" },
];

export default function QuotationsPage() {
	const [filter, setFilter] = useState<StatusFilter>("all");
	const [expandedId, setExpandedId] = useState<string | null>(null);
	const [toastMessage, setToastMessage] = useState<string | null>(null);

	const quotations =
		filter === "all" ? MOCK_QUOTATIONS : MOCK_QUOTATIONS.filter((q) => q.status === filter);

	const getProjectName = (projectId: string) =>
		MOCK_PROJECTS.find((p) => p.id === projectId)?.name ?? projectId;

	const handleAction = (action: "accept" | "reject", id: string) => {
		const label = action === "accept" ? "Đã chấp nhận" : "Đã từ chối";
		setToastMessage(`${label} báo giá ${id}`);
		setTimeout(() => setToastMessage(null), 3000);
	};

	return (
		<div className="p-6 lg:p-8 max-w-5xl mx-auto">
			{/* Toast */}
			{toastMessage && (
				<div className="fixed top-6 right-6 z-50 bg-navy text-white px-5 py-3 rounded-lg shadow-lg text-sm animate-in fade-in slide-in-from-top-2">
					{toastMessage}
				</div>
			)}

			{/* Header */}
			<div className="flex items-center gap-3 mb-6">
				<div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
					<FileText className="w-5 h-5 text-primary" />
				</div>
				<div>
					<h1 className="text-2xl font-bold text-foreground">Báo giá</h1>
					<p className="text-sm text-muted-foreground">Quản lý các báo giá dự án</p>
				</div>
			</div>

			{/* Filter tabs */}
			<div className="flex gap-2 mb-6 flex-wrap">
				{FILTERS.map((f) => (
					<button
						key={f.value}
						onClick={() => setFilter(f.value)}
						className={cn(
							"px-4 py-2 rounded-lg text-sm font-medium transition-colors",
							filter === f.value
								? "bg-primary text-white"
								: "bg-card text-muted-foreground hover:bg-gray-100 border border-border",
						)}
					>
						{f.label}
					</button>
				))}
			</div>

			{/* Quotation list */}
			<div className="space-y-4">
				{quotations.length === 0 && (
					<div className="text-center py-16 text-muted-foreground">Không có báo giá nào</div>
				)}

				{quotations.map((q) => {
					const expanded = expandedId === q.id;
					const status = STATUS_CONFIG[q.status];

					return (
						<div key={q.id} className="bg-card border border-border rounded-xl overflow-hidden">
							{/* Card header */}
							<div className="p-5">
								<div className="flex items-start justify-between gap-4">
									<div className="flex-1 min-w-0">
										<div className="flex items-center gap-3 mb-2">
											<h3 className="font-semibold text-foreground truncate">{q.partnerName}</h3>
											<span
												className={cn(
													"px-2.5 py-0.5 rounded-full text-xs font-medium shrink-0",
													status.bg,
													status.text,
												)}
											>
												{status.label}
											</span>
										</div>
										<p className="text-sm text-muted-foreground mb-3">
											{getProjectName(q.projectId)}
										</p>
										<div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted-foreground">
											<span className="flex items-center gap-1.5">
												<Calendar className="w-3.5 h-3.5" />
												{formatDate(q.createdAt)}
											</span>
											<span className="flex items-center gap-1.5">
												<Clock className="w-3.5 h-3.5" />
												HSD: {formatDate(q.validUntil)}
											</span>
										</div>
									</div>
									<div className="text-right shrink-0">
										<p className="text-lg font-bold text-foreground">
											{formatCurrency(q.totalAmount)}
										</p>
										<button
											onClick={() => setExpandedId(expanded ? null : q.id)}
											className="mt-2 inline-flex items-center gap-1 text-sm text-primary hover:underline"
										>
											Xem chi tiết
											{expanded ? (
												<ChevronUp className="w-4 h-4" />
											) : (
												<ChevronDown className="w-4 h-4" />
											)}
										</button>
									</div>
								</div>
							</div>

							{/* Expanded detail */}
							{expanded && (
								<div className="border-t border-border">
									<div className="overflow-x-auto">
										<table className="w-full text-sm">
											<thead>
												<tr className="bg-gray-50 text-left text-muted-foreground">
													<th className="px-5 py-3 font-medium">Mô tả</th>
													<th className="px-5 py-3 font-medium text-center">Đơn vị</th>
													<th className="px-5 py-3 font-medium text-right">SL</th>
													<th className="px-5 py-3 font-medium text-right">Đơn giá</th>
													<th className="px-5 py-3 font-medium text-right">Thành tiền</th>
												</tr>
											</thead>
											<tbody>
												{q.items.map((item) => (
													<tr key={item.id} className="border-t border-border">
														<td className="px-5 py-3 text-foreground">{item.description}</td>
														<td className="px-5 py-3 text-center text-muted-foreground">
															{item.unit}
														</td>
														<td className="px-5 py-3 text-right">{item.quantity}</td>
														<td className="px-5 py-3 text-right">
															{formatCurrency(item.unitPrice)}
														</td>
														<td className="px-5 py-3 text-right font-medium">
															{formatCurrency(item.total)}
														</td>
													</tr>
												))}
											</tbody>
											<tfoot>
												<tr className="border-t-2 border-border bg-gray-50">
													<td colSpan={4} className="px-5 py-3 text-right font-semibold">
														Tổng cộng
													</td>
													<td className="px-5 py-3 text-right font-bold text-primary">
														{formatCurrency(q.totalAmount)}
													</td>
												</tr>
											</tfoot>
										</table>
									</div>

									{q.status === "sent" && (
										<div className="flex justify-end gap-3 px-5 py-4 border-t border-border bg-gray-50/50">
											<button
												onClick={() => handleAction("reject", q.id)}
												className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-gray-100 transition-colors"
											>
												<X className="w-4 h-4" />
												Từ chối
											</button>
											<button
												onClick={() => handleAction("accept", q.id)}
												className="inline-flex items-center gap-2 px-4 py-2 bg-success text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
											>
												<Check className="w-4 h-4" />
												Chấp nhận
											</button>
										</div>
									)}
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}
