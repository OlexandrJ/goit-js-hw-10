import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_lZ3UZrHE3TjxJHWbZOtxINsp5KOVf10QZwzrTYj9IuBZlsIMCRtiJvsM7lKiiQVA";

export function fetchBreeds() {
  const selectElement = document.querySelector(".breed-select");
  const loaderElement = document.querySelector(".loader");
  const errorElement = document.querySelector(".error");

  loaderElement.style.display = "block";

  return axios
    .get("https://api.thecatapi.com/v1/breeds")
    .then((response) => {
      loaderElement.style.display = "none";

      const breeds = response.data;
      breeds.forEach((breed) => {
        const option = document.createElement("option");
        option.value = breed.id;
        option.textContent = breed.name;
        selectElement.appendChild(option);
      });

      return breeds;
    })
    .catch((error) => {
      loaderElement.style.display = "none";
      errorElement.style.display = "block";
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  const catInfoElement = document.querySelector(".cat-info");
  const loaderElement = document.querySelector(".loader");
  const errorElement = document.querySelector(".error");

  loaderElement.style.display = "block";

  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then((response) => {

      loaderElement.style.display = "none";
      
      const catData = response.data[0];
      const catBreed = catData.breeds[0];
      
      const catInfoHTML = `
        <img src="${catData.url}" alt="${catBreed.name}">
        <h2>${catBreed.name}</h2>
        <p><strong>Description:</strong> ${catBreed.description}</p>
        <p><strong>Temperament:</strong> ${catBreed.temperament}</p>
      `;
      catInfoElement.innerHTML = catInfoHTML;
    })
    .catch((error) => {
      loaderElement.style.display = "none";
      errorElement.style.display = "block";
      throw error;
    });
}
