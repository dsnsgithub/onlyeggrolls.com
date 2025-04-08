import { createCookieSessionStorage } from "@remix-run/node"; // or cloudflare/deno
import { client } from "./utils/db.server";
import { ObjectId } from "mongodb";


type SessionData = {
  userId: string;
};


interface SessionStorage {
  cookie: Record<string, string | boolean>;
  createData(data: SessionData, expires: Date | null): Promise<string>;
  readData(id: string): Promise<SessionData | null>;
  updateData(id: string, data: SessionData, expires: Date | null): Promise<void>;
  deleteData(id: string): Promise<void>;
  close(): Promise<void>;
}


function createDatabaseSessionStorage({ cookie }: { cookie: Record<string, string | boolean> }) {
	// Configure your database client...
	const db = client.db("sessionStorage");
	const collection = db.collection("sessions");

	return createCookieSessionStorage({
		cookie,
		async createData(data, expires) {
			// Insert data into the collection
			const result = await collection.insertOne({
				data,
				expires
			});

			// Return the inserted document's ID
			return result.insertedId.toString();
		},
		async readData(id) {
			// Find the document by ID and ensure it's not expired
			const document = await collection.findOne({
				_id: new ObjectId(id),
				$or: [{ expires: null }, { expires: { $gt: new Date() } }] // Expired check
			});

			// Return the data or null if not found
			return document ? document.data : null;
		},
		async updateData(id, data, expires) {
			// Update the document with new data and expiration date
			await collection.updateOne({ _id: new ObjectId(id) }, { $set: { data, expires } });
		},
		async deleteData(id) {
			// Delete the document by ID
			await collection.deleteOne({ _id: new ObjectId(id) });
		},
		async close() {
			// Close the database connection
			await client.close();
		}
	} as SessionStorage);
}


const { getSession, commitSession, destroySession } = createDatabaseSessionStorage({
	cookie: {
		name: "__session",
		httpOnly: true,
		secure: true
	}
});

export { getSession, commitSession, destroySession };