import { BASE_URL } from './configs/config.js';
import { filteringAnArray } from './libs/filteredArray.js';
import {
  saveToLocalStorage,
  getFromLocalStorage,
} from './utils/localStorageUtils.js';

async function getArticles() {
  let response = await axios.get(`${BASE_URL}`);
  let articlesData = response.data;
  console.log(articlesData);

  let cards = document.querySelector('.articleCards');

  articlesData.forEach(({ id, title, summary, author }) => {
    cards.innerHTML += `
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                  <div class="card-fav">
                    <h5 class="card-title">${title}</h5>
                    <i class="far fa-heart" data-id="${id}" data-author="${author}" data-title="${title}" data-summary="${summary}"></i>
                  </div>  
                      <h6 class="card-subtitle mb-2 text-muted">${author}</h6>
                      <p class="card-text">${summary}</p>
                      <a href="#" class="card-link">Read more</a>
                </div>
            </div>
`;
  });

  let favouritesToggle = document.querySelectorAll('.fa-heart');

  favouritesToggle.forEach((element) => {
    element.onclick = function () {
      element.classList.toggle('fas');
      console.log(element.dataset.id);

      let localStorageObject = {
        id: element.dataset.id,
        author: element.dataset.author,
        title: element.dataset.title,
        summary: element.dataset.summary,
      };

      let favourites = getFromLocalStorage('favourites');
      console.log(favourites);

      let isInStorage = favourites.find(
        (productObject) => productObject.id === localStorageObject.id
      );

      if (isInStorage === undefined) {
        favourites.push(localStorageObject);
        saveToLocalStorage('favourites', favourites);
      } else {
        let removedElementArray = favourites.filter(
          (productObject) => productObject.id !== localStorageObject.id
        );

        saveToLocalStorage('favourites', removedElementArray);
      }
    };
  });

  let search = document.querySelector('.search');
  let searchResults = document.querySelector('.articleCards');

  search.onkeyup = function () {
    searchResults.innerHTML = '';

    let filteredArray = filteringAnArray(articlesData, search.value);

    filteredArray.forEach(({ id, title, summary, author }) => {
      cards.innerHTML += `
      <div class="card" style="width: 18rem;">
      <div class="card-body">
        <div class="card-fav">
          <h5 class="card-title">${title}</h5>
          <i class="far fa-heart" data-id="${id}" data-author="${author}" data-title="${title}" data-summary="${summary}"></i>
        </div>  
            <h6 class="card-subtitle mb-2 text-muted">${author}</h6>
            <p class="card-text">${summary}</p>
            <a href="#" class="card-link">Read more</a>
      </div>
  </div>
    `;
    });
  };
}
getArticles();
