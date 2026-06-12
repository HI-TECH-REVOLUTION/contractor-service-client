"use client";

import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, Grid } from "@react-three/drei";
import * as THREE from "three";
import { useInteriorStore, type PlacedFurniture } from "@/lib/interior-store";

function Room() {
	const { roomWidth, roomDepth, roomHeight } = useInteriorStore();

	const wallMaterial = (
		<meshStandardMaterial color="#f0f0f0" transparent opacity={0.3} side={THREE.DoubleSide} />
	);

	return (
		<group>
			{/* Floor */}
			<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
				<planeGeometry args={[roomWidth, roomDepth]} />
				<meshStandardMaterial color="#d4a574" />
			</mesh>

			{/* Back wall */}
			<mesh position={[0, roomHeight / 2, -roomDepth / 2]}>
				<planeGeometry args={[roomWidth, roomHeight]} />
				{wallMaterial}
			</mesh>

			{/* Left wall */}
			<mesh position={[-roomWidth / 2, roomHeight / 2, 0]} rotation={[0, Math.PI / 2, 0]}>
				<planeGeometry args={[roomDepth, roomHeight]} />
				{wallMaterial}
			</mesh>

			{/* Right wall */}
			<mesh position={[roomWidth / 2, roomHeight / 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
				<planeGeometry args={[roomDepth, roomHeight]} />
				{wallMaterial}
			</mesh>

			{/* Front wall (mostly open for camera) */}
			<mesh position={[0, roomHeight / 2, roomDepth / 2]} rotation={[0, Math.PI, 0]}>
				<planeGeometry args={[roomWidth, roomHeight]} />
				<meshStandardMaterial color="#f0f0f0" transparent opacity={0.1} side={THREE.DoubleSide} />
			</mesh>

			{/* Wall edges for depth */}
			<lineSegments>
				<edgesGeometry args={[new THREE.BoxGeometry(roomWidth, roomHeight, roomDepth)]} />
				<lineBasicMaterial color="#ccc" />
			</lineSegments>
			<mesh position={[0, roomHeight / 2, 0]}>
				<boxGeometry args={[roomWidth, roomHeight, roomDepth]} />
				<meshBasicMaterial visible={false} />
			</mesh>
		</group>
	);
}

function FurnitureBox({ item }: { item: PlacedFurniture }) {
	const meshRef = useRef<THREE.Mesh>(null);
	const { selectedId, selectFurniture } = useInteriorStore();
	const isSelected = selectedId === item.instanceId;

	const widthM = item.width / 100;
	const depthM = item.depth / 100;
	const heightM = item.height / 100;

	return (
		<group
			position={[item.position[0], heightM / 2, item.position[2]]}
			rotation={[0, (item.rotation * Math.PI) / 180, 0]}
		>
			<mesh
				ref={meshRef}
				castShadow
				receiveShadow
				onClick={(e) => {
					e.stopPropagation();
					selectFurniture(item.instanceId);
				}}
			>
				<boxGeometry args={[widthM, heightM, depthM]} />
				<meshStandardMaterial
					color={item.color}
					emissive={isSelected ? "#0000FE" : "#000000"}
					emissiveIntensity={isSelected ? 0.3 : 0}
					roughness={0.6}
					metalness={0.1}
				/>
			</mesh>

			{isSelected && (
				<mesh>
					<boxGeometry args={[widthM + 0.02, heightM + 0.02, depthM + 0.02]} />
					<meshBasicMaterial color="#0000FE" wireframe />
				</mesh>
			)}

			<Html
				position={[0, heightM / 2 + 0.15, 0]}
				center
				distanceFactor={8}
				style={{ pointerEvents: "none" }}
			>
				<div className="bg-card/90 backdrop-blur-sm border border-border px-2 py-1 rounded-md shadow-sm whitespace-nowrap">
					<span className="text-[10px] font-medium text-foreground">
						{item.image} {item.name}
					</span>
				</div>
			</Html>
		</group>
	);
}

function Scene() {
	const { placedFurniture, selectFurniture, roomWidth, roomDepth } = useInteriorStore();

	return (
		<>
			<ambientLight intensity={0.6} />
			<directionalLight
				position={[5, 8, 5]}
				intensity={0.8}
				castShadow
				shadow-mapSize-width={2048}
				shadow-mapSize-height={2048}
			/>
			<directionalLight position={[-3, 5, -3]} intensity={0.3} />

			<Room />

			<Grid
				position={[0, 0.001, 0]}
				args={[roomWidth, roomDepth]}
				cellSize={0.5}
				cellThickness={0.5}
				cellColor="#c4a882"
				sectionSize={1}
				sectionThickness={1}
				sectionColor="#a08060"
				fadeDistance={12}
				fadeStrength={1}
				infiniteGrid={false}
			/>

			{placedFurniture.map((item) => (
				<FurnitureBox key={item.instanceId} item={item} />
			))}

			<mesh
				position={[0, 0, 0]}
				rotation={[-Math.PI / 2, 0, 0]}
				visible={false}
				onClick={() => selectFurniture(null)}
			>
				<planeGeometry args={[50, 50]} />
				<meshBasicMaterial />
			</mesh>

			<OrbitControls
				makeDefault
				minPolarAngle={0.2}
				maxPolarAngle={Math.PI / 2 - 0.1}
				minDistance={3}
				maxDistance={15}
				target={[0, 1, 0]}
			/>
		</>
	);
}

export function RoomCanvas() {
	return (
		<div className="w-full h-full bg-linear-to-b from-sky-100 to-sky-50 rounded-md overflow-hidden">
			<Canvas
				shadows
				camera={{ position: [6, 5, 6], fov: 50 }}
				gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
			>
				<Scene />
			</Canvas>
		</div>
	);
}
