import './css/style.css'; 
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';

import { error } from '@pnotify/core'
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import listOfCountriesTpl from './templates/listofcountriestpl.hbs'
import countryTpl from './templates/countrytpl.hbs'

const inputRef = document.querySelector('.js-input');
const outputRef = document.querySelector('.js-output');

inputRef.addEventListener('input', debounce(onInputChange, 500));

function onInputChange({target: {value}}) {
    if (value.trim() !== '') {
        fetchCountries(value.trim()).then(checkCountryCount);
    }
}


function checkCountryCount(countries) {
  
    if (countries === undefined) {
        error({
            text: 'Not found',
            type: 'error',
            delay: 2000,
        });
        outputRef.innerHTML = '';
        return;
    }

    if (countries.length > 10) {
        toManyCountries();
        return
    }
   
    if (countries.length === 1) {
        singleCountry(countries[0]);
        return;
    }

    if (countries.length <= 10) {
        listOfCountries(countries);
    }
    
        
}

function listOfCountries(countries) {
    outputRef.innerHTML = listOfCountriesTpl(countries);
}

function singleCountry(country) {
    outputRef.innerHTML = countryTpl(country);
}

function toManyCountries() {
     error({
            text: 'To many matchies found. Please enter a more specific query!',
            type: 'error',
            delay: 2000,
     });
    outputRef.innerHTML = '';
    return;
}