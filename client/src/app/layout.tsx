import Head from "next/head";
import Script from "next/script";
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
			<Head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="description" content={metadata.description} />
				<title>{metadata.title}</title>
			</Head>
			<Script
				id="clarity"
				strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: `
				  (function(c,l,a,r,i,t,y){
					c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
					t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
					y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
					})(window, document, "clarity", "script", "ghcx5k0i5h");
				  `,
				}}
			>
				{" "}
			</Script>
			<body>{children}</body>
		</html>
	);
}
