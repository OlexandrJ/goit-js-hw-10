import { fetchBreeds } from "./cat-api";

const breedSelect = document.querySelector("select.breed-select");
const catInfo = document.querySelector("div.cat-info");
const loader = document.querySelector("p.loader");
const error = document.querySelector("p.error");

function displayError(message) {
  error.textContent = message;
  error.style.display = "block";
  loader.style.display = "none";
  catInfo.style.display = "none";
}

breedSelect.addEventListener("change", () => {
  const selectedBreedId = breedSelect.value;

  loader.style.display = "block";
  error.style.display = "none";
  catInfo.style.display = "none";

  if (selectedBreedId) {
    fetchCatByBreed(selectedBreedId)
      .then(catData => {
        const { name, description, temperament } = catData[0].breeds[0];
        catInfo.innerHTML = `
          <p>Назва породи: ${name}</p>
          <p>Опис: ${description}</p>
          <p>Темперамент: ${temperament}</p>
          <img src="${catData[0].url}" alt="${name}" />
        `;
        loader.style.display = "none";
        catInfo.style.display = "block";
      })
      .catch(error => {
        displayError("Помилка при завантаженні інформації про кота.");
      });
  } else {
    loader.style.display = "none";
    catInfo.style.display = "none";
  }
});

fetchBreeds()
  .then(breeds => {
    breedSelect.innerHTML = breeds.map(breed => `
      <option value="${breed.id}">${breed.name}</option>
    `).join("");
    loader.style.display = "none";
  })
  .catch(error => {
    displayError("Помилка при завантаженні списку порід.");
  });
