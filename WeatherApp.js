let city;
let enableAqi=false;
let Wurl;
let loader=document.querySelector(".LoaderContainer");
let weatherDataHolder=document.querySelector(".loaderMainContainer");
const form=document.querySelector("#weatherForm");
const WDataContainer=document.querySelector(".weatherDataContainer");
const UserDetailsContainer=document.querySelector(".takeWeatherDetailsFromUserMainContainer");
const WeatherImage=document.querySelector("#WeatherImg");
// const Newsurl ="https://newsapi.org/v2/everything?q=usa&from=2025-08-22&sortBy=publishedAt&apiKey=edc6365c80534b8293b4a467dea4c010";

const input=document.querySelectorAll(".input");
console.log(input);
input.forEach((element)=>{
      element.addEventListener('change',(event)=>{
        console.log(event.target.value);
        if(event.target.type==="radio")
        {
          console.log("true");
          enableAqi=event.target.value;
          if(city){
            
          }else{
            city="Srinagar";
          }
          console.log(city);
          Wurl=`http://api.weatherapi.com/v1/current.json?key=7fc38ad17afd4cffa4a62824252309&q=${city}&aqi=${enableAqi}`;
          console.log("Updated URL is : ",Wurl);
        }else
          {
            city=event.target.value;
            Wurl=`http://api.weatherapi.com/v1/current.json?key=7fc38ad17afd4cffa4a62824252309&q=${city}&aqi=${enableAqi}`;
            console.log("Updated URL is : ",Wurl);
          }
      })
})



function FetchNews(FearchDFL, msg) {
  return new Promise((resolve, reject) => {

    fetch(msg == "weather data" ? Newsurl : Wurl)
      .then((rawData) => {
        return rawData.json();
      })
      .then((LinkData) => {
        resolve(LinkData, msg);
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

async function FetchNewsAndWeatherData() {
  let locationStat = document.querySelector("#locationValue");
  let weatherInfo = document.querySelector("#locationConditionValue");
  let AQICOValue =document.querySelector("#AQICOValue");
  let AQIno2Value=document.querySelector("#AQIno2Value");
  let AQIo3Value=document.querySelector("#AQIo3Value");
  let AQIpm2_5Value=document.querySelector("#AQIpm2_5Value");
  let AQIpm10Value=document.querySelector("#AQIpm10Value")
  let last_updated = document.querySelector(".lastUpdatedInfoContainer");
  let windSpeed = document.querySelector("#WindSpeedValue");

  let result = await Promise.allSettled([
    FetchNews(Wurl, "weather data"),
    FetchNews(Wurl, "news data"),
  ]);

  console.log("Data:", result);
  locationStat.textContent =
    result[1]["value"]["location"]["name"] +
    " " +
    result[1]["value"]["location"]["region"] +
    " " +
    result[1]["value"]["location"]["country"];
  weatherInfo.textContent = result[1]["value"]["current"]["condition"]["text"];
  last_updated.textContent = result[1]["value"]["current"]["last_updated"];
  windSpeed.textContent = result[1]["value"]["current"]["wind_kph"]+" ";
  AQICOValue.textContent=result[1]["value"]["current"]["air_quality"]["co"]
  AQIno2Value.textContent=result[1]["value"]["current"]["air_quality"]["no2"]
  AQIo3Value.textContent=result[1]["value"]["current"]["air_quality"]["o3"]
  AQIpm2_5Value.textContent=result[1]["value"]["current"]["air_quality"]["pm2_5"]
  AQIpm10Value.textContent=result[1]["value"]["current"]["air_quality"]["pm10"];
  let ImgSrc=result[1]["value"]["current"]["condition"]["icon"]
  console.log(ImgSrc);
  console.log(WeatherImage);
  WeatherImage.setAttribute('src',ImgSrc);
}
//news related data display 

// console.log(result[0]["value"]["articles"][0]["title"]);
// console.log(result[0]["value"]["articles"][0]["description"]);
// console.log(result[0]["value"]["articles"][0]["content"]);
// console.log(result[0]["value"]["articles"][0]["publishedAt"]);
// console.log(result[0]["value"]["articles"][0]["source"]["name"]);

// weather related data display



function displayLoader(){
  
  setTimeout(
    ()=>{
      FetchNewsAndWeatherData();
      loader.style.display="none";
      weatherDataHolder.style.display="block";
      WDataContainer.style.display="flex";
    },4000
  )
}

form.addEventListener('submit',(event)=>{
  event.preventDefault();
  UserDetailsContainer.style.display="none";
  loader.style.display="block";

  displayLoader();
})



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
