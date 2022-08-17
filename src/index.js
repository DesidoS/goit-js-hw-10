import './css/styles.css';
import debounce from "lodash.debounce";
import Notiflix from 'notiflix';
import API from './api-service';

const restCountries = document.getElementById('search-box')
const listItem = document.querySelector('.country-list');
const countryCard = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

restCountries.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function clearMarkup(el) {
    el.innerHTML = '';
}
function onInput() {
    const searchCountries = restCountries.value.trim();

    if (!searchCountries) {
        clearMarkup(listItem);
        clearMarkup(countryCard);
        // return
    }
    
    API.fetchCountries(searchCountries)
        .then(arr => {
            renderCountriesMarkup(arr)
        })
        .catch(onFetchError)};

function renderCountriesMarkup(arr) {
    if (arr.length > 10) {
        clearMarkup(listItem);
        clearMarkup(countryCard);
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name');
        return
}
       else if (arr.length === 1) {
        clearMarkup(listItem);
        countryCard.innerHTML = createCountrieMarkup(arr);
}    else {
        // if (arr.length > 1 && arr.length <= 10)
        clearMarkup(countryCard);
        listItem.innerHTML = createCountriesMarkup(arr);
}};

function createCountriesMarkup(countrie){
    return countrie
        .map(
            ({ name: { official }, flags: { png } }) =>
                `<li><img src="${png}" alt="${official}" width="60" height="40">${official}</li>`)
        .join('');
};

function createCountrieMarkup(countrie){
  return countrie.map(
    ({ name:{official}, capital, population, flags:{png}, languages }) =>
      `<h1><img src="${png}" alt="${official}" width="40" height="40">${official}</h1>
      <p>Capital: ${capital}</p>
      <p>Population: ${population}</p>
      <p>Languages: ${Object.values(languages)}</p>`,
  );};

function onFetchError(error) {
    Notiflix.Notify.failure('Oops, there is no country with that name')
}