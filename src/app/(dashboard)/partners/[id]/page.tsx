"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Star, MapPin, CheckCircle, Building2, Calendar, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { MOCK_PARTNERS } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

const TABS = [
	{ key: "about", label: "Giới thiệu" },
	{ key: "portfolio", label: "Portfolio" },
	{ key: "reviews", label: "Đánh giá" },
] as const;

const AVATAR_COLORS = [
	"bg-primary",
	"bg-success",
	"bg-warning",
	"bg-[#8B5CF6]",
	"bg-[#EC4899]",
	"bg-[#06B6D4]",
];

const MOCK_REVIEWS = [
	{
		id: "1",
		reviewer: "Trần Minh Tuấn",
		date: "2024-11-20",
		rating: 5,
		comment: "Rất chuyên nghiệp và tận tâm. Thiết kế đẹp, đúng yêu cầu và đúng tiến độ cam kết.",
	},
	{
		id: "2",
		reviewer: "Lê Thị Ngọc Anh",
		date: "2024-10-15",
		rating: 4,
		comment:
			"Chất lượng công việc tốt, giao tiếp rõ ràng. Giá hơi cao so với thị trường nhưng xứng đáng.",
	},
	{
		id: "3",
		reviewer: "Phạm Đức Huy",
		date: "2024-09-08",
		rating: 5,
		comment:
			"Đã hợp tác nhiều lần và luôn hài lòng. Đội ngũ nhiệt tình, sáng tạo và có trách nhiệm cao.",
	},
];

const PORTFOLIO_ITEMS = [
	{ id: "1", title: "Biệt thự hiện đại Q7", gradient: "from-primary/40 to-[#8B5CF6]/40" },
	{ id: "2", title: "Căn hộ Penthouse", gradient: "from-success/40 to-[#06B6D4]/40" },
	{ id: "3", title: "Nhà phố 3 tầng", gradient: "from-warning/40 to-[#EC4899]/40" },
];

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
	return (
		<div className="flex items-center gap-0.5">
			{[1, 2, 3, 4, 5].map((star) => (
				<Star
					key={star}
					className={cn(
						size === "lg" ? "h-5 w-5" : "h-3.5 w-3.5",
						star <= Math.round(rating) ? "fill-warning text-warning" : "fill-muted text-muted",
					)}
				/>
			))}
		</div>
	);
}

export default function PartnerDetailPage() {
	const params = useParams();
	const [activeTab, setActiveTab] = useState<string>("about");

	const partner = MOCK_PARTNERS.find((p) => p.id === params.id);

	if (!partner) {
		return (
			<div className="p-6 max-w-4xl mx-auto">
				<Link
					href="/partners"
					className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
				>
					<ArrowLeft className="h-4 w-4" />
					Quay lại
				</Link>
				<div className="flex flex-col items-center justify-center py-20 text-center">
					<Users className="h-16 w-16 text-muted-foreground/40 mb-4" />
					<h2 className="text-xl font-semibold text-foreground mb-2">Không tìm thấy đối tác</h2>
					<p className="text-muted-foreground">Đối tác này không tồn tại hoặc đã bị xóa</p>
				</div>
			</div>
		);
	}

	const avatarColor = AVATAR_COLORS[parseInt(partner.id) % AVATAR_COLORS.length];

	return (
		<div className="p-6 max-w-4xl mx-auto">
			<Link
				href="/partners"
				className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
			>
				<ArrowLeft className="h-4 w-4" />
				Quay lại
			</Link>

			{/* Header */}
			<div className="bg-card rounded-xl border border-border p-6 mb-6">
				<div className="flex items-start gap-5">
					<div
						className={cn(
							"h-20 w-20 rounded-full flex items-center justify-center shrink-0",
							avatarColor,
						)}
					>
						<span className="text-xl font-bold text-white">
							{partner.name.split(" ").pop()?.charAt(0)}
						</span>
					</div>
					<div className="flex-1 min-w-0">
						<div className="flex items-center gap-2 mb-1">
							<h1 className="text-2xl font-bold text-foreground">{partner.name}</h1>
							{partner.verified && <CheckCircle className="h-5 w-5 text-success" />}
						</div>
						<p className="text-muted-foreground">{partner.company}</p>
						<div className="flex items-center gap-2 mt-2">
							<StarRating rating={partner.rating} size="lg" />
							<span className="text-lg font-semibold text-foreground">{partner.rating}</span>
							<span className="text-sm text-muted-foreground">
								({partner.reviewCount} đánh giá)
							</span>
						</div>
						<div className="flex items-center gap-1.5 mt-2 text-sm text-muted-foreground">
							<MapPin className="h-4 w-4" />
							<span>{partner.location}</span>
						</div>
					</div>
				</div>

				<div className="flex gap-3 mt-6">
					<button className="flex-1 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
						Gửi yêu cầu báo giá
					</button>
					<button className="flex-1 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors">
						Mời vào dự án
					</button>
				</div>
			</div>

			{/* Tabs */}
			<div className="flex gap-1 bg-muted rounded-lg p-1 mb-6">
				{TABS.map((tab) => (
					<button
						key={tab.key}
						onClick={() => setActiveTab(tab.key)}
						className={cn(
							"flex-1 py-2 rounded-md text-sm font-medium transition-colors",
							activeTab === tab.key
								? "bg-card text-foreground shadow-sm"
								: "text-muted-foreground hover:text-foreground",
						)}
					>
						{tab.label}
					</button>
				))}
			</div>

			{/* Tab Content */}
			{activeTab === "about" && (
				<div className="space-y-6">
					<div className="bg-card rounded-xl border border-border p-5">
						<h3 className="font-semibold text-foreground mb-3">Giới thiệu</h3>
						<p className="text-sm text-muted-foreground leading-relaxed">{partner.description}</p>
					</div>

					<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
						<div className="bg-card rounded-xl border border-border p-4 text-center">
							<MapPin className="h-5 w-5 text-primary mx-auto mb-2" />
							<p className="text-xs text-muted-foreground mb-0.5">Khu vực</p>
							<p className="text-sm font-medium text-foreground">{partner.location}</p>
						</div>
						<div className="bg-card rounded-xl border border-border p-4 text-center">
							<Calendar className="h-5 w-5 text-primary mx-auto mb-2" />
							<p className="text-xs text-muted-foreground mb-0.5">Kinh nghiệm</p>
							<p className="text-sm font-medium text-foreground">{partner.yearsExperience} năm</p>
						</div>
						<div className="bg-card rounded-xl border border-border p-4 text-center">
							<Building2 className="h-5 w-5 text-primary mx-auto mb-2" />
							<p className="text-xs text-muted-foreground mb-0.5">Dự án</p>
							<p className="text-sm font-medium text-foreground">{partner.completedProjects}</p>
						</div>
						<div className="bg-card rounded-xl border border-border p-4 text-center">
							<Users className="h-5 w-5 text-primary mx-auto mb-2" />
							<p className="text-xs text-muted-foreground mb-0.5">Giá</p>
							<p className="text-sm font-medium text-foreground">{partner.priceRange}</p>
						</div>
					</div>

					<div className="bg-card rounded-xl border border-border p-5">
						<h3 className="font-semibold text-foreground mb-3">Chuyên môn</h3>
						<div className="flex flex-wrap gap-2">
							{partner.specialties.map((s) => (
								<span
									key={s}
									className="px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium"
								>
									{s}
								</span>
							))}
						</div>
					</div>
				</div>
			)}

			{activeTab === "portfolio" && (
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					{PORTFOLIO_ITEMS.map((item) => (
						<div
							key={item.id}
							className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-md hover:border-primary/30 transition-all cursor-pointer"
						>
							<div
								className={cn(
									"h-48 bg-gradient-to-br flex items-center justify-center",
									item.gradient,
								)}
							>
								<Building2 className="h-12 w-12 text-white/60" />
							</div>
							<div className="p-4">
								<h4 className="font-medium text-foreground">{item.title}</h4>
								<p className="text-sm text-muted-foreground mt-1">Hoàn thành 2024</p>
							</div>
						</div>
					))}
				</div>
			)}

			{activeTab === "reviews" && (
				<div className="space-y-4">
					<div className="bg-card rounded-xl border border-border p-5 flex items-center gap-6">
						<div className="text-center">
							<p className="text-4xl font-bold text-foreground">{partner.rating}</p>
							<StarRating rating={partner.rating} size="lg" />
							<p className="text-sm text-muted-foreground mt-1">{partner.reviewCount} đánh giá</p>
						</div>
					</div>

					{MOCK_REVIEWS.map((review) => (
						<div key={review.id} className="bg-card rounded-xl border border-border p-5">
							<div className="flex items-center justify-between mb-2">
								<div>
									<p className="font-medium text-foreground">{review.reviewer}</p>
									<p className="text-xs text-muted-foreground">{formatDate(review.date)}</p>
								</div>
								<StarRating rating={review.rating} />
							</div>
							<p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
