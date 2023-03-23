const temp = document.querySelector(".temp");
const expected = document.querySelector(".expected");
const input = document.querySelector(".input-location");
const inputDrop = document.querySelector(".input-dropdown");
const image = document.querySelector(".image-main");
const imageSecondary = document.querySelector(".image-secondary");

(async () => {
  const response = await fetch("http://127.0.0.1:8081/all-cities")
    .then((data) => data.json())
    .then((cityData) => {
      let allCities = cityData;
      console.log(allCities);
      for (let i = 0; i < allCities.length; i++) {
        let city = document.createElement("li");
        city.innerHTML = allCities[i];
        inputDrop.appendChild(city);
      }
    })
    .catch((err) => {
      let myCities = [
        "kolkata",
        "london",
        "Ottawa",
        "Mexico City",
        "Brasilia",
        "Paris",
        "Chicago",
        "Bali",
        "Singapore",
        "Oslo",
        "Moscow",
        "Kazan",
        "Adana",
        "Budapest",
        "Barcelona",
        "Manchester",
        "Dubai",
        "Surat",
        "Panaji",
        "Doha",
      ];
      for (let i = 0; i < myCities.length; i++) {
        let city = document.createElement("li");
        city.innerHTML = myCities[i];
        inputDrop.appendChild(city);
      }
      console.log(err);
    });

  const citySelect = document.querySelectorAll(".input-dropdown li");
  citySelect.forEach((ele) => {
    ele.addEventListener("click", () => {
      input.value = ele.textContent;
      getWeather();
    });
  });
})();

const getWeather = () => {
  if (input.value.trim() === "") {
    alert("Enter a location!");
    return;
  }
  async function getWeatherData() {
    const response = await fetch(
      "http://127.0.0.1:8081/" + input.value
    )
      .then((data) => data.json())
      .catch((err) => {
        console.log(err);
        alert("Can't connect to Database. Check if server is listening.");
      });
    console.log("response", response);
    temp.innerHTML = response.apiData.tempC + `<sup>o</sup>`;
    expected.innerHTML = `feels ${response.apiData.condition.feelsLikeC}<sup>o</sup> `;
    setImg(response);
  }
  getWeatherData();
};

function setImg(response) {
  let weatherValue = response.apiData.condition.text;
  let dayValue = response.apiData.condition.isDay;
  if (dayValue === '1') {
    image.setAttribute("src", "./images/sun.png");
  } else {
    image.setAttribute("src", "./images/moon.png");
  }
  if (weatherValue === "Overcast") {
    imageSecondary.setAttribute("src", "./images/overcast.png");
  } else if (weatherValue === "Sunny") {
    imageSecondary.setAttribute("src", "");
  } else if (weatherValue === "Mist") {
    imageSecondary.setAttribute("src", "./images/mist.png");
  } else if (weatherValue === "Partly cloudy") {
    imageSecondary.setAttribute("src", "./images/partly-cloudy.png");
  } else if (weatherValue === "Light rain") {
    imageSecondary.setAttribute("src", "./images/light-rain.png");
  } else if (weatherValue === "Light snow") {
    imageSecondary.setAttribute("src", "./images/mist.png");
  } else if (weatherValue === "Clear") {
    imageSecondary.setAttribute("src", "");
  } else if (weatherValue === "Heavy rain") {
    imageSecondary.setAttribute("src", "./images/heavy-rain.png");
  }
}
// Light snow showers, Light rain shower to be added
input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    getWeather();
    inputDrop.classList.toggle("hide");
  }
});

input.onclick = () => {
  inputDrop.classList.toggle("hide");
};

window.addEventListener("click", (e) => {
  if (e.target === input) {
    inputDrop.classList.remove("hide");
  } else {
    inputDrop.classList.add("hide");
  }
});

window.onload = runWeather();

function runWeather() {
  //weather of a default location
  input.value = "London";
  getWeather();
}
