import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_lZ3UZrHE3TjxJHWbZOtxINsp5KOVf10QZwzrTYj9IuBZlsIMCRtiJvsM7lKiiQVA";

export function fetchBreeds() {
  const selectElement = document.querySelector(".breed-select");
  const loaderElement = document.querySelector(".loader");
  const errorElement = document.querySelector(".error");
  const catInfoElement = document.querySelector(".cat-info");

  selectElement.style.display = "none";
  loaderElement.style.display = "block";
  errorElement.style.display = "none";
  catInfoElement.innerHTML = "";

  return axios
    .get("https://api.thecatapi.com/v1/breeds")
    .then((response) => {
      selectElement.style.display = "block";
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
      selectElement.style.display = "none";
      loaderElement.style.display = "none";
      errorElement.style.display = "block";
      catInfoElement.innerHTML = "";
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  const catInfoElement = document.querySelector(".cat-info");
  const loaderElement = document.querySelector(".loader");
  const errorElement = document.querySelector(".error");

  loaderElement.style.display = "block";
  errorElement.style.display = "none";
  catInfoElement.innerHTML = "";

  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then((response) => {
      loaderElement.style.display = "none";

      if (response.data && response.data.length > 0) {
      const catData = response.data[0];
      const catBreed = catData.breeds[0];
      
      const catInfoHTML = `
        <img src="${catData.url}" alt="${catBreed.name}">
        <h2>${catBreed.name}</h2>
        <p><strong>Description:</strong> ${catBreed.description}</p>
        <p><strong>Temperament:</strong> ${catBreed.temperament}</p>
      `;
      catInfoElement.innerHTML = catInfoHTML;
} else {
        catInfoElement.innerHTML = "Oops! Something went wrong! Try reloading the page!";
      }
    })
    .catch((error) => {
      loaderElement.style.display = "none";
      errorElement.style.display = "block";
      catInfoElement.innerHTML = "";
      throw error;
    });
}
