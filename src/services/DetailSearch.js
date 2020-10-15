import {options} from './IndividualSearch';

export const fetchDetail = (url) => {
    fetch(url, options)
    .then(res => res.json())
    .catch(error => console.log('Oops!', error))
    .then(data => console.log(data))
}