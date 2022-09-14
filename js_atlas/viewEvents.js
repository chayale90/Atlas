export const declareEvents = (doApi) => {
    let id_input = document.querySelector("#id_input")
    let btnSearch = document.querySelector("#btnSearch");

    for (let i = 1; i < 6; i++) {
        if (i == 3) {
            let a = document.querySelector(`#id${i}`);
            a.addEventListener("click", () => {
                doApi("United Kingdom");
            })
        }
        else {
            let a = document.querySelector(`#id${i}`);
            a.addEventListener("click", () => {
                doApi(a.innerHTML);
            })
        }

    }

    btnSearch.addEventListener("click", () => {
        doApi(id_input.value);
    })

    id_input.addEventListener("keydown", (e) => {
        if (e.key == 'Enter')
            doApi(id_input.value);
    })
}

