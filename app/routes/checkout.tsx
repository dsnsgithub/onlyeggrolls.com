import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { getSession } from "~/sessions";

interface MenuItemProps {
	name: string;
	price: number;
	image: string;
}
export async function loader({ request }: LoaderFunctionArgs) {
	const session = await getSession(request.headers.get("Cookie"));

	return session.get("userId") || null;
}

export default function Checkout() {
	const [cart, setCart] = useState<{ item: MenuItemProps; quantity: number }[]>([]);
	const cartTotal = cart.reduce((total, cartItem) => total + cartItem.item.price * cartItem.quantity, 0).toFixed(2);

	const userData = useLoaderData<typeof loader>();

	useEffect(() => {
		if (localStorage && localStorage.getItem("cart")) {
			setCart(JSON.parse(localStorage.getItem("cart")!));
		}
	}, []);

	useEffect(() => {
		if (cart.length > 0 && localStorage) {
			localStorage.setItem("cart", JSON.stringify(cart));
		}
	}, [cart]);

	return (
		<div>
			<div className="text-3xl font-bold text-gray-800 mb-16">Checkout</div>

			<div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
				<p className="font-bold">Work in Progress</p>
				<p>This page is still under construction.</p>
			</div>

			<div className="flex space-x-10">
				{/* Cart Section */}
				<div className="basis-1/2 border-r-2 px-6">
					<h1 className="text-3xl font-extrabold text-gray-800 mb-4">Cart</h1>

					<div className="space-y-4">
						{cart.map(({ item, quantity }) => (
							<div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md" key={item.name}>
								<div>
									<h1 className="text-xl font-bold text-gray-800">{item.name}</h1>
									<h1 className="text-lg text-gray-600">
										${item.price} x {quantity}
									</h1>
								</div>
							</div>
						))}

						{/* Cart Total */}
						{cart.length > 0 && (
							<div className="text-center mt-4 flex flex-row items-center justify-center space-x-10">
								<h1 className="text-2xl font-bold text-gray-800">Total: ${cartTotal}</h1>
							</div>
						)}
						{cart.length === 0 && <p className="text-gray-600 text-center">Your cart is empty</p>}
					</div>
				</div>

				<div className="basis-1/2 px-6">
					{userData ? (
						<span className="text-gray-600 text-lg">Continue as {userData}...</span>
					) : (
						<div>
							<div className="text-gray-600 text-xl">You are not logged in. Please log in to checkout.</div>
							<button className="px-6 py-3 text-lg font-semibold text-white bg-blue-400 hover:bg-blue-600 transition-all rounded-lg shadow-md mt-4">
								<Link to="/account">Create an account</Link>
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
