import eventDAO from "../DAO/eventDAO";
import purchaseDAO from "../DAO/purchaseDAO";
import ticketDAO from "../DAO/ticketDAO";
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

  async function buyTicket(ticketData) {
    try {
      const event = await eventDAO.getById(ticketData.eventId);
      if (event) {
        const tickets = await ticketDAO.getAllTicketsByEventId(
          ticketData.eventId
        );
        if (event.maxNumberOfTickets >= tickets.length) {
          const data = {
            event: ticketData.eventId,
            price: event.ticketPrice,
          };
          const ticket = await ticketDAO.createNewOrUpdate(data);
          const purchaseData = {
            ticket: ticket.id,
            user: ticketData.userId,
            purchase_date: new Date(),
            total_price: event.ticketPrice,
          };
          const purchasedTickets = await purchaseDAO.createNewOrUpdate(
            purchaseData
          );
          return purchasedTickets;
        }
        throw applicationException.new(
          applicationException.BAD_REQUEST,
          "Not enough seats available"
        );
      }

      throw applicationException.new(
        applicationException.NOT_FOUND,
        "Event not found"
      );
    } catch (error) {
      throw applicationException.new(
        applicationException.BAD_REQUEST,
        error.message
      );
    }
  }

  return {
    createNewOrUpdate: createNewOrUpdate,
    getEventById: getEventById,
    getAllEvents: getAllEvents,
    removeEventById: removeEventById,
    buyTicket: buyTicket,
  };
}

export default {
  create: create,
};
