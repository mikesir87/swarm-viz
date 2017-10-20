
class Api {

  get(url) {
    return this.makeRequest(url);
  }

  makeRequest(url, options = {}) {
    const fullUrl = `/api${url}`;
    const headers = options.headers || new Headers();
    headers.append("Accept", "application/json");
    const fullOptions = Object.assign({}, options, { headers });

    return fetch(fullUrl, fullOptions)
        .then((response) => {  // Reject promise if non 2xx status response
          if (response.status / 100 !== 2) {
            const error = new Error(response.statusText);
            error.response = response;
            throw error;
          }
          return response;
        })
        .then((response) => response.json());
  }
}

export const ApiClient = new Api();
