const quote = document.getElementById("quote");
const author = document.getElementById("author");
const newQuoteButton = document.getElementById("newQuoteButton");
const greeting = document.getElementById("greeting");
const userTime = document.getElementById("userTime");
const abbreviation = document.getElementById("abbreviation");
const userLocation = document.getElementById("userLocation");
const currentTimezone = document.getElementById("currentTimezone");
const dayOfTheYear = document.getElementById("dayOfTheYear");
const dayOfTheWeek = document.getElementById("dayOfTheWeek");
const weekNumber = document.getElementById("weekNumber");
const apikey = "";
let userIpAddress;
let unixtime;

const getQuote = async () => {
  try {
    const response = await fetch(
      "https://programming-quotes-api.herokuapp.com/Quotes/random"
    );
    const data = await response.json();
    quote.innerHTML = data.en;
    author.innerHTML = data.author;
  } catch (err) {
    console.log(err);
  }
};

const getStartingQuote = async () => {
  try {
    const response = await fetch(
      "https://programming-quotes-api.herokuapp.com/Quotes/5a96001a7700780004d51dce"
    );
    const data = await response.json();
    quote.innerHTML = data.en;
    author.innerHTML = data.author;
  } catch (err) {
    console.log(err);
  }
};

const getCurrentTime = async () => {
  try {
    const response = await fetch(
      `https://worldtimeapi.org/api/ip/${userIpAddress}`
    );
    const data = await response.json();
    abbreviation.innerHTML = data.abbreviation;
    currentTimezone.innerHTML = data.timezone;
    dayOfTheYear.innerHTML = data.day_of_year;
    dayOfTheWeek.innerHTML = data.day_of_week;
    weekNumber.innerHTML = data.week_number;
    unixtime = data.unixtime;
  } catch (err) {
    console.log(err);
  }
};

const getIpAddress = async () => {
  try {
    const response = await fetch(
      "https://api.freegeoip.app/json/?apikey=4b767e00-99b7-11ec-84ba-6f2c148a4c0e"
    );
    const data = await response.json();
    userIpAddress = data.ip;
    await getCurrentTime(userIpAddress);
    userLocation.innerHTML = `${data.region_name}, ${data.country_code}`;
  } catch (err) {
    console.log(err);
  }
};

const displayTime = () => {
  const time = new Date(unixtime * 1000);
  let hours = time.getHours();
  if (Number(hours) < 12) {
    greeting.innerHTML = "Good morning";
  } else if (Number(hours) < 18) {
    greeting.innerHTML = "Good afternoon";
  } else {
    greeting.innerHTML = "Good evening";
  }
  let minutes =
    time.getMinutes().toString().length === 1
      ? `0${time.getMinutes()}`
      : time.getMinutes();

  userTime.innerHTML = `${hours}:${minutes}`;
  unixtime++;
};

document.addEventListener("DOMContentLoaded", () => {
  getStartingQuote();
  getIpAddress();
  setInterval(displayTime, 1000);
});

newQuoteButton.addEventListener("click", getQuote);
