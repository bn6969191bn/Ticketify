import purchaseDAO from "../DAO/purchaseDAO";
import applicationException from "../service/applicationException";

function create(context) {
  async function createNewOrUpdate(purchaseData) {
    try {
      const purchase = await purchaseDAO.createNewOrUpdate(purchaseData);
      return purchase;
    } catch (error) {
      throw applicationException.new(
        applicationException.BAD_REQUEST,
        error.message
      );
    }
  }

  async function getPurchaseById(purchaseId) {
    try {
      const purchase = await purchaseDAO.getById(purchaseId);
      return purchase;
    } catch (error) {
      throw applicationException.new(
        applicationException.NOT_FOUND,
        "Purchase not found"
      );
    }
  }

  async function getAllPurchases() {
    try {
      const purchases = await purchaseDAO.getAllPurchases();
      return purchases;
    } catch (error) {
      throw applicationException.new(
        applicationException.BAD_REQUEST,
        error.message
      );
    }
  }

  async function removePurchaseById(purchaseId) {
    try {
      const result = await purchaseDAO.removeById(purchaseId);
      return result;
    } catch (error) {
      throw applicationException.new(
        applicationException.NOT_FOUND,
        "Purchase not found"
      );
    }
  }

  return {
    createNewOrUpdate: createNewOrUpdate,
    getPurchaseById: getPurchaseById,
    getAllPurchases: getAllPurchases,
    removePurchaseById: removePurchaseById,
  };
}

export default {
  create: create,
};
