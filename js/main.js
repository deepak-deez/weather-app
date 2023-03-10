const temp = document.querySelector(".temp");
const expected = document.querySelector(".expected");
const input = document.querySelector(".input-location");
const inputDrop = document.querySelector(".input-dropdown");
const citySelect = document.querySelectorAll(".input-dropdown li");

const image = document.querySelector(".image-main");
const imageSecondary = document.querySelector(".image-secondary");
// let inputVal;

const getWeather = () => {
  async function getWeatherData() {
    const response = await fetch(
      "http://api.weatherapi.com/v1/current.json?key=0c80b2b56f1943ada19100744230103&q=" +
      input.value +
        "&aqi=no"
    )
      .then((data) => data.json())
      .catch((err) => {
        console.log(err);
      });
    console.log("response", response);
    temp.innerHTML = response.current.temp_c + `<sup>o</sup>`;
    expected.innerHTML = `feels ${response.current.feelslike_c}<sup>o</sup> `;
    setImg(response);
  }
  getWeatherData();
};

function setImg(response) {
  let weatherValue = response.current.condition.text;
  let dayValue = response.current.is_day;
  console.log(weatherValue);
  if (dayValue == 1) {
    image.setAttribute("src", "./images/sun.png");
  } else {
    image.setAttribute("src", "./images/moon.png");
  }

  if (weatherValue == "Overcast") {
    imageSecondary.setAttribute("src", "./images/overcast.png");
  } else if (weatherValue == "Sunny") {
    imageSecondary.setAttribute("src", "");
  } else if (weatherValue == "Mist") {
    imageSecondary.setAttribute("src", "./images/mist.png");
  } else if (weatherValue == "Partly cloudy") {
    imageSecondary.setAttribute("src", "./images/partly-cloudy.png");
  } else if (weatherValue == "Light rain") {
    imageSecondary.setAttribute("src", "./images/light-rain.png");
  } else if (weatherValue == "Light snow") {
    imageSecondary.setAttribute("src", "./images/mist.png");
  } else if (weatherValue == "Clear") {
    imageSecondary.setAttribute("src", "");
  } else if (weatherValue == "Heavy rain") {
    imageSecondary.setAttribute("src", "./images/heavy-rain.png");
  }
}

input.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    getWeather();
    inputDrop.classList.toggle('hide');
  }
});


input.onclick = ()=>{
  inputDrop.classList.toggle('hide')
}

citySelect.forEach((ele) =>{

  ele.addEventListener("click", ()=>{
  input.value=ele.textContent;
  // inputDrop.classList.toggle('hide');
  getWeather();
});
})

window.addEventListener('click',(e)=>{
  if(e.target==input){
  inputDrop.classList.remove('hide');

  }
  else{
  inputDrop.classList.add('hide');

  }
})

// (()=>{
//   getWeather()
// })