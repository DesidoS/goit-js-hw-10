import './css/styles.css';
import debounce from "lodash.debounce";
import Notiflix from 'notiflix';
import {fetchCountries} from './api/api-service';
import {createCountriesMarkup, createCountryMarkup} from './templates/templates'

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
        Notiflix.Notify.warning('Please, enter country name')
        return
    }
    
    fetchCountries(searchCountries)
        .then(arr => {
            renderCountries(arr)
        })
};

function renderCountries(arr) {
    if (arr.length > 10) {
        clearMarkup(listItem);
        clearMarkup(countryCard);
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name');
        return
}
    if (arr.length === 1) {
        clearMarkup(listItem);
        countryCard.innerHTML = createCountryMarkup(arr);
    }
    if (arr.length > 1 && arr.length <= 10) {
        clearMarkup(countryCard);
        listItem.innerHTML = createCountriesMarkup(arr);
}};