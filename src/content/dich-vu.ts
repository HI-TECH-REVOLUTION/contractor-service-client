import type { MarketingPageContent } from "@/content/types";
import { unsplashPhoto } from "@/lib/unsplash";

export const DICH_VU_SLUGS = [
	"dien-lanh",
	"ve-sinh-nha-cua",
	"sua-chua-dien-nuoc",
	"hop-dong-dich-vu",
	"xay-dung-va-cai-tao",
	"noi-that-va-trang-tri",
	"co-dien-va-smart-home",
	"canh-quan-ngoai-that",
] as const;

export type DichVuSlug = (typeof DICH_VU_SLUGS)[number];

function serviceBase(
	slug: DichVuSlug,
	extra: Omit<MarketingPageContent, "path">,
): MarketingPageContent {
	const sections = extra.sections.map((section, i) => ({
		...section,
		id: section.id ?? `${slug}-sec-${i}`,
	}));
	return {
		path: `/dich-vu/${slug}`,
		...extra,
		sections,
	};
}

export const dichVuDienLanh = serviceBase("dien-lanh", {
	title: "Dịch vụ điện lạnh tại nhà — Vệ sinh, lắp đặt & sửa chữa | HomeBase",
	description:
		"Đặt dịch vụ điện lạnh: vệ sinh máy lạnh, sửa điều hòa, máy giặt, tủ lạnh. Thợ có kinh nghiệm, báo giá rõ ràng, hỗ trợ sau dịch vụ.",
	h1: "Dịch vụ điện lạnh",
	keywords: ["vệ sinh máy lạnh", "sửa điều hòa", "sửa máy giặt", "dịch vụ điện lạnh tại nhà"],
	serviceOfferDescription:
		"Dịch vụ kỹ thuật điện lạnh gia dụng: kiểm tra, vệ sinh, sửa chữa và lắp đặt thiết bị.",
	hero: {
		kicker: "Mát lạnh đúng chuẩn — an toàn điện",
		image: {
			src: unsplashPhoto("photo-1626806787461-102c1bfaaea1", 1200),
			alt: "Điều hòa không khí hiện đại trong phòng",
		},
	},
	sections: [
		{
			level: 2,
			heading: "Phạm vi dịch vụ",
			paragraphs: [
				"Vệ sinh và bảo dưỡng điều hòa treo tường, âm trần; kiểm tra gas và xử lý chảy nước dàn lạnh. Sửa chữa máy giặt cửa trên, cửa ngang; tủ lạnh không lạnh, kêu lạ.",
				"Lắp đặt mới theo thiết kế nhà ở, hướng dẫn sử dụng và bảo hành theo từng hạng mục thỏa thuận.",
			],
		},
		{
			level: 2,
			heading: "Quy trình thực hiện",
			paragraphs: [
				"Tiếp nhận mô tả triệu chứng → báo giá sơ bộ hoặc khảo sát tại nhà → thực hiện công việc trong khung giờ hẹn → nghiệm thu và hướng dẫn bảo quản.",
			],
		},
		{
			level: 2,
			heading: "Gợi ý liên quan",
			paragraphs: [
				"Kết hợp vệ sinh máy lạnh định kỳ với kiểm tra đường điện ổ cắm riêng cho block ngoài trời giúp an toàn và bền thiết bị. Xem thêm mẹo tại Cẩm nang nhà cửa của HomeBase.",
			],
		},
	],
	faqs: [
		{
			question: "Vệ sinh máy lạnh mất khoảng bao lâu?",
			answer:
				"Thông thường 45–90 phút tùy mức độ bám bụi và vị trí lắp đặt. Thợ sẽ thông báo nếu cần tháo dàn phức tạp hơn.",
		},
	],
	gallery: [
		{
			src: unsplashPhoto("photo-1527515637462-cff94eecc1ac", 800),
			alt: "Bảo trì thiết bị gia dụng",
		},
	],
	relatedLinks: [
		{ href: "/cam-nang#ve-sinh-may-lanh-dinh-ky", label: "Cẩm nang vệ sinh máy lạnh" },
		{ href: "/dich-vu/sua-chua-dien-nuoc", label: "Sửa chữa điện nước" },
	],
});

export const dichVuVeSinh = serviceBase("ve-sinh-nha-cua", {
	title: "Vệ sinh nhà cửa — Tổng vệ sinh, theo giờ, sofa & thảm | HomeBase",
	description:
		"Dịch vụ vệ sinh nhà ở, căn hộ chung cư: tổng vệ sinh, dọn theo giờ, giặt ghế sofa và thảm. Đội ngũ gọn gàng, dụng cụ chuyên dụng.",
	h1: "Vệ sinh nhà cửa",
	keywords: ["tổng vệ sinh nhà", "vệ sinh căn hộ", "giặt sofa", "dọn nhà theo giờ"],
	serviceOfferDescription:
		"Dịch vụ vệ sinh nhà ở và căn hộ: tổng vệ sinh, theo giờ, làm sạch sofa và thảm.",
	hero: {
		kicker: "Không gian sạch — sống nhẹ nhàng hơn",
		image: {
			src: unsplashPhoto("photo-1584622650111-993a426fbf0a", 1200),
			alt: "Vệ sinh và lau dọn nhà cửa sạch sẽ",
		},
	},
	sections: [
		{
			level: 2,
			heading: "Gói phổ biến",
			paragraphs: [
				"Tổng vệ sinh trước khi vào ở hoặc sau cải tạo; dọn định kỳ theo giờ cho gia đình bận rộn; làm sạch sâu nhà bếp, nhà vệ sinh và kính mặt tiền.",
				"Giặt ghế sofa, nệm và thảm tại nhà với máy hút bẩn chuyên dụng, giảm mùi và bụi mịn.",
			],
		},
		{
			level: 2,
			heading: "Quy trình & lưu ý",
			paragraphs: [
				"Khách hàng có thể ưu tiên thứ tự phòng; nhân sự mang dụng cụ và hóa chất phù hợp loại sàn, đá và gỗ. Với đồ dễ trầy, thợ sẽ thử trên vùng nhỏ trước.",
			],
		},
	],
	faqs: [
		{
			question: "Tôi có cần ở nhà suốt buổi không?",
			answer:
				"Nên có người mở cửa và nghiệm thu lúc bàn giao. Nếu uỷ quyền, vui lòng thỏa thuận trước với điều phối viên.",
		},
	],
	gallery: [
		{
			src: unsplashPhoto("photo-1563453392212-326f5e854473", 800),
			alt: "Phòng khách sạch và gọn",
		},
	],
	relatedLinks: [
		{ href: "/cam-nang#tong-ve-sinh-can-ho", label: "Mẹo tổng vệ sinh" },
		{ href: "/dich-vu/dien-lanh", label: "Điện lạnh" },
	],
});

export const dichVuDienNuoc = serviceBase("sua-chua-dien-nuoc", {
	title: "Sửa chữa điện nước tại nhà — Chập điện, ống nước, thiết bị vệ sinh | HomeBase",
	description:
		"Thợ điện nước xử lý chập điện, thay ổ cắm, sửa rò rỉ, lavabo, lavabo bị nghẹt. Có mặt nhanh, báo giá trước khi làm.",
	h1: "Sửa chữa điện nước",
	keywords: ["sửa điện tại nhà", "sửa ống nước", "thợ điện nước", "chập điện"],
	serviceOfferDescription:
		"Sửa chữa hệ thống điện dân dụng và cấp thoát nước: chập cháy, rò rỉ, thiết bị vệ sinh.",
	hero: {
		kicker: "An toàn điện — nước chạy đúng áp",
		image: {
			src: unsplashPhoto("photo-1621905252507-b35492cc74b4", 1200),
			alt: "Thợ điện kiểm tra tủ điện",
		},
	},
	sections: [
		{
			level: 2,
			heading: "Hạng mục điện",
			paragraphs: [
				"Xử lý nhảy aptomat, mùi khét, ổ cẩm lỏng; thay công tắc, đèn; kéo đường điện nhỏ có khảo sát. Luôn ưu tiên ngắt nguồn an toàn trước khi thao tác.",
			],
		},
		{
			level: 2,
			heading: "Hạng mục nước",
			paragraphs: [
				"Thay van, vòi, dây cấp; xử lý rò rỉ tường ẩm có hạn; thông tắc nhẹ lavabo, thoát sàn khi phù hợp phương án cơ học.",
			],
		},
		{
			level: 2,
			heading: "Minh bạch chi phí",
			paragraphs: [
				"Phí công và vật tư được thông báo trước khi thi công phát sinh. Với hạng mục ẩn trong tường, thợ sẽ báo khi mở kiểm tra có phát sinh thực tế.",
			],
		},
	],
	faqs: [
		{
			question: "Sự cố khẩn cấp có được ưu tiên không?",
			answer:
				"Rò nước lớn hoặc nguy cơ chập điện được ưu tiên điều phối. Hãy mô tả ngắn và gửi ảnh nếu có để bộ phận hỗ trợ sắp xếp nhanh.",
		},
	],
	gallery: [
		{
			src: unsplashPhoto("photo-1581578731548-c64695cc6952", 800),
			alt: "Sửa chữa và bảo trì nhà ở",
		},
	],
	relatedLinks: [
		{ href: "/cam-nang#checklist-tho-dien-nuoc", label: "Checklist gọi thợ" },
		{ href: "/dich-vu/co-dien-va-smart-home", label: "Cơ điện & Smarthome" },
	],
});

export const dichVuHopDong = serviceBase("hop-dong-dich-vu", {
	title: "Hợp đồng dịch vụ — Bảo trì định kỳ doanh nghiệp & tòa nhà | HomeBase",
	description:
		"Gói hợp đồng bảo trì điện, nước, vệ sinh và hạ tầng chung cho văn phòng, chung cư và tòa nhà thương mại. Lịch rõ ràng, báo cáo định kỳ.",
	h1: "Hợp đồng dịch vụ",
	keywords: ["hợp đồng bảo trì", "dịch vụ tòa nhà", "bảo trì văn phòng", "facility"],
	serviceOfferDescription:
		"Hợp đồng dịch vụ bảo trì và vận hành hạ tầng cho doanh nghiệp và tòa nhà.",
	hero: {
		kicker: "Vận hành trơn tru — giảm sự cố đột xuất",
		image: {
			src: unsplashPhoto("photo-1497366754035-f200968a6e72", 1200),
			alt: "Không gian văn phòng hiện đại",
		},
	},
	sections: [
		{
			level: 2,
			heading: "Đối tượng phù hợp",
			paragraphs: [
				"Ban quản trị chung cư, chủ đầu tư cho thuê văn phòng, chuỗi cửa hàng cần lịch kiểm tra định kỳ và phản hồi nhanh khi có báo cáo sự cố.",
			],
		},
		{
			level: 2,
			heading: "Nội dung có thể gói gọn",
			paragraphs: [
				"Kiểm tra hệ thống điện nhánh chung, bơm nước, PCCC cơ bản theo phạm vi thỏa thuận; vệ sinh khu vực công cộng; hỗ trợ lắp đặt nhỏ theo ticket.",
			],
		},
		{
			level: 2,
			heading: "Báo cáo & nghiệm thu",
			paragraphs: [
				"Sau mỗi đợt bảo trì, biên bản hiện trường giúp ban quản lý theo dõi xu hướng hư hỏng và lên kế hoạch ngân sách năm.",
			],
		},
	],
	faqs: [
		{
			question: "Có tùy chỉnh theo quy mô tòa nhà không?",
			answer:
				"Có. Phụ lục hợp đồng ghi rõ tần suất, danh mục và SLA phản hồi sự cố theo từng hạng mục.",
		},
	],
	relatedLinks: [
		{ href: "/cam-nang#hop-dong-bao-tri-toa-nha", label: "Cẩm nang hợp đồng tòa nhà" },
		{ href: "/dich-vu/ve-sinh-nha-cua", label: "Vệ sinh nhà cửa" },
	],
});

export const dichVuXayDung = serviceBase("xay-dung-va-cai-tao", {
	title: "Xây dựng & cải tạo — Thiết kế, thi công phần thô & trọn gói | HomeBase",
	description:
		"Tư vấn và thi công xây mới, cải tạo nhà phố và căn hộ: phần thô, hoàn thiện cơ bản, nâng cấp phòng chức năng. Báo giá theo hạng mục.",
	h1: "Xây dựng & cải tạo",
	keywords: ["cải tạo nhà", "xây dựng nhà phố", "sửa nhà trọn gói", "thi công phần thô"],
	serviceOfferDescription:
		"Dịch vụ xây dựng và cải tạo nhà ở: khảo sát, thi công phần thô và hoàn thiện theo phạm vi hợp đồng.",
	hero: {
		kicker: "Từ ý tưởng đến bàn giao có kiểm soát",
		image: {
			src: unsplashPhoto("photo-1504307651254-35680f356dfd", 1200),
			alt: "Công trường xây dựng và mũ bảo hộ",
		},
	},
	sections: [
		{
			level: 2,
			heading: "Phạm vi thi công",
			paragraphs: [
				"Đập phá có kiểm soát, xây tô trát, chống thấm, lát nền ốp tường cơ bản; cải tạo phòng ngủ, bếp, WC theo bản vẽ đã duyệt.",
			],
		},
		{
			level: 2,
			heading: "Quy trình đề xuất",
			paragraphs: [
				"Khảo sát hiện trạng → dự toán sơ bộ → hợp đồng và tiến độ → thi công theo mốc nghiệm thu → bàn giao và bảo hành theo từng hạng mục.",
			],
		},
	],
	faqs: [
		{
			question: "Có hỗ trợ xin giấy phép không?",
			answer:
				"Tùy địa phương và loại công trình. Đội ngũ tư vấn sẽ nêu rõ hồ sơ cần chuẩn bị trong buổi khảo sát đầu.",
		},
	],
	gallery: [
		{
			src: unsplashPhoto("photo-1541888946425-d81bb19240f5", 800),
			alt: "Thi công và cải tạo công trình",
		},
	],
	relatedLinks: [
		{ href: "/dich-vu/noi-that-va-trang-tri", label: "Nội thất & trang trí" },
		{ href: "/gioi-thieu", label: "Về HomeBase" },
	],
});

export const dichVuNoiThat = serviceBase("noi-that-va-trang-tri", {
	title: "Nội thất & trang trí — Thi công, sơn, trần vách, nhôm kính | HomeBase",
	description:
		"Thi công nội thất: sơn nước, trần thạch cao, vách ngăn, tủ âm tường, cửa nhôm kính. Tư vấn phối màu và vật liệu phù hợp ngân sách.",
	h1: "Nội thất & trang trí",
	keywords: ["thi công nội thất", "sơn nhà", "trần thạch cao", "nhôm kính"],
	serviceOfferDescription:
		"Thi công hoàn thiện nội thất: sơn, trần vách, mộc và nhôm kính theo thiết kế.",
	hero: {
		kicker: "Không gian đẹp — sống đúng gu",
		image: {
			src: unsplashPhoto("photo-1618221195710-dd6b41faaea6", 1200),
			alt: "Phòng khách nội thất hiện đại",
		},
	},
	sections: [
		{
			level: 2,
			heading: "Hạng mục tiêu biểu",
			paragraphs: [
				"Sơn lót và hoàn thiện trong nhà; trần chìm, vách trang trí; đóng tủ bếp, tủ quần áo theo thước; lắp cửa đi, cửa sổ nhôm kính.",
			],
		},
		{
			level: 2,
			heading: "Phối hợp với cải tạo",
			paragraphs: [
				"Sau phần thô ổn định, đội hoàn thiện bám tiến độ để tránh ẩm tường chưa đủ ngày hoặc bụi thi công lẫn vào lớp sơn cuối.",
			],
		},
	],
	faqs: [
		{
			question: "Có bảo hành nứt sơn không?",
			answer:
				"Điều kiện bảo hành phụ thuộc loại sơn, độ ẩm tường và thi công gốc. Sẽ được ghi trong hợp đồng và biên bản nghiệm thu.",
		},
	],
	relatedLinks: [
		{ href: "/dich-vu/xay-dung-va-cai-tao", label: "Xây dựng & cải tạo" },
		{ href: "/dich-vu/ve-sinh-nha-cua", label: "Vệ sinh sau thi công" },
	],
});

export const dichVuCoDien = serviceBase("co-dien-va-smart-home", {
	title: "Cơ điện & Smarthome — Điện nước công trình, nhà thông minh | HomeBase",
	description:
		"Thi công cơ điện công trình nhỏ, tủ điện mở rộng, đi dây mạng; tư vấn lắp thiết bị nhà thông minh: công tắc, khóa, camera an ninh.",
	h1: "Cơ điện & Smarthome",
	keywords: ["cơ điện công trình", "smarthome", "nhà thông minh", "lắp camera"],
	serviceOfferDescription: "Cơ điện và tích hợp thiết bị smarthome cho nhà ở và văn phòng nhỏ.",
	hero: {
		kicker: "Kết nối thông minh — vận hành ổn định",
		image: {
			src: unsplashPhoto("photo-1513506003901-1e6a229e2d15", 1200),
			alt: "Thiết bị điện và công nghệ trong nhà",
		},
	},
	sections: [
		{
			level: 2,
			heading: "Cơ điện",
			paragraphs: [
				"Mở rộng mạch điện an toàn theo tải mới; đi ống luồn dây; lắp đặt đèn chiếu sáng khu vực chung và ngoài trời có IP phù hợp.",
			],
		},
		{
			level: 2,
			heading: "Smarthome",
			paragraphs: [
				"Lắp công tắc thông minh tương thích hệ sinh thái phổ biến; cảm biến cửa và khóa điện tử; camera Wi-Fi có hướng dẫn bảo mật tài khoản.",
			],
		},
	],
	faqs: [
		{
			question: "Nhà cũ có lên smarthome được không?",
			answer:
				"Nhiều trường hợp được nếu có dây trung tính tại công tắc hoặc dùng giải pháp không cần đục tường nhiều. Cần khảo sát tủ điện và Wi-Fi.",
		},
	],
	relatedLinks: [
		{ href: "/dich-vu/sua-chua-dien-nuoc", label: "Sửa chữa điện nước" },
		{ href: "/dich-vu/dien-lanh", label: "Điện lạnh" },
	],
});

export const dichVuCanhQuan = serviceBase("canh-quan-ngoai-that", {
	title: "Cảnh quan ngoại thất — Sân vườn, hồ bơi, chăm sóc cây xanh | HomeBase",
	description:
		"Thiết kế thi công sân vườn nhỏ, hệ tưới tự động, vệ sinh bể bơi gia đình, cắt tỉa cây định kỳ. Tư vấn cây phù hợp khí hậu.",
	h1: "Cảnh quan ngoại thất",
	keywords: ["sân vườn", "cảnh quan", "hồ bơi gia đình", "tưới tự động"],
	serviceOfferDescription:
		"Dịch vụ cảnh quan và ngoại thất: sân vườn, tưới tiêu, chăm sóc bể bơi và cây xanh.",
	hero: {
		kicker: "Xanh mát — không gian ngoài trời sống động",
		image: {
			src: unsplashPhoto("photo-1416879595882-3373a0480b5b", 1200),
			alt: "Sân vườn xanh và cảnh quan đẹp",
		},
	},
	sections: [
		{
			level: 2,
			heading: "Hạng mục",
			paragraphs: [
				"Thi công lát sân, hàng rào cây xanh; lắp hệ thống tưới nhỏ giọt; vệ sinh và xử lý nước bể bơi theo chu kỳ; cắt tỉa tán cây an toàn.",
			],
		},
		{
			level: 2,
			heading: "Bảo trì định kỳ",
			paragraphs: [
				"Gói theo tháng hoặc mùa giúp cây phát triển đều và phát hiện sớm sâu bệnh, đất trũng.",
			],
		},
	],
	faqs: [
		{
			question: "Diện tích nhỏ có làm được không?",
			answer:
				"Có. Phương án tối ưu cho ban công, sân sau nhà phố hoặc sân thượng với chậu cảnh và tưới tự động nhỏ.",
		},
	],
	gallery: [
		{
			src: unsplashPhoto("photo-1598902108854-10e335adac99", 800),
			alt: "Vườn cây và không gian ngoài trời",
		},
	],
	relatedLinks: [
		{ href: "/dich-vu/xay-dung-va-cai-tao", label: "Xây dựng & cải tạo" },
		{ href: "/dich-vu/hop-dong-dich-vu", label: "Hợp đồng dịch vụ" },
	],
});

export const dichVuBySlug: Record<DichVuSlug, MarketingPageContent> = {
	"dien-lanh": dichVuDienLanh,
	"ve-sinh-nha-cua": dichVuVeSinh,
	"sua-chua-dien-nuoc": dichVuDienNuoc,
	"hop-dong-dich-vu": dichVuHopDong,
	"xay-dung-va-cai-tao": dichVuXayDung,
	"noi-that-va-trang-tri": dichVuNoiThat,
	"co-dien-va-smart-home": dichVuCoDien,
	"canh-quan-ngoai-that": dichVuCanhQuan,
};

export function getDichVuPage(slug: string): MarketingPageContent | null {
	if (!DICH_VU_SLUGS.includes(slug as DichVuSlug)) return null;
	return dichVuBySlug[slug as DichVuSlug];
}
