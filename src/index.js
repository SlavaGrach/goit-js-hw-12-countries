import './css/style.css'; 
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import listOfCountriesTpl from './templates/listofcountriestpl.hbs'
import countryTpl from './templates/countrytpl.hbs'

const inputRef = document.querySelector('.js-input');
const outputRef = document.querySelector('.js-output');

inputRef.addEventListener('input', debounce(onInputChange, 500));

function onInputChange(event) {
    const co = event.target.value;
    if (event.target.value !== '') {
        fetchCountries(co).then(checkCountryCount);
    }
}


function checkCountryCount(countries) {
      
    if (countries.length === 1) {
        
        singleCountry(countries[0]);
        return
    }

    if (countries.length <= 10) {
        console.log('listOfCountries');
        listOfCountries(countries);
    }
    
    if (countries > 10) toManyCountries();

    
}

function listOfCountries(countries) {
    while (outputRef.firstChild) {
        outputRef.removeChild(outputRef.firstChild);
    }
    outputRef.insertAdjacentHTML('beforeend', listOfCountriesTpl(countries));
}

function singleCountry(country) {
    while (outputRef.firstChild) {
        outputRef.removeChild(outputRef.firstChild);
    }
    outputRef.insertAdjacentHTML('beforeend', countryTpl(country));
}

function toManyCountries() {
    console.log('To many countries')
}