import ticketDAO from "../DAO/ticketDAO";
import applicationException from "../service/applicationException";

function create(context) {
  async function createNewOrUpdate(ticketData) {
    try {
      const ticket = await ticketDAO.createNewOrUpdate(ticketData);
      return ticket;
    } catch (error) {
      throw applicationException.new(
        applicationException.BAD_REQUEST,
        error.message
      );
    }
  }

  async function getTicketById(ticketId) {
    try {
      const ticket = await ticketDAO.getById(ticketId);
      return ticket;
    } catch (error) {
      throw applicationException.new(
        applicationException.NOT_FOUND,
        "Ticket not found"
      );
    }
  }

  async function getAllTickets() {
    try {
      const tickets = await ticketDAO.getAllTickets();
      return tickets;
    } catch (error) {
      throw applicationException.new(
        applicationException.BAD_REQUEST,
        error.message
      );
    }
  }

  async function removeTicketById(ticketId) {
    try {
      const result = await ticketDAO.removeById(ticketId);
      return result;
    } catch (error) {
      throw applicationException.new(
        applicationException.NOT_FOUND,
        "Ticket not found"
      );
    }
  }

  return {
    createNewOrUpdate: createNewOrUpdate,
    getTicketById: getTicketById,
    getAllTickets: getAllTickets,
    removeTicketById: removeTicketById,
  };
}

export default {
  create: create,
};
