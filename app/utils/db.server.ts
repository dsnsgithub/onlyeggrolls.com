import { MongoClient } from "mongodb";

const connectionString = process.env.CONNECTION_STRING || "";

if (!connectionString) {
	throw new Error(
		"No connection string provided. \n\nPlease create a `.env` file in the root of this project. Add a CONNECTION_STRING variable to that file with the connection string to your MongoDB cluster. \nRefer to the README.md file for more information."
	);
}

export const client = new MongoClient(connectionString);
