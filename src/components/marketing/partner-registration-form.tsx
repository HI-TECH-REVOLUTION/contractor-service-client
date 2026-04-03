"use client";

import { useState, useTransition } from "react";
import { ArrowRight, Loader2 } from "lucide-react";

import { submitPartnerRegistration } from "@/app/doi-tac/actions";
import { PARTNER_CITY_OPTIONS, partnerFieldOptions } from "@/content/partner-form";
import type { PartnerFormVariant } from "@/content/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const fieldClass =
	"w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm text-foreground shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50";

const labelClass = "mb-1.5 block text-sm font-medium text-foreground";

type Props = {
	formTitle: string;
	variant: PartnerFormVariant;
	className?: string;
};

export function PartnerRegistrationForm({ formTitle, variant, className }: Props) {
	const [pending, startTransition] = useTransition();
	const [message, setMessage] = useState<{
		type: "success" | "error";
		text: string;
	} | null>(null);

	const fieldOptions = partnerFieldOptions(variant);

	function onSubmit(formData: FormData) {
		setMessage(null);
		startTransition(() => {
			void submitPartnerRegistration(formData).then((result) => {
				if (result.ok) {
					setMessage({
						type: "success",
						text: "Đã gửi đăng ký. Chúng tôi sẽ liên hệ bạn sớm.",
					});
				} else {
					setMessage({ type: "error", text: result.error });
				}
			});
		});
	}

	return (
		<section
			className={cn("rounded-2xl border border-border/80 bg-card p-6 shadow-sm sm:p-8", className)}
			aria-labelledby="partner-form-title"
		>
			<h2
				id="partner-form-title"
				className="font-heading text-lg font-semibold text-foreground sm:text-xl"
			>
				{formTitle}
			</h2>

			<form className="mt-6 space-y-5" action={onSubmit}>
				<input type="hidden" name="variant" value={variant} />

				<div>
					<label className={labelClass} htmlFor="partner-fullName">
						Họ và tên
					</label>
					<input
						id="partner-fullName"
						name="fullName"
						type="text"
						autoComplete="name"
						required
						maxLength={200}
						className={fieldClass}
						placeholder="Nguyễn Văn A"
					/>
				</div>

				<div className="grid gap-5 sm:grid-cols-2">
					<div>
						<label className={labelClass} htmlFor="partner-city">
							Chọn thành phố hoạt động
						</label>
						<select
							id="partner-city"
							name="city"
							required
							className={cn(
								fieldClass,
								"appearance-none bg-[length:1rem] bg-[right_0.65rem_center] bg-no-repeat pr-9",
							)}
							style={{
								backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
							}}
						>
							<option value="">— Chọn —</option>
							{PARTNER_CITY_OPTIONS.map((o) => (
								<option key={o.value} value={o.value}>
									{o.label}
								</option>
							))}
						</select>
					</div>
					<div>
						<label className={labelClass} htmlFor="partner-field">
							Chọn lĩnh vực hoạt động
						</label>
						<select
							id="partner-field"
							name="field"
							required
							className={cn(
								fieldClass,
								"appearance-none bg-[length:1rem] bg-[right_0.65rem_center] bg-no-repeat pr-9",
							)}
							style={{
								backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
							}}
						>
							<option value="">— Chọn —</option>
							{fieldOptions.map((o) => (
								<option key={o.value} value={o.value}>
									{o.label}
								</option>
							))}
						</select>
					</div>
				</div>

				<div className="grid gap-5 sm:grid-cols-2">
					<div>
						<label className={labelClass} htmlFor="partner-phone">
							Số điện thoại
						</label>
						<input
							id="partner-phone"
							name="phone"
							type="tel"
							autoComplete="tel"
							required
							maxLength={20}
							className={fieldClass}
							placeholder="0900 000 000"
						/>
					</div>
					<div>
						<label className={labelClass} htmlFor="partner-email">
							Email
						</label>
						<input
							id="partner-email"
							name="email"
							type="email"
							autoComplete="email"
							required
							maxLength={254}
							className={fieldClass}
							placeholder="ban@email.com"
						/>
					</div>
				</div>

				<div>
					<label className={labelClass} htmlFor="partner-note">
						Chú thích
					</label>
					<textarea
						id="partner-note"
						name="note"
						rows={4}
						maxLength={5000}
						className={cn(fieldClass, "min-h-[6.5rem] resize-y")}
						placeholder="Kinh nghiệm, địa bàn phục vụ, thời gian liên hệ thuận tiện…"
					/>
				</div>

				{message ? (
					<p
						role="alert"
						className={cn(
							"text-sm",
							message.type === "success"
								? "text-emerald-700 dark:text-emerald-400"
								: "text-destructive",
						)}
					>
						{message.text}
					</p>
				) : null}

				<div className="flex justify-end pt-1">
					<Button type="submit" size="lg" disabled={pending}>
						{pending ? (
							<Loader2 className="size-4 animate-spin" aria-hidden />
						) : (
							<>
								Gửi
								<ArrowRight className="size-4" aria-hidden />
							</>
						)}
					</Button>
				</div>
			</form>
		</section>
	);
}
