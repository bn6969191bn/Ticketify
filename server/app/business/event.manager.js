import eventDAO from "../DAO/eventDAO";
import applicationException from "../service/applicationException";

function create(context) {
  async function createNewOrUpdate(eventData) {
    try {
      const event = await eventDAO.createNewOrUpdate(eventData);
      return event;
    } catch (error) {
      throw applicationException.new(
        applicationException.BAD_REQUEST,
        error.message
      );
    }
  }

  async function getEventById(eventId) {
    try {
      const event = await eventDAO.getById(eventId);
      return event;
    } catch (error) {
      throw applicationException.new(
        applicationException.NOT_FOUND,
        "Event not found"
      );
    }
  }

  async function getAllEvents() {
    try {
      const events = await eventDAO.getAllEvents();
      return events;
    } catch (error) {
      throw applicationException.new(
        applicationException.BAD_REQUEST,
        error.message
      );
    }
  }

  async function removeEventById(eventId) {
    try {
      const result = await eventDAO.removeById(eventId);
      return result;
    } catch (error) {
      throw applicationException.new(
        applicationException.NOT_FOUND,
        "Event not found"
      );
    }
  }

  return {
    createNewOrUpdate: createNewOrUpdate,
    getEventById: getEventById,
    getAllEvents: getAllEvents,
    removeEventById: removeEventById,
  };
}

export default {
  create: create,
};
