"use client";

import { useState } from "react";
import {
	HelpCircle,
	BookOpen,
	MessageCircle,
	Phone,
	Mail,
	ChevronDown,
	ChevronUp,
	ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const FAQ_ITEMS = [
	{
		question: "Làm thế nào để tạo dự án mới trên VERTEX?",
		answer:
			'Bạn vào trang "Dự án" → nhấn "Tạo dự án mới" → điền thông tin dự án (tên, loại, ngân sách, địa điểm) → nhấn "Tạo". Sau khi tạo, bạn có thể mời đối tác và quản lý tiến độ ngay trên nền tảng.',
	},
	{
		question: "Thanh toán qua Escrow hoạt động như thế nào?",
		answer:
			"Escrow là hình thức thanh toán có bên thứ ba giữ tiền. Khi bạn thanh toán qua Escrow, tiền sẽ được VERTEX giữ và chỉ giải ngân cho đối tác khi bạn xác nhận công việc hoàn thành. Điều này bảo vệ quyền lợi cả hai bên.",
	},
	{
		question: "Tôi có thể so sánh báo giá từ nhiều nhà thầu không?",
		answer:
			'Có! Bạn có thể gửi yêu cầu báo giá đến nhiều nhà thầu cùng lúc. Khi nhận được các báo giá, vào trang "Báo giá" để xem, so sánh chi tiết từng hạng mục, và chọn nhà thầu phù hợp nhất.',
	},
	{
		question: "Làm sao để theo dõi tiến độ thi công?",
		answer:
			'Vào chi tiết dự án → tab "Tiến độ". Tại đây bạn sẽ thấy các milestone, phần trăm hoàn thành, và cập nhật từ nhà thầu. Bạn cũng nhận thông báo tự động khi có milestone hoàn thành.',
	},
	{
		question: "Tôi cần hỗ trợ kỹ thuật, liên hệ ở đâu?",
		answer:
			'Bạn có thể nhắn tin trực tiếp cho "VERTEX Support" trong mục Trao đổi, gọi hotline 1900-8888, hoặc gửi email đến support@vertex.vn. Đội ngũ hỗ trợ hoạt động từ 8:00 - 22:00 hàng ngày.',
	},
];

export default function HelpPage() {
	const [openFaq, setOpenFaq] = useState<number | null>(null);

	return (
		<div className="p-6 lg:p-8 max-w-3xl mx-auto">
			{/* Header */}
			<div className="flex items-center gap-3 mb-8">
				<div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
					<HelpCircle className="w-5 h-5 text-primary" />
				</div>
				<div>
					<h1 className="text-2xl font-bold text-foreground">Trợ giúp</h1>
					<p className="text-sm text-muted-foreground">Câu hỏi thường gặp và hỗ trợ</p>
				</div>
			</div>

			{/* Help category cards */}
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
				<a
					href="#faq"
					className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 hover:shadow-sm transition-all group"
				>
					<div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-3">
						<HelpCircle className="w-5 h-5 text-primary" />
					</div>
					<h3 className="font-semibold text-foreground mb-1">FAQ</h3>
					<p className="text-sm text-muted-foreground">Câu hỏi thường gặp</p>
				</a>
				<a
					href="#guide"
					className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 hover:shadow-sm transition-all group"
				>
					<div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center mb-3">
						<BookOpen className="w-5 h-5 text-success" />
					</div>
					<h3 className="font-semibold text-foreground mb-1">Hướng dẫn sử dụng</h3>
					<p className="text-sm text-muted-foreground">Tài liệu và video hướng dẫn</p>
				</a>
				<a
					href="#contact"
					className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 hover:shadow-sm transition-all group"
				>
					<div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center mb-3">
						<MessageCircle className="w-5 h-5 text-warning" />
					</div>
					<h3 className="font-semibold text-foreground mb-1">Liên hệ hỗ trợ</h3>
					<p className="text-sm text-muted-foreground">Chat, email, hotline</p>
				</a>
			</div>

			{/* FAQ section */}
			<section id="faq" className="mb-10">
				<h2 className="text-lg font-semibold text-foreground mb-4">Câu hỏi thường gặp</h2>
				<div className="bg-card border border-border rounded-xl divide-y divide-border overflow-hidden">
					{FAQ_ITEMS.map((item, idx) => {
						const isOpen = openFaq === idx;
						return (
							<div key={idx}>
								<button
									onClick={() => setOpenFaq(isOpen ? null : idx)}
									className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50/50 transition-colors"
								>
									<span
										className={cn(
											"text-sm pr-4",
											isOpen ? "font-semibold text-foreground" : "font-medium text-foreground",
										)}
									>
										{item.question}
									</span>
									{isOpen ? (
										<ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
									) : (
										<ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
									)}
								</button>
								{isOpen && (
									<div className="px-4 pb-4">
										<p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
									</div>
								)}
							</div>
						);
					})}
				</div>
			</section>

			{/* Contact section */}
			<section id="contact">
				<h2 className="text-lg font-semibold text-foreground mb-4">Liên hệ hỗ trợ</h2>
				<div className="bg-card border border-border rounded-xl p-5 space-y-4">
					<div className="flex items-center gap-3">
						<div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
							<Mail className="w-4.5 h-4.5 text-primary" />
						</div>
						<div>
							<p className="text-xs text-muted-foreground">Email</p>
							<a
								href="mailto:support@vertex.vn"
								className="text-sm font-medium text-foreground hover:text-primary inline-flex items-center gap-1"
							>
								support@vertex.vn
								<ExternalLink className="w-3 h-3" />
							</a>
						</div>
					</div>
					<div className="border-t border-border" />
					<div className="flex items-center gap-3">
						<div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
							<Phone className="w-4.5 h-4.5 text-success" />
						</div>
						<div>
							<p className="text-xs text-muted-foreground">Hotline</p>
							<p className="text-sm font-medium text-foreground">1900-8888</p>
						</div>
					</div>
					<div className="border-t border-border" />
					<div className="flex items-center gap-3">
						<div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center">
							<MessageCircle className="w-4.5 h-4.5 text-warning" />
						</div>
						<div>
							<p className="text-xs text-muted-foreground">Chat hỗ trợ</p>
							<p className="text-sm font-medium text-foreground">
								Nhắn tin cho VERTEX Support trong mục Trao đổi
							</p>
						</div>
					</div>
					<div className="border-t border-border" />
					<p className="text-xs text-muted-foreground">
						Thời gian hỗ trợ: 8:00 – 22:00 hàng ngày (kể cả cuối tuần và ngày lễ)
					</p>
				</div>
			</section>
		</div>
	);
}
