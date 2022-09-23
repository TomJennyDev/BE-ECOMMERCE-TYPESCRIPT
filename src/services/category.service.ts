import { StatusCodes } from "http-status-codes";
import { AppError } from "../helpers/utils";
import Category from "../models/Category";

const categoryService = {
  checkExistCategory: async function (cateId) {
    const category = await Category.findById(cateId);
    return !!category;
  },

  getAllCatgories: async function (req) {
    const category = await Category.getAllItem();

    return category;
  },

  getChildCategoryById: async function (cateId) {
    const category = await Category.getChildItemById();

    if (!category) {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        "Category not found",
        "Find Category By Id"
      );
    }

    return category;
  },

  createCategory: async function (cateBody) {
    const category = await Category.create(cateBody);

    return category;
  },

  updateCategoryById: async function (cateId, cateBody) {
    let category = await Category.findById(cateId);

    if (!category) {
      throw new AppError(404, "Category Not Found", "Update Category");
    }
    Object.keys(cateBody).forEach((field) => {
      if (cateBody[field] !== undefined) {
        category[field] = cateBody[field];
      }
    });

    await category.save();

    // return category;
  },

  deleteCategoryById: async function (cateId) {
    const category = await Category.updateById(cateId, { isDeleted: false });

    return category;
  },
};
export default categoryService;
