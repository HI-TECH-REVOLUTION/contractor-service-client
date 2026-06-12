"use client";

import { create } from "zustand";

export interface PlacedFurniture {
	instanceId: string;
	furnitureId: string;
	name: string;
	color: string;
	width: number;
	depth: number;
	height: number;
	position: [number, number, number];
	rotation: number;
	image: string;
}

interface InteriorStore {
	placedFurniture: PlacedFurniture[];
	selectedId: string | null;
	roomWidth: number;
	roomDepth: number;
	roomHeight: number;
	addFurniture: (item: Omit<PlacedFurniture, "instanceId" | "position" | "rotation">) => void;
	removeFurniture: (instanceId: string) => void;
	selectFurniture: (instanceId: string | null) => void;
	moveFurniture: (instanceId: string, position: [number, number, number]) => void;
	rotateFurniture: (instanceId: string, rotation: number) => void;
	setRoomSize: (width: number, depth: number, height: number) => void;
	reset: () => void;
}

export const useInteriorStore = create<InteriorStore>((set, get) => ({
	placedFurniture: [],
	selectedId: null,
	roomWidth: 5,
	roomDepth: 4,
	roomHeight: 3,

	addFurniture: (item) => {
		const { roomWidth, roomDepth } = get();
		const widthM = item.width / 100;
		const depthM = item.depth / 100;
		const maxX = (roomWidth - widthM) / 2;
		const maxZ = (roomDepth - depthM) / 2;
		const x = (Math.random() * 2 - 1) * maxX;
		const z = (Math.random() * 2 - 1) * maxZ;

		const instanceId = `${item.furnitureId}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

		set((state) => ({
			placedFurniture: [
				...state.placedFurniture,
				{ ...item, instanceId, position: [x, 0, z], rotation: 0 },
			],
		}));
	},

	removeFurniture: (instanceId) =>
		set((state) => ({
			placedFurniture: state.placedFurniture.filter((f) => f.instanceId !== instanceId),
			selectedId: state.selectedId === instanceId ? null : state.selectedId,
		})),

	selectFurniture: (instanceId) => set({ selectedId: instanceId }),

	moveFurniture: (instanceId, position) =>
		set((state) => ({
			placedFurniture: state.placedFurniture.map((f) =>
				f.instanceId === instanceId ? { ...f, position } : f,
			),
		})),

	rotateFurniture: (instanceId, rotation) =>
		set((state) => ({
			placedFurniture: state.placedFurniture.map((f) =>
				f.instanceId === instanceId ? { ...f, rotation } : f,
			),
		})),

	setRoomSize: (width, depth, height) =>
		set({ roomWidth: width, roomDepth: depth, roomHeight: height }),

	reset: () => set({ placedFurniture: [], selectedId: null }),
}));
