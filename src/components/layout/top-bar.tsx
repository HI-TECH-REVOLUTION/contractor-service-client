"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Bell, Globe, LogOut, Settings, User, Plus } from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function TopBar() {
	const { user, logout } = useAuthStore();
	const { locale, setLocale, t } = useI18n();
	const [showUserMenu, setShowUserMenu] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
				setShowUserMenu(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const initials = user?.name
		?.split(" ")
		.map((w) => w[0])
		.slice(0, 2)
		.join("")
		.toUpperCase();

	return (
		<header className="sticky top-0 z-50 h-[60px] bg-card border-b border-border flex items-center px-6 shrink-0">
			<Link href="/dashboard" className="flex items-center gap-1.5">
				<Plus className="h-5 w-5 text-primary" strokeWidth={3} />
				<span className="font-mono font-bold tracking-wider text-primary text-lg">VERTEX</span>
			</Link>

			<div className="flex-1" />

			<div className="flex items-center gap-3">
				<button
					onClick={() => setLocale(locale === "vi" ? "en" : "vi")}
					className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-sm text-muted-foreground hover:bg-muted transition-colors"
				>
					<Globe className="h-4 w-4" />
					<span className={cn("font-medium", locale === "en" && "text-primary")}>EN</span>
					<span className="text-border">|</span>
					<span className={cn("font-medium", locale === "vi" && "text-primary")}>VI</span>
				</button>

				<button className="relative p-2 rounded-md text-muted-foreground hover:bg-muted transition-colors">
					<Bell className="h-5 w-5" />
					<span className="absolute top-1.5 right-1.5 h-2 w-2 bg-destructive rounded-full" />
				</button>

				<div className="relative" ref={menuRef}>
					<button
						onClick={() => setShowUserMenu(!showUserMenu)}
						className="flex items-center gap-2 p-1 rounded-md hover:bg-muted transition-colors"
					>
						<div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
							<span className="text-xs font-semibold text-primary-foreground">
								{initials || <User className="h-4 w-4" />}
							</span>
						</div>
					</button>

					{showUserMenu && (
						<div className="absolute right-0 top-full mt-1 w-48 bg-card rounded-lg border border-border shadow-lg py-1 animate-in fade-in slide-in-from-top-1 duration-150">
							<div className="px-3 py-2 border-b border-border">
								<p className="text-sm font-medium truncate">{user?.name}</p>
								<p className="text-xs text-muted-foreground truncate">{user?.email}</p>
							</div>
							<Link
								href="/settings"
								onClick={() => setShowUserMenu(false)}
								className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted transition-colors"
							>
								<Settings className="h-4 w-4 text-muted-foreground" />
								{t("nav.settings")}
							</Link>
							<button
								onClick={() => {
									setShowUserMenu(false);
									logout();
								}}
								className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-muted transition-colors"
							>
								<LogOut className="h-4 w-4" />
								{t("nav.logout")}
							</button>
						</div>
					)}
				</div>
			</div>
		</header>
	);
}
