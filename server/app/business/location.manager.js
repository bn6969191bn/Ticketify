import locationDAO from "../DAO/locationDAO";
import applicationException from "../service/applicationException";

function create(context) {
  async function createNewOrUpdate(locationData) {
    try {
      const location = await locationDAO.createNewOrUpdate(locationData);
      return location;
    } catch (error) {
      throw applicationException.new(
        applicationException.BAD_REQUEST,
        error.message
      );
    }
  }

  async function getLocationById(locationId) {
    try {
      const location = await locationDAO.getById(locationId);
      return location;
    } catch (error) {
      throw applicationException.new(
        applicationException.NOT_FOUND,
        "Location not found"
      );
    }
  }

  async function getAllLocations() {
    try {
      const locations = await locationDAO.getAllLocations();
      return locations;
    } catch (error) {
      throw applicationException.new(
        applicationException.BAD_REQUEST,
        error.message
      );
    }
  }

  async function removeLocationById(locationId) {
    try {
      const result = await locationDAO.removeById(locationId);
      return result;
    } catch (error) {
      throw applicationException.new(
        applicationException.NOT_FOUND,
        "Location not found"
      );
    }
  }

  return {
    createNewOrUpdate: createNewOrUpdate,
    getLocationById: getLocationById,
    getAllLocations: getAllLocations,
    removeLocationById: removeLocationById,
  };
}

export default {
  create: create,
};
