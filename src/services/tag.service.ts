const httpStatus = require("http-status");
const { AppError, catchAsync } = require("../helpers/utils");
const Tag = require("../models/tag");

const tagService = {
  checkExistTag: async function (tagId) {
    const tag = Tag.findById(tagId);
    return !!tag;
  },

  createTag: async function (tag) {
    const tag = Tag.create(tag);

    return tag;
  },
};
export default tagService;
