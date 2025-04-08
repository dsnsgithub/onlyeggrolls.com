import { Link } from "@remix-run/react";
import { MouseEventHandler, useEffect, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface MenuItemProps {
	name: string;
	price: number;
	image: string;
}

function MenuItem({ item, onClick }: { item: MenuItemProps; onClick: MouseEventHandler<HTMLButtonElement> }) {
	return (
		<button className="shadow-lg rounded-lg overflow-hidden flex flex-col items-center p-4 transition hover:shadow-xl" onClick={onClick}>
			<div className="w-full h-48 flex items-center justify-center">
				<img src={item.image} alt={item.name} className="h-full object-cover rounded-xl aspect-square" />
			</div>
			<div className="text-center mt-4">
				<h1 className="text-xl font-bold text-gray-800">{item.name}</h1>
				<h1 className="text-lg text-gray-600">${item.price}</h1>
			</div>
		</button>
	);
}


export default function Order() {
	const [cart, setCart] = useState<{ item: MenuItemProps; quantity: number }[]>([]);
	const [cartAnimatedParent] = useAutoAnimate();

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


	const menuItems: { [key: string]: MenuItemProps[] } = {
		Eggrolls: [
			{ name: "Pork Eggroll", price: 4.99, image: "porker.jpg" },
			{ name: "Beef Eggroll", price: 3.99, image: "beefer.jpg" },
			{ name: "Shrimp Eggroll", price: 4.99, image: "shrimper.jpg" },
			{ name: "Vegetarian Eggroll", price: 5.99, image: "veger.jpg" }
		],
		Drinks: [{ name: "Fountain Drink", price: 1.99, image: "fountaindrink.webp" }]
	};

	const addToCart = (item: MenuItemProps) => {
		setCart((prevCart) => {
			const existingItem = prevCart.find((cartItem) => cartItem.item.name === item.name);
			if (existingItem) {
				return prevCart.map((cartItem) => (cartItem.item.name === item.name ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem));
			} else {
				return [...prevCart, { item, quantity: 1 }];
			}
		});
	};

	const updateQuantity = (itemName: string, delta: number) => {
		setCart((prevCart) =>
			prevCart.map((cartItem) => (cartItem.item.name === itemName ? { ...cartItem, quantity: cartItem.quantity + delta } : cartItem)).filter((cartItem) => cartItem.quantity > 0)
		);
	};

	const cartTotal = cart.reduce((total, cartItem) => total + cartItem.item.price * cartItem.quantity, 0).toFixed(2);

	return (
		<div className="flex flex-row gap-10">
			{/* Menu Section */}
			<div className="container mx-auto px-4 py-8 basis-4/6 space-y-20">
				{Object.entries(menuItems).map(([categoryName, items]) => (
					<div key={categoryName}>
						<h1 className="text-3xl font-extrabold text-gray-800 mb-4">{categoryName}</h1>
						<div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
							{items.map((item) => (
								<MenuItem key={item.name} item={item} onClick={() => addToCart(item)} />
							))}
						</div>
					</div>
				))}
			</div>

			{/* Cart Section */}
			<div className="basis-1/4">
				<h1 className="text-3xl font-extrabold text-gray-800 mb-4">Cart</h1>

				<div className="space-y-4" ref={cartAnimatedParent}>
					{cart.map(({ item, quantity }) => (
						<div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md" key={item.name}>
							<div>
								<h1 className="text-xl font-bold text-gray-800">{item.name}</h1>
								<h1 className="text-lg text-gray-600 transition-all">
									${item.price} x {quantity}
								</h1>
							</div>
							<div className="flex items-center space-x-2">
								<button className="bg-red-400 text-white px-2 py-1 rounded-lg" onClick={() => updateQuantity(item.name, -1)}>
									-
								</button>
								<span className="text-xl font-bold transition-all">{quantity}</span>
								<button className="bg-green-400 text-white px-2 py-1 rounded-lg" onClick={() => updateQuantity(item.name, 1)}>
									+
								</button>
							</div>
						</div>
					))}

					{/* Cart Total */}
					{cart.length > 0 && (
						<div className="text-center mt-4 flex flex-row items-center justify-center space-x-10">
							<h1 className="text-2xl font-bold text-gray-800">Total: ${cartTotal}</h1>
							<Link to="/checkout">
								<button className="bg-blue-400 hover:bg-blue-600 transition-all text-white px-4 py-2 rounded-lg">Checkout</button>
							</Link>
						</div>
					)}
					{cart.length === 0 && <p className="text-gray-600 text-center">Your cart is empty</p>}
				</div>
			</div>
		</div>
	);
}
