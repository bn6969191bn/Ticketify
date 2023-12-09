"use strict";

import userManager from "./user.manager";
import categoryManager from "./category.manager";
import locationManager from "./location.manager";

function getter(manager, request) {
  return function () {
    return manager.create(request, this);
  };
}

export default {
  getUserManager: getter(userManager),
  getCategoryManager: getter(categoryManager),
  getLocationManager: getter(locationManager),
};
