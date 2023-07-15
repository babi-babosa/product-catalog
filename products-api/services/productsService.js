import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';
import { getDB } from "./APIConnection.js";

export class ProductsService {

    constructor() {
        this._DB = getDB();
        this._CollectionProducts = this._DB?.collection("products");

        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }

    async insertProduct(product){
        try {
            const p = await this._CollectionProducts.insertMany([product]);
            return p;
        } catch (err) {
            console.log(err.stack);
        }
    }

    async getProducts(){
        try {
            const p = this._CollectionProducts.find();

            const products = [];
            await p.forEach(prod => {products.push(prod)});
            return products;
        } catch (err) {
            console.log(err.stack);
        }
    }

    async updateProduct(productId, fieldsToChange){
        try {
            if (fieldsToChange.categoryId) {
                fieldsToChange.categoryId = new ObjectId(fieldsToChange.categoryId);
            }
            const result = await this._CollectionProducts.updateOne({
                _id: new ObjectId(productId)
            },
                {
                    $set: fieldsToChange
                });

            return result;
        } catch (err) {
            console.log(err.stack);
        }
    }

    async findProductById(productId){
        try {
            const prod = await this._CollectionProducts.findOne({
                _id: new ObjectId(productId)
            });

            return prod;
        } catch (err) {
            console.log(err.stack);
        }
    }

    async deleteProductById(productId){
        try {
            const prod = await this._CollectionProducts.deleteOne({
                _id: new ObjectId(productId)
            });

            return prod;
        } catch (err) {
            console.log(err.stack);
        }
    }


    async findProductByCategoryOrProductName(inputText, categories){
        try {
            let orOptions = []
            orOptions.push({ title: { $regex: inputText, $options: 'i' } })
            categories.forEach(category => {
                orOptions.push({ categoryId: { $regex: category._id.toString(), $options: 'i' } })
            });
            console.log(orOptions);
            const prod = await this._CollectionProducts.find({
                $or: orOptions
            }).toArray();
            return prod;
        } catch (err) {
            console.log(err.stack);
        }
    }
}