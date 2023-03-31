import "./globals.css";

export const metadata = {
	title: "Finnieston Hostel",
	description: "Low cost accommodation in the heart of Glasgow's west end.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
