import { Schema } from "mongoose";
export const treeModel = (schema: Schema) => {
  // Get all item
  schema.statics.getAllItem = async function () {
    try {
      const items = await this.find({ idDeleted: false });
      if (!items) return [];
      return nestedItems(items);
    } catch (err) {
      console.log(err);
    }
  };
  // Get all item
  schema.statics.getChildItemById = async function (_id: string) {
    try {
      const items = await this.find({
        $or: [{ _id }, { parent: _id }],
        idDeleted: false,
      });

      if (!items) return [];
      return nestedItems(items);
    } catch (err) {
      console.log(err);
    }
  };

  function nestedItems(items: any[], parentId = null) {
    const itemList: any = [];
    let item: any;
    if (parentId == null) {
      item = items.filter((item) => item.parent == null);
    } else {
      item = items.filter((item) => String(item.parent) == String(parentId));
    }

    for (let item of items) {
      itemList.push({
        ...items,
        children: nestedItems(items, item._id),
      });
    }
    return itemList;
  }
};
