"use client";

import { useState } from "react";
import {
	Bell,
	CreditCard,
	MessageSquare,
	FileText,
	FolderKanban,
	Settings,
	CheckCheck,
} from "lucide-react";
import { MOCK_NOTIFICATIONS } from "@/lib/mock-data";
import type { Notification } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type FilterType = "all" | "unread" | "project" | "payment" | "message";

const FILTERS: { value: FilterType; label: string }[] = [
	{ value: "all", label: "Tất cả" },
	{ value: "unread", label: "Chưa đọc" },
	{ value: "project", label: "Dự án" },
	{ value: "payment", label: "Thanh toán" },
	{ value: "message", label: "Tin nhắn" },
];

const TYPE_CONFIG = {
	payment: { icon: CreditCard, bg: "bg-green-50", color: "text-success" },
	message: { icon: MessageSquare, bg: "bg-blue-50", color: "text-primary" },
	document: { icon: FileText, bg: "bg-orange-50", color: "text-warning" },
	project: { icon: FolderKanban, bg: "bg-purple-50", color: "text-purple-600" },
	system: { icon: Settings, bg: "bg-gray-100", color: "text-muted-foreground" },
} as const;

function timeAgo(dateStr: string): string {
	const now = new Date();
	const date = new Date(dateStr);
	const diffMs = now.getTime() - date.getTime();
	const diffMinutes = Math.floor(diffMs / 60000);
	const diffHours = Math.floor(diffMinutes / 60);
	const diffDays = Math.floor(diffHours / 24);

	if (diffMinutes < 1) return "Vừa xong";
	if (diffMinutes < 60) return `${diffMinutes} phút trước`;
	if (diffHours < 24) return `${diffHours} giờ trước`;
	if (diffDays < 7) return `${diffDays} ngày trước`;
	return new Intl.DateTimeFormat("vi-VN").format(date);
}

export default function NotificationsPage() {
	const [filter, setFilter] = useState<FilterType>("all");
	const [notifications, setNotifications] = useState<Notification[]>(() => [...MOCK_NOTIFICATIONS]);

	const filtered = notifications.filter((n) => {
		if (filter === "all") return true;
		if (filter === "unread") return !n.read;
		return n.type === filter;
	});

	const unreadCount = notifications.filter((n) => !n.read).length;

	const markAllRead = () => {
		setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
	};

	const toggleRead = (id: string) => {
		setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
	};

	return (
		<div className="p-6 lg:p-8 max-w-3xl mx-auto">
			{/* Header */}
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center gap-3">
					<div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
						<Bell className="w-5 h-5 text-primary" />
					</div>
					<div>
						<h1 className="text-2xl font-bold text-foreground">
							Thông báo
							{unreadCount > 0 && (
								<span className="ml-2 text-sm font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
									{unreadCount}
								</span>
							)}
						</h1>
						<p className="text-sm text-muted-foreground">Cập nhật mới nhất</p>
					</div>
				</div>
				{unreadCount > 0 && (
					<button
						onClick={markAllRead}
						className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
					>
						<CheckCheck className="w-4 h-4" />
						Đánh dấu đã đọc
					</button>
				)}
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

			{/* Notification list */}
			<div className="bg-card border border-border rounded-xl divide-y divide-border overflow-hidden">
				{filtered.length === 0 && (
					<div className="text-center py-16 text-muted-foreground text-sm">
						Không có thông báo nào
					</div>
				)}

				{filtered.map((n) => {
					const config = TYPE_CONFIG[n.type];
					const Icon = config.icon;

					return (
						<button
							key={n.id}
							onClick={() => toggleRead(n.id)}
							className={cn(
								"w-full flex items-start gap-4 p-4 text-left hover:bg-gray-50/50 transition-colors",
								!n.read && "bg-primary/2",
							)}
						>
							<div
								className={cn(
									"w-10 h-10 rounded-full flex items-center justify-center shrink-0",
									config.bg,
								)}
							>
								<Icon className={cn("w-5 h-5", config.color)} />
							</div>
							<div className="flex-1 min-w-0">
								<p
									className={cn(
										"text-sm text-foreground",
										!n.read ? "font-semibold" : "font-normal",
									)}
								>
									{n.title}
								</p>
								<p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">{n.description}</p>
								<p className="text-xs text-muted-foreground mt-1.5">{timeAgo(n.createdAt)}</p>
							</div>
							{!n.read && <span className="w-2.5 h-2.5 rounded-full bg-primary shrink-0 mt-1.5" />}
						</button>
					);
				})}
			</div>
		</div>
	);
}
