import business from "../business/business.container";
import applicationException from "../service/applicationException";
import roleAuth from "../middleware/auth";

const eventEndpoint = (router) => {
  router.post(
    "/api/event/create",
    roleAuth(["admin", "organizer"]),
    async (request, response) => {
      try {
        const result = await business
          .getEventManager(request)
          .createNewOrUpdate(request.body);
        response.status(200).send(result);
      } catch (error) {
        applicationException.errorHandler(error, response);
      }
    }
  );

  router.post(
    "/api/event/buy-ticket",
    roleAuth(["user"]),
    async (request, response) => {
      try {
        const result = await business
          .getEventManager(request)
          .buyTicket(request.body);
        response.status(200).send(result);
      } catch (error) {
        applicationException.errorHandler(error, response);
      }
    }
  );

  router.get("/api/event/all", async (request, response) => {
    try {
      const result = await business.getEventManager(request).getAllEvents();
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });

  router.get("/api/event/:eventId", async (request, response) => {
    try {
      const result = await business
        .getEventManager(request)
        .getEventById(request.params.eventId);
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });

  router.delete(
    "/api/event/:eventId",
    roleAuth(["admin", "organizer"]),
    async (request, response) => {
      try {
        const result = await business
          .getEventManager(request)
          .removeEventById(request.params.eventId);
        response.status(200).send(result);
      } catch (error) {
        applicationException.errorHandler(error, response);
      }
    }
  );
};

export default eventEndpoint;
