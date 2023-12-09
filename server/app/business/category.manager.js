import categoryDAO from "../DAO/categoryDAO";
import applicationException from "../service/applicationException";

function create(context) {
  async function createNewOrUpdate(categoryData) {
    try {
      const category = await categoryDAO.createNewOrUpdate(categoryData);
      return category;
    } catch (error) {
      throw applicationException.new(
        applicationException.BAD_REQUEST,
        error.message
      );
    }
  }

  async function getCategoryById(categoryId) {
    try {
      const category = await categoryDAO.getById(categoryId);
      return category;
    } catch (error) {
      throw applicationException.new(
        applicationException.NOT_FOUND,
        "Category not found"
      );
    }
  }

  async function getAllCategories() {
    try {
      const categories = await categoryDAO.getAllCategories();
      return categories;
    } catch (error) {
      throw applicationException.new(
        applicationException.BAD_REQUEST,
        error.message
      );
    }
  }

  async function removeCategoryById(categoryId) {
    try {
      const result = await categoryDAO.removeById(categoryId);
      return result;
    } catch (error) {
      throw applicationException.new(
        applicationException.NOT_FOUND,
        "Category not found"
      );
    }
  }

  return {
    createNewOrUpdate: createNewOrUpdate,
    getCategoryById: getCategoryById,
    getAllCategories: getAllCategories,
    removeCategoryById: removeCategoryById,
  };
}

export default {
  create: create,
};
