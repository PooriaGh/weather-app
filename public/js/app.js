// Elements
const weatherForm = document.querySelector("form");
const weatherInput = document.querySelector("input");
const errorMessage = document.querySelector("p#error");
const dataMessage = document.querySelector("p#data");
const locationButton = document.querySelector("#send-location");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = weatherInput.value;
  errorMessage.textContent = "Loading ...";
  dataMessage.textContent = "";
  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        errorMessage.textContent = data.error;
      } else {
        errorMessage.textContent = data.forcast;
        dataMessage.textContent = `Location: ${data.location}`;
      }
    });
  });
});

locationButton.addEventListener("click", () => {
  locationButton.setAttribute("disabled", "disabled");

  errorMessage.textContent = "Loading ...";
  dataMessage.textContent = "";

  if (!navigator.geolocation) {
    return alert("It's not supported, please update your browser!");
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log(position);
      fetch(
        `/weather/location?lat=${position.coords.latitude}&long=${position.coords.longitude}`
      ).then((response) => {
        response.json().then((data) => {
          if (data.error) {
            errorMessage.textContent = data.error;
          } else {
            errorMessage.textContent = data.forcast;
            locationButton.removeAttribute("disabled");
          }
        });
      });
    },
    (error) => {
      console.log(error);
    }
  );
});
