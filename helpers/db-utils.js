import { MongoClient } from "mongodb";
export async function connectDatabase(){
    const client = await MongoClient.connect(
        "mongodb+srv://nextUser:next639@cluster0.a0jad.mongodb.net/?retryWrites=true&w=majority"
      );

    return client;
}

export async function insertDocument(client,collection,document){
    const db = client.db();

    return await db.collection(collection).insertOne(document)
}

export async function getAllDocuments(client,collection){
    const db = client.db();

    return await db.collection(collection).find().sort({_id:-1}).toArray();
}