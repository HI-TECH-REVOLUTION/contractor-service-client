"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore, type UserRole } from "@/lib/auth-store";
import { useI18n } from "@/lib/i18n";

const ROLES: { role: UserRole; emoji: string; labelKey: string }[] = [
	{ role: "customer", emoji: "🏠", labelKey: "role.customer" },
	{ role: "designer", emoji: "📐", labelKey: "role.designer" },
	{ role: "contractor", emoji: "🔨", labelKey: "role.contractor" },
];

export default function RegisterPage() {
	const router = useRouter();
	const { loginAs } = useAuthStore();
	const { t, locale, setLocale } = useI18n();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [selectedRole, setSelectedRole] = useState<UserRole>("customer");

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		loginAs(selectedRole);
		router.push("/dashboard");
	}

	return (
		<>
			{/* Language switcher */}
			<div className="flex justify-end mb-4">
				<button
					onClick={() => setLocale(locale === "vi" ? "en" : "vi")}
					className="text-sm text-white/70 hover:text-white transition-colors font-mono tracking-wide"
				>
					{locale === "vi" ? "EN" : "VI"}
				</button>
			</div>

			<div className="bg-white rounded-2xl shadow-2xl p-8">
				{/* Logo & tagline */}
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold tracking-tight text-(--color-navy)">VERTEX</h1>
					<p className="text-sm text-(--color-muted-foreground) mt-1">
						{locale === "vi"
							? "Nền tảng kết nối xây dựng Việt Nam"
							: "Trust Infrastructure for Vietnam's Construction"}
					</p>
				</div>

				{/* Title */}
				<div className="text-center mb-6">
					<h2 className="text-xl font-semibold text-(--color-foreground)">
						{t("auth.registerTitle")}
					</h2>
					<p className="text-sm text-(--color-muted-foreground) mt-1">{t("auth.registerSub")}</p>
				</div>

				{/* Role selection */}
				<div className="mb-6">
					<label className="block text-sm font-medium text-(--color-foreground) mb-2">
						{t("auth.selectRole")}
					</label>
					<div className="grid grid-cols-3 gap-2">
						{ROLES.map(({ role, emoji, labelKey }) => (
							<button
								key={role}
								type="button"
								onClick={() => setSelectedRole(role)}
								className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl border-2 text-sm font-medium transition cursor-pointer ${
									selectedRole === role
										? "border-(--color-primary) bg-(--color-primary)/5 text-(--color-primary)"
										: "border-(--color-border) text-(--color-foreground) hover:border-(--color-muted-foreground)"
								}`}
							>
								<span className="text-xl">{emoji}</span>
								<span className="leading-tight text-center">{t(labelKey)}</span>
							</button>
						))}
					</div>
				</div>

				{/* Form */}
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label
							htmlFor="name"
							className="block text-sm font-medium text-(--color-foreground) mb-1.5"
						>
							{locale === "vi" ? "Họ và tên" : "Full name"}
						</label>
						<input
							id="name"
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder={locale === "vi" ? "Nguyễn Văn A" : "John Doe"}
							className="w-full px-4 py-2.5 rounded-lg border border-(--color-border) bg-white text-(--color-foreground) placeholder:text-(--color-muted-foreground) focus:outline-none focus:ring-2 focus:ring-(--color-primary) focus:border-transparent transition"
						/>
					</div>

					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-(--color-foreground) mb-1.5"
						>
							{t("auth.email")}
						</label>
						<input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="you@example.com"
							className="w-full px-4 py-2.5 rounded-lg border border-(--color-border) bg-white text-(--color-foreground) placeholder:text-(--color-muted-foreground) focus:outline-none focus:ring-2 focus:ring-(--color-primary) focus:border-transparent transition"
						/>
					</div>

					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-(--color-foreground) mb-1.5"
						>
							{t("auth.password")}
						</label>
						<input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="••••••••"
							className="w-full px-4 py-2.5 rounded-lg border border-(--color-border) bg-white text-(--color-foreground) placeholder:text-(--color-muted-foreground) focus:outline-none focus:ring-2 focus:ring-(--color-primary) focus:border-transparent transition"
						/>
					</div>

					<button
						type="submit"
						className="w-full py-2.5 rounded-lg bg-(--color-primary) text-white font-semibold hover:opacity-90 active:scale-[0.98] transition cursor-pointer"
					>
						{t("auth.registerBtn")}
					</button>
				</form>

				{/* Divider */}
				<div className="flex items-center gap-3 my-6">
					<div className="flex-1 h-px bg-(--color-border)" />
					<span className="text-xs text-(--color-muted-foreground) uppercase tracking-wide">
						{t("auth.or")}
					</span>
					<div className="flex-1 h-px bg-(--color-border)" />
				</div>

				{/* Google OAuth mock */}
				<button
					type="button"
					onClick={() => {
						loginAs(selectedRole);
						router.push("/dashboard");
					}}
					className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-(--color-border) bg-white text-(--color-foreground) font-medium hover:bg-(--color-background) active:scale-[0.98] transition cursor-pointer"
				>
					<svg className="w-5 h-5" viewBox="0 0 24 24">
						<path
							d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
							fill="#4285F4"
						/>
						<path
							d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
							fill="#34A853"
						/>
						<path
							d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
							fill="#FBBC05"
						/>
						<path
							d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
							fill="#EA4335"
						/>
					</svg>
					Google
				</button>

				{/* Login link */}
				<p className="text-center text-sm text-(--color-muted-foreground) mt-6">
					{t("auth.hasAccount")}{" "}
					<Link href="/login" className="text-(--color-primary) font-semibold hover:underline">
						{t("auth.login")}
					</Link>
				</p>
			</div>
		</>
	);
}
