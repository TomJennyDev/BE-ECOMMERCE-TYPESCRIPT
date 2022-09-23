import { Schema } from "mongoose";
import { Query } from "../../interface/common";

const paginate = (schema: Schema) => {
  schema.statics.paginate = async function (query: Query) {
    let { sortBy, populate, select, ...filter } = query;

    let sort: string = "";

    if (sortBy) {
      const sortingCriteria: string[] = [];

      sortBy.split(",").forEach((sortOption: string) => {
        const [key, order]: string[] = sortOption.split(".");
        sortingCriteria.push((order === "desc" ? "-" : "") + key);
      });

      sort = sortingCriteria.join(" ");
    } else {
      sort = "-createdAt";
    }

    const limit: number =
      query.limit && parseInt(query.limit, 10) > 0
        ? parseInt(query.limit, 10)
        : 9;
    const page: number =
      query.page && parseInt(query.page, 10) > 0 ? parseInt(query.page, 10) : 1;
    const skip: number = (page - 1) * limit;

    const countPromise = this.countDocuments(filter).exec();

    let docsPromise = this.find(filter).sort(sort).skip(skip).limit(limit);

    if (populate) {
      populate.split(",").forEach((populateOption: any) => {
        docsPromise = docsPromise.populate(
          populateOption
            .split(".")
            .reduce((a: string, b: string) => ({ path: b, populate: a }))
        );
      });
    }

    docsPromise = docsPromise.select(select).exec();

    return Promise.all([countPromise, docsPromise]).then((values) => {
      const [totalResults, results] = values;
      const totalPages = Math.ceil(totalResults / limit);
      const result = {
        results,
        page,
        limit,
        totalPages,
        totalResults,
      };

      return Promise.resolve(result);
    });
  };
};
export default paginate;
