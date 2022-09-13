export default class Country {
    constructor(_parent, _item, doApiCode, shortTofullCountry, doApi) {
        this.parent = _parent;
        this.item = _item;
        this.name = _item.name.common;
        this.flag = _item.flags.svg;
        this.pop = _item.population.toLocaleString();
        this.region = _item.region;
        this.languages = Object.keys(_item.languages);
        this.coin = Object.keys(_item.currencies);
        this.coinDescription = Object.values(_item.currencies)[0].name;
        this.capital = _item.capital;
        this.map = _item.latlng;
        this.borders = _item.borders;
        this.doApi = doApi;
        this.doApiCode = doApiCode;
        this.shortTofullCountry = shortTofullCountry;
    }

    render() {
        let div = document.createElement("div");
        div.className = "col-md-8 mx-auto p-4 border shadow overflow-hidden";
        div.style = "background: rgba(255, 255, 255, 0.885);}"
        document.querySelector(this.parent).append(div);

        div.innerHTML = `
        <img src="${this.flag}" alt="${this.name}" class="w-50 float-end ms-4">
        <h2>${this.name}</h2>
        <div>POP: ${this.pop} </div>
        <div>Region: ${this.region}</div>
        <div>Languages: ${this.languages}</div>
        <div>Coin:  ${this.coin}, ${this.coinDescription}</div>
        <div>Capital: ${this.capital}</div>

        <div class="mt-3 "><strong>States with borders:</strong><br>
        <div class="borders_div"></div>
        </div>
        
        <iframe class="mt-4 col-12" height="400" src="https://maps.google.com/maps?q=${this.map[0]},${this.map[1]}&z=7&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" ></iframe>
       `

        let borders_div = div.querySelector(".borders_div");
        this.borders.forEach(async (item, i) => {
            let span = document.createElement("span");
            span.className = "neighbor"
            span.innerHTML = await this.shortTofullCountry(item) + " ";
            span.style = "color: blue; cursor: pointer; "
            borders_div.append(span);
            span.addEventListener("click", () => {
                this.doApi(span.innerHTML);
            })
        })



    }
}
