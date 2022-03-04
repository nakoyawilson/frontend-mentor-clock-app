const appBody = document.querySelector("body");
const mainContainer = document.getElementById("mainContainer");
const quoteContainer = document.getElementById("quoteContainer");
const timeContainer = document.getElementById("timeContainer");
const quote = document.getElementById("quote");
const author = document.getElementById("author");
const newQuoteButton = document.getElementById("newQuoteButton");
const greeting = document.getElementById("greeting");
const timeIcon = document.getElementById("timeIcon");
const userTime = document.getElementById("userTime");
const abbreviation = document.getElementById("abbreviation");
const userLocation = document.getElementById("userLocation");
const currentTimezone = document.getElementById("currentTimezone");
const dayOfTheYear = document.getElementById("dayOfTheYear");
const dayOfTheWeek = document.getElementById("dayOfTheWeek");
const weekNumber = document.getElementById("weekNumber");
const expandButton = document.getElementById("expand");
const expandText = document.getElementById("expandText");
const expandIcon = document.getElementById("expandIcon");
const moreInfo = document.getElementById("moreInfo");
const apikey = "";
let userIpAddress;
let startingHour;
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
  if (hours >= 5 && hours < 12) {
    greeting.innerHTML = "Good morning";
  } else if (hours >= 12 && hours < 18) {
    greeting.innerHTML = "Good afternoon";
  } else {
    greeting.innerHTML = "Good evening";
  }
  if (hours < 5 || hours > 18) {
    appBody.classList.replace("daytime", "nighttime");
    timeIcon.src = "assets/desktop/icon-moon.svg";
  } else {
    appBody.classList = "daytime";
    timeIcon.src = "assets/desktop/icon-sun.svg";
  }
  let minutes =
    time.getMinutes().toString().length === 1
      ? `0${time.getMinutes()}`
      : time.getMinutes();

  userTime.innerHTML = `${hours}:${minutes}`;
  unixtime++;
};

document.addEventListener("DOMContentLoaded", async () => {
  await getQuote();
  await getIpAddress();
  setInterval(displayTime, 1000);
});

newQuoteButton.addEventListener("click", getQuote);

expandButton.addEventListener("click", () => {
  if (moreInfo.classList.contains("hidden")) {
    moreInfo.classList.toggle("hidden");
    quoteContainer.classList.toggle("hidden");
    mainContainer.classList.toggle("less-info");
    timeContainer.classList.toggle("less-time-info");
    expandIcon.src = "assets/desktop/icon-arrow-up.svg";
    expandText.innerHTML = "Less";
  } else {
    moreInfo.classList.toggle("hidden");
    quoteContainer.classList.toggle("hidden");
    mainContainer.classList.toggle("less-info");
    timeContainer.classList.toggle("less-time-info");
    expandIcon.src = "assets/desktop/icon-arrow-down.svg";
    expandText.innerHTML = "More";
  }
});
