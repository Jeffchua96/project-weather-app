var searchedCities = []

let weather = {
  fetchWeather: function(city) {
    fetch(`https://wttr.in/${city}?format=j1`).then(response => {
      if (!response.ok) {
        document.getElementById("city-input").value = ""
        throw new Error('Location not found!');

      }
      return response.json();
    }).then(json => {
      document.getElementsByClassName('grid-item big')[0].style.display = "block"
      document.getElementById('temp-conversion').style.width = "25%"
      document.getElementById('text').style.display = "none"
      document.getElementById('form').style.display = "block"

      if(parseInt(json.weather[0].hourly[0].chanceofsnow) > 50){
        document.getElementById('image').alt = "snow"
        document.getElementById('image').src = "./assets/icons8-light-snow.gif"
      }
      else if(parseInt(json.weather[0].hourly[0].chanceofsunshine) > 50){
        document.getElementById('image').alt = "sun"
        document.getElementById('image').src = "./assets/icons8-summer.gif"
      }

      else if(parseInt(json.weather[0].hourly[0].chanceofrain) > 50){
        document.getElementById('image').alt = "rain"
        document.getElementById('image').src = "./assets/icons8-torrential-rain.gif"
      }

      else{
        document.getElementById('image').style.display = "none"

      }

      document.getElementById("city-name").innerHTML = document.getElementById('city-input').value;
      document.getElementById("nearest-area").innerHTML = json.nearest_area[0].areaName[0].value;
      document.getElementById("region").innerHTML = json.nearest_area[0].region[0].value || 'N/A';
      if(!json.nearest_area[0].region[0].value){
        document.getElementById("nearest-area-label").innerHTML = "Nearest Area";
      }
      document.getElementById("country").innerHTML = json.nearest_area[0].country[0].value;
      document.getElementById("feels-like").innerHTML = 'Feels Like ' + json.current_condition[0].FeelsLikeF + '°F';
      document.getElementById("chance-of-rain").innerHTML = json.weather[0].hourly[0].chanceofrain;
      document.getElementById("chance-of-sunshine").innerHTML = json.weather[0].hourly[0].chanceofsunshine
      document.getElementById("chance-of-snow").innerHTML = json.weather[0].hourly[0].chanceofsnow;

      //Todays Weather
      document.getElementById("averageTemp1").innerHTML = json.weather[0].avgtempF + '°F';
      document.getElementById("minTemp1").innerHTML = json.weather[0].mintempF + '°F';
      document.getElementById("maxTemp1").innerHTML = json.weather[0].maxtempF + '°F';

      //Tomorrows WEather
      document.getElementById("averageTemp2").innerHTML = json.weather[1].avgtempF + '°F';
      document.getElementById("minTemp2").innerHTML = json.weather[1].mintempF + '°F';
      document.getElementById("maxTemp2").innerHTML = json.weather[1].maxtempF + '°F';

      //Day after tomorrow

      document.getElementById("averageTemp3").innerHTML = json.weather[2].avgtempF + '°F';
      document.getElementById("minTemp3").innerHTML = json.weather[2].mintempF + '°F';
      document.getElementById("maxTemp3").innerHTML = json.weather[2].maxtempF + '°F';
      
      let searchCity = {
        city : document.getElementById('city-input').value,
        temperature:  json.current_condition[0].FeelsLikeF + '°F'
      }

      searchedCities.push(searchCity);
      
      document.getElementById("city-input").value = ""

      document.getElementById('temp-to-convert').value =""
      document.getElementById('result').innerHTML =""


      let city = ""

      for(let i = 0; i < searchedCities.length; i ++ ){
          city += `<li style="margin-bottom: 8px;"><a>${searchedCities[i].city} - ${searchedCities[i].temperature}</a></li>`
      }

      document.getElementById('searchedCities').innerHTML = city

     
    })
  }
};


if(searchedCities.length == 0){
  document.getElementsByClassName('grid-item big')[0].style.display = "none"
  document.getElementById('temp-conversion').style.width = "70%"
  document.getElementById('text').style.display = "block"
  document.getElementById('form').style.display = "none"

}


// const submitButton = document.getElementById("handleConvert");
// submitButton.addEventListener("click", convertTemperature);


function convertTemperature(e) {
  console.log('zee')
  const tempToConvert = document.getElementById("temp-to-convert").value;
  let toCelsius = document.getElementById("to-c").checked;
  let toFahrenheit = document.getElementById("to-f").checked;
  let result = 0.00;
  
  document.getElementById("result").innerHTML = "";

  console.log('toCelsius ', toCelsius)

  if (toCelsius) {
    console.log('zee1')
    result = (tempToConvert - 32) * 5 / 9°;
  } else if (toFahrenheit) {
    result = (tempToConvert * 9 / 5) + 32°;
  }

  formatNumber(result)

}

function formatNumber(num) {
  const strNum = num.toString();
  if (strNum.endsWith('.00')) {
    document.getElementById('result').innerHTML =   strNum.slice(0, -3); // remove the ".00" from the end of the string
  } else {
    document.getElementById('result').innerHTML =  num.toFixed(2); // round the number to 2 decimal places
  }
}


// Add an event listener to the search form submit button
const searchForm = document.getElementById('search-form');
const searchButton = document.getElementById('search-button');
const cityInput = document.getElementById('city-input');
searchForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const city = cityInput.value;
  weather.fetchWeather(city);
});

const mainForm = document.getElementById('mainForm');
const convertBtn = document.getElementById('convertBtn');
console.log('convertBtn ', convertBtn)
mainForm.addEventListener('submit', function(event) {
  console.log('asdas')
  event.preventDefault();
  convertTemperature();
});

