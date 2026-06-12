"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
	Search,
	Star,
	MapPin,
	CheckCircle,
	Building2,
	Calendar,
	Users,
	Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MOCK_PARTNERS, type Partner } from "@/lib/mock-data";

const TYPE_FILTERS = [
	{ key: "all", label: "Tất cả" },
	{ key: "designer", label: "Nhà thiết kế" },
	{ key: "contractor", label: "Nhà thầu" },
	{ key: "consultant", label: "Tư vấn" },
	{ key: "supplier", label: "Nhà cung cấp" },
] as const;

const SORT_OPTIONS = [
	{ key: "rating", label: "Rating cao nhất" },
	{ key: "experience", label: "Kinh nghiệm" },
	{ key: "price", label: "Giá thấp nhất" },
] as const;

const AVATAR_COLORS = [
	"bg-primary",
	"bg-success",
	"bg-warning",
	"bg-[#8B5CF6]",
	"bg-[#EC4899]",
	"bg-[#06B6D4]",
];

function getAvatarColor(id: string) {
	return AVATAR_COLORS[parseInt(id) % AVATAR_COLORS.length];
}

function StarRating({ rating }: { rating: number }) {
	return (
		<div className="flex items-center gap-0.5">
			{[1, 2, 3, 4, 5].map((star) => (
				<Star
					key={star}
					className={cn(
						"h-3.5 w-3.5",
						star <= Math.round(rating) ? "fill-warning text-warning" : "fill-muted text-muted",
					)}
				/>
			))}
		</div>
	);
}

function PartnerCard({ partner }: { partner: Partner }) {
	return (
		<Link href={`/partners/${partner.id}`}>
			<div className="bg-card rounded-xl border border-border p-5 hover:shadow-md hover:border-primary/30 transition-all cursor-pointer">
				<div className="flex items-start gap-4">
					<div
						className={cn(
							"h-14 w-14 rounded-full flex items-center justify-center shrink-0",
							getAvatarColor(partner.id),
						)}
					>
						<span className="text-sm font-bold text-white">
							{partner.name.split(" ").pop()?.charAt(0)}
						</span>
					</div>

					<div className="flex-1 min-w-0">
						<div className="flex items-center gap-2">
							<h3 className="font-semibold text-foreground truncate">{partner.name}</h3>
							{partner.verified && <CheckCircle className="h-4 w-4 text-success shrink-0" />}
						</div>
						<p className="text-sm text-muted-foreground truncate">{partner.company}</p>

						<div className="flex items-center gap-2 mt-1.5">
							<StarRating rating={partner.rating} />
							<span className="text-sm font-medium text-foreground">{partner.rating}</span>
							<span className="text-xs text-muted-foreground">
								({partner.reviewCount} đánh giá)
							</span>
						</div>

						<div className="flex items-center gap-1 mt-1.5 text-sm text-muted-foreground">
							<MapPin className="h-3.5 w-3.5" />
							<span>{partner.location}</span>
						</div>
					</div>
				</div>

				<div className="flex flex-wrap gap-1.5 mt-4">
					{partner.specialties.map((s) => (
						<span
							key={s}
							className="px-2.5 py-0.5 rounded-full bg-accent text-accent-foreground text-xs font-medium"
						>
							{s}
						</span>
					))}
				</div>

				<p className="text-sm text-muted-foreground mt-3">
					Giá: <span className="font-medium text-foreground">{partner.priceRange}</span>
				</p>

				<div className="flex items-center gap-6 mt-3 pt-3 border-t border-border">
					<div className="flex items-center gap-1.5 text-sm text-muted-foreground">
						<Building2 className="h-3.5 w-3.5" />
						<span>{partner.completedProjects} dự án</span>
					</div>
					<div className="flex items-center gap-1.5 text-sm text-muted-foreground">
						<Calendar className="h-3.5 w-3.5" />
						<span>{partner.yearsExperience} năm KN</span>
					</div>
				</div>

				<div className="flex gap-3 mt-4">
					<span className="flex-1 text-center py-2 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors">
						Xem hồ sơ
					</span>
					<span className="flex-1 text-center py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
						Mời tham gia
					</span>
				</div>
			</div>
		</Link>
	);
}

export default function PartnersPage() {
	const [search, setSearch] = useState("");
	const [typeFilter, setTypeFilter] = useState<string>("all");
	const [sortBy, setSortBy] = useState<string>("rating");

	const filtered = useMemo(() => {
		let results = MOCK_PARTNERS.filter((p) => {
			const matchesSearch =
				!search ||
				p.name.toLowerCase().includes(search.toLowerCase()) ||
				p.company.toLowerCase().includes(search.toLowerCase()) ||
				p.specialties.some((s) => s.toLowerCase().includes(search.toLowerCase())) ||
				p.location.toLowerCase().includes(search.toLowerCase());

			const matchesType = typeFilter === "all" || p.role === typeFilter;
			return matchesSearch && matchesType;
		});

		results.sort((a, b) => {
			if (sortBy === "rating") return b.rating - a.rating;
			if (sortBy === "experience") return b.yearsExperience - a.yearsExperience;
			return a.completedProjects - b.completedProjects;
		});

		return results;
	}, [search, typeFilter, sortBy]);

	return (
		<div className="p-6 max-w-6xl mx-auto">
			<div className="flex items-center justify-between mb-6">
				<div>
					<h1 className="text-2xl font-bold text-foreground">Tìm kiếm đối tác</h1>
					<p className="text-sm text-muted-foreground mt-1">
						Tìm kiếm và kết nối với đối tác xây dựng uy tín
					</p>
				</div>
				<div className="flex items-center gap-2">
					<Filter className="h-4 w-4 text-muted-foreground" />
					<span className="text-sm text-muted-foreground">Bộ lọc</span>
				</div>
			</div>

			<div className="relative mb-4">
				<Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted-foreground" />
				<input
					type="text"
					placeholder="Tìm kiếm theo tên, dịch vụ, khu vực..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="w-full h-11 pl-10 pr-4 rounded-xl border border-border bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
				/>
			</div>

			<div className="flex items-center justify-between gap-4 mb-4">
				<div className="flex items-center gap-2 overflow-x-auto pb-1">
					{TYPE_FILTERS.map((f) => (
						<button
							key={f.key}
							onClick={() => setTypeFilter(f.key)}
							className={cn(
								"px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
								typeFilter === f.key
									? "bg-primary text-primary-foreground"
									: "bg-card border border-border text-muted-foreground hover:bg-muted",
							)}
						>
							{f.label}
						</button>
					))}
				</div>

				<select
					value={sortBy}
					onChange={(e) => setSortBy(e.target.value)}
					className="h-9 px-3 rounded-lg border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shrink-0"
				>
					{SORT_OPTIONS.map((o) => (
						<option key={o.key} value={o.key}>
							{o.label}
						</option>
					))}
				</select>
			</div>

			<p className="text-sm text-muted-foreground mb-4">
				Hiển thị <span className="font-medium text-foreground">{filtered.length}</span> đối tác
			</p>

			{filtered.length === 0 ? (
				<div className="flex flex-col items-center justify-center py-20 text-center">
					<Users className="h-12 w-12 text-muted-foreground/50 mb-3" />
					<p className="text-muted-foreground">Không tìm thấy đối tác phù hợp</p>
					<p className="text-sm text-muted-foreground/70 mt-1">
						Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
					</p>
				</div>
			) : (
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
					{filtered.map((partner) => (
						<PartnerCard key={partner.id} partner={partner} />
					))}
				</div>
			)}
		</div>
	);
}
