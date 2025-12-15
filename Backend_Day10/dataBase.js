const { MongoClient } = require("mongodb");
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = "mongodb://localhost:27016";
const client = new MongoClient(url);

// Database Name
const dbName = "sigma";

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("course");

  // ? the following code examples can be pasted here...

  // const FindResult=await collection.find({}).toArray();
  // const FindResult = collection.find({});
  // const ans=await FindResult.toArray();
  // for await (const doc of FindResult) {
  //   console.log("Found Document=>", doc);
  // }
  //   console.log("Found Document=>",FindResult);

  // const InserResult=await collection.insertOne({name:"kaushal",age:25,course:"machine learning",Balence:2000});
  const InsertResult = await collection.insertMany([
    { name: "guddu", age: 20, course: "java" },
    { name: "arjun", age: 21, course: "development" },
    { name: "Nitish", age: 21, course: "full stack development" },
  ]);
  console.log("inserted document=>", InsertResult);

  return "done.";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
