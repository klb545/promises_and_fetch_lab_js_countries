// GLOBAL VARIABLES
const pElement = document.getElementById("countriesList").querySelector("p");
const ulElement = document.getElementById("countriesList");
const inputElement = document.getElementById("user-input");
const buttonElement = document.getElementById("submit");

let countries = [];
let url = "https://restcountries.com/v3.1/all";


// 1)
const fetchCountries = async () => {
    const response = await fetch(url);
    const countryJsonData = await response.json();
    return countryJsonData;
}

// 2 & 8)
const setUp = async () => {
    
    countries = await fetchCountries();

    try {
        createList(countries);
    }
    catch(error){
        pElement.appendChild(Object.assign(document.createElement('p'),{textContent: `Error: \n  404. No countries were found to match input.`})); 
    }
}

// 3) 
const createList = (jsonCountries) => {
    pElement.innerHTML = "<!--" + pElement.innerText + "-->";
    jsonCountries.forEach(country => {
        const liElement = document.createElement("li");
        ulElement.appendChild(liElement);
        liElement.innerHTML = "<br>" + country.flag + "&emsp;<strong>Country:&emsp;</strong>" + country.name.common + "<br>&emsp;&emsp; <strong>Capital:&emsp;&ensp;</strong>" + country.capital;
    })
}
setUp();

// 4)
buttonElement.addEventListener("click", event => {
    // console.log(inputElement.value);
    filter(inputElement.value);
})

// 5 & 7)
const filter = (parameter) => {
    const temporaryMessage = document.createElement("h3");
    temporaryMessage.innerText = "Filtering for \"" + parameter + "\"";
    inputElement.parentNode.appendChild(temporaryMessage);

    pElement.innerText = "Awaiting API...";

    const allLiElements = document.querySelectorAll("li");

    setTimeout(function() {
        for(let i = 0; i < allLiElements.length; i++){
            allLiElements[i].remove();
        }
        url = "https://restcountries.com/v3.1/name/" + parameter /*+ "?fullText=true"*/;
        setUp();
        temporaryMessage.remove();
        pElement.innerHTML = "<!--" + pElement.innerText + "-->";
        // inputElement.parentNode.appendChild(Object.assign(document.createElement('p'),{textContent: document.querySelectorAll("li").length + (document.querySelectorAll("li").length == 1 ? " result returned" : " results returned")})); 
   }, 1000)
}



// buttonElement.addEventListener("click", event => {
    
//     const allLiElements = document.querySelectorAll("li");
//     const stringInputFromUser = inputElement.value.toLowerCase();

//     const temporaryMessage = document.createElement("h2");
//     inputElement.parentNode.appendChild(temporaryMessage);
//     temporaryMessage.innerText = "Filtering for \"" + inputElement.value + "\"";

//     pElement.innerHTML = pElement.innerHTML.substring(4, 19);

//     setTimeout(function() {
//             for(let i = 0; i < allLiElements.length; i++){
//                 if(!allLiElements[i].innerText.toLowerCase().substring(15).replace("capital:", "").includes(stringInputFromUser)){
//                     allLiElements[i].remove();
//                 }
//             }
//             temporaryMessage.remove();
//             pElement.innerHTML = "<!--" + pElement.innerText + "-->";
//             inputElement.parentNode.appendChild(Object.assign(document.createElement('p'),{textContent: document.querySelectorAll("li").length + (document.querySelectorAll("li").length == 1 ? " result returned" : " results returned")})); 
//     }, 1000)
// })