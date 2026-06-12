"use client";

import { useCallback } from "react";
import {
	DndContext,
	DragOverlay,
	useSensor,
	useSensors,
	PointerSensor,
	type DragEndEvent,
	type DragStartEvent,
} from "@dnd-kit/core";
import { useDroppable } from "@dnd-kit/core";
import { useState } from "react";
import dynamic from "next/dynamic";
import { RotateCcw, Box, Maximize2 } from "lucide-react";
import { FurnitureSidebar } from "./furniture-sidebar";
import { useInteriorStore } from "@/lib/interior-store";
import type { FurnitureItem } from "@/lib/mock-data";

const RoomCanvas = dynamic(() => import("./room-canvas").then((m) => ({ default: m.RoomCanvas })), {
	ssr: false,
	loading: () => (
		<div className="w-full h-full flex items-center justify-center bg-muted rounded-md">
			<div className="text-center">
				<Box className="h-12 w-12 text-muted-foreground mx-auto mb-3 animate-pulse" />
				<p className="text-sm text-muted-foreground">Đang tải 3D canvas...</p>
			</div>
		</div>
	),
});

const ROOM_PRESETS = [
	{ label: "4×3m", width: 4, depth: 3, height: 3 },
	{ label: "5×4m", width: 5, depth: 4, height: 3 },
	{ label: "6×5m", width: 6, depth: 5, height: 3 },
	{ label: "8×6m", width: 8, depth: 6, height: 3.5 },
];

function CanvasDropZone() {
	const { setNodeRef, isOver } = useDroppable({ id: "canvas-drop-zone" });

	return (
		<div
			ref={setNodeRef}
			className={`flex-1 p-3 transition-colors ${isOver ? "bg-primary/5" : ""}`}
		>
			<div
				className={`w-full h-full relative rounded-md overflow-hidden border-2 transition-colors ${isOver ? "border-primary border-dashed" : "border-transparent"}`}
			>
				<RoomCanvas />
				{isOver && (
					<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
						<div className="bg-primary/90 text-primary-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg">
							Thả để đặt vào phòng
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export function InteriorDesignTool() {
	const { addFurniture, reset, placedFurniture, roomWidth, roomDepth, setRoomSize } =
		useInteriorStore();
	const [activeDrag, setActiveDrag] = useState<FurnitureItem | null>(null);

	const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

	const handleDragStart = useCallback((event: DragStartEvent) => {
		const furniture = event.active.data.current?.furniture as FurnitureItem | undefined;
		if (furniture) setActiveDrag(furniture);
	}, []);

	const handleDragEnd = useCallback(
		(event: DragEndEvent) => {
			setActiveDrag(null);
			const { over, active } = event;
			if (over?.id === "canvas-drop-zone") {
				const furniture = active.data.current?.furniture as FurnitureItem | undefined;
				if (furniture) {
					addFurniture({
						furnitureId: furniture.id,
						name: furniture.name,
						color: furniture.color,
						width: furniture.width,
						depth: furniture.depth,
						height: furniture.height,
						image: furniture.image,
					});
				}
			}
		},
		[addFurniture],
	);

	return (
		<DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
			<div className="flex flex-col h-[calc(100vh-60px)]">
				{/* Header bar */}
				<div className="flex items-center justify-between px-5 py-3 bg-card border-b border-border">
					<div className="flex items-center gap-4">
						<h1 className="text-lg font-bold text-foreground">Thiết kế nội thất 3D</h1>
						<div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
							<Box className="h-3.5 w-3.5" />
							<span>{placedFurniture.length} vật dụng</span>
						</div>
					</div>

					<div className="flex items-center gap-3">
						<div className="flex items-center gap-1.5">
							<Maximize2 className="h-3.5 w-3.5 text-muted-foreground" />
							<span className="text-xs text-muted-foreground mr-1">Phòng:</span>
							{ROOM_PRESETS.map((preset) => (
								<button
									key={preset.label}
									onClick={() => setRoomSize(preset.width, preset.depth, preset.height)}
									className={`px-2.5 py-1 text-[11px] font-medium rounded-sm transition-colors ${
										roomWidth === preset.width && roomDepth === preset.depth
											? "bg-primary text-primary-foreground"
											: "bg-muted text-muted-foreground hover:text-foreground"
									}`}
								>
									{preset.label}
								</button>
							))}
						</div>
						<div className="w-px h-5 bg-border" />
						<button
							onClick={reset}
							className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-destructive bg-red-50 hover:bg-red-100 rounded-sm transition-colors"
						>
							<RotateCcw className="h-3.5 w-3.5" />
							Reset
						</button>
					</div>
				</div>

				{/* Main content */}
				<div className="flex flex-1 overflow-hidden">
					<FurnitureSidebar />
					<CanvasDropZone />
				</div>
			</div>

			<DragOverlay dropAnimation={null}>
				{activeDrag && (
					<div className="bg-card border-2 border-primary rounded-md p-3 shadow-xl opacity-90 w-32">
						<div className="text-3xl text-center mb-1">{activeDrag.image}</div>
						<p className="text-xs font-medium text-center truncate">{activeDrag.name}</p>
					</div>
				)}
			</DragOverlay>
		</DndContext>
	);
}
