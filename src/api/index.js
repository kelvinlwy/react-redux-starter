import {GET, PATCH, POST} from "./apiFetch";

export const API = {
  getData: () => {
    return GET();
  },

  getDataById: (id) => {
    return GET(`data/${id}`, {filter: ""});
  },

  postData: (data) => {
    return POST("post", data);
  },

  patchData: (data) => {
    return PATCH("post", data);
  },
};
