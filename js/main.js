const locate= document.querySelector('.location')

const temp= document.querySelector('.temp')
const expected= document.querySelector('.expected');







async function getWeatherData(){
  const response = await fetch(
    "http://api.weatherapi.com/v1/current.json?key=0c80b2b56f1943ada19100744230103&q=London&aqi=no"
  ).then(function (res) {
    return res.json();
  });
  console.log("response", response);


  locate.innerHTML=response.location.name;
  temp.innerHTML=response.current.temp_c+`<sup>o</sup>`;
  expected.innerHTML=`feels like ${response.current.feelslike_c}<sup>o</sup> `;
}

getWeatherData();


