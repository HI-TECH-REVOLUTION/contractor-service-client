import type { MarketingPageContent, PartnerMarketingPageContent } from "@/content/types";
import { unsplashPhoto } from "@/lib/unsplash";

export const pageGioiThieu: MarketingPageContent = {
	path: "/gioi-thieu",
	title: "Giới thiệu HomeBase — Đồng hành chăm sóc nhà cửa",
	description:
		"Tìm hiểu sứ mệnh, giá trị và quy trình của HomeBase trong việc kết nối khách hàng với dịch vụ nhà cửa uy tín, minh bạch.",
	h1: "Về HomeBase",
	keywords: ["HomeBase", "dịch vụ nhà cửa", "giới thiệu công ty", "thợ uy tín"],
	hero: {
		kicker: "Cùng bạn an tâm từng mét vuông",
		image: {
			src: unsplashPhoto("photo-1581578731548-c64695cc6952", 1200),
			alt: "Đội ngũ chăm sóc và sửa chữa nhà cửa chuyên nghiệp",
		},
	},
	sections: [
		{
			level: 2,
			heading: "Chúng tôi là ai",
			paragraphs: [
				"HomeBase là nền tảng hướng tới việc đơn giản hóa mọi nhu cầu nhà cửa — từ điện lạnh, vệ sinh, sửa chữa điện nước đến xây dựng và cải tạo. Chúng tôi tin rằng một ngôi nhà an toàn, sạch và tiện nghi là nền tảng cho cuộc sống chất lượng.",
				"Thay vì để bạn tự tìm kiếm từng thợ riêng lẻ, HomeBase tập trung vào quy trình rõ ràng: mô tả nhu cầu, báo giá minh bạch, lịch hẹn linh hoạt và hỗ trợ sau khi hoàn thành công việc.",
			],
		},
		{
			level: 2,
			heading: "Sứ mệnh & giá trị",
			paragraphs: [
				"Sứ mệnh của chúng tôi là mang lại sự yên tâm: khách hàng biết mình đang trả tiền cho điều gì, ai thực hiện và được bảo vệ thế nào khi có phát sinh.",
				"Minh bạch trong báo giá, tôn trọng thời gian của khách hàng và đối tác, cùng tinh thần cải tiến liên tục dựa trên phản hồi thực tế là ba trụ cột chúng tôi theo đuổi.",
			],
		},
		{
			level: 2,
			heading: "Quy trình làm việc",
			paragraphs: [
				"Bạn chọn hạng mục dịch vụ phù hợp trên website, mô tả ngắn gọn tình trạng hoặc nhu cầu. Hệ thống hoặc đội ngũ tư vấn hỗ trợ làm rõ phạm vi công việc.",
				"Sau khi thống nhất báo giá và lịch, đối tác kỹ thuật thực hiện tại địa điểm theo cam kết. Khi bàn giao, bạn được hướng dẫn kiểm tra và có kênh hỗ trợ nếu cần điều chỉnh nhỏ sau dịch vụ.",
			],
		},
		{
			level: 2,
			heading: "Cam kết với khách hàng",
			paragraphs: [
				"Chúng tôi không ngừng hoàn thiện tiêu chí lựa chọn đối tác, chuẩn hóa mô tả dịch vụ và cập nhật nội dung hữu ích trên Cẩm nang để bạn chủ động hơn trong việc bảo quản nhà cửa.",
			],
		},
	],
	faqs: [
		{
			question: "HomeBase có trực tiếp cử thợ đến nhà không?",
			answer:
				"HomeBase kết nối bạn với đối tác kỹ thuật và đơn vị cung cấp dịch vụ đã qua kiểm chứng. Quy trình đặt lịch và chăm sóc khách hàng được thống nhất trên nền tảng.",
		},
		{
			question: "Làm sao để báo giá được chính xác?",
			answer:
				"Bạn nên mô tả rõ triệu chứng hoặc gửi ảnh hiện trường. Với hạng mục phức tạp, thợ có thể cần khảo sát trực tiếp trước khi chốt phương án và chi phí.",
		},
	],
	gallery: [
		{
			src: unsplashPhoto("photo-1504307651254-35680f356dfd", 900),
			alt: "Công trình xây dựng và cải tạo",
		},
		{
			src: unsplashPhoto("photo-1618221195710-dd6b41faaea6", 900),
			alt: "Không gian nội thất hiện đại",
		},
	],
	relatedLinks: [
		{ href: "/dich-vu/dien-lanh", label: "Đặt dịch vụ điện lạnh" },
		{ href: "/cam-nang", label: "Đọc Cẩm nang nhà cửa" },
	],
};

export const pageCamNang: MarketingPageContent = {
	path: "/cam-nang",
	title: "Cẩm nang nhà cửa HomeBase — Mẹo bảo trì & tiết kiệm",
	description:
		"Tổng hợp kiến thức thực tế về điều hòa, vệ sinh, điện nước và chăm sóc nhà cửa. Nội dung dễ áp dụng, cập nhật thường xuyên.",
	h1: "Cẩm nang nhà cửa",
	keywords: ["cẩm nang nhà cửa", "mẹo điều hòa", "vệ sinh máy lạnh", "sửa điện nước"],
	hero: {
		kicker: "Kiến thức áp dụng ngay tại nhà",
		image: {
			src: unsplashPhoto("photo-1556911220-bff31c812dba", 1200),
			alt: "Góc bếp và không gian sống gọn gàng",
		},
	},
	sections: [
		{
			level: 2,
			heading: "Vì sao nên đọc Cẩm nang trước khi gọi thợ?",
			paragraphs: [
				"Nhiều sự cố nhỏ có thể được xử lý hoặc giảm nhẹ nếu bạn nắm vài nguyên tắc cơ bản — từ đó tiết kiệm thời gian và chi phí. Cẩm nang HomeBase được viết ngắn gọn, tập trung vào tình huống thường gặp tại nhà phố và chung cư.",
				"Nội dung không thay thế tư vấn chuyên sâu của kỹ sư hay thợ tại chỗ, nhưng giúp bạn đặt câu hỏi đúng và hiểu phương án đề xuất.",
			],
		},
		{
			id: "dieu-hoa-tiet-kiem-dien",
			level: 2,
			heading: "Mẹo sử dụng điều hòa tiết kiệm điện",
			paragraphs: [
				"Đặt nhiệt độ ở mức 26–28°C kết hợp quạt gió thường đủ mát và giảm tải cho máy nén. Đóng kín cửa và rèm chống nắng trực tiếp giúp phòng hạ nhiệt nhanh hơn.",
				"Vệ sinh lưới lọc hai tuần một lần (hoặc khi thấy bụi) để luồng gió mạnh và máy không phải chạy căng. Định kỳ 6–12 tháng nên gọi dịch vụ vệ sinh máy lạnh chuyên để xử lý dàn lạnh và gas.",
			],
		},
		{
			id: "ve-sinh-may-lanh-dinh-ky",
			level: 2,
			heading: "Khi nào nên vệ sinh máy lạnh định kỳ?",
			paragraphs: [
				"Nếu máy chạy nhưng không mát như trước, có mùi ẩm mốc, hay tiếng ồn lạ từ dàn lạnh — đó là dấu hiệu cần vệ sinh hoặc kiểm tra. Tại khu vực nhiều bụi hoặc gần đường, chu kỳ nên rút ngắn.",
				"Việc vệ sinh đúng cách giúp kéo dài tuổi thọ block, giảm rò rỉ nước và cải thiện chất lượng không khí trong phòng.",
			],
		},
		{
			id: "checklist-tho-dien-nuoc",
			level: 2,
			heading: "Checklist trước khi gọi thợ điện nước",
			paragraphs: [
				"Ghi lại vị trí sự cố (ổ cắm, tủ điện, van nước, lavabo…) và thời điểm bắt đầu. Chụp ảnh hoặc quay ngắn giúp thợ chuẩn bị đúng phụ kiện.",
				"Nếu liên quan điện: ngắt cầu dao khu vực an toàn trước khi chạm vào thiết bị. Với rò rỉ nước, khóa van tổng hoặc van nhánh nếu xác định được, rồi lau khô khu vực trơn trượt.",
			],
		},
		{
			id: "tong-ve-sinh-can-ho",
			level: 2,
			heading: "Tổng vệ sinh căn hộ: ưu tiên thứ tự nào?",
			paragraphs: [
				"Nên làm từ trên xuống dưới và từ trong ra ngoài: trần, tường, đồ nội thất cố định, sau đó mới sàn và khu vệ sinh. Như vậy bụi không rơi lại lên bề mặt đã lau.",
				"Với đồ da, gỗ và thiết bị điện tử, dùng dung dịch phù hợp từng loại bề mặt; tránh xịt trực tiếp vào khe thông gió thiết bị.",
			],
		},
		{
			id: "hop-dong-bao-tri-toa-nha",
			level: 2,
			heading: "Hợp đồng bảo trì tòa nhà: cần làm rõ điều gì?",
			paragraphs: [
				"Phạm vi tần suất (hàng tháng/quý), danh mục hạng mục (điện, nước, PCCC, vệ sinh chung), và thời gian phản hồi khi có sự cố khẩn cấp nên được ghi rõ trong hợp đồng.",
				"Quy định báo cáo hiện trường và biên bản nghiệm thu giúp ban quản trị theo dõi chất lượng dài hạn.",
			],
		},
	],
	faqs: [
		{
			question: "Bài viết có được cập nhật không?",
			answer:
				"Chúng tôi bổ sung và chỉnh sửa nội dung theo phản hồi thực tế từ khách hàng và đối tác kỹ thuật để đảm bảo tính hữu ích.",
		},
		{
			question: "Tôi cần dịch vụ ngay sau khi đọc Cẩm nang?",
			answer:
				"Bạn có thể chọn hạng mục trong mục Dịch vụ trên menu và đặt lịch trực tiếp; đội ngũ sẽ hỗ trợ làm rõ phạm vi công việc.",
		},
	],
	relatedLinks: [
		{ href: "/dich-vu/ve-sinh-nha-cua", label: "Dịch vụ vệ sinh nhà cửa" },
		{ href: "/dich-vu/sua-chua-dien-nuoc", label: "Sửa chữa điện nước" },
	],
};

export const pageTuyenDung: MarketingPageContent = {
	path: "/tuyen-dung",
	title: "Tuyển dụng HomeBase — Cơ hội nghề nghiệp dịch vụ nhà cửa",
	description:
		"Tham gia HomeBase trong các vị trí vận hành, chăm sóc khách hàng và phối hợp đối tác kỹ thuật. Môi trường làm việc minh bạch, học hỏi liên tục.",
	h1: "Tuyển dụng",
	keywords: ["tuyển dụng HomeBase", "việc làm dịch vụ nhà cửa", "hỗ trợ khách hàng"],
	hero: {
		kicker: "Cùng xây trải nghiệm đặt dịch vụ tốt hơn mỗi ngày",
		image: {
			src: unsplashPhoto("photo-1521737711867-e3b97375f902", 1200),
			alt: "Làm việc nhóm và hợp tác chuyên nghiệp",
		},
	},
	sections: [
		{
			level: 2,
			heading: "Văn hóa làm việc",
			paragraphs: [
				"Tại HomeBase, chúng tôi đề cao sự rõ ràng trong giao tiếp nội bộ và với khách hàng. Mỗi thành viên được khuyến khích đóng góp ý tưởng cải thiện quy trình từ phản hồi thực tế.",
				"Đội ngũ hướng tới mục tiêu chung: giảm phiền hà cho khách hàng khi cần dịch vụ nhà cửa và tôn trọng thời gian của đối tác thực hiện.",
			],
		},
		{
			level: 2,
			heading: "Hạng mục vị trí (tham khảo)",
			paragraphs: [
				"Vận hành nền tảng và quy trình đặt lịch; chăm sóc khách hàng qua đa kênh; phối hợp chất lượng dịch vụ với đối tác kỹ thuật; nội dung và truyền thông Cẩm nang.",
				"Chi tiết yêu cầu cụ thể sẽ được cập nhật theo từng đợt tuyển. Bạn có thể gửi hồ sơ giới thiệu ngắn về kinh nghiệm và lĩnh vực quan tâm qua kênh liên hệ chính thức của công ty.",
			],
		},
		{
			level: 2,
			heading: "Quy trình ứng tuyển",
			paragraphs: [
				"Sau khi tiếp nhận hồ sơ phù hợp, nhân sự sẽ liên hệ phỏng vấn sơ bộ. Vòng tiếp theo có thể gồm tình huống xử lý thực tế hoặc làm việc thử có hoàn thành theo vị trí.",
			],
		},
	],
	faqs: [
		{
			question: "Có tuyển thợ trực tiếp không?",
			answer:
				"HomeBase tập trung vào vận hành nền tảng và phối hợp đối tác. Nhu cầu tuyển thợ nội bộ hoặc giám sát hiện trường sẽ được thông báo riêng trong từng đợt.",
		},
	],
	relatedLinks: [
		{ href: "/gioi-thieu", label: "Về HomeBase" },
		{ href: "/doi-tac/cong-tac-vien-cham-soc-nha", label: "Chương trình cộng tác viên" },
	],
};

export const pageDoiTacCTV: PartnerMarketingPageContent = {
	path: "/doi-tac/cong-tac-vien-cham-soc-nha",
	title: "Cộng tác viên chăm sóc nhà — Chương trình đối tác HomeBase",
	description:
		"Trở thành cộng tác viên chăm sóc nhà cửa cùng HomeBase: linh hoạt thời gian, quy trình hỗ trợ rõ ràng và cơ hội gắn bó lâu dài với nền tảng.",
	h1: "Cộng tác viên chăm sóc nhà",
	keywords: ["cộng tác viên", "đối tác dịch vụ nhà", "chăm sóc nhà cửa", "HomeBase"],
	partnerLanding: {
		chipIntro: "Trở thành đối tác với HomeBase trong các lĩnh vực sau:",
		formTitle: "Đăng ký trở thành cộng tác viên chăm sóc nhà",
		lead: "Gia nhập mạng lưới cộng tác viên của HomeBase để nhận đơn hàng đều đặn, minh bạch về giá và quy trình, đồng thời phát triển bền vững cùng nền tảng dịch vụ nhà cửa uy tín.",
		chips: ["Điện lạnh", "Vệ sinh nhà cửa", "Sửa chữa điện nước"],
		formVariant: "homeCare",
	},
	hero: {
		kicker: "Đồng hành cùng hệ sinh thái dịch vụ",
		image: {
			src: unsplashPhoto("photo-1584622650111-993a426fbf0a", 1400),
			alt: "Nhân viên vệ sinh chuyên nghiệp tại nhà khách",
		},
	},
	sections: [
		{
			level: 2,
			heading: "Chương trình dành cho ai?",
			paragraphs: [
				"Phù hợp với cá nhân hoặc nhóm nhỏ có kinh nghiệm dịch vụ tại nhà — vệ sinh, sắp xếp, hỗ trợ khảo sát nhẹ hoặc phối hợp lịch với thợ chính — và muốn có nguồn việc ổn định hơn thông qua nền tảng.",
				"Bạn cần thái độ chuyên nghiệp, đúng giờ và tuân thủ hướng dẫn an toàn khi làm việc tại nhà khách.",
			],
		},
		{
			level: 2,
			heading: "Lợi ích khi đồng hành",
			paragraphs: [
				"Tiếp cận khách hàng đã được làm rõ nhu cầu qua kênh đặt lịch; hỗ trợ tài liệu mô tả công việc; quy trình xác nhận hoàn thành và thanh toán minh bạch theo từng giai đoạn hợp tác.",
			],
		},
		{
			level: 2,
			heading: "Cam kết chất lượng",
			paragraphs: [
				"HomeBase duy trì tiêu chí đánh giá dựa trên phản hồi khách hàng và kiểm tra ngẫu nhiên. Cộng tác viên vi phạm quy tắc an toàn hoặc thái độ sẽ được nhắc nhở, tạm ngưng hợp tác nếu cần để bảo vệ uy tín chung.",
			],
		},
	],
	faqs: [
		{
			question: "Có phí tham gia chương trình không?",
			answer:
				"Thông tin chi phí (nếu có) và điều kiện hợp tác được gửi minh bạch khi bạn đăng ký qua kênh chính thức; không thu phí mập mờ ngoài thỏa thuận.",
		},
	],
	relatedLinks: [
		{ href: "/doi-tac/doi-tac-xay-dung", label: "Đối tác xây dựng" },
		{ href: "/tuyen-dung", label: "Tuyển dụng nội bộ" },
		{ href: "/gioi-thieu", label: "Giới thiệu HomeBase" },
	],
};

export const pageDoiTacXayDung: PartnerMarketingPageContent = {
	path: "/doi-tac/doi-tac-xay-dung",
	title: "Đối tác xây dựng — Hợp tác thi công & cải tạo cùng HomeBase",
	description:
		"Đăng ký trở thành đối tác xây dựng, cải tạo và nội thất với HomeBase: dự án rõ ràng, phối hợp vận hành minh bạch và cơ hội mở rộng quy mô.",
	h1: "Đối tác xây dựng",
	keywords: ["đối tác xây dựng", "hợp tác thi công", "cải tạo nhà", "HomeBase"],
	partnerLanding: {
		chipIntro: "Hợp tác với HomeBase trong các hạng mục:",
		formTitle: "Đăng ký trở thành đối tác xây dựng",
		lead: "Kết nối với nguồn khách hàng và dự án được làm rõ phạm vi qua nền tảng; quy trình báo giá, tiến độ và bàn giao thống nhất giúp bạn tập trung vào chất lượng thi công.",
		chips: ["Xây dựng & cải tạo", "Hợp đồng dịch vụ", "Nội thất & trang trí"],
		formVariant: "construction",
	},
	hero: {
		kicker: "Đồng hành công trình & cải tạo",
		image: {
			src: unsplashPhoto("photo-1504307651254-35680f356dfd", 1400),
			alt: "Công trình xây dựng và đội ngũ thi công",
		},
	},
	sections: [
		{
			level: 2,
			heading: "Chương trình dành cho ai?",
			paragraphs: [
				"Đơn vị thi công, đội thợ phần thô hoàn thiện, nhà thầu phụ hoặc cá nhân có năng lực thực hiện hạng mục xây dựng, cải tạo và muốn tiếp cận khách hàng qua kênh đặt lịch có kiểm soát.",
				"Bạn cam kết an toàn lao động, đúng tiến độ đã thống nhất và minh bạch khi có phát sinh.",
			],
		},
		{
			level: 2,
			heading: "Lợi ích khi hợp tác",
			paragraphs: [
				"Mô tả công việc và phạm vi được chốt trước khi triển khai; hỗ trợ truyền thông và chăm sóc khách hàng qua nền tảng; thanh toán theo mốc công việc khi đáp ứng tiêu chí nghiệm thu.",
			],
		},
		{
			level: 2,
			heading: "Tiêu chí chất lượng",
			paragraphs: [
				"HomeBase theo dõi phản hồi sau bàn giao và giữ chuẩn hợp tác. Vi phạm nghiêm trọng về an toàn hoặc chất lượng có thể dẫn tới tạm ngưng nhận dự án mới để bảo vệ khách hàng và uy tín chung.",
			],
		},
	],
	faqs: [
		{
			question: "Có cần hồ sơ năng lực khi đăng ký?",
			answer:
				"Sau khi tiếp nhận form, đội ngũ sẽ liên hệ để trao đổi phạm vi hợp tác và có thể yêu cầu hình ảnh công trình tham chiếu hoặc giấy phép kinh doanh tùy loại hình.",
		},
	],
	relatedLinks: [
		{ href: "/doi-tac/cong-tac-vien-cham-soc-nha", label: "Cộng tác viên chăm sóc nhà" },
		{ href: "/dich-vu/xay-dung-va-cai-tao", label: "Dịch vụ xây dựng & cải tạo" },
		{ href: "/gioi-thieu", label: "Giới thiệu HomeBase" },
	],
};

export const marketingPagesByPath: Record<string, MarketingPageContent> = {
	"/gioi-thieu": pageGioiThieu,
	"/cam-nang": pageCamNang,
	"/tuyen-dung": pageTuyenDung,
	"/doi-tac/cong-tac-vien-cham-soc-nha": pageDoiTacCTV,
	"/doi-tac/doi-tac-xay-dung": pageDoiTacXayDung,
};
