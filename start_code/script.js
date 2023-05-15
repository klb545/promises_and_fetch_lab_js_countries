// // // // // // // // // // // //
// // // // //  MVP  // // // // //
// // // // // // // // // // // //

// GLOBAL VARIABLES
let pElement = document.getElementById("countriesList").querySelector("p");
const ulElement = document.getElementById("countriesList");
const inputElement = document.getElementById("user-input");
const buttonElement = document.getElementById("submit");

// 1) Create a function which houses a fetch() request to the RESTCountries API and returns the
//    response in JSON format.
const fetchCountry = async () => {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const countryJsonData = await response.json();
    return countryJsonData;
}

// 2) Create a SetUp() function which calls your first function and populates a global variable
//    with the output. Have this function be called on load of your webpage.

const setUp = () => createListOfCountries();
// const setUp = async () => {
//     const countries = await fetchCountry();
//     pElement.innerText = JSON.stringify(countries);
// }
// setUp();

// 3) Create a function which uses this global variable to create a series of new HTML elements,
//    populating each with information about each country (such as name and population), and
//    adding them to the <ul> in your HTML. Call this function following your first function
//    within the SetUp() function. Ensure that the original <p> element is removed ahead of
//    populating your list.
const createListOfCountries = async () => {
    const countries = await fetchCountry();
    pElement.innerHTML = "<!--" + pElement.innerText + "-->";
    countries.forEach(country => {
        const liElement = document.createElement("li");
        ulElement.appendChild(liElement);
        liElement.innerText = country.name.common + ".   Population: " + country.population + ".   Capital: " + country.capital;
    })
    
}

setUp();

// 4) Add a simple <form> to your HTML with a single text-box input and a submit button. Create a
//    function which is called when the form is submitted, printing the value of the <input>
//    element to the console.
// &
// 5) Create a function which takes your global variable and filters it based off of the value
//    received from your <form> above. Replace the contents of your <ul> with the filtered
//    countries returned.


buttonElement.addEventListener("click", event => {
    const allLiElements = document.querySelectorAll("li");
    const stringInputFromUser = inputElement.value.toLowerCase();

    const temporaryMessage = document.createElement("h2");
    inputElement.parentNode.appendChild(temporaryMessage);
    temporaryMessage.innerText = "Filtering for \"" + inputElement.value + "\"";

    pElement.innerHTML = pElement.innerHTML.substring(4, 19);
    console.log(pElement);

    const delayInMilliSeconds = 1000;
    setTimeout(function() {
        // code to be executed after 1 second
        for(let i = 0; i < allLiElements.length; i++){
            if(!allLiElements[i].innerText.toLowerCase().includes(stringInputFromUser)){
                allLiElements[i].remove();
            }
        }
        temporaryMessage.remove();


    }, delayInMilliSeconds)
})


// // // // // // // // // // // // // // //
// // // // //   EXTENSIONS   // // // // //
// // // // // // // // // // // // // // //

// 6) Neaten up your JavaScript functionality, making abstract functions for any repeated functionality.

// 7) Add a dynamic heading which tells the user that the countries are being filtered.
//    Add an artificial delay so that this header can be viewed as well as the original "Awaiting API.." <p> element

// 8) Make your page display an error message should it meet an error on querying the API.
//    Test this out by trying to access an endpoint which doesn't exist for the API.



// const filter = async () => {
//     const stringInputFromUser = await inputElement.value;
//     for(let i = 0; i < ulElement.length(); i++){
//         if(!ulElement[i].includes(stringInputFromUser)){
//             ulElement[i].remove();
//         }
//     }
//     for(let i = 0; i < ulElement.length(); i++){
//         if(!ulElement[i].includes(stringInputFromUser)){
//             ulElement[i].remove();
//         }
//     }
// }
// filter();



