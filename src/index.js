import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";

const selectElement = document.querySelector(".breed-select");

fetchBreeds().then((breeds) => {
  selectElement.addEventListener("change", (event) => {
    const selectedBreedId = event.target.value;
    fetchCatByBreed(selectedBreedId);
  });
});
