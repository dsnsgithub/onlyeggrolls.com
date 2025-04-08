import { Link } from "@remix-run/react";

export default function Navbar() {
	return (
		<nav className="container mx-auto mt-2 px-6 py-4 flex justify-between items-center mb-10 ">
			<div className="flex flex-row items-center space-x-1">
				<img src="eggrolls.jpg" alt="eggrolls" className="rounded-full w-24 h-auto" />

				<Link to="/">
					<div className="text-3xl font-bold text-gray-800">Only Eggrolls</div>
				</Link>
			</div>

			<ul className="flex space-x-6">
				<li>
					<Link to="/" className="text-gray-700 hover:text-black hover:font-bold transition-all hover:underline text-lg">
						<span>Home</span>
					</Link>
				</li>
				<li>
					<Link to="/order" className="text-gray-700 hover:text-black hover:font-bold transition-all hover:underline text-lg">
						Order
					</Link>
				</li>
				<li>
					<Link to="/account" className="text-gray-700 hover:text-black hover:font-bold transition-all hover:underline text-lg">
						Account
					</Link>
				</li>
				<li>
					<Link to="/about" className="text-gray-700 hover:text-black hover:font-bold transition-all hover:underline text-lg">
						About
					</Link>
				</li>
			</ul>
		</nav>
	);
}
