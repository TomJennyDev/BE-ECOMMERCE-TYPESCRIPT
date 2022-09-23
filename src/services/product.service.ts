const httpStatus = require("http-status");
const { AppError, catchAsync } = require("../helpers/utils");
const Description = require("../models/Description");
const Product = require("../models/Product");

const productService = {
  checkExistProduct: async function (ProductId) {
    const product = await Product.findById(ProductId);

    return !!product;
  },

  getAllProducts: async function (query, user) {
    query.populate = "descriptions";

    if (user?.role !== "admin") {
      query.isDeleted = false;
    }
    if (query.title) {
      query.title = { $regex: query.title, $options: "i" };
    } else {
      delete query.title;
    }

    if (user?.role === "admin") {
      query.populate = "categoryId";
    }

    const sortBy = query.sortBy && query.sortBy.toLowerCase();

    if (sortBy === "new") {
      query.status = "new";
      query.sortBy = query.sortBy + ",updatedAt.desc";
    }

    if (sortBy?.includes("discount")) {
      query.status = "sale";
    }

    if (query.rating) {
      query.rateAverage = {
        $gte: parseInt(query.rating),
        $lte: 5,
      };
    }

    if (query.price_max && query.price_min) {
      query.price = {
        $lte: parseInt(query.price_max) || 1000000000,
        $gte: parseInt(query.price_min) || 0,
      };
      delete query.price_max;
      delete query.price_min;
    }

    const products = await Product.paginate(query);

    return products;
  },

  getProductById: async function (productId) {
    const product = await Product.findById(productId).populate("descriptions");

    if (!product) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Product is not found",
        "Get single product"
      );
    }
    return product;
  },

  createProduct: async function (productBody) {
    const { descriptions, ...restProductBody } = productBody;
    if (descriptions) {
      const description = await Description.create({ content: descriptions });
      restProductBody.descriptions = description._id;
    }
    const product = await Product.create(restProductBody);

    return product;
  },

  updateProductById: async function (productId, productBody) {
    let product = await Product.findById(productId);

    if (!product) {
      throw new AppError(404, "Product Not Found", "Update product");
    }

    const { descriptions, ...restProductBody } = productBody;
    if (descriptions && product.descriptions) {
      const description = await Description.findById(product.descriptions);
      if (!description) {
        throw new AppError(
          StatusCodes.BAD_REQUEST,
          "Descriptions is not found",
          "Update description of Product"
        );
      }
      description.content = descriptions;
      description.save();
    }

    Object.keys(restProductBody).forEach((field) => {
      if (restProductBody[field] !== undefined) {
        product[field] = restProductBody[field];
      }
    });

    await product.save();

    return product;
  },

  deleteProductById: async function (productId) {
    const product = await Product.findByIdAndUpdate(productId, {
      isDeleted: true,
    });

    if (!product) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Product is not found",
        "Delete single product"
      );
    }
    return product;
  },
};
export default productService;
