export type ContentImage = {
	src: string;
	alt: string;
};

export type ContentSection = {
	/** Anchor id cho liên kết nội bộ (ví dụ /cam-nang#slug) */
	id?: string;
	level: 2 | 3;
	heading: string;
	paragraphs: string[];
};

export type ContentFaq = {
	question: string;
	answer: string;
};

/** Form đăng ký trên landing đối tác (CTV vs xây dựng). */
export type PartnerFormVariant = "homeCare" | "construction";

export type PartnerLandingContent = {
	/** Dòng giới thiệu phía trên các chip lĩnh vực */
	chipIntro: string;
	/** Tiêu đề khối form */
	formTitle: string;
	/** Đoạn mô tả dài dưới H1; nếu không có dùng `description` của trang */
	lead?: string;
	/** Nhãn chip (thường 3 mục) */
	chips: readonly string[];
	formVariant: PartnerFormVariant;
};

export type MarketingPageContent = {
	path: string;
	title: string;
	description: string;
	h1: string;
	keywords?: string[];
	hero?: {
		kicker?: string;
		image: ContentImage;
	};
	sections: ContentSection[];
	faqs?: ContentFaq[];
	gallery?: ContentImage[];
	/** Liên kết cuối trang */
	relatedLinks?: Array<{ href: string; label: string }>;
	/** Mô tả dịch vụ cho JSON-LD @type Service */
	serviceOfferDescription?: string;
	/** Landing đối tác sáng + form (CTV / xây dựng) */
	partnerLanding?: PartnerLandingContent;
};

export type PartnerMarketingPageContent = MarketingPageContent & {
	partnerLanding: PartnerLandingContent;
};

export type HomePress = {
	title: string;
	excerpt: string;
	image: ContentImage;
};

export type HomeBlogTeaser = {
	id: string;
	tag: string;
	title: string;
	excerpt: string;
	date: string;
	href: string;
	image: ContentImage;
};

export type HomeContent = {
	path: "/";
	title: string;
	description: string;
	heroDescription: string;
	press: HomePress;
	blogTeasers: HomeBlogTeaser[];
};
