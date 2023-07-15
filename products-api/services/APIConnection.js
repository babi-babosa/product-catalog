import { MongoClient, ServerApiVersion} from 'mongodb';

let db = null;

export const connect = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const client = await new MongoClient("mongodb+srv://user:testSmartex@products-api.m43mgy6.mongodb.net/?retryWrites=true&w=majority", {
                serverApi: {
                    version: ServerApiVersion.v1,
                    strict: false,
                    deprecationErrors: true,
                    apiStrict: false
                }
            });

            await client.connect();
            db = client.db("products-database");
            resolve();
            //this._CollectionProducts.createIndex( { title: 'text' , categoryID: "text" }, { name: 'search_index_text' });
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            reject(error); // Reject the promise with the error
        }
    });
};

export const getDB = () => {
    if (!db) {
        throw new Error('MongoDB connection not established.');
    }
    return db;
};