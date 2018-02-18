import numeral from 'numeral';
import {getCats} from "./api/cats";
import './scss/index.scss';

console.log("Page 1 (index) javascript loaded. Environment Type:'" + window.thisEnvironmentType + '"');

getCats().then(result => console.log(result));
