import {fetchAsync, queryStringGenerator} from "./fetch";

const TESTING_URL = "http://localhost:8080/";
const PROD_URL = "";
const BASE_URL = process.env.NODE_ENV === "production" ? PROD_URL : TESTING_URL;

export const POST = (path, data, token = null) => {
  return fetchAsync(BASE_URL, path, "POST", data, token);
};

export const PATCH = (path, data = null, token = null) => {
  return fetchAsync(BASE_URL, path, "PATCH", data, token);
};

export const PUT = (path, data, token = null) => {
  return fetchAsync(BASE_URL, path, "PUT", data, token);
};

export const GET = (path, data = null, token = null) => {
  if (data) {
    return fetchAsync(BASE_URL, path + "?" + queryStringGenerator(data), "GET", null, token);
  } else {
    return fetchAsync(BASE_URL, path, "GET", null, token);
  }
};

export const DELETE = (path, data = null, token = null) => {
  return fetchAsync(BASE_URL, path, "DELETE", data, token);
};
