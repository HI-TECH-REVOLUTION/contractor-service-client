"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, Upload, X, FileText, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type ProjectType = "residential" | "commercial" | "renovation" | "interior";

const PROJECT_TYPES: { key: ProjectType; emoji: string; label: string; sublabel: string }[] = [
	{ key: "residential", emoji: "🏠", label: "Nhà ở", sublabel: "Residential" },
	{ key: "commercial", emoji: "🏢", label: "Thương mại", sublabel: "Commercial" },
	{ key: "renovation", emoji: "🔨", label: "Cải tạo", sublabel: "Renovation" },
	{ key: "interior", emoji: "🎨", label: "Nội thất", sublabel: "Interior" },
];

const STEPS = [
	{ number: 1, label: "Thông tin cơ bản" },
	{ number: 2, label: "Tài liệu" },
	{ number: 3, label: "Xác nhận" },
];

interface FormData {
	name: string;
	description: string;
	type: ProjectType | "";
	budgetMin: string;
	budgetMax: string;
	location: string;
}

interface UploadedFile {
	id: string;
	name: string;
	size: string;
}

export default function NewProjectPage() {
	const router = useRouter();
	const [step, setStep] = useState(1);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
	const [form, setForm] = useState<FormData>({
		name: "",
		description: "",
		type: "",
		budgetMin: "",
		budgetMax: "",
		location: "",
	});
	const [files, setFiles] = useState<UploadedFile[]>([]);
	const [isDragging, setIsDragging] = useState(false);

	function updateField<K extends keyof FormData>(key: K, value: FormData[K]) {
		setForm((prev) => ({ ...prev, [key]: value }));
		if (errors[key]) {
			setErrors((prev) => ({ ...prev, [key]: undefined }));
		}
	}

	function validateStep1(): boolean {
		const newErrors: Partial<Record<keyof FormData, string>> = {};
		if (!form.name.trim()) newErrors.name = "Vui lòng nhập tên dự án";
		if (!form.type) newErrors.type = "Vui lòng chọn loại dự án";
		if (!form.location.trim()) newErrors.location = "Vui lòng nhập địa điểm";
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	}

	function handleNext() {
		if (step === 1 && !validateStep1()) return;
		setStep((s) => Math.min(s + 1, 3));
	}

	function handleBack() {
		setStep((s) => Math.max(s - 1, 1));
	}

	function handleDrop(e: React.DragEvent) {
		e.preventDefault();
		setIsDragging(false);
		const droppedFiles = Array.from(e.dataTransfer.files);
		const newFiles: UploadedFile[] = droppedFiles.map((f, i) => ({
			id: `file-${Date.now()}-${i}`,
			name: f.name,
			size:
				f.size > 1024 * 1024
					? `${(f.size / (1024 * 1024)).toFixed(1)} MB`
					: `${(f.size / 1024).toFixed(0)} KB`,
		}));
		setFiles((prev) => [...prev, ...newFiles]);
	}

	function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
		if (!e.target.files) return;
		const selected = Array.from(e.target.files);
		const newFiles: UploadedFile[] = selected.map((f, i) => ({
			id: `file-${Date.now()}-${i}`,
			name: f.name,
			size:
				f.size > 1024 * 1024
					? `${(f.size / (1024 * 1024)).toFixed(1)} MB`
					: `${(f.size / 1024).toFixed(0)} KB`,
		}));
		setFiles((prev) => [...prev, ...newFiles]);
		e.target.value = "";
	}

	function removeFile(id: string) {
		setFiles((prev) => prev.filter((f) => f.id !== id));
	}

	async function handleSubmit() {
		setIsSubmitting(true);
		await new Promise((resolve) => setTimeout(resolve, 1500));
		router.push("/projects");
	}

	const selectedType = PROJECT_TYPES.find((t) => t.key === form.type);

	return (
		<div className="p-6 lg:p-8 max-w-3xl mx-auto">
			{/* Back */}
			<Link
				href="/projects"
				className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
			>
				<ArrowLeft className="h-4 w-4" />
				Quay lại
			</Link>

			<h1 className="text-2xl font-bold tracking-tight mb-8">Tạo dự án mới</h1>

			{/* Stepper */}
			<div className="flex items-center gap-0 mb-10">
				{STEPS.map(({ number, label }, i) => (
					<div key={number} className="flex items-center flex-1 last:flex-none">
						<div className="flex items-center gap-2.5">
							<div
								className={cn(
									"h-9 w-9 rounded-full flex items-center justify-center text-sm font-semibold transition-colors",
									step > number
										? "bg-success text-success-foreground"
										: step === number
											? "bg-primary text-primary-foreground"
											: "bg-muted text-muted-foreground",
								)}
							>
								{step > number ? <Check className="h-4 w-4" /> : number}
							</div>
							<span
								className={cn(
									"text-sm font-medium hidden sm:block",
									step >= number ? "text-foreground" : "text-muted-foreground",
								)}
							>
								{label}
							</span>
						</div>
						{i < STEPS.length - 1 && (
							<div className={cn("flex-1 h-px mx-4", step > number ? "bg-success" : "bg-border")} />
						)}
					</div>
				))}
			</div>

			{/* Step 1: Basic Info */}
			{step === 1 && (
				<div className="space-y-6">
					{/* Name */}
					<div>
						<label htmlFor="name" className="block text-sm font-medium mb-1.5">
							Tên dự án <span className="text-destructive">*</span>
						</label>
						<input
							id="name"
							type="text"
							value={form.name}
							onChange={(e) => updateField("name", e.target.value)}
							placeholder="Ví dụ: Biệt thự Thảo Điền"
							className={cn(
								"w-full px-4 py-2.5 rounded-lg border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition text-sm",
								errors.name ? "border-destructive" : "border-border",
							)}
						/>
						{errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
					</div>

					{/* Description */}
					<div>
						<label htmlFor="description" className="block text-sm font-medium mb-1.5">
							Mô tả dự án
						</label>
						<textarea
							id="description"
							value={form.description}
							onChange={(e) => updateField("description", e.target.value)}
							placeholder="Mô tả ngắn gọn về dự án của bạn..."
							rows={4}
							className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition text-sm resize-none"
						/>
					</div>

					{/* Type Selection */}
					<div>
						<label className="block text-sm font-medium mb-2.5">
							Loại dự án <span className="text-destructive">*</span>
						</label>
						<div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
							{PROJECT_TYPES.map(({ key, emoji, label, sublabel }) => (
								<button
									key={key}
									type="button"
									onClick={() => updateField("type", key)}
									className={cn(
										"flex flex-col items-center gap-1.5 p-4 rounded-xl border-2 transition-all cursor-pointer",
										form.type === key
											? "border-primary bg-primary/5 shadow-sm"
											: "border-border hover:border-primary/30 hover:bg-muted/50",
										errors.type && !form.type ? "border-destructive/50" : "",
									)}
								>
									<span className="text-2xl">{emoji}</span>
									<span className="text-sm font-semibold">{label}</span>
									<span className="text-xs text-muted-foreground">{sublabel}</span>
								</button>
							))}
						</div>
						{errors.type && <p className="text-xs text-destructive mt-1.5">{errors.type}</p>}
					</div>

					{/* Budget Range */}
					<div>
						<label className="block text-sm font-medium mb-1.5">Ngân sách dự kiến (VNĐ)</label>
						<div className="flex items-center gap-3">
							<input
								type="text"
								value={form.budgetMin}
								onChange={(e) => updateField("budgetMin", e.target.value)}
								placeholder="Từ"
								className="flex-1 px-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition text-sm"
							/>
							<span className="text-muted-foreground">–</span>
							<input
								type="text"
								value={form.budgetMax}
								onChange={(e) => updateField("budgetMax", e.target.value)}
								placeholder="Đến"
								className="flex-1 px-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition text-sm"
							/>
						</div>
					</div>

					{/* Location */}
					<div>
						<label htmlFor="location" className="block text-sm font-medium mb-1.5">
							Địa điểm <span className="text-destructive">*</span>
						</label>
						<input
							id="location"
							type="text"
							value={form.location}
							onChange={(e) => updateField("location", e.target.value)}
							placeholder="Ví dụ: Quận 2, TP.HCM"
							className={cn(
								"w-full px-4 py-2.5 rounded-lg border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition text-sm",
								errors.location ? "border-destructive" : "border-border",
							)}
						/>
						{errors.location && <p className="text-xs text-destructive mt-1">{errors.location}</p>}
					</div>
				</div>
			)}

			{/* Step 2: Upload */}
			{step === 2 && (
				<div className="space-y-6">
					<div>
						<h2 className="text-lg font-semibold mb-1">Tài liệu dự án</h2>
						<p className="text-sm text-muted-foreground mb-5">
							Tải lên bản vẽ, hình ảnh tham khảo, hoặc tài liệu liên quan.
						</p>

						{/* Drop Zone */}
						<div
							onDragOver={(e) => {
								e.preventDefault();
								setIsDragging(true);
							}}
							onDragLeave={() => setIsDragging(false)}
							onDrop={handleDrop}
							className={cn(
								"border-2 border-dashed rounded-xl p-10 text-center transition-colors",
								isDragging
									? "border-primary bg-primary/5"
									: "border-border hover:border-primary/30",
							)}
						>
							<Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
							<p className="text-sm font-medium mb-1">
								Kéo thả tệp vào đây hoặc{" "}
								<label className="text-primary cursor-pointer hover:underline">
									chọn tệp
									<input type="file" multiple onChange={handleFileSelect} className="hidden" />
								</label>
							</p>
							<p className="text-xs text-muted-foreground">
								PDF, DOC, XLS, JPG, PNG — Tối đa 50MB mỗi tệp
							</p>
						</div>
					</div>

					{/* File List */}
					{files.length > 0 && (
						<div className="space-y-2">
							<p className="text-sm font-medium">{files.length} tệp đã chọn</p>
							{files.map((file) => (
								<div
									key={file.id}
									className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg"
								>
									<div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
										<FileText className="h-4 w-4 text-primary" />
									</div>
									<div className="flex-1 min-w-0">
										<p className="text-sm font-medium truncate">{file.name}</p>
										<p className="text-xs text-muted-foreground">{file.size}</p>
									</div>
									<button
										onClick={() => removeFile(file.id)}
										className="p-1.5 rounded-md hover:bg-muted text-muted-foreground transition-colors cursor-pointer"
									>
										<X className="h-4 w-4" />
									</button>
								</div>
							))}
						</div>
					)}
				</div>
			)}

			{/* Step 3: Summary */}
			{step === 3 && (
				<div className="space-y-6">
					<div>
						<h2 className="text-lg font-semibold mb-1">Xác nhận thông tin</h2>
						<p className="text-sm text-muted-foreground mb-5">
							Kiểm tra lại thông tin trước khi tạo dự án.
						</p>
					</div>

					<div className="bg-card border border-border rounded-xl divide-y divide-border">
						<SummaryRow label="Tên dự án" value={form.name} />
						<SummaryRow label="Mô tả" value={form.description || "—"} />
						<SummaryRow
							label="Loại dự án"
							value={selectedType ? `${selectedType.emoji} ${selectedType.label}` : "—"}
						/>
						<SummaryRow
							label="Ngân sách"
							value={
								form.budgetMin || form.budgetMax
									? `${form.budgetMin || "..."} – ${form.budgetMax || "..."} VNĐ`
									: "—"
							}
						/>
						<SummaryRow label="Địa điểm" value={form.location} />
						<SummaryRow
							label="Tài liệu"
							value={files.length > 0 ? `${files.length} tệp` : "Không có"}
						/>
					</div>
				</div>
			)}

			{/* Navigation Buttons */}
			<div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
				{step > 1 ? (
					<button
						onClick={handleBack}
						className="px-5 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors cursor-pointer"
					>
						Quay lại
					</button>
				) : (
					<div />
				)}

				{step < 3 ? (
					<button
						onClick={handleNext}
						className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition cursor-pointer"
					>
						Tiếp theo
					</button>
				) : (
					<button
						onClick={handleSubmit}
						disabled={isSubmitting}
						className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2"
					>
						{isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
						{isSubmitting ? "Đang tạo..." : "Tạo dự án"}
					</button>
				)}
			</div>
		</div>
	);
}

function SummaryRow({ label, value }: { label: string; value: string }) {
	return (
		<div className="flex items-start gap-4 px-5 py-3.5">
			<span className="text-sm text-muted-foreground w-28 shrink-0">{label}</span>
			<span className="text-sm font-medium text-foreground">{value}</span>
		</div>
	);
}
