import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_ lZ3UZrHE3TjxJHWbZOtxINsp5KOVf1 0QZwzrTYj9IuBZlsIMCRtiJvsM7lKi iQVA";

export function fetchBreeds() {
  return axios.get("https://api.thecatapi.com/v1/breeds")
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}
