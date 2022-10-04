const currencies = document.querySelectorAll(".currencies");
const input = document.querySelector(".converter__value-amount");
const form = document.querySelector(".converter__value");
const currenciesLeft = document.querySelector(".currenciesleft");
const currenciesRight = document.querySelector(".currenciesright");
// convert variable
const changer = document.querySelector(".converter__change");
//result Variables
const result = document.querySelector(".converter__amount");
//pictures variablers
const leftFlag = document.querySelectorAll(".mainpicture");
const rightFlag = document.querySelector(".secondarypicture");

//==========================================================VARIABLES FOR THE CHART==========================================================
const loadBtn = document.querySelector(".prices__load");

//==============================================================================================RENDER DEFAULT VIEW============================================================================================================//
const renderDefault = function () {
  result.textContent = "1.00";
  currencies.forEach((currency) => {
    currency.value = "USD";
  });
  leftFlag.forEach((flag) => {
    flag.src = `https://countryflagsapi.com/png/United States`;
  });
  rightFlag.src = "https://countryflagsapi.com/png/United States";
};
renderDefault();
//==============================================================================================RENDER PRICES CHART============================================================================================================//

//==============================================================================================FETCH DATA OF CODE AND COUNTRY============================================================================================================//

fetch("./currency-list.json")
  .then((response) => response.json())
  .then((data) => {
    currencies.forEach((currency) => {
      for (const [code, country] of Object.entries(data)) {
        const option = `<option  class='cur-names'>${code}-${country}</option>`;
        currency.insertAdjacentHTML("beforeend", option);
      }
    });
  });

//==============================================================================================VALIDATION OF INPUT===========================================================================================================//

input.addEventListener("input", (e) => {
  e.preventDefault();
  e.target.value = e.target.value
    .replace(/[^0-9.]/g, "")
    .replace(/(\..*)\./g, "$1");
});
//==============================================================================================MAIN FUNCTIONS============================================================================================================//

const convertation = function () {
  fetch(
    "https://v6.exchangerate-api.com/v6/22ecfd59df2c83848119f256/latest/USD"
  )
    .then((response) => response.json())
    .then((data) => {
      const rates = data.conversion_rates;
      let firstValue = currenciesLeft.value.slice(0, 3);
      //find the same code in the object
      let secondValue = currenciesRight.value.slice(0, 3);
      //find the same code in the object
      let firstRate = rates[firstValue];
      let secondRate = rates[secondValue];
      let inputValue = input.value;
      let finalResult = ((input.value / firstRate) * secondRate).toFixed(2);
      result.textContent = finalResult;
      findCountryFlag(firstValue, secondValue);
    });
};
const findCountryFlag = function (leftCode, rightCode) {
  fetch("./currency-names.json")
    .then((response) => response.json())
    .then((data) => {
      leftCountryName = data[leftCode];
      rightCountryName = data[rightCode];
      console.log(leftCountryName);
      leftFlag.forEach((flag) => {
        flag.src = `https://countryflagsapi.com/png/${leftCountryName}`;
      });
      rightFlag.src = `https://countryflagsapi.com/png/${rightCountryName}`;
    });
};
//==============================================================================================EVENT LISTENERS============================================================================================================//

changer.addEventListener("click", function (e) {
  e.preventDefault();
  convertation();
});
form.addEventListener("submit", function (e) {
  e.preventDefault();
  convertation();
});
//GET https://v6.exchangerate-api.com/v6/YOUR-API-KEY/latest/USD
