import {CategoriesService} from "./services/categoriesService.js";

export class CategoriesController {

    constructor() {
        this._CategorySevice = new CategoriesService();
    }

    async getCategories(req, res) {
        return await this._CategorySevice.getCategories();
    }

    async updateCategories(req, res) {
        const {updateFilters} = req.body;
        const categoryId = req.params.categoryId;
        return await this._CategorySevice.updateCategories(categoryId, updateFilters);
    }

    async createCategories(req, res) {
        const category = req.body;
        return await this._CategorySevice.insertCategories(category);
    }

    async findCategoryById(req, res) {
        const categoryId = req.query.categoryId;
        return await this._CategorySevice.findCategoryById(categoryId);
    }

    async findCategoryByProductName(req, res) {
        const inputText = req.query.inputText;
        return await this._CategorySevice.findCategoryByProductName(inputText);
    }
}