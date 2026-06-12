"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Phone, MoreVertical, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

interface Thread {
	id: string;
	name: string;
	avatar: string;
	lastMessage: string;
	time: string;
	online: boolean;
	isBot?: boolean;
}

interface Message {
	id: string;
	threadId: string;
	sender: "me" | "them";
	senderName: string;
	text: string;
	time: string;
}

const THREADS: Thread[] = [
	{
		id: "thread-1",
		name: "KTS Trần Minh Quân",
		avatar: "TQ",
		lastMessage: "Em gửi bản cập nhật mặt bằng tầng 2 ạ",
		time: "14:30",
		online: true,
	},
	{
		id: "thread-2",
		name: "NT Lê Hoàng Dũng",
		avatar: "LD",
		lastMessage: "Báo giá thi công đã cập nhật xong",
		time: "Hôm qua",
		online: false,
	},
	{
		id: "thread-3",
		name: "VERTEX Support",
		avatar: "V",
		lastMessage: "Chào anh! VERTEX có thể giúp gì?",
		time: "08:00",
		online: true,
		isBot: true,
	},
];

const MESSAGES: Record<string, Message[]> = {
	"thread-1": [
		{
			id: "m1",
			threadId: "thread-1",
			sender: "them",
			senderName: "KTS Quân",
			text: "Anh Anh ơi, em đã hoàn thành bản concept mặt tiền nhà rồi ạ.",
			time: "09:15",
		},
		{
			id: "m2",
			threadId: "thread-1",
			sender: "me",
			senderName: "Tôi",
			text: "OK em, anh xem rồi thấy ổn đó. Tầng 2 em bố trí thế nào?",
			time: "09:20",
		},
		{
			id: "m3",
			threadId: "thread-1",
			sender: "them",
			senderName: "KTS Quân",
			text: "Dạ tầng 2 em bố trí 2 phòng ngủ + 1 phòng làm việc. Em sẽ gửi bản vẽ chi tiết trong hôm nay.",
			time: "09:25",
		},
		{
			id: "m4",
			threadId: "thread-1",
			sender: "me",
			senderName: "Tôi",
			text: "Tốt lắm. Phòng làm việc anh muốn hướng ra ban công nhé, ánh sáng tự nhiên.",
			time: "10:00",
		},
		{
			id: "m5",
			threadId: "thread-1",
			sender: "them",
			senderName: "KTS Quân",
			text: "Dạ được ạ, em sẽ điều chỉnh layout cho phòng làm việc hướng Đông Nam.",
			time: "10:15",
		},
		{
			id: "m6",
			threadId: "thread-1",
			sender: "me",
			senderName: "Tôi",
			text: "Vậy em gửi lại bản cập nhật khi nào xong nhé.",
			time: "13:00",
		},
		{
			id: "m7",
			threadId: "thread-1",
			sender: "them",
			senderName: "KTS Quân",
			text: "Em gửi bản cập nhật mặt bằng tầng 2 ạ",
			time: "14:30",
		},
	],
	"thread-2": [
		{
			id: "m8",
			threadId: "thread-2",
			sender: "them",
			senderName: "NT Dũng",
			text: "Chào anh Anh, em gửi báo giá thi công cho dự án Thảo Điền.",
			time: "08:00",
		},
		{
			id: "m9",
			threadId: "thread-2",
			sender: "me",
			senderName: "Tôi",
			text: "OK em, anh đã nhận. Để anh review xong phản hồi lại.",
			time: "08:30",
		},
		{
			id: "m10",
			threadId: "thread-2",
			sender: "me",
			senderName: "Tôi",
			text: "Phần MEP em báo 154 triệu, em có thể breakdown chi tiết hơn được không?",
			time: "11:00",
		},
		{
			id: "m11",
			threadId: "thread-2",
			sender: "them",
			senderName: "NT Dũng",
			text: "Dạ được ạ, em sẽ tách chi tiết: điện - nước - PCCC - điều hoà riêng.",
			time: "11:30",
		},
		{
			id: "m12",
			threadId: "thread-2",
			sender: "them",
			senderName: "NT Dũng",
			text: "Báo giá thi công đã cập nhật xong",
			time: "15:00",
		},
	],
	"thread-3": [
		{
			id: "m13",
			threadId: "thread-3",
			sender: "them",
			senderName: "VERTEX Bot",
			text: "Chào anh Nguyễn Văn Anh! Tôi là trợ lý VERTEX. Tôi có thể giúp anh theo dõi tiến độ dự án, tìm đối tác, hoặc giải đáp thắc mắc.",
			time: "08:00",
		},
		{
			id: "m14",
			threadId: "thread-3",
			sender: "me",
			senderName: "Tôi",
			text: "Dự án Thảo Điền tiến độ thế nào rồi?",
			time: "08:05",
		},
		{
			id: "m15",
			threadId: "thread-3",
			sender: "them",
			senderName: "VERTEX Bot",
			text: "📊 Dự án Nhà phố Thảo Điền:\n• Giai đoạn hiện tại: Thiết kế chi tiết (65%)\n• Tiến độ chung: Đúng kế hoạch\n• Milestone tiếp theo: Hồ sơ thi công (15/07)\n\nAnh cần xem chi tiết phần nào không ạ?",
			time: "08:05",
		},
		{
			id: "m16",
			threadId: "thread-3",
			sender: "me",
			senderName: "Tôi",
			text: "Cảm ơn, cho anh xem các thanh toán sắp tới.",
			time: "08:10",
		},
		{
			id: "m17",
			threadId: "thread-3",
			sender: "them",
			senderName: "VERTEX Bot",
			text: "💰 Thanh toán sắp tới:\n1. Hồ sơ thi công - 15,000,000 VND (Escrow - Chờ xử lý)\n2. Tạm ứng thi công 20% - 370,000,000 VND (Escrow - Chờ xử lý)\n\nTổng cần thanh toán: 385,000,000 VND",
			time: "08:10",
		},
	],
};

export default function CommunicationsPage() {
	const [activeThread, setActiveThread] = useState("thread-1");
	const [inputValue, setInputValue] = useState("");
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const thread = THREADS.find((t) => t.id === activeThread)!;
	const messages = MESSAGES[activeThread] ?? [];

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [activeThread]);

	return (
		<div className="flex h-[calc(100vh-64px)]">
			{/* Thread list */}
			<div className="w-[280px] border-r border-border bg-card flex flex-col shrink-0">
				<div className="p-4 border-b border-border">
					<h2 className="text-lg font-semibold text-foreground">Trao đổi</h2>
				</div>
				<div className="flex-1 overflow-y-auto">
					{THREADS.map((t) => (
						<button
							key={t.id}
							onClick={() => setActiveThread(t.id)}
							className={cn(
								"w-full flex items-center gap-3 p-4 text-left hover:bg-gray-50 transition-colors",
								activeThread === t.id && "bg-primary/5",
							)}
						>
							<div className="relative shrink-0">
								<div
									className={cn(
										"w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold",
										t.isBot ? "bg-primary text-white" : "bg-navy text-white",
									)}
								>
									{t.isBot ? <Bot className="w-5 h-5" /> : t.avatar}
								</div>
								{t.online && (
									<span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success border-2 border-card rounded-full" />
								)}
							</div>
							<div className="flex-1 min-w-0">
								<div className="flex items-center justify-between">
									<span className="text-sm font-medium text-foreground truncate">{t.name}</span>
									<span className="text-[11px] text-muted-foreground shrink-0 ml-2">{t.time}</span>
								</div>
								<p className="text-xs text-muted-foreground truncate mt-0.5">{t.lastMessage}</p>
							</div>
						</button>
					))}
				</div>
			</div>

			{/* Chat area */}
			<div className="flex-1 flex flex-col bg-background min-w-0">
				{/* Chat header */}
				<div className="flex items-center justify-between px-5 py-3 border-b border-border bg-card">
					<div className="flex items-center gap-3">
						<div
							className={cn(
								"w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold",
								thread.isBot ? "bg-primary text-white" : "bg-navy text-white",
							)}
						>
							{thread.isBot ? <Bot className="w-4.5 h-4.5" /> : thread.avatar}
						</div>
						<div>
							<p className="text-sm font-semibold text-foreground">{thread.name}</p>
							<p className="text-xs text-muted-foreground">
								{thread.online ? (
									<span className="text-success">Đang hoạt động</span>
								) : (
									"Ngoại tuyến"
								)}
							</p>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<button className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors">
							<Phone className="w-4 h-4 text-muted-foreground" />
						</button>
						<button className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors">
							<MoreVertical className="w-4 h-4 text-muted-foreground" />
						</button>
					</div>
				</div>

				{/* Messages */}
				<div className="flex-1 overflow-y-auto p-5 space-y-4">
					{messages.map((m) => {
						const isMe = m.sender === "me";
						const isBot = thread.isBot && m.sender === "them";

						return (
							<div key={m.id} className={cn("flex", isMe ? "justify-end" : "justify-start")}>
								<div className={cn("max-w-[70%]")}>
									{!isMe && (
										<p className="text-xs text-muted-foreground mb-1 ml-1">{m.senderName}</p>
									)}
									<div
										className={cn(
											"px-4 py-2.5 rounded-2xl text-sm whitespace-pre-line",
											isMe
												? "bg-navy text-white rounded-br-md"
												: isBot
													? "bg-primary/10 text-foreground border border-primary/20 rounded-bl-md"
													: "bg-gray-100 text-foreground rounded-bl-md",
										)}
									>
										{m.text}
									</div>
									<p
										className={cn(
											"text-[11px] text-muted-foreground mt-1",
											isMe ? "text-right mr-1" : "ml-1",
										)}
									>
										{m.time}
									</p>
								</div>
							</div>
						);
					})}
					<div ref={messagesEndRef} />
				</div>

				{/* Input area */}
				<div className="px-5 py-3 border-t border-border bg-card">
					<div className="flex items-end gap-2">
						<button className="w-9 h-9 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors shrink-0 mb-0.5">
							<Paperclip className="w-4.5 h-4.5 text-muted-foreground" />
						</button>
						<textarea
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							placeholder="Nhập tin nhắn..."
							rows={1}
							className="flex-1 resize-none rounded-xl border border-border bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
						/>
						<button className="w-9 h-9 rounded-lg bg-primary text-white flex items-center justify-center hover:opacity-90 transition-opacity shrink-0 mb-0.5">
							<Send className="w-4 h-4" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
