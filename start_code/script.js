// GLOBAL VARIABLES
let pElement = document.getElementById("countriesList").querySelector("p");
const ulElement = document.getElementById("countriesList");
const inputElement = document.getElementById("user-input");
const buttonElement = document.getElementById("submit");

// 1)
const fetchCountry = async () => {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const countryJsonData = await response.json();
    return countryJsonData;
}

// 2)
const setUp = () => createListOfCountries();
// const setUp = async () => {
//     const countries = await fetchCountry();
//     pElement.innerText = JSON.stringify(countries);
// }
// setUp();

// 3) 
const createListOfCountries = async () => {
    const countries = await fetchCountry();
    pElement.innerHTML = "<!--" + pElement.innerText + "-->";
    countries.forEach(country => {
        const liElement = document.createElement("li");
        ulElement.appendChild(liElement);
        // liElement.style.listStyleType = countr
        liElement.innerHTML = "<br>" + country.flag + "&emsp;<strong>Country:&emsp;</strong>" + country.name.common + "<br>&emsp;&emsp; <strong>Capital:&emsp;&ensp;</strong>" + country.capital;
    })
}

setUp();

// 4) & 5)
buttonElement.addEventListener("click", event => {
    
    const allLiElements = document.querySelectorAll("li");
    const stringInputFromUser = inputElement.value.toLowerCase();

    const temporaryMessage = document.createElement("h2");
    inputElement.parentNode.appendChild(temporaryMessage);
    temporaryMessage.innerText = "Filtering for \"" + inputElement.value + "\"";

    pElement.innerHTML = pElement.innerHTML.substring(4, 19);

    setTimeout(function() {
        // try {
            for(let i = 0; i < allLiElements.length; i++){
                if(!allLiElements[i].innerText.toLowerCase().substring(15).replace("capital:", "").includes(stringInputFromUser)){
                    allLiElements[i].remove();
                }
            }
            temporaryMessage.remove();
            pElement.innerHTML = "<!--" + pElement.innerText + "-->";
            inputElement.parentNode.appendChild(Object.assign(document.createElement('p'),{textContent: document.querySelectorAll("li").length + (document.querySelectorAll("li").length == 1 ? " result returned" : " results returned")}));
        // }
        // catch(err) {
        //     pElement.innerText = err.message;
        // }    
    }, 1000)
})




// // // // // // // // // // // // // // // //
// // // // //  HAVEN'T DONE...  // // // // //
// // // // // // // // // // // // // // // //

// 8) Make your page display an error message should it meet an error on querying the API.
//    Test this out by trying to access an endpoint which doesn't exist for the API.

