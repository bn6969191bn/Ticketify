import business from "../business/business.container";
import applicationException from "../service/applicationException";
import roleAuth from "../middleware/auth";

const purchaseEndpoint = (router) => {
  router.post(
    "/api/purchase/create",
    roleAuth(["user"]),
    async (request, response) => {
      try {
        const result = await business
          .getPurchaseManager(request)
          .createNewOrUpdate(request.body);
        response.status(200).send(result);
      } catch (error) {
        applicationException.errorHandler(error, response);
      }
    }
  );

  router.get(
    "/api/purchase/all",
    roleAuth(["admin"]),
    async (request, response) => {
      try {
        const result = await business
          .getPurchaseManager(request)
          .getAllPurchases();
        response.status(200).send(result);
      } catch (error) {
        applicationException.errorHandler(error, response);
      }
    }
  );

  router.get(
    "/api/purchase/:purchaseId",
    roleAuth(["admin"]),
    async (request, response) => {
      try {
        const result = await business
          .getPurchaseManager(request)
          .getPurchaseById(request.params.purchaseId);
        response.status(200).send(result);
      } catch (error) {
        applicationException.errorHandler(error, response);
      }
    }
  );

  router.delete(
    "/api/purchase/:purchaseId",
    roleAuth(["admin"]),
    async (request, response) => {
      try {
        const result = await business
          .getPurchaseManager(request)
          .removePurchaseById(request.params.purchaseId);
        response.status(200).send(result);
      } catch (error) {
        applicationException.errorHandler(error, response);
      }
    }
  );
};

export default purchaseEndpoint;
