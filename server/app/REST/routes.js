import userEndpoint from "./user.endpoint";
import categoryEndpoint from "./category.endpoint";
import locationEndpoint from "./location.endpoint";
import eventEndpoint from "./event.endpoint";

const routes = function (router) {
  userEndpoint(router);
  categoryEndpoint(router);
  locationEndpoint(router);
  eventEndpoint(router);
};

export default routes;
