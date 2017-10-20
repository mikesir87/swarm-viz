import {SET_SERVICES} from "../util/constants";

export const setServices = (services) => ({
  type : SET_SERVICES,
  payload : services,
});
