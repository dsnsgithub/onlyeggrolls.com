import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
	return [{ title: "OnlyEggrolls Home Page" }, { name: "description", content: "OnlyEggrolls!" }];
};

export default function Index() {
	return (
		<div className="flex justify-center mt-20">
			<div className="text-center flex flex-col items-center">
				<img src="eggrolls.jpg" alt="Delicious eggrolls" className="w-96 h-auto mb-6" />
				<h1 className="text-5xl font-extrabold text-gray-800 mb-4">Only Eggrolls</h1>

				<h3 className="text-lg font-medium text-gray-600 mb-6">You came here for eggrolls, and you got the best eggrolls.</h3>
				<Link to="/order">
					<button className="px-6 py-3 text-lg font-semibold text-white bg-blue-400 hover:bg-blue-600 transition-all rounded-lg shadow-md">Order Now</button>
				</Link>
			</div>
		</div>
	);
}
