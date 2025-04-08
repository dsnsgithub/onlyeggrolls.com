import { MdOutlineMail } from "react-icons/md";

export default function AboutUs() {
	return (
		<div className="container mx-auto px-4 py-12">
			<div className="text-center max-w-3xl mx-auto">
				<h1 className="text-4xl font-extrabold text-gray-800 mb-4">About Us</h1>
				<p className="text-lg text-gray-600 mb-8">
					Welcome to <span className="font-bold text-yellow-500">Only Eggrolls</span>! We may not be a restaurant just yet, but we&apos;re cooking up a vision. Our goal is to create a fast,
					convenient, and delicious way for you to grab eggrolls when you need them most. Stay tuned!
				</p>
				<div className="mt-6">
					<h2 className="text-3xl font-bold text-gray-700 mb-4">Our Vision</h2>
					<p className="text-md text-gray-600 leading-relaxed">
						At Only Eggrolls, we&apos;re dedicated to becoming your go-to spot for savory and satisfying eggrolls. Whether you&apos;re craving a classic pork eggroll or exploring unique
						vegetarian options, we aim to deliver the best take-out experience.
					</p>
				</div>
				<div className="mt-10">
					<h2 className="text-3xl font-bold text-gray-700 mb-4">Contact Information</h2>

					<div className="flex justify-center items-center space-x-2 ">
						<MdOutlineMail className="text-yellow-500 text-3xl" />
						<p className="text-gray-800 font-medium">admin@onlyeggrolls.com</p>
					</div>
				</div>
			</div>
		</div>
	);
}
