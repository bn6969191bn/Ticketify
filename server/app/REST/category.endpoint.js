import business from "../business/business.container";
import applicationException from "../service/applicationException";
import roleAuth from "../middleware/auth";

const categoryEndpoint = (router) => {
  router.post(
    "/api/category/create",
    roleAuth(["admin", "organizer"]),
    async (request, response) => {
      try {
        const result = await business
          .getCategoryManager(request)
          .createNewOrUpdate(request.body);
        response.status(200).send(result);
      } catch (error) {
        applicationException.errorHandler(error, response);
      }
    }
  );

  router.get("/api/category/all", async (request, response) => {
    try {
      const result = await business
        .getCategoryManager(request)
        .getAllCategories();
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });

  router.get("/api/category/:categoryId", async (request, response) => {
    try {
      const result = await business
        .getCategoryManager(request)
        .getCategoryById(request.params.categoryId);
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });

  router.delete(
    "/api/category/:categoryId",
    roleAuth(["admin", "organizer"]),
    async (request, response) => {
      try {
        const result = await business
          .getCategoryManager(request)
          .removeCategoryById(request.params.categoryId);
        response.status(200).send(result);
      } catch (error) {
        applicationException.errorHandler(error, response);
      }
    }
  );
};

export default categoryEndpoint;
