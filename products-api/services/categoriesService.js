import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';
import { getDB } from "./APIConnection.js";

export class CategoriesService {

    constructor() {
        this._DB = getDB();
        this._CollectionCategories =  this._DB.collection("categories");
    }

    async insertCategories(categories){
        try {
            const p = await this._CollectionCategories.insertMany([categories]);
            return p;
        } catch (err) {
            console.log(err.stack);
        }
    }

    async getCategories(){
        try {
            const p = this._CollectionCategories.find();

            const categories = [];
            await p.forEach(prod => {categories.push(prod)});
            return categories;
        } catch (err) {
            console.log(err.stack);
        }
    }

    async updateCategories(productId, fieldsToChange){
        try {
            const result = await this._CollectionCategories.updateOne({
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

    async findCategoryById(productId){
        try {
            const prod = await this._CollectionCategories.findOne({
                _id: new ObjectId(productId)
            });

            return prod;
        } catch (err) {
            console.log(err.stack);
        }
    }

    async findCategoryByProductName(inputText){
        try {
            const prod = await this._CollectionCategories.find({
                $or: [
                    { title: { $regex: inputText, $options: 'i' } }
                ]
            }).toArray();
            return prod;
        } catch (err) {
            console.log(err.stack);
        }
    }
}