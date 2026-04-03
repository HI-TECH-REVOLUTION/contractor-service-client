"use client";

import { FileText, ImageIcon, Upload, X } from "lucide-react";
import { useCallback, useId } from "react";

import { Button } from "@/components/ui/button";
import type { BookingFileEntry } from "@/content/booking/types";
import { cn } from "@/lib/utils";

function makeFileId() {
	return `f-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

type Props = {
	fieldId: string;
	label: string;
	accept: string;
	maxFiles: number;
	maxBytesPerFile: number;
	kind: "image" | "document";
	files: BookingFileEntry[];
	onChange: (next: BookingFileEntry[]) => void;
	error?: string;
	/** Bố cục thấp hơn, dùng khi 2 ô file xếp cạnh nhau */
	compact?: boolean;
};

export function BookingFileDropzone({
	fieldId,
	label,
	accept,
	maxFiles,
	maxBytesPerFile,
	kind,
	files,
	onChange,
	error,
	compact = false,
}: Props) {
	const inputId = useId();

	const addFiles = useCallback(
		(fileList: FileList | null) => {
			if (!fileList?.length) return;
			const room = maxFiles - files.length;
			if (room <= 0) return;
			const picked = Array.from(fileList)
				.filter((f) => f.size <= maxBytesPerFile)
				.slice(0, room);

			void (async () => {
				const entries: BookingFileEntry[] = [];
				for (const file of picked) {
					const dataUrl = await new Promise<string | undefined>((resolve) => {
						const reader = new FileReader();
						reader.onload = () => {
							const r = reader.result;
							resolve(typeof r === "string" ? r : undefined);
						};
						reader.onerror = () => resolve(undefined);
						reader.readAsDataURL(file);
					});
					entries.push({
						id: makeFileId(),
						name: file.name,
						size: file.size,
						type: file.type,
						dataUrl: dataUrl && dataUrl.length < 120_000 ? dataUrl : undefined,
					});
				}
				if (entries.length) onChange([...files, ...entries]);
			})();
		},
		[files, maxBytesPerFile, maxFiles, onChange],
	);

	const remove = (id: string) => {
		onChange(files.filter((f) => f.id !== id));
	};

	const Icon = kind === "image" ? ImageIcon : FileText;

	return (
		<div className={cn("space-y-1.5", compact && "min-w-0")}>
			<p className="text-sm font-medium text-foreground">{label}</p>
			<p className={cn("text-muted-foreground", compact ? "text-[11px] leading-snug" : "text-xs")}>
				{kind === "image" ? "PNG, JPG, WebP — tối đa 5MB / ảnh" : "PDF, DOC — tối đa 5MB"}
			</p>
			<label
				htmlFor={inputId}
				className={cn(
					"flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 px-3 transition-colors",
					"hover:border-primary/35 hover:bg-muted/50",
					error && "border-destructive/60",
					compact ? "gap-1 py-4" : "gap-2 py-6",
				)}
			>
				<input
					id={inputId}
					type="file"
					accept={accept}
					multiple={maxFiles > 1}
					className="sr-only"
					onChange={(e) => {
						addFiles(e.target.files);
						e.target.value = "";
					}}
				/>
				<Upload
					className={cn("text-muted-foreground", compact ? "size-6" : "size-8")}
					aria-hidden
				/>
				<span className={cn("font-medium text-primary", compact ? "text-xs" : "text-sm")}>
					{kind === "image" ? "Thêm ảnh" : "Tải tệp lên"}
				</span>
				<span className="text-[11px] text-muted-foreground">
					{files.length}/{maxFiles}
				</span>
			</label>
			{error ? <p className="text-xs font-medium text-destructive">{error}</p> : null}
			{files.length > 0 ? (
				<ul className="flex flex-wrap gap-2">
					{files.map((f) => (
						<li
							key={f.id}
							className="flex items-center gap-2 rounded-lg border bg-background px-2 py-1.5 text-xs"
						>
							<Icon className="size-4 shrink-0 text-muted-foreground" />
							<span className="max-w-40 truncate">{f.name}</span>
							<span className="text-muted-foreground">{(f.size / 1024).toFixed(0)} KB</span>
							<Button
								type="button"
								variant="ghost"
								size="icon"
								className="size-7 shrink-0"
								aria-label={`Xóa ${f.name}`}
								onClick={() => remove(f.id)}
							>
								<X className="size-4" />
							</Button>
						</li>
					))}
				</ul>
			) : null}
		</div>
	);
}
