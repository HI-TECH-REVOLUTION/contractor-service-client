"use client";

import {
	Wallet,
	Building2,
	Shield,
	Banknote,
	CheckCircle2,
	Clock,
	ArrowDownRight,
} from "lucide-react";
import { MOCK_PAYMENTS } from "@/lib/mock-data";
import { cn, formatCurrency, formatDate } from "@/lib/utils";

const STATUS_CONFIG = {
	pending: { label: "Chờ xử lý", color: "text-warning", bg: "bg-orange-50" },
	processing: { label: "Đang xử lý", color: "text-blue-600", bg: "bg-blue-50" },
	completed: { label: "Hoàn tất", color: "text-success", bg: "bg-green-50" },
	failed: { label: "Thất bại", color: "text-destructive", bg: "bg-red-50" },
} as const;

const METHOD_CONFIG = {
	bank_transfer: { label: "Chuyển khoản", icon: Building2 },
	escrow: { label: "Escrow", icon: Shield },
	cash: { label: "Tiền mặt", icon: Banknote },
} as const;

export default function PaymentsPage() {
	const completedTotal = MOCK_PAYMENTS.filter((p) => p.status === "completed").reduce(
		(sum, p) => sum + p.amount,
		0,
	);
	const pendingTotal = MOCK_PAYMENTS.filter((p) => p.status === "pending").reduce(
		(sum, p) => sum + p.amount,
		0,
	);
	const escrowPending = MOCK_PAYMENTS.filter(
		(p) => p.method === "escrow" && p.status === "pending",
	).reduce((sum, p) => sum + p.amount, 0);

	return (
		<div className="p-6 lg:p-8 max-w-5xl mx-auto">
			{/* Header */}
			<div className="flex items-center gap-3 mb-6">
				<div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
					<Wallet className="w-5 h-5 text-primary" />
				</div>
				<div>
					<h1 className="text-2xl font-bold text-foreground">Thanh toán</h1>
					<p className="text-sm text-muted-foreground">Tổng quan thanh toán dự án</p>
				</div>
			</div>

			{/* Summary cards */}
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
				<div className="bg-card border border-border rounded-xl p-5">
					<div className="flex items-center gap-3 mb-3">
						<div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
							<CheckCircle2 className="w-4.5 h-4.5 text-success" />
						</div>
						<span className="text-sm text-muted-foreground">Tổng đã thanh toán</span>
					</div>
					<p className="text-2xl font-bold text-success">{formatCurrency(completedTotal)}</p>
				</div>
				<div className="bg-card border border-border rounded-xl p-5">
					<div className="flex items-center gap-3 mb-3">
						<div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center">
							<Clock className="w-4.5 h-4.5 text-warning" />
						</div>
						<span className="text-sm text-muted-foreground">Đang chờ xử lý</span>
					</div>
					<p className="text-2xl font-bold text-warning">{formatCurrency(pendingTotal)}</p>
				</div>
				<div className="bg-card border border-border rounded-xl p-5">
					<div className="flex items-center gap-3 mb-3">
						<div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
							<Shield className="w-4.5 h-4.5 text-primary" />
						</div>
						<span className="text-sm text-muted-foreground">Escrow đang giữ</span>
					</div>
					<p className="text-2xl font-bold text-primary">{formatCurrency(escrowPending)}</p>
				</div>
			</div>

			{/* Payment methods */}
			<h2 className="text-lg font-semibold text-foreground mb-3">Phương thức thanh toán</h2>
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
				{(
					Object.entries(METHOD_CONFIG) as [
						keyof typeof METHOD_CONFIG,
						(typeof METHOD_CONFIG)[keyof typeof METHOD_CONFIG],
					][]
				).map(([key, { label, icon: Icon }]) => (
					<div
						key={key}
						className="bg-card border border-border rounded-xl p-4 flex items-center gap-3"
					>
						<div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
							<Icon className="w-5 h-5 text-foreground" />
						</div>
						<span className="text-sm font-medium text-foreground">{label}</span>
					</div>
				))}
			</div>

			{/* Transaction list */}
			<h2 className="text-lg font-semibold text-foreground mb-3">Giao dịch</h2>
			<div className="bg-card border border-border rounded-xl divide-y divide-border">
				{MOCK_PAYMENTS.map((p) => {
					const status = STATUS_CONFIG[p.status];
					const method = METHOD_CONFIG[p.method];

					return (
						<div key={p.id} className="p-4 flex items-center gap-4">
							<div
								className={cn(
									"w-10 h-10 rounded-full flex items-center justify-center shrink-0",
									p.status === "completed" ? "bg-green-50" : "bg-gray-100",
								)}
							>
								<ArrowDownRight
									className={cn(
										"w-5 h-5",
										p.status === "completed" ? "text-success" : "text-muted-foreground",
									)}
								/>
							</div>
							<div className="flex-1 min-w-0">
								<p className="text-sm font-medium text-foreground truncate">{p.description}</p>
								<div className="flex items-center gap-2 mt-1">
									<span className={cn("text-xs px-2 py-0.5 rounded-full", status.bg, status.color)}>
										{status.label}
									</span>
									<span className="text-xs text-muted-foreground">{method.label}</span>
								</div>
							</div>
							<div className="text-right shrink-0">
								<p
									className={cn(
										"font-semibold",
										p.status === "completed" ? "text-success" : "text-muted-foreground",
									)}
								>
									{formatCurrency(p.amount)}
								</p>
								<p className="text-xs text-muted-foreground mt-0.5">
									{formatDate(p.paidAt ?? p.createdAt)}
								</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
