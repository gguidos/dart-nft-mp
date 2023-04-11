import { BehaviorSubject } from "rxjs";
// Anything exported from this file is importable by other in-browser modules.

const auth = ({ username, password, url }) => {
  return new Promise((resolve, reject) => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };
    fetchData(url, options)
      .then((data) => {
        setSessionCache(data);
        resolve("loggedIn");
      })
      .catch((err) => reject(err));
  });
};

const upload = (url, data) => {
  return new Promise((resolve, reject) => {
    const options = {
      method: "POST",
      body: data,
    };
    fetchData(url, options)
      .then(async (data) => {
        resolve(data);
      })
      .catch((err) => reject(err));
  });
};

const update = (url, data) => {
  return new Promise((resolve, reject) => {
    const token = sessionStorage.getItem("accessToken").split('"')[1];
    const headers = new Headers();
    headers.append("Authorization", "Bearer " + token);
    const options = {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    };
    fetchData(url, options)
      .then((data) => {
        setSessionCache(data);
        resolve("update");
      })
      .catch((err) => reject(err));
  });
};

function setSessionCache(data) {
  sessionStorage.setItem("user", JSON.stringify(data.data));
  sessionStorage.setItem("accessToken", JSON.stringify(data.accessToken));
  sessionStorage.setItem("refreshToken", JSON.stringify(data.refreshToken));
}

function fetchData(url, options) {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw data;

        return data;
      })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

const setCacheItem = ({ itemName, data }) =>
  sessionStorage.setItem(itemName, JSON.stringify(data));
const getCachedItem = ({ itemName }) => {
  return Promise.resolve(sessionStorage.getItem(itemName));
};
const removeCacheditem = ({ itemName }) => sessionStorage.removeItem(itemName);
const clearCache = () => sessionStorage.clear();

const state$ = new BehaviorSubject({});
const stateUpdateUser$ = new BehaviorSubject({});

export {
  state$,
  stateUpdateUser$,
  auth,
  update,
  upload,
  getCachedItem,
  clearCache,
};
