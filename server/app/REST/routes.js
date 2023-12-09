import userEndpoint from "./user.endpoint";
import categoryEndpoint from "./category.endpoint";

const routes = function (router) {
  userEndpoint(router);
  categoryEndpoint(router);
};

export default routes;
