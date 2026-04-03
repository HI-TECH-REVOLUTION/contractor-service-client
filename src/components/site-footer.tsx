import Link from "next/link";

import { BrandLockup } from "@/components/brand-logo";
import { BRAND_NAME } from "@/content/site";
import { ArrowRight } from "lucide-react";

const aboutLinks = [
	{ href: "/gioi-thieu", label: "Giới thiệu" },
	{ href: "/cam-nang", label: "Cẩm nang" },
	{ href: "/tuyen-dung", label: "Tuyển dụng" },
	{ href: "#", label: "Liên hệ" },
	{ href: "#", label: "Câu hỏi thường gặp" },
];

const serviceLinks = [
	{ href: "/dich-vu/dien-lanh", label: "Điện lạnh" },
	{ href: "/dich-vu/ve-sinh-nha-cua", label: "Vệ sinh nhà cửa" },
	{ href: "/dich-vu/sua-chua-dien-nuoc", label: "Sửa chữa điện nước" },
	{ href: "/dich-vu/hop-dong-dich-vu", label: "Hợp đồng dịch vụ" },
	{ href: "/dich-vu/xay-dung-va-cai-tao", label: "Xây dựng & cải tạo" },
	{ href: "/dich-vu/noi-that-va-trang-tri", label: "Nội thất & trang trí" },
	{
		href: "/dich-vu/co-dien-va-smart-home",
		label: "Cơ điện & Smarthome",
	},
	{
		href: "/dich-vu/canh-quan-ngoai-that",
		label: "Cảnh quan ngoại thất",
	},
];

export function SiteFooter() {
	return (
		<footer className="border-t border-primary/10 bg-sky-50/60 dark:bg-sky-950/30">
			<div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
				<div className="grid gap-6 md:grid-cols-2 md:gap-10 lg:grid-cols-12 lg:gap-8">
					<div className="space-y-4 lg:col-span-4">
						<Link href="/" className="inline-block" aria-label="Trang chủ">
							<BrandLockup className="flex-wrap" />
						</Link>
						<h3 className="font-heading text-lg font-semibold text-foreground">
							Đồng hành <span className="border-b-2 border-primary text-primary">cùng bạn</span>
						</h3>
						<ul className="space-y-1.5 text-sm text-muted-foreground">
							<li>SĐT: 09xx.xxx.xxx</li>
							<li>Email: xxxx@xx.xx</li>
							<li className="max-w-xs pt-1">Địa chỉ: [Cập nhật địa chỉ văn phòng]</li>
						</ul>
						<p className="text-xs text-muted-foreground">
							Đã thông báo Bộ Công Thương · DMCA Protected
						</p>
					</div>

					<div className="grid grid-cols-2 gap-6 sm:gap-10 lg:col-span-5">
						<div>
							<p className="mb-3 text-sm font-semibold text-foreground">Về chúng tôi</p>
							<ul className="space-y-2 text-sm">
								{aboutLinks.map((l) => (
									<li key={l.label}>
										<Link
											href={l.href}
											className="text-muted-foreground transition-colors hover:text-primary hover:underline"
										>
											{l.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
						<div>
							<p className="mb-3 text-sm font-semibold text-foreground">Dịch vụ</p>
							<ul className="space-y-2 text-sm">
								{serviceLinks.map((l) => (
									<li key={l.href}>
										<Link
											href={l.href}
											className="text-muted-foreground transition-colors hover:text-primary hover:underline"
										>
											{l.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>

					<div className="lg:col-span-3">
						<p className="mb-3 text-sm font-semibold text-foreground">Đăng ký nhận tin</p>
						<div className="flex gap-2">
							<label htmlFor="footer-email" className="sr-only">
								Email
							</label>
							<input
								id="footer-email"
								type="email"
								name="email"
								placeholder="Email của bạn"
								autoComplete="email"
								className="min-w-0 flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
							/>
							<button
								type="button"
								className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
								aria-label="Gửi đăng ký"
							>
								<ArrowRight className="size-4" />
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-primary py-4 text-primary-foreground">
				<div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row">
					<p className="text-center text-xs sm:text-left">
						© {new Date().getFullYear()} {BRAND_NAME} — Dịch vụ nhà cửa. Bảo lưu mọi quyền.
					</p>
					<div className="flex gap-5 text-xs font-medium">
						<Link href="#" className="hover:underline">
							Chính sách bảo mật
						</Link>
						<Link href="#" className="hover:underline">
							Hỗ trợ
						</Link>
						<Link href="#" className="hover:underline">
							Điều khoản
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
