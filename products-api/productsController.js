import {ProductsService} from "./services/productsService.js";

export class ProductsController {

    constructor() {
        this._ProductsService = new ProductsService();
    }

    async checkHealthy(req, res) {
        await this._ProductsService.run().catch(console.dir);
    }

    async insertProduct(req, res) {
        const product = req.body;
        return await this._ProductsService.insertProduct(product);
    }

    async getProducts(req, res) {
        return await this._ProductsService.getProducts();
    }

    async deleteProduct(req, res) {
        const productId = req.params.productId;
        return await this._ProductsService.deleteProductById(productId);
    }

    async updateProduct(req, res) {
        const {updateFilters} = req.body;
        const productId = req.params.productId;
        return await this._ProductsService.updateProduct(productId, updateFilters);
    }

    async findProductById(req, res) {
        const productId = req.params.productId;
        return await this._ProductsService.findProductById(productId);
    }

    async findProductByCategoryOrProductName(req, res, categories) {
        const inputText = req.query.inputText;
        return await this._ProductsService.findProductByCategoryOrProductName(inputText, categories);
    }
}