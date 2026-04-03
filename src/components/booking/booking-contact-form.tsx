"use client";

import { VIETNAM_LOCATIONS } from "@/content/booking/locations";
import type { BookingContactState } from "@/content/booking/types";
import { cn } from "@/lib/utils";

const inputClass =
	"w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40";

type Props = {
	provinceId: string;
	districtId: string;
	contact: BookingContactState;
	onProvinceChange: (id: string) => void;
	onDistrictChange: (id: string) => void;
	onContactChange: (patch: Partial<BookingContactState>) => void;
	errors: Record<string, string>;
};

export function BookingContactForm({
	provinceId,
	districtId,
	contact,
	onProvinceChange,
	onDistrictChange,
	onContactChange,
	errors,
}: Props) {
	const districts = VIETNAM_LOCATIONS.districtsByProvince[provinceId] ?? [];
	const wards = VIETNAM_LOCATIONS.wardsByDistrict[districtId] ?? [];

	const mapUrl = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL?.trim();

	return (
		<div className="space-y-8">
			<div>
				<h2 className="font-heading text-xl font-semibold text-foreground">Thông tin liên hệ</h2>
				<p className="mt-1 text-sm text-muted-foreground">
					Vui lòng điền thông tin để đội ngũ liên hệ bạn.
				</p>
			</div>

			<section className="space-y-3">
				<h3 className="text-sm font-semibold text-foreground">Thông tin cá nhân</h3>
				<input
					type="text"
					className={inputClass}
					placeholder="Họ và tên *"
					autoComplete="name"
					value={contact.fullName}
					onChange={(e) => onContactChange({ fullName: e.target.value })}
				/>
				{errors.fullName ? <p className="text-xs text-destructive">{errors.fullName}</p> : null}
				<input
					type="tel"
					className={inputClass}
					placeholder="Số điện thoại *"
					autoComplete="tel"
					value={contact.phone}
					onChange={(e) => onContactChange({ phone: e.target.value })}
				/>
				{errors.phone ? <p className="text-xs text-destructive">{errors.phone}</p> : null}
			</section>

			<section className="space-y-3">
				<h3 className="text-sm font-semibold text-foreground">Địa chỉ</h3>
				<div className="grid gap-4 sm:grid-cols-3">
					<div className="space-y-2">
						<label className="text-sm font-medium text-foreground">Tỉnh / Thành phố</label>
						<select
							className={inputClass}
							value={provinceId}
							onChange={(e) => {
								onProvinceChange(e.target.value);
								const nextD = VIETNAM_LOCATIONS.districtsByProvince[e.target.value]?.[0]?.id ?? "";
								onDistrictChange(nextD);
								onContactChange({ wardId: "" });
							}}
						>
							{VIETNAM_LOCATIONS.provinces.map((p) => (
								<option key={p.id} value={p.id}>
									{p.name}
								</option>
							))}
						</select>
					</div>
					<div className="space-y-2">
						<label className="text-sm font-medium text-foreground">Quận / Huyện</label>
						<select
							className={inputClass}
							value={districtId}
							onChange={(e) => {
								onDistrictChange(e.target.value);
								onContactChange({ wardId: "" });
							}}
						>
							{districts.map((d) => (
								<option key={d.id} value={d.id}>
									{d.name}
								</option>
							))}
						</select>
					</div>
					<div className="space-y-2">
						<label className="text-sm font-medium text-foreground">Phường / Xã</label>
						<select
							className={inputClass}
							value={contact.wardId}
							onChange={(e) => onContactChange({ wardId: e.target.value })}
						>
							<option value="">Chọn phường / xã</option>
							{wards.map((w) => (
								<option key={w.id} value={w.id}>
									{w.name}
								</option>
							))}
						</select>
					</div>
				</div>
				{errors.wardId ? <p className="text-xs text-destructive">{errors.wardId}</p> : null}
				<input
					type="text"
					className={inputClass}
					placeholder="Địa chỉ cụ thể (số nhà, hẻm, tòa nhà…)"
					autoComplete="street-address"
					value={contact.addressLine}
					onChange={(e) => onContactChange({ addressLine: e.target.value })}
				/>
				{errors.addressLine ? (
					<p className="text-xs text-destructive">{errors.addressLine}</p>
				) : null}
			</section>

			<section>
				<h3 className="mb-2 text-sm font-semibold text-foreground">Bản đồ</h3>
				{mapUrl ? (
					<div className="aspect-video w-full overflow-hidden rounded-xl border bg-muted">
						<iframe
							title="Bản đồ"
							src={mapUrl}
							className="size-full border-0"
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
						/>
					</div>
				) : (
					<div
						className={cn(
							"flex aspect-video w-full items-center justify-center rounded-xl border border-dashed bg-muted/40 px-4 text-center text-sm text-muted-foreground",
						)}
					>
						Bản đồ xác nhận vị trí có thể bật sau khi cấu hình biến môi trường
						<code className="mx-1 rounded bg-muted px-1 text-xs">
							NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL
						</code>
					</div>
				)}
			</section>
		</div>
	);
}
