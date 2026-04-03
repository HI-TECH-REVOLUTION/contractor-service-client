import type { VietnamLocationsData } from "./types";

import raw from "@/data/vietnam-provinces.json";

type RawWard = { name: string };
type RawDistrict = { name: string; wards: RawWard[] };
type RawProvince = { name: string; districts: RawDistrict[] };

/**
 * ID ổn định theo chỉ số trong file JSON (thứ tự không đổi → id không đổi).
 * - Tỉnh: p-{pi}
 * - Quận/Huyện: d-{pi}-{di}
 * - Phường/Xã: w-{pi}-{di}-{wi}
 */
function buildVietnamLocations(data: RawProvince[]): VietnamLocationsData {
	const provinces: VietnamLocationsData["provinces"] = [];
	const districtsByProvince: VietnamLocationsData["districtsByProvince"] = {};
	const wardsByDistrict: VietnamLocationsData["wardsByDistrict"] = {};

	data.forEach((p, pi) => {
		const pid = `p-${pi}`;
		provinces.push({ id: pid, name: p.name });

		districtsByProvince[pid] = p.districts.map((d, di) => {
			const did = `d-${pi}-${di}`;
			wardsByDistrict[did] = d.wards.map((w, wi) => ({
				id: `w-${pi}-${di}-${wi}`,
				name: w.name,
			}));
			return { id: did, name: d.name };
		});
	});

	return { provinces, districtsByProvince, wardsByDistrict };
}

export const VIETNAM_LOCATIONS: VietnamLocationsData = buildVietnamLocations(raw as RawProvince[]);

export const DEFAULT_PROVINCE_ID: string = VIETNAM_LOCATIONS.provinces[0]?.id ?? "p-0";

export function getDefaultDistrictIdForProvince(provinceId: string): string {
	return VIETNAM_LOCATIONS.districtsByProvince[provinceId]?.[0]?.id ?? "";
}

export const DEFAULT_DISTRICT_ID: string = getDefaultDistrictIdForProvince(DEFAULT_PROVINCE_ID);

/** Chuẩn hoá sau khi load draft cũ hoặc dữ liệu không còn khớp. */
export function sanitizeProvinceDistrictWard(
	provinceId: string,
	districtId: string,
	wardId: string,
): { provinceId: string; districtId: string; wardId: string } {
	let pid = provinceId;
	if (!VIETNAM_LOCATIONS.districtsByProvince[pid]) {
		pid = DEFAULT_PROVINCE_ID;
	}

	let did = districtId;
	if (!VIETNAM_LOCATIONS.wardsByDistrict[did]) {
		did = getDefaultDistrictIdForProvince(pid);
	}

	const wards = VIETNAM_LOCATIONS.wardsByDistrict[did] ?? [];
	let wid = wardId;
	if (!wards.some((w) => w.id === wid)) {
		wid = "";
	}

	return { provinceId: pid, districtId: did, wardId: wid };
}
