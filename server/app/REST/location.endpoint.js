import business from "../business/business.container";
import applicationException from "../service/applicationException";
import roleAuth from "../middleware/auth";

const locationEndpoint = (router) => {
  router.post(
    "/api/location/create",
    roleAuth(["admin", "organizer"]),
    async (request, response) => {
      try {
        const result = await business
          .getLocationManager(request)
          .createNewOrUpdate(request.body);
        response.status(200).send(result);
      } catch (error) {
        applicationException.errorHandler(error, response);
      }
    }
  );

  router.get("/api/location/all", async (request, response) => {
    try {
      const result = await business
        .getLocationManager(request)
        .getAllLocations();
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });

  router.get("/api/location/:locationId", async (request, response) => {
    try {
      const result = await business
        .getLocationManager(request)
        .getLocationById(request.params.locationId);
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });

  router.delete(
    "/api/location/:locationId",
    roleAuth(["admin", "organizer"]),
    async (request, response) => {
      try {
        const result = await business
          .getLocationManager(request)
          .removeLocationById(request.params.locationId);
        response.status(200).send(result);
      } catch (error) {
        applicationException.errorHandler(error, response);
      }
    }
  );
};

export default locationEndpoint;
