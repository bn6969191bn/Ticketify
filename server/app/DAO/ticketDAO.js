import mongoose from "mongoose";
import applicationException from "../service/applicationException";
import mongoConverter from "../service/mongoConverter";

const ticketSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "event",
      required: true,
    },
    ticket_type: { type: String, required: true },
    price: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true },
  },
  {
    collection: "ticket",
  }
);

const TicketModel = mongoose.model("ticket", ticketSchema);

async function createNewOrUpdate(ticket) {
  try {
    if (!ticket.id) {
      const result = await new TicketModel(ticket).save();
      if (result) {
        return mongoConverter(result);
      }
    } else {
      const result = await TicketModel.findByIdAndUpdate(ticket.id, ticket, {
        new: true,
      });
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
  const result = await TicketModel.findById(id).populate("event");
  if (result) {
    return mongoConverter(result);
  }
  throw applicationException.new(
    applicationException.NOT_FOUND,
    "Ticket not found"
  );
}

async function getAllTickets() {
  try {
    const tickets = await TicketModel.find().populate("event");
    return tickets.map((ticket) => mongoConverter(ticket));
  } catch (error) {
    throw applicationException.new(
      applicationException.BAD_REQUEST,
      error.message
    );
  }
}

async function removeById(id) {
  return await TicketModel.findByIdAndRemove(id);
}

export default {
  createNewOrUpdate: createNewOrUpdate,
  getById: getById,
  getAllTickets: getAllTickets,
  removeById: removeById,
  model: TicketModel,
};
