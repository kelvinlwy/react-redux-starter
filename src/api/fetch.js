import fetch from "isomorphic-fetch";

export const queryStringGenerator = (obj, prefix) => {
  let str = [];

  for (let p in obj) {
    if (obj.hasOwnProperty(p)) {
      let k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];

      if (v !== undefined && v !== null) {
        str.push(typeof v === "object" ?
          queryStringGenerator(v, k) :
          encodeURIComponent(k) + "=" + encodeURIComponent(v));
      }
    }
  }
  return str.join("&");
};

const setRequest = (method = "GET", data = null, token = null) => {
  let request = {
    method: method.toUpperCase(),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    dataType: "json"
  };

  if (token !== null) {
    request.headers.Authorization = "JWT " + token;
  }

  if (data !== null && method.toUpperCase() !== "GET") {
    request.body = JSON.stringify(data);
  }

  return request;
};

export const fetchAsync = async (baseUrl, path, method, data, token) => {
  try {
    let response = await fetch(baseUrl + path, setRequest(method, data, token));
    let status = await response.status;
    if (response.ok()) {
      return await response.json();
    } else if (status === 401) {
      location.reload();
    } else {
      return await response.json();
    }
  } catch (e) {
    throw new Error(e.statusText);
  }
};
