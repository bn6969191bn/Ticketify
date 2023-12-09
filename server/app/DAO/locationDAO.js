import mongoose from "mongoose";
import applicationException from "../service/applicationException";
import mongoConverter from "../service/mongoConverter";

const locationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    capacity: { type: Number, required: true },
  },
  {
    collection: "location",
  }
);

const LocationModel = mongoose.model("location", locationSchema);

async function createNewOrUpdate(location) {
  try {
    if (!location.id) {
      const result = await new LocationModel(location).save();
      if (result) {
        return mongoConverter(result);
      }
    } else {
      const result = await LocationModel.findByIdAndUpdate(
        location.id,
        location,
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
  const result = await LocationModel.findById(id);
  if (result) {
    return mongoConverter(result);
  }
  throw applicationException.new(
    applicationException.NOT_FOUND,
    "Location not found"
  );
}

async function getAllLocations() {
  try {
    const locations = await LocationModel.find();
    return locations.map((location) => mongoConverter(location));
  } catch (error) {
    throw applicationException.new(
      applicationException.BAD_REQUEST,
      error.message
    );
  }
}

async function removeById(id) {
  return await LocationModel.findByIdAndRemove(id);
}

export default {
  createNewOrUpdate: createNewOrUpdate,
  getById: getById,
  getAllLocations: getAllLocations,
  removeById: removeById,
  model: LocationModel,
};
