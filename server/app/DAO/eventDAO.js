import mongoose from "mongoose";
import applicationException from "../service/applicationException";
import mongoConverter from "../service/mongoConverter";

const eventSchema = new mongoose.Schema(
  {
    event_name: { type: String, required: true },
    date_and_time: { type: Date, required: true },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "location",
      required: true,
    },
    description: { type: String, required: true },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "event_category",
      required: true,
    },
    maxNumberOfTickets: { type: Number, required: true },
    ticketPrice: { type: Number, required: true },
  },
  {
    collection: "event",
  }
);

const EventModel = mongoose.model("event", eventSchema);

async function createNewOrUpdate(event) {
  try {
    if (!event.id) {
      const result = await new EventModel(event).save();
      if (result) {
        return mongoConverter(result);
      }
    } else {
      const result = await EventModel.findByIdAndUpdate(event.id, event, {
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
  const result = await EventModel.findById(id)
    .populate("location")
    .populate("organizer", "_id name email")
    .populate("category");
  if (result) {
    return mongoConverter(result);
  }
  throw applicationException.new(
    applicationException.NOT_FOUND,
    "Event not found"
  );
}

async function getAllEvents() {
  try {
    const events = await EventModel.find()
      .populate("location")
      .populate("organizer", "_id name email")
      .populate("category");
    return events.map((event) => mongoConverter(event));
  } catch (error) {
    throw applicationException.new(
      applicationException.BAD_REQUEST,
      error.message
    );
  }
}

async function removeById(id) {
  return await EventModel.findByIdAndRemove(id);
}

export default {
  createNewOrUpdate: createNewOrUpdate,
  getById: getById,
  getAllEvents: getAllEvents,
  removeById: removeById,
  model: EventModel,
};
