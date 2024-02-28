import { MongoClient } from "mongodb";
declare global {
  let _mongoClientPromise: Promise<MongoClient>;
}
export default _mongoClientPromise;
