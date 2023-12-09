import userEndpoint from "./user.endpoint";
import categoryEndpoint from "./category.endpoint";
import locationEndpoint from "./location.endpoint";

const routes = function (router) {
  userEndpoint(router);
  categoryEndpoint(router);
  locationEndpoint(router);
};

export default routes;
