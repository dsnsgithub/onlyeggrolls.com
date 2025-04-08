import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";
import Navbar from "./components/Navbar";
import { FaGithub } from "react-icons/fa6";

export const links: LinksFunction = () => [
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous"
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
	}
];

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body className="">
				<Navbar />
				<div className="container mx-auto flex flex-col gap-10 px-6">{children}</div>
				
				<a href="https://github.com/dsnsgithub/onlyeggrolls.com" className="fixed bottom-4 right-4 text-lg text-center mb-4">
					<FaGithub className="text-3xl" title="GitHub - @dsnsgithub"></FaGithub>
				</a>
				
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}
