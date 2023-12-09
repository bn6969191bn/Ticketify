import mongoose from "mongoose";
import applicationException from "../service/applicationException";
import mongoConverter from "../service/mongoConverter";

const categorySchema = new mongoose.Schema(
  {
    category_name: { type: String, required: true, unique: true },
  },
  {
    collection: "event_category",
  }
);

const CategoryModel = mongoose.model("event_category", categorySchema);

async function createNewOrUpdate(category) {
  try {
    if (!category.id) {
      const result = await new CategoryModel(category).save();
      if (result) {
        return mongoConverter(result);
      }
    } else {
      const result = await CategoryModel.findByIdAndUpdate(
        category.id,
        category,
        { new: true }
      );
      if (result) {
        return mongoConverter(result);
      }
    }
  } catch (error) {
    throw applicationException.new(
      applicationException.BAD_REQUEST,
      error.message
    );
  }
}

async function getById(id) {
  const result = await CategoryModel.findById(id);
  if (result) {
    return mongoConverter(result);
  }
  throw applicationException.new(
    applicationException.NOT_FOUND,
    "Category not found"
  );
}

async function getAllCategories() {
  try {
    const categories = await CategoryModel.find();
    return categories.map((category) => mongoConverter(category));
  } catch (error) {
    throw applicationException.new(
      applicationException.BAD_REQUEST,
      error.message
    );
  }
}

async function removeById(id) {
  return await CategoryModel.findByIdAndRemove(id);
}

export default {
  createNewOrUpdate: createNewOrUpdate,
  getById: getById,
  getAllCategories: getAllCategories,
  removeById: removeById,
  model: CategoryModel,
};
