import Country from "./countryClass.js";
import { declareEvents } from "./viewEvents.js"
const init = () => {
    doApi("israel");
    // doApiCode("isr");
    declareEvents(doApi);
}

const doApi = async (searchCountry) => {
    let url = (`https://restcountries.com/v3.1/name/${searchCountry}`);
    try {
        let resp = await fetch(url);
        // console.log(resp);
        let data = await resp.json();
        // console.log(data);
        createCountrySingle(data);

    }
    catch (err) {
        console.log("error", err);
        document.querySelector("#id_parent").innerHTML = `<div class="pt-5" style="min-height:504px;">
        <h1 class="p-5 display-4 text-center" style="color:white">Country name unknown</h1></div>`
    }
}

const createCountrySingle = (_arr) => {
    // _arr.forEach(item => {
    document.querySelector("#id_parent").innerHTML = "";
    let country = new Country("#id_parent", _arr[0], doApiCode, shortTofullCountry, doApi);
    // console.log(_arr[0]);
    country.render();
    // });
}

const doApiCode = async (codeCountry) => {
    let url = `https://restcountries.com/v3.1/alpha/${codeCountry}`;
    let resp = await fetch(url);
    let data = await resp.json();
    createCountrySingle(data);
}

const shortTofullCountry = async (codeCountry) => {
    let url = `https://restcountries.com/v3.1/alpha/${codeCountry}`;
    let resp = await fetch(url);
    let data = await resp.json();
    let fullCountry = await (data[0].name.common);
    return fullCountry;
}


init();