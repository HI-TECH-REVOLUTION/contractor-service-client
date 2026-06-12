"use client";

import { useState } from "react";
import { Settings, User, Bell, Globe, Lock, AlertTriangle, ChevronRight } from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
	const user = useAuthStore((s) => s.user);
	const { locale, setLocale } = useI18n();

	const [emailNotif, setEmailNotif] = useState(true);
	const [pushNotif, setPushNotif] = useState(true);
	const [inAppNotif, setInAppNotif] = useState(true);
	const [toastMessage, setToastMessage] = useState<string | null>(null);

	const showToast = (msg: string) => {
		setToastMessage(msg);
		setTimeout(() => setToastMessage(null), 3000);
	};

	return (
		<div className="p-6 lg:p-8 max-w-3xl mx-auto">
			{/* Toast */}
			{toastMessage && (
				<div className="fixed top-6 right-6 z-50 bg-navy text-white px-5 py-3 rounded-lg shadow-lg text-sm animate-in fade-in slide-in-from-top-2">
					{toastMessage}
				</div>
			)}

			{/* Header */}
			<div className="flex items-center gap-3 mb-8">
				<div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
					<Settings className="w-5 h-5 text-primary" />
				</div>
				<div>
					<h1 className="text-2xl font-bold text-foreground">Cài đặt</h1>
					<p className="text-sm text-muted-foreground">Quản lý tài khoản và tuỳ chỉnh</p>
				</div>
			</div>

			<div className="space-y-6">
				{/* Profile */}
				<section className="bg-card border border-border rounded-xl p-5">
					<div className="flex items-center gap-2 mb-4">
						<User className="w-4.5 h-4.5 text-muted-foreground" />
						<h2 className="font-semibold text-foreground">Hồ sơ cá nhân</h2>
					</div>
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-xs text-muted-foreground mb-0.5">Họ và tên</p>
								<p className="text-sm font-medium text-foreground">{user?.name ?? "—"}</p>
							</div>
							<button
								onClick={() => showToast("Tính năng đang phát triển")}
								className="text-sm text-primary hover:underline flex items-center gap-1"
							>
								Sửa <ChevronRight className="w-3.5 h-3.5" />
							</button>
						</div>
						<div className="border-t border-border" />
						<div className="flex items-center justify-between">
							<div>
								<p className="text-xs text-muted-foreground mb-0.5">Email</p>
								<p className="text-sm font-medium text-foreground">{user?.email ?? "—"}</p>
							</div>
							<button
								onClick={() => showToast("Tính năng đang phát triển")}
								className="text-sm text-primary hover:underline flex items-center gap-1"
							>
								Sửa <ChevronRight className="w-3.5 h-3.5" />
							</button>
						</div>
						<div className="border-t border-border" />
						<div className="flex items-center justify-between">
							<div>
								<p className="text-xs text-muted-foreground mb-0.5">Số điện thoại</p>
								<p className="text-sm font-medium text-foreground">{user?.phone ?? "—"}</p>
							</div>
							<button
								onClick={() => showToast("Tính năng đang phát triển")}
								className="text-sm text-primary hover:underline flex items-center gap-1"
							>
								Sửa <ChevronRight className="w-3.5 h-3.5" />
							</button>
						</div>
					</div>
				</section>

				{/* Notifications */}
				<section className="bg-card border border-border rounded-xl p-5">
					<div className="flex items-center gap-2 mb-4">
						<Bell className="w-4.5 h-4.5 text-muted-foreground" />
						<h2 className="font-semibold text-foreground">Thông báo</h2>
					</div>
					<div className="space-y-4">
						<ToggleRow
							label="Thông báo Email"
							description="Nhận thông báo qua email"
							checked={emailNotif}
							onChange={setEmailNotif}
						/>
						<div className="border-t border-border" />
						<ToggleRow
							label="Thông báo đẩy"
							description="Thông báo trên trình duyệt"
							checked={pushNotif}
							onChange={setPushNotif}
						/>
						<div className="border-t border-border" />
						<ToggleRow
							label="Thông báo trong ứng dụng"
							description="Hiển thị thông báo trong VERTEX"
							checked={inAppNotif}
							onChange={setInAppNotif}
						/>
					</div>
				</section>

				{/* Language */}
				<section className="bg-card border border-border rounded-xl p-5">
					<div className="flex items-center gap-2 mb-4">
						<Globe className="w-4.5 h-4.5 text-muted-foreground" />
						<h2 className="font-semibold text-foreground">Ngôn ngữ</h2>
					</div>
					<div className="flex gap-3">
						<button
							onClick={() => setLocale("vi")}
							className={cn(
								"px-4 py-2.5 rounded-lg text-sm font-medium border transition-colors",
								locale === "vi"
									? "border-primary bg-primary/5 text-primary"
									: "border-border text-muted-foreground hover:bg-gray-50",
							)}
						>
							🇻🇳 Tiếng Việt
						</button>
						<button
							onClick={() => setLocale("en")}
							className={cn(
								"px-4 py-2.5 rounded-lg text-sm font-medium border transition-colors",
								locale === "en"
									? "border-primary bg-primary/5 text-primary"
									: "border-border text-muted-foreground hover:bg-gray-50",
							)}
						>
							🇬🇧 English
						</button>
					</div>
				</section>

				{/* Security */}
				<section className="bg-card border border-border rounded-xl p-5">
					<div className="flex items-center gap-2 mb-4">
						<Lock className="w-4.5 h-4.5 text-muted-foreground" />
						<h2 className="font-semibold text-foreground">Bảo mật</h2>
					</div>
					<div className="space-y-3">
						<div>
							<label className="text-sm text-muted-foreground block mb-1.5">
								Mật khẩu hiện tại
							</label>
							<input
								type="password"
								disabled
								placeholder="••••••••"
								className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-gray-50 text-sm text-muted-foreground cursor-not-allowed"
							/>
						</div>
						<div>
							<label className="text-sm text-muted-foreground block mb-1.5">Mật khẩu mới</label>
							<input
								type="password"
								disabled
								placeholder="••••••••"
								className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-gray-50 text-sm text-muted-foreground cursor-not-allowed"
							/>
						</div>
						<button
							disabled
							className="px-4 py-2 bg-primary/50 text-white rounded-lg text-sm font-medium cursor-not-allowed opacity-60"
						>
							Đổi mật khẩu
						</button>
					</div>
				</section>

				{/* Danger zone */}
				<section className="border-2 border-destructive/30 rounded-xl p-5">
					<div className="flex items-center gap-2 mb-2">
						<AlertTriangle className="w-4.5 h-4.5 text-destructive" />
						<h2 className="font-semibold text-destructive">Vùng nguy hiểm</h2>
					</div>
					<p className="text-sm text-muted-foreground mb-4">
						Xoá tài khoản sẽ xoá toàn bộ dữ liệu và không thể khôi phục.
					</p>
					<button
						onClick={() => showToast("Tính năng đang phát triển")}
						className="px-4 py-2 border border-destructive text-destructive rounded-lg text-sm font-medium hover:bg-destructive/5 transition-colors"
					>
						Xoá tài khoản
					</button>
				</section>
			</div>
		</div>
	);
}

function ToggleRow({
	label,
	description,
	checked,
	onChange,
}: {
	label: string;
	description: string;
	checked: boolean;
	onChange: (v: boolean) => void;
}) {
	return (
		<div className="flex items-center justify-between">
			<div>
				<p className="text-sm font-medium text-foreground">{label}</p>
				<p className="text-xs text-muted-foreground">{description}</p>
			</div>
			<button
				onClick={() => onChange(!checked)}
				className={cn(
					"relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
					checked ? "bg-primary" : "bg-gray-200",
				)}
			>
				<span
					className={cn(
						"inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm",
						checked ? "translate-x-6" : "translate-x-1",
					)}
				/>
			</button>
		</div>
	);
}
