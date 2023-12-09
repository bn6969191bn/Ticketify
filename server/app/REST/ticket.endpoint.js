import business from "../business/business.container";
import applicationException from "../service/applicationException";
import roleAuth from "../middleware/auth";

const ticketEndpoint = (router) => {
  router.post(
    "/api/ticket/create",
    roleAuth(["admin", "organizer"]),
    async (request, response) => {
      try {
        const result = await business
          .getTicketManager(request)
          .createNewOrUpdate(request.body);
        response.status(200).send(result);
      } catch (error) {
        applicationException.errorHandler(error, response);
      }
    }
  );

  router.get("/api/ticket/all", async (request, response) => {
    try {
      const result = await business.getTicketManager(request).getAllTickets();
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });

  router.get("/api/ticket/:ticketId", async (request, response) => {
    try {
      const result = await business
        .getTicketManager(request)
        .getTicketById(request.params.ticketId);
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });

  router.delete(
    "/api/ticket/:ticketId",
    roleAuth(["admin", "organizer"]),
    async (request, response) => {
      try {
        const result = await business
          .getTicketManager(request)
          .removeTicketById(request.params.ticketId);
        response.status(200).send(result);
      } catch (error) {
        applicationException.errorHandler(error, response);
      }
    }
  );
};

export default ticketEndpoint;
