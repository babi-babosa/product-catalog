
import {CategoriesController} from "./categoriesController.js";
import {ProductsController} from "./productsController.js";
import { connect } from './services/APIConnection.js';
import express from 'express';
const app = express();
const port = 8000;
import cors from 'cors';

// Init DB
connect()
    .then(() => {
        // Call your services or start your application here
        console.log(" === MONGO DB IS RUNNING ===");

        const CategoriesMainController = new CategoriesController();
        const ProductsMainController = new ProductsController();

        // Enable CORS for all routes
        app.use(cors());
        app.use(express.json()); // Parse JSON request bodies
        app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

        app.get('/', (req, res) => {
            res.send('Hello, this is an health check for products catalog API');
        });

        app.route('/api/v1/categories')
            .post(async (req, res) => {
                const products = await CategoriesMainController.createCategories(req, res);
                res.send(products);
            })
            .get(async (req, res) => {
                const products = await CategoriesMainController.getCategories(req, res);
                res.send(products);
            })

        app.route('/api/v1/categories/:categoryId')
            .put(async (req, res) => {
                const products = await CategoriesMainController.updateCategories(req, res);
                res.send(products);
            })

        app.get('/api/v1/categories/find', async (req, res) => {
            const products = await CategoriesMainController.findCategoryById(req, res);
            res.send(products);
        })

        app.route('/api/v1/products')
            .post(async (req, res) => {
                const product = await ProductsMainController.insertProduct(req, res)
                res.send(product);
            })
            .get(async (req, res) => {
                const prods = await ProductsMainController.getProducts(req, res);
                res.send(prods);
            })

        app.get('/api/v1/products/filtering', async (req, res) => {
            const categories = await CategoriesMainController.findCategoryByProductName(req, res);
            const productsAvailable = await ProductsMainController.findProductByCategoryOrProductName(req, res, categories);
            res.send(productsAvailable);
        });

        app.route('/api/v1/products/:productId')
            .put(async (req, res) => {
                const products = await ProductsMainController.updateProduct(req, res);
                res.send(products);
            })
            .get(async (req, res) => {
                const products = await ProductsMainController.findProductById(req, res);
                res.send(products);
            })
            .delete(async (req, res) => {
                const productDeleted = await ProductsMainController.deleteProduct(req, res);
                res.send(productDeleted);
            })

        app.listen(port, () => {
            console.log(`[SERVER]: Server is running at http://localhost:${port}`);
        });

    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

export { app };