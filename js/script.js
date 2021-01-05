const title_html = document.querySelector("title");

const subtitle = document.querySelector("h2");
const title_name = document.querySelector("h1");

const enBtn = document.querySelector("#en");
const ptBtn = document.querySelector("#pt-br");

const inputCity = document.querySelector("#city");
const inputState = document.querySelector("#state");

const clearBtn = document.querySelector("#clear");
const sendBtn = document.querySelector("#send");

const dataContainer = document.querySelector(".data_container");
const cityName = document.querySelector("#cityName");
const tempNow = document.querySelector("#tempNow");
const pressure = document.querySelector("#pressure");
const wind = document.querySelector("#wind");
const umidity = document.querySelector("#umidity");
const sunny = document.querySelector("#sunny");
const cloudy = document.querySelector("#cloudy");
const rainy = document.querySelector("#rainy");
const snowy = document.querySelector("#snowy");

let lang = "en";

function langPt() {
  title_html.innerHTML = "BomTempo";
  subtitle.innerHTML = "bem-vind@ ao";
  title_name.innerHTML = "BomTempo";
  enBtn.style.opacity = "0.6";
  ptBtn.style.opacity = "1";
  inputCity.placeholder = "Cidade..";
  inputState.placeholder = "Estado..";
  clearBtn.innerHTML = "Limpar";
  clearBtn.style.marginLeft = "584px"
  sendBtn.innerHTML = "Enviar";
  lang = "pt_br";
}

function langEn() {
  title_html.innerHTML = "FairWeather";
  title_name.innerHTML = "FairWeather";
  subtitle.innerHTML = "welcome to";
  enBtn.style.opacity = "1";
  ptBtn.style.opacity = "0.6";
  inputCity.placeholder = "City..";
  inputState.placeholder = "State..";
  clearBtn.innerHTML = "Clear";
  clearBtn.style.marginLeft = "601px"
  sendBtn.innerHTML = "Send";
  lang = "en";
}

async function getData() {
  let apiKey = "4f8f611b5ccf30a1fd06c2112f57ec66";
  let weather;

  let cityId = inputCity.value;
  cityId = Format(cityId);
  let stateId = inputState.value;
  stateId = Format(stateId);

  let units;
  let units_measure;

  if (lang == "en") {
    units = "imperial";
    units_measure = "F";
  }

  if (lang == "pt_br") {
    units = "metric";
    units_measure = "°C"
  }

  await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityId},${stateId}&units=${units}&lang=${lang}&appid=${apiKey}`)
    .then((response) => response.json())
    .then((data) => (weather = data))
    .catch((err) => console.log(err));
  ;

  cityName.innerHTML = weather.name;
  tempNow.innerHTML = `${weather.main.temp} ${units_measure}`;
  

  if (lang == "en") {
    pressure.innerHTML = `Pressure:<br>${parseFloat((weather.main.pressure/1000).toFixed(2))}atm`;
    wind.innerHTML = `Wind Speed:<br>${weather.wind.speed}mph`;
    umidity.innerHTML = `Humidity<br>${weather.main.humidity}%`;
  }
  if (lang == "pt_br") {
    pressure.innerHTML = `Pressão:<br>${parseFloat((weather.main.pressure/1000).toFixed(2))}atm`;
    wind.innerHTML = `Vel. Vento:<br>${weather.wind.speed}mps`;
    umidity.innerHTML = `Umidade<br>${weather.main.humidity}%`;
  }

  // Just Sunny
  if (weather.clouds.all < 25) {
    sunny.style.opacity = "1";
    cloudy.style.opacity = "0.2";
    rainy.style.opacity = "0.2";
    snowy.style.opacity = "0.2";
  }

  // Overcast
  if (weather.clouds.all >= 25 && weather.clouds.all < 60) {
    sunny.style.opacity = "1";
    cloudy.style.opacity = "1";
    rainy.style.opacity = "0.2";
    snowy.style.opacity = "0.2";
  }

  // Cloudy
  if (weather.clouds.all >= 60) {
    sunny.style.opacity = "0.2";
    cloudy.style.opacity = "1";
    rainy.style.opacity = "0.2";
    snowy.style.opacity = "0.2";
  }

  // Raining
  if (weather.rain) {
    sunny.style.opacity = "0.2";
    cloudy.style.opacity = "0.2";
    rainy.style.opacity = "1";
    snowy.style.opacity = "0.2";
  }

  // Snowing
  if (weather.snow) {
    sunny.style.opacity = "0.2";
    cloudy.style.opacity = "0.2";
    rainy.style.opacity = "0.2";
    snowy.style.opacity = "1";
  }

  dataContainer.style.opacity = "1";
}

function Format(text){
  return text.replace(/\s/g, '+');
}


function Clear(){
  inputCity.value = "";
  inputState.value = "";
  dataContainer.style.opacity = "0";
}