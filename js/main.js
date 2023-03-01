const locate= document.querySelector('.location')

const temp= document.querySelector('.temp')






async function getWeatherData() {
  const response = await fetch(
    "http://api.weatherapi.com/v1/current.json?key=0c80b2b56f1943ada19100744230103&q=London&aqi=no"
  ).then(function (res) {
    return res.json();
  });
  console.log("response", response);


  locate.innerHTML=response.location.name;
  temp.innerHTML=response.current.feelslike_c;
  
}

getWeatherData();


