"use client";

import { useState } from "react";
import { ScrollText, Calendar, CheckCircle2, Clock, PenLine } from "lucide-react";
import { MOCK_CONTRACTS, MOCK_PROJECTS } from "@/lib/mock-data";
import { cn, formatCurrency, formatDate } from "@/lib/utils";

const CURRENT_TIME = Date.now();

const STATUS_CONFIG = {
	draft: { label: "Nháp", bg: "bg-gray-100", text: "text-gray-700" },
	sent: { label: "Đã gửi", bg: "bg-blue-50", text: "text-blue-700" },
	signed: { label: "Đã ký", bg: "bg-emerald-50", text: "text-emerald-700" },
	active: { label: "Đang thực hiện", bg: "bg-green-50", text: "text-green-700" },
	completed: { label: "Hoàn thành", bg: "bg-purple-50", text: "text-purple-700" },
	terminated: { label: "Đã huỷ", bg: "bg-red-50", text: "text-red-700" },
} as const;

export default function ContractsPage() {
	const [toastMessage, setToastMessage] = useState<string | null>(null);

	const getProjectName = (projectId: string) =>
		MOCK_PROJECTS.find((p) => p.id === projectId)?.name ?? projectId;

	const handleSign = (contractId: string) => {
		setToastMessage("Đã ký thành công");
		setTimeout(() => setToastMessage(null), 3000);
		void contractId;
	};

	const getProgress = (startDate: string, endDate: string) => {
		const start = new Date(startDate).getTime();
		const end = new Date(endDate).getTime();
		if (CURRENT_TIME <= start) return 0;
		if (CURRENT_TIME >= end) return 100;
		return Math.round(((CURRENT_TIME - start) / (end - start)) * 100);
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
					<ScrollText className="w-5 h-5 text-primary" />
				</div>
				<div>
					<h1 className="text-2xl font-bold text-foreground">Hợp đồng</h1>
					<p className="text-sm text-muted-foreground">Quản lý hợp đồng dự án</p>
				</div>
			</div>

			{/* Contract cards */}
			<div className="space-y-4">
				{MOCK_CONTRACTS.map((c) => {
					const status = STATUS_CONFIG[c.status];
					const progress = getProgress(c.startDate, c.endDate);
					const canSign = c.status === "draft" || c.status === "sent";

					return (
						<div key={c.id} className="bg-card border border-border rounded-xl p-5">
							<div className="flex items-start justify-between gap-4 mb-4">
								<div className="flex-1 min-w-0">
									<div className="flex items-center gap-3 mb-1">
										<h3 className="font-semibold text-foreground truncate">
											{c.partnerName} — {getProjectName(c.projectId)}
										</h3>
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
									<p className="text-xl font-bold text-foreground mt-2">
										{formatCurrency(c.totalValue)}
									</p>
								</div>
								{canSign && (
									<button
										onClick={() => handleSign(c.id)}
										className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity shrink-0"
									>
										<PenLine className="w-4 h-4" />
										Ký hợp đồng
									</button>
								)}
							</div>

							{/* Info grid */}
							<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm mb-4">
								<div>
									<p className="text-muted-foreground mb-0.5">Thời gian</p>
									<p className="font-medium text-foreground flex items-center gap-1.5">
										<Calendar className="w-3.5 h-3.5 text-muted-foreground" />
										{formatDate(c.startDate)} → {formatDate(c.endDate)}
									</p>
								</div>
								{c.signedAt && (
									<div>
										<p className="text-muted-foreground mb-0.5">Ngày ký</p>
										<p className="font-medium text-foreground flex items-center gap-1.5">
											<CheckCircle2 className="w-3.5 h-3.5 text-success" />
											{formatDate(c.signedAt)}
										</p>
									</div>
								)}
								{!c.signedAt && (
									<div>
										<p className="text-muted-foreground mb-0.5">Trạng thái ký</p>
										<p className="font-medium text-muted-foreground flex items-center gap-1.5">
											<Clock className="w-3.5 h-3.5" />
											Chưa ký
										</p>
									</div>
								)}
							</div>

							{/* Progress */}
							{(c.status === "active" || c.status === "completed") && (
								<div>
									<div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
										<span>Tiến độ</span>
										<span>{progress}%</span>
									</div>
									<div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
										<div
											className="h-full bg-primary rounded-full transition-all"
											style={{ width: `${progress}%` }}
										/>
									</div>
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}
