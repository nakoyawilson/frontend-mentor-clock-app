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
  const response = await axios.get("https://api.quotable.io/random/");
  quote.innerHTML = response.data.content;
  author.innerHTML = response.data.author;
};

const getCurrentTime = async () => {
  try {
    const response = await axios.get(
      `http://worldtimeapi.org/api/ip/${userIpAddress}`
    );
    abbreviation.innerHTML = response.data.abbreviation;
    currentTimezone.innerHTML = response.data.timezone;
    dayOfTheYear.innerHTML = response.data.day_of_year;
    dayOfTheWeek.innerHTML = response.data.day_of_week;
    weekNumber.innerHTML = response.data.week_number;
    unixtime = response.data.unixtime;
  } catch (err) {
    console.log(err);
  }
};

const getIpAddress = async () => {
  try {
    const response = await axios.get(
      "https://api.freegeoip.app/json/?apikey=4b767e00-99b7-11ec-84ba-6f2c148a4c0e"
    );
    userIpAddress = response.data.ip;
    await getCurrentTime(userIpAddress);
    userLocation.innerHTML = `${response.data.region_name}, ${response.data.country_code}`;
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
  getQuote();
  getIpAddress();
  setInterval(displayTime, 1000);
});

newQuoteButton.addEventListener("click", getQuote);
