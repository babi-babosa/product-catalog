import * as pkg from '@jest/globals';
const {afterAll, beforeAll, describe, expect, test} = pkg;
import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import {CategoriesService} from "../../services/categoriesService.js";

describe('==== Categories Service ====', () => {
    describe('MONGODB queries', () => {
        let connection;
        let mongoServer;
        let db;
        const defaultCategories = [
            {
                _id: "abc123",
                title: "title1",
                description: "this is a description a"
            },
            {
                _id: "abc1234",
                title: "title2",
                description: "this is a description b"
            },
            {
                _id: "abc12345",
                title: "title3",
                description: "this is a description c"
            },
            {
                _id: "abc123456",
                title: "title4",
                description: "this is a description d"
            },
        ];

        beforeAll(async () => {
            mongoServer = await MongoMemoryServer.create();
            const mongoUri = mongoServer.getUri();

            connection = await MongoClient.connect(mongoUri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            db = connection.db();
        });

        afterAll(async () => {
            await connection.close();
            await mongoServer.stop();
        });

        beforeEach(async () => {
            // Insert test data before each test
            await db.collection('categories').insertMany(defaultCategories);
        });

        afterEach(async () => {
            // Clear the test data after each test
            await db.collection('categories').deleteMany({});
        });

        it('should return a list of products', async () => {
            const constructorSpy = jest.spyOn(CategoriesService.prototype, 'constructor');
            // Replace the constructor implementation with a mock
            constructorSpy.mockImplementation(() => {
                this._DB = db;
                this._CollectionCategories =  db.collection('categories');
                // You can add any custom logic here if needed
            });

            const myInstance = new CategoriesService();
            expect(myInstance.getCategories()).toEqual(defaultCategories);
        });
    });
});
