/** Ảnh Unsplash qua URL đã whitelist trong next.config (images.unsplash.com). */
export function unsplashPhoto(photoPath: string, w: number, q = 80): string {
	return `https://images.unsplash.com/${photoPath}?auto=format&fit=crop&w=${w}&q=${q}`;
}
