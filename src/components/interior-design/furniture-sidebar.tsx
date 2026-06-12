"use client";

import { useState, useMemo } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Search, X, Info, Trash2, RotateCw } from "lucide-react";
import { MOCK_FURNITURE, type FurnitureItem, type FurnitureCategory } from "@/lib/mock-data";
import { useInteriorStore, type PlacedFurniture } from "@/lib/interior-store";

const CATEGORIES: { key: FurnitureCategory; label: string }[] = [
	{ key: "living_room", label: "Phòng khách" },
	{ key: "bedroom", label: "Phòng ngủ" },
	{ key: "kitchen", label: "Bếp" },
	{ key: "bathroom", label: "Phòng tắm" },
	{ key: "office", label: "Văn phòng" },
	{ key: "outdoor", label: "Ngoài trời" },
];

function DraggableFurnitureCard({ item }: { item: FurnitureItem }) {
	const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
		id: item.id,
		data: { furniture: item },
	});

	const style = {
		transform: CSS.Translate.toString(transform),
		opacity: isDragging ? 0.5 : 1,
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...listeners}
			{...attributes}
			className="bg-background border border-border rounded-md p-3 cursor-grab active:cursor-grabbing hover:border-primary/50 hover:shadow-sm transition-all group"
		>
			<div className="text-3xl mb-2 text-center">{item.image}</div>
			<p className="text-xs font-medium text-foreground truncate text-center">{item.name}</p>
			<p className="text-[10px] text-muted-foreground text-center mt-1">
				{item.width}×{item.depth}×{item.height} cm
			</p>
			<div className="flex items-center justify-center gap-1.5 mt-2">
				<div
					className="w-3 h-3 rounded-full border border-border"
					style={{ backgroundColor: item.color }}
				/>
				<span className="text-[10px] text-muted-foreground">{item.nameEn}</span>
			</div>
		</div>
	);
}

function SelectedItemPanel({ item }: { item: PlacedFurniture }) {
	const { removeFurniture, rotateFurniture } = useInteriorStore();

	return (
		<div className="border-t border-border p-4 bg-accent/30">
			<div className="flex items-center gap-2 mb-3">
				<Info className="h-4 w-4 text-primary" />
				<span className="text-sm font-semibold">Chi tiết vật dụng</span>
			</div>
			<div className="flex items-center gap-3 mb-3">
				<span className="text-2xl">{item.image}</span>
				<div>
					<p className="text-sm font-medium">{item.name}</p>
					<p className="text-xs text-muted-foreground">
						{item.width}×{item.depth}×{item.height} cm
					</p>
				</div>
			</div>
			<div className="flex items-center gap-2 mb-2">
				<span className="text-xs text-muted-foreground">Màu:</span>
				<div
					className="w-4 h-4 rounded border border-border"
					style={{ backgroundColor: item.color }}
				/>
			</div>
			<div className="text-xs text-muted-foreground mb-3">
				Vị trí: ({item.position[0].toFixed(2)}, {item.position[2].toFixed(2)})m
			</div>
			<div className="flex gap-2">
				<button
					onClick={() => rotateFurniture(item.instanceId, item.rotation + 45)}
					className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-card border border-border rounded-sm hover:bg-muted transition-colors"
				>
					<RotateCw className="h-3 w-3" />
					Xoay
				</button>
				<button
					onClick={() => removeFurniture(item.instanceId)}
					className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-destructive bg-card border border-border rounded-sm hover:bg-red-50 transition-colors"
				>
					<Trash2 className="h-3 w-3" />
					Xóa
				</button>
			</div>
		</div>
	);
}

export function FurnitureSidebar() {
	const [search, setSearch] = useState("");
	const [activeCategory, setActiveCategory] = useState<FurnitureCategory>("living_room");
	const { selectedId, placedFurniture } = useInteriorStore();

	const filteredItems = useMemo(() => {
		return MOCK_FURNITURE.filter((item) => {
			const matchesCategory = item.category === activeCategory;
			const matchesSearch =
				!search ||
				item.name.toLowerCase().includes(search.toLowerCase()) ||
				item.nameEn.toLowerCase().includes(search.toLowerCase());
			return matchesCategory && matchesSearch;
		});
	}, [activeCategory, search]);

	const selectedItem = selectedId ? placedFurniture.find((f) => f.instanceId === selectedId) : null;

	return (
		<div className="w-80 bg-card border-r border-border flex flex-col h-full">
			<div className="p-4 border-b border-border">
				<div className="relative">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
					<input
						type="text"
						placeholder="Tìm kiếm nội thất..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="w-full h-9 pl-9 pr-8 text-sm bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
					/>
					{search && (
						<button
							onClick={() => setSearch("")}
							className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
						>
							<X className="h-3.5 w-3.5" />
						</button>
					)}
				</div>
			</div>

			<div className="px-4 py-3 border-b border-border">
				<div className="flex flex-wrap gap-1.5">
					{CATEGORIES.map((cat) => (
						<button
							key={cat.key}
							onClick={() => setActiveCategory(cat.key)}
							className={`px-2.5 py-1 text-[11px] font-medium rounded-full transition-colors ${
								activeCategory === cat.key
									? "bg-primary text-primary-foreground"
									: "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
							}`}
						>
							{cat.label}
						</button>
					))}
				</div>
			</div>

			<div className="flex-1 overflow-y-auto p-4">
				<div className="grid grid-cols-2 gap-2.5">
					{filteredItems.map((item) => (
						<DraggableFurnitureCard key={item.id} item={item} />
					))}
				</div>
				{filteredItems.length === 0 && (
					<div className="text-center py-8 text-sm text-muted-foreground">
						Không tìm thấy kết quả
					</div>
				)}
			</div>

			{selectedItem && <SelectedItemPanel item={selectedItem} />}
		</div>
	);
}
