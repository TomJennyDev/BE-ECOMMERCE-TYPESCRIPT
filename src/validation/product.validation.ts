const { defaultValue } = require("./common.validation");
const { string } = defaultValue;

const product = {
  sku: { ...string, optional: true },
  title: { ...string, optional: true },
  metaTitle: { ...string, required: true },
  slug: { ...string, optional: true },
  imageUrls: [{ isString: true }],
  status: {
    ...string,
    optional: true,
    inIn: {
      options: ["sale", "new"],
    },
  },
  price: { isInt: true, toInt: true, require: true },
  priceSale: { isInt: true, toInt: true },
  quantity: { isInt: true, require: true },
  isHidden: { isBoolean: true, optional: true },
  descriptionId: { Schema },
};

const getAllProducts = {};
const getProductById = {};
const createProduct = {};
const updateProduct = {};
