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
    const response = await axios.get(
      "https://programming-quotes-api.herokuapp.com/Quotes/random"
    );
    quote.innerHTML = response.data.en;
    author.innerHTML = response.data.author;
  } catch (err) {
    console.log(err);
  }
};

const getCurrentTime = async () => {
  try {
    const response = await axios.get(
      `https://worldtimeapi.org/api/ip/${userIpAddress}`
    );
    abbreviation.innerHTML = response.data.abbreviation;
    currentTimezone.innerHTML = response.data.timezone.replace(/_/g, " ");
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
  if (!isNaN(time)) {
    let hours =
      time.getHours().toString().length === 1
        ? `0${time.getHours()}`
        : time.getHours();
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
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  await getQuote();
  await getIpAddress();
  setInterval(displayTime, 1000);
});

newQuoteButton.addEventListener("click", getQuote);

expandButton.addEventListener("click", () => {
  if (moreInfo.classList.contains("show-less-info")) {
    moreInfo.classList.toggle("show-less-info");
    quoteContainer.classList.toggle("hidden");
    mainContainer.classList.toggle("less-info");
    timeContainer.classList.toggle("less-time-info");
    expandIcon.src = "assets/desktop/icon-arrow-up.svg";
    expandText.innerHTML = "Less";
  } else {
    moreInfo.classList.toggle("show-less-info");
    quoteContainer.classList.toggle("hidden");
    mainContainer.classList.toggle("less-info");
    timeContainer.classList.toggle("less-time-info");
    expandIcon.src = "assets/desktop/icon-arrow-down.svg";
    expandText.innerHTML = "More";
  }
});
