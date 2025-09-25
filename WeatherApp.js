let city;
let enableAqi = false;
let Wurl;
let loader = document.querySelector(".LoaderContainer");
let weatherDataHolder = document.querySelector(".loaderMainContainer");
const form = document.querySelector("#weatherForm");
const WDataContainer = document.querySelector(".weatherDataContainer");
const UserDetailsContainer = document.querySelector(
  ".takeWeatherDetailsFromUserMainContainer"
);
const WeatherImage = document.querySelector("#WeatherImg");
let isDataFetched = true;
// const Newsurl ="https://newsapi.org/v2/everything?q=usa&from=2025-08-22&sortBy=publishedAt&apiKey=edc6365c80534b8293b4a467dea4c010";

const input = document.querySelectorAll(".formInput");
console.log(input);
input.forEach((element) => {
  element.addEventListener("change", (event) => {
    console.log("Value is :"+event.target.value);
    console.log("Type is : "+event.target.type);

    if (event.target.type === "radio") {
      console.log("Value is : "+event.target.value);
      enableAqi = event.target.value;
      if (city) {
      } else {
        city = "Srinagar";
      }
      console.log(city);
      Wurl = `https://api.weatherapi.com/v1/current.json?key=7fc38ad17afd4cffa4a62824252309&q=${city}&aqi=${enableAqi}`;
      console.log("Updated URL is : ", Wurl);
    } else {
      city = event.target.value;
      Wurl = `https://api.weatherapi.com/v1/current.json?key=7fc38ad17afd4cffa4a62824252309&q=${city}&aqi=${enableAqi}`;
      console.log("Updated URL is : ", Wurl);
    }
  });
});

function FetchNews(FearchDFL, msg) {
  return new Promise((resolve, reject) => {
    fetch(msg == "weather data" ? Newsurl : Wurl)
      .then((rawData) => {
        return rawData.json();
      })
      .then((LinkData) => {
        console.log(LinkData);
        resolve(LinkData, msg);
      })
      .catch((err) => {
        console.log("Catch Error -> Error : " + err);
        // location.reload();
      })
      .finally(() => {
        setTimeout(() => {
          loader.style.display = "none";
          weatherDataHolder.style.display = "flex";
          WDataContainer.style.display = "flex";
        }, 1000);
      });
  });
}

async function FetchNewsAndWeatherData() {
  let locationStat = document.querySelector("#locationValue");
  let weatherInfo = document.querySelector("#locationConditionValue");
  let AQIStatus = document.querySelector(".AQIStatusValue");
  let AQICOValue = document.querySelector("#AQICOValue");
  let AQIno2Value = document.querySelector("#AQIno2Value");
  let AQIo3Value = document.querySelector("#AQIo3Value");

  let AQIpm2_5Value = document.querySelector("#AQIpm2_5Value");
  let AQIpm10Value = document.querySelector("#AQIpm10Value");
  let last_updated = document.getElementById("#lastUpdatedInfo");

  let windSpeed = document.querySelector("#WindSpeedValue");

  // VARIABLES 

  let weatherCondition;

  let result = await Promise.allSettled([
    FetchNews(Wurl, "weather data"),
    FetchNews(Wurl, "news data"),
  ]);

  console.log(result[0][""]);

  if (result) {
    console.log("Data:", result);
    locationStat.textContent =
      result[1]["value"]["location"]["name"] +
      ", " +
      result[1]["value"]["location"]["region"] +
      ", " +
      result[1]["value"]["location"]["country"];
      weatherCondition=result[1]["value"]["current"]["condition"]["text"];
      weatherInfo.textContent =weatherCondition
    windSpeed.textContent = result[1]["value"]["current"]["wind_kph"] + " ";
    let Co, no2, o3, pm2_5, pm10;

    Co = result[1]["value"]["current"]["air_quality"]["co"];

    AQICOValue.textContent = Co;

    no2 = result[1]["value"]["current"]["air_quality"]["no2"];
    AQIno2Value.textContent = no2;
    o3 = result[1]["value"]["current"]["air_quality"]["o3"];
    AQIo3Value.textContent = o3;
    pm2_5 = result[1]["value"]["current"]["air_quality"]["pm2_5"];
    AQIpm2_5Value.textContent = pm2_5;
    pm10 = result[1]["value"]["current"]["air_quality"]["pm10"];
    AQIpm10Value.textContent = pm10;
    let ImgSrc = result[1]["value"]["current"]["condition"]["icon"];
    
    console.log(ImgSrc);
    console.log(WeatherImage);
    // WeatherImage.setAttribute("src", ImgSrc);
    console.log(WeatherImage.getAttribute("src"));
    console.log(typeof weatherCondition);
    
    // add icons or images based ont he weather situation
    WeatherImage.setAttribute("width","100px")
    WeatherImage.setAttribute("height","100px")
    if(weatherCondition.includes("rain"))
    {
      WeatherImage.setAttribute("src","./Icons/cloudyNew.png")
    }else if(weatherCondition.includes("cloudy"))
    {
      WeatherImage.setAttribute("src","./Icons/cloudy.gif")
    }else{
      WeatherImage.setAttribute("src","./Icons/Clear.webp")
    }


    last_updated.textContent = result[1]["value"]["current"]["last_updated"];

    let status = "safe1";

    if (Co > 100 || no2 > 360 || o3 > 168 || pm2_5 > 90 || pm10 > 250) {
      status = "high risk";
    } else if (Co > 50 || no2 > 100 || o3 > 100 || pm2_5 > 60 || pm10 > 100) {
      status = "risk";
    } else if (Co > 10 || no2 > 53 || o3 > 50 || pm2_5 > 30 || pm10 > 50) {
      status = "moderate";
    }
    console.log(AQIStatus);
    AQIStatus.textContent = status;
  } else {
  }
}

//news related data display

// console.log(result[0]["value"]["articles"][0]["title"]);
// console.log(result[0]["value"]["articles"][0]["description"]);
// console.log(result[0]["value"]["articles"][0]["content"]);
// console.log(result[0]["value"]["articles"][0]["publishedAt"]);
// console.log(result[0]["value"]["articles"][0]["source"]["name"]);

// weather related data display

function displayLoader() {
  FetchNewsAndWeatherData();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  UserDetailsContainer.style.display = "none";
  loader.style.display = "flex";

  displayLoader();
});

// console.log(input[0]);

// FetchNewsAndWeatherData();

// function weatherData() {
//   return new Promise((resolve, reject) => {
//     fetch(Wurl)
//       .then((rawData) => {
//         return rawData.json();
//       })
//       .then((data) => {
//         resolve(data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   });
// }

// async function FeatchWeatherData() {
//   console.log("Fetching Weather Data, please wait");
//   let WeatherData = await weatherData();
//   console.log(
//     "The Weather details of ",
//     WeatherData["location"]["name"] +
//       " " +
//       WeatherData["location"]["region"] +
//       " " +
//       WeatherData["location"]["country"]
//   );
//   console.log(
//     "Weather Condition : ",
//     WeatherData["current"]["condition"]["text"]
//   );
//   console.log("Last Updated : ", WeatherData["current"]["last_updated"]);
//   console.log("Air Quality Index : ", WeatherData["current"]["air_quality"]);
// }

// FeatchWeatherData();

// async function WeatherApp() {
//   await fetch(url)
//     .then((res) => res.json())
//     .then((data) => {
//       let DataNews = data;
//         return (DataNews)
//         })
//     .catch((err) => console.error(err));
// }

// let NewCollection = await WeatherApp();
// console.log(NewCollection)
