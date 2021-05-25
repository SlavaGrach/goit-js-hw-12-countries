import axios from "axios";

export default function fetchCountries(searchQuery) {

    // console.log(searchQuery);

    axios.defaults.baseURL = 'https://restcountries.eu/rest/v2/name/';
   
    return axios
        .get(searchQuery)
        .then(response => { return response.data })
        .catch(error => console.log(error)
    );
}


