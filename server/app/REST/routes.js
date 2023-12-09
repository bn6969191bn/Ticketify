import userEndpoint from "./user.endpoint";
import categoryEndpoint from "./category.endpoint";
import locationEndpoint from "./location.endpoint";
import eventEndpoint from "./event.endpoint";
import ticketEndpoint from "./ticket.endpoint";
import purchaseEndpoint from "./purchase.endpoint";

const routes = function (router) {
  userEndpoint(router);
  categoryEndpoint(router);
  locationEndpoint(router);
  eventEndpoint(router);
  ticketEndpoint(router);
  purchaseEndpoint(router);
};

export default routes;
