export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen flex items-center justify-center bg-linear-to-br from-(--color-navy) to-(--color-primary) relative overflow-hidden">
			<div
				className="absolute inset-0 opacity-10"
				style={{
					backgroundImage:
						"url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='1' fill='white'/%3E%3C/svg%3E\")",
				}}
			/>
			<div className="relative z-10 w-full max-w-md mx-4">{children}</div>
		</div>
	);
}
