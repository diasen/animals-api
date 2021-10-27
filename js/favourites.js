import { getFromLocalStorage } from './utils/localStorageUtils.js';

let favourites = getFromLocalStorage('favourites');
let favouriteCards = document.querySelector('.favouriteCards');
const clearLocalStorage = document.querySelector('.clearBtn');

if (favourites.length === 0) {
  document.querySelector('.favouriteCards').innerHTML =
    '<h5>You have not selected any favourites</h5>';
  clearLocalStorage.style.display = 'none';
}

favourites.forEach(({ id, name, age, color, type }) => {
  favouriteCards.innerHTML += `
  <div class="card" style="width: 18rem;">
  <div class="card-body">
    <div class="card-fav">
      <h5 class="card-title">${name}</h5>
      <i class="far fa-heart" data-id="${id}" data-name="${name}" data-age="${age}" data-color="${color}" data-type="${type}"></i>
    </div>  
        <h6 class="card-subtitle mb-2 text-muted"> Type:${type}</h6>
        <p class="card-text"> Color:${color}</p>
        <p class="card-text"> Age:${age}</p>
  </div>
</div>
`;
});

clearLocalStorage.onclick = function () {
  localStorage.clear();
  document.querySelector('.favouriteCards').innerHTML =
    '<h5>All favourites removed</h5>';
  clearLocalStorage.style.display = 'none';
};
