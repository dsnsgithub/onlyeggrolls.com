
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node"; // or cloudflare/deno
import { json, redirect } from "@remix-run/node"; // or cloudflare/deno
import { useLoaderData } from "@remix-run/react";
import { client } from "../utils/db.server";
import { getSession, commitSession } from "../sessions";
import bcrypt from "bcryptjs";

// Loader function
export async function loader({ request }: LoaderFunctionArgs) {
	const session = await getSession(request.headers.get("Cookie"));

	if (session.has("userId")) {
		// Redirect to the home page if they are already signed in.
		return session.get("userId");
	}

	const data = { error: session.get("error") };

	return json(data, {
		headers: {
			"Set-Cookie": await commitSession(session)
		}
	});
}

// Action function
export async function action({ request }: ActionFunctionArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	const form = await request.formData();
	const intent = form.get("intent");
	const username = form.get("username")?.toString();
	const password = form.get("password")?.toString();

	if (!username || !password) {
		session.flash("error", "Username and password are required.");
		return redirect("/account", {
			headers: {
				"Set-Cookie": await commitSession(session)
			}
		});
	}

	try {
		const db = client.db("usersDatabase"); // Replace with your DB name
		const usersCollection = db.collection("users");

		if (intent === "signup") {
			// Check if user already exists
			const existingUser = await usersCollection.findOne({ username });
			if (existingUser) {
				session.flash("error", "Username already exists.");
				return redirect("/order", {
					headers: {
						"Set-Cookie": await commitSession(session)
					}
				});
			}

			// Hash the password and create a new user
			const hashedPassword = await bcrypt.hash(password, 10);
			await usersCollection.insertOne({
				username,
				password: hashedPassword
			});

			// Log in the user
			session.set("userId", username);
			return redirect("/order", {
				headers: {
					"Set-Cookie": await commitSession(session)
				}
			});
		} else if (intent === "login") {
			// Validate user credentials
			const user = await usersCollection.findOne({ username });
			if (!user || !(await bcrypt.compare(password, user.password))) {
				session.flash("error", "Invalid username or password.");
				return redirect("/account", {
					headers: {
						"Set-Cookie": await commitSession(session)
					}
				});
			}

			// Log in the user
			session.set("userId", user.username);
			return redirect("/order", {
				headers: {
					"Set-Cookie": await commitSession(session)
				}
			});
		}
	} catch (error) {
		session.flash("error", "Something went wrong. Please try again.");
		return redirect("/account", {
			headers: {
				"Set-Cookie": await commitSession(session)
			}
		});
	}
}



export default function Account() {
	const userData = useLoaderData<typeof loader>();
	return (
		<div className="container mx-12 mt-10">
			<div className="text-3xl font-bold text-gray-800 mb-4">Account</div>

			{/* make a WORK IN PROGRESS BANNER */}

			<div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
				<p className="font-bold">Work in Progress</p>
				<p>This page is still under construction.</p>
			</div>
			
			{/* {error ? <div className="error text-red-600">{error}</div> : null} */}
			{userData ? (
				<div>Logged in as {JSON.stringify(userData)}</div>
			) : (
				<div className="space-y-6">
					{/* Login Form */}
					<form method="POST" className="space-y-4">
						<input type="hidden" name="intent" value="login" />
						<div>
							<label className="block text-sm font-medium text-gray-700" htmlFor="username">
								Username
							</label>
							<input type="text" name="username" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required />
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700" htmlFor="password">
								Password
							</label>
							<input type="password" name="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required />
						</div>
						<button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
							Log In
						</button>
					</form>

					{/* Signup Form */}
					<form method="POST" className="space-y-4">
						<input type="hidden" name="intent" value="signup" />
						<div>
							<label className="block text-sm font-medium text-gray-700" htmlFor="username">
								Username
							</label>
							<input type="text" name="username" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required />
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700" htmlFor="password">
								Password
							</label>
							<input type="password" name="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required />
						</div>
						<button type="submit" className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
							Sign Up
						</button>
					</form>
				</div>
			)}
		</div>
	);
}
