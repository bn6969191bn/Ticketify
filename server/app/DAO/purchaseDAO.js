import mongoose from "mongoose";
import applicationException from "../service/applicationException";
import mongoConverter from "../service/mongoConverter";

const purchaseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ticket",
      required: true,
    },
    purchase_date: { type: Date, required: true },
    total_price: { type: Number, required: true },
  },
  {
    collection: "purchase",
  }
);

const PurchaseModel = mongoose.model("purchase", purchaseSchema);

async function createNewOrUpdate(purchase) {
  try {
    if (!purchase.id) {
      const result = await new PurchaseModel(purchase).save();
      if (result) {
        return mongoConverter(result);
      }
    } else {
      const result = await PurchaseModel.findByIdAndUpdate(
        purchase.id,
        purchase,
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
  const result = await PurchaseModel.findById(id)
    .populate("user", "_id name email")
    .populate({
      path: "tickets",
      populate: { path: "event" },
    });
  if (result) {
    return mongoConverter(result);
  }
  throw applicationException.new(
    applicationException.NOT_FOUND,
    "Purchase not found"
  );
}

async function getAllPurchases() {
  try {
    const purchases = await PurchaseModel.find()
      .populate("user", "_id name email")
      .populate({
        path: "tickets",
        populate: { path: "event" },
      });
    return purchases.map((purchase) => mongoConverter(purchase));
  } catch (error) {
    throw applicationException.new(
      applicationException.BAD_REQUEST,
      error.message
    );
  }
}

async function removeById(id) {
  return await PurchaseModel.findByIdAndRemove(id);
}

export default {
  createNewOrUpdate: createNewOrUpdate,
  getById: getById,
  getAllPurchases: getAllPurchases,
  removeById: removeById,
  model: PurchaseModel,
};
