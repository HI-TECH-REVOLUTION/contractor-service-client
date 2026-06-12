"use client";

import { useState, useMemo } from "react";
import { Search, Upload, FileText, Image, File, Plus, X, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";
import { MOCK_DOCUMENTS, type Document } from "@/lib/mock-data";

const CATEGORY_FILTERS = [
	{ key: "all", label: "Tất cả" },
	{ key: "design", label: "Thiết kế" },
	{ key: "contract", label: "Hợp đồng" },
	{ key: "quotation", label: "Báo giá" },
	{ key: "report", label: "Báo cáo" },
	{ key: "photo", label: "Hình ảnh" },
] as const;

const STATUS_FILTERS = [
	{ key: "all", label: "Tất cả" },
	{ key: "pending", label: "Chờ duyệt" },
	{ key: "approved", label: "Đã duyệt" },
	{ key: "rejected", label: "Từ chối" },
] as const;

const FILE_ICONS: Record<Document["type"], { icon: string; color: string }> = {
	pdf: { icon: "📄", color: "bg-red-50 text-red-600" },
	cad: { icon: "📐", color: "bg-blue-50 text-blue-600" },
	image: { icon: "🖼️", color: "bg-purple-50 text-purple-600" },
	spreadsheet: { icon: "📊", color: "bg-green-50 text-green-600" },
	doc: { icon: "📝", color: "bg-yellow-50 text-yellow-600" },
};

const STATUS_STYLES: Record<Document["status"], { label: string; classes: string }> = {
	draft: { label: "Nháp", classes: "bg-muted/50 text-muted-foreground" },
	pending_review: { label: "Chờ duyệt", classes: "bg-warning/10 text-warning" },
	approved: { label: "Đã duyệt", classes: "bg-success/10 text-success" },
	rejected: { label: "Từ chối", classes: "bg-destructive/10 text-destructive" },
};

const CATEGORY_LABELS: Record<Document["category"], string> = {
	design: "Thiết kế",
	contract: "Hợp đồng",
	quotation: "Báo giá",
	report: "Báo cáo",
	photo: "Hình ảnh",
};

function DocumentCard({ doc }: { doc: Document }) {
	const fileInfo = FILE_ICONS[doc.type];
	const statusInfo = STATUS_STYLES[doc.status];

	return (
		<div
			onClick={() => alert(`Chi tiết tài liệu: ${doc.name}`)}
			className="bg-card rounded-xl border border-border p-4 hover:shadow-md hover:border-primary/30 transition-all cursor-pointer flex flex-col"
		>
			<div className="flex items-center justify-center h-20 mb-3">
				<span className="text-4xl">{fileInfo.icon}</span>
			</div>

			<h4 className="text-sm font-medium text-foreground truncate" title={doc.name}>
				{doc.name}
			</h4>

			<div className="flex items-center gap-2 mt-2">
				<span className="px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-xs font-medium">
					{CATEGORY_LABELS[doc.category]}
				</span>
				<span className="text-xs text-muted-foreground">v{doc.version}</span>
			</div>

			<div className="mt-2">
				<span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", statusInfo.classes)}>
					{statusInfo.label}
				</span>
			</div>

			<div className="mt-auto pt-3 border-t border-border">
				<p className="text-xs text-muted-foreground truncate">{doc.uploadedBy}</p>
				<div className="flex items-center justify-between mt-0.5">
					<p className="text-xs text-muted-foreground">{formatDate(doc.uploadedAt)}</p>
					<p className="text-xs text-muted-foreground">{doc.size}</p>
				</div>
			</div>
		</div>
	);
}

export default function DocumentsPage() {
	const [search, setSearch] = useState("");
	const [categoryFilter, setCategoryFilter] = useState<string>("all");
	const [statusFilter, setStatusFilter] = useState<string>("all");
	const [showUpload, setShowUpload] = useState(false);
	const [toast, setToast] = useState<string | null>(null);

	const filtered = useMemo(() => {
		return MOCK_DOCUMENTS.filter((d) => {
			const matchesSearch = !search || d.name.toLowerCase().includes(search.toLowerCase());
			const matchesCategory = categoryFilter === "all" || d.category === categoryFilter;
			const matchesStatus = statusFilter === "all" || d.status === statusFilter;
			return matchesSearch && matchesCategory && matchesStatus;
		});
	}, [search, categoryFilter, statusFilter]);

	const handleUpload = () => {
		setShowUpload(false);
		setToast("Tải lên thành công!");
		setTimeout(() => setToast(null), 3000);
	};

	return (
		<div className="p-6 max-w-6xl mx-auto">
			<div className="flex items-center justify-between mb-6">
				<div>
					<h1 className="text-2xl font-bold text-foreground">Quản lý hồ sơ</h1>
					<p className="text-sm text-muted-foreground mt-1">
						Quản lý và theo dõi tất cả tài liệu dự án
					</p>
				</div>
				<button
					onClick={() => setShowUpload(true)}
					className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
				>
					<Upload className="h-4 w-4" />
					Upload tài liệu
				</button>
			</div>

			<div className="relative mb-4">
				<Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted-foreground" />
				<input
					type="text"
					placeholder="Tìm kiếm tài liệu..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="w-full h-11 pl-10 pr-4 rounded-xl border border-border bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
				/>
			</div>

			<div className="space-y-3 mb-6">
				<div className="flex items-center gap-2 overflow-x-auto pb-1">
					{CATEGORY_FILTERS.map((f) => (
						<button
							key={f.key}
							onClick={() => setCategoryFilter(f.key)}
							className={cn(
								"px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
								categoryFilter === f.key
									? "bg-primary text-primary-foreground"
									: "bg-card border border-border text-muted-foreground hover:bg-muted",
							)}
						>
							{f.label}
						</button>
					))}
				</div>

				<div className="flex items-center gap-2 overflow-x-auto pb-1">
					<span className="text-sm text-muted-foreground shrink-0">Trạng thái:</span>
					{STATUS_FILTERS.map((f) => (
						<button
							key={f.key}
							onClick={() => setStatusFilter(f.key)}
							className={cn(
								"px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors",
								statusFilter === f.key
									? "bg-foreground text-card"
									: "bg-card border border-border text-muted-foreground hover:bg-muted",
							)}
						>
							{f.label}
						</button>
					))}
				</div>
			</div>

			<p className="text-sm text-muted-foreground mb-4">
				Hiển thị <span className="font-medium text-foreground">{filtered.length}</span> tài liệu
			</p>

			{filtered.length === 0 ? (
				<div className="flex flex-col items-center justify-center py-20 text-center">
					<FileText className="h-12 w-12 text-muted-foreground/50 mb-3" />
					<p className="text-muted-foreground">Không tìm thấy tài liệu</p>
					<p className="text-sm text-muted-foreground/70 mt-1">
						Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
					</p>
				</div>
			) : (
				<div
					className="grid gap-4"
					style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}
				>
					{filtered.map((doc) => (
						<DocumentCard key={doc.id} doc={doc} />
					))}
				</div>
			)}

			{/* Upload Modal */}
			{showUpload && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
					<div className="bg-card rounded-2xl border border-border shadow-xl w-full max-w-lg mx-4 p-6">
						<div className="flex items-center justify-between mb-5">
							<h2 className="text-lg font-semibold text-foreground">Upload tài liệu</h2>
							<button
								onClick={() => setShowUpload(false)}
								className="p-1 rounded-md hover:bg-muted transition-colors"
							>
								<X className="h-5 w-5 text-muted-foreground" />
							</button>
						</div>

						<div
							onClick={handleUpload}
							className="border-2 border-dashed border-border rounded-xl p-10 flex flex-col items-center justify-center text-center hover:border-primary/40 hover:bg-primary/5 transition-colors cursor-pointer"
						>
							<Upload className="h-10 w-10 text-muted-foreground mb-3" />
							<p className="text-sm font-medium text-foreground">Kéo thả file hoặc click để chọn</p>
							<p className="text-xs text-muted-foreground mt-2">
								Hỗ trợ: PDF, DWG, DOC, XLSX, JPG, PNG (tối đa 50MB)
							</p>
						</div>

						<div className="flex gap-3 mt-5">
							<button
								onClick={() => setShowUpload(false)}
								className="flex-1 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
							>
								Hủy
							</button>
							<button
								onClick={handleUpload}
								className="flex-1 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
							>
								Tải lên
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Toast Notification */}
			{toast && (
				<div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-success text-success-foreground px-4 py-3 rounded-lg shadow-lg animate-in slide-in-from-bottom-2 fade-in duration-200">
					<CheckCircle className="h-4 w-4" />
					<span className="text-sm font-medium">{toast}</span>
				</div>
			)}
		</div>
	);
}
