import { fetchWeatherForecast, comingDaysWeather } from './weatherAPI';
import "./background.js";
import { fetchRandomCocktail, displayCocktail } from './cocktail';
import axios from 'axios';

document.addEventListener('DOMContentLoaded', async () => {
  function dateTimeFn() {
    const now = new Date();
    const currentDate = now.toDateString();
    document.querySelector("#currentDate").textContent = currentDate;

    let hour = now.getHours();
    let minute = now.getMinutes();
    document.querySelector("#currentTime").textContent = `${hour}:${minute}`;
  }
  setInterval(dateTimeFn, 1000);

  const welcomeMsg = document.querySelector("#welcomeMessage");
  const customGreeting = localStorage.getItem("welcomeMsgContent");
  if (customGreeting) {
    welcomeMsg.textContent = customGreeting;
  }
  welcomeMsg.addEventListener("input", () => {
    const content = welcomeMsg.textContent;
    localStorage.setItem("welcomeMsgContent", content);
  });

  const notepad = document.querySelector("#notesArea");
  const savedNotes = localStorage.getItem("notepadContent");
  if (savedNotes) {
    notepad.textContent = savedNotes;
  }
  notepad.addEventListener("input", () => {
    const noteContent = notepad.value;
    localStorage.setItem("notepadContent", noteContent);
  });
});

const addLinkBtn = document.querySelector("#links-btn");
const linkList = document.querySelector("#linkList");
const savedLinks = localStorage.getItem("linkListContent");
if (savedLinks) {
  linkList.innerHTML = savedLinks;
}

addLinkBtn.addEventListener("click", () => {
  const addLink = prompt("Add link URL");

  function isValidUrl(url) {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
  }

  if (addLink !== null) {
    if (addLink && isValidUrl(addLink)) {
      const cleanedUrl = addLink.replace(/^(https?:\/\/)?(www\.)?/i, '');
      const newListItem = document.createElement("div");
      const newLink = document.createElement("a");
      const removeLinkBtn = document.createElement("button");

      newListItem.classList.add("link-item");

      newLink.href = addLink;
      newLink.textContent = cleanedUrl;

      removeLinkBtn.textContent = "x";
      removeLinkBtn.classList.add("remove-btn");
      removeLinkBtn.addEventListener("click", () => {
        linkList.removeChild(newListItem);
        saveLinks();
      });

      newListItem.appendChild(newLink);
      newListItem.appendChild(removeLinkBtn);
      linkList.appendChild(newListItem);

      saveLinks();
    } else {
      alert("Please enter a valid URL");
    }
  }
});

function saveLinks() {
  const linkContent = linkList.innerHTML;
  localStorage.setItem("linkListContent", linkContent);
}

const apiKeyWeather = "2a95bae798cb75042546bc09335b74b6";
const city = "Stockholm";

fetchWeatherForecast(city, apiKeyWeather)
  .then(response => {
    const weatherData = comingDaysWeather(response);
    updateWeatherHTML(weatherData);
  })
  .catch(error => {
    console.error("Error fetching weather data:", error);
  });

  function updateWeatherHTML(weatherData) {
    const weatherContainer = document.querySelector("#weatherContainer");
  
    weatherData.forEach(day => {
      const dayElement = document.createElement("div");
      dayElement.classList.add("weather-day");
  
      const dateElement = document.createElement("p");
      dateElement.textContent = day.date;
  
      const temperatureElement = document.createElement("p");
      temperatureElement.textContent = `${day.temperature} °C`;
  
      const descriptionElement = document.createElement("p");
      descriptionElement.textContent = day.description;
  
      dayElement.appendChild(dateElement);
      dayElement.appendChild(temperatureElement);
      dayElement.appendChild(descriptionElement);
  
      weatherContainer.appendChild(dayElement);
    });
  
  }
    const drinkContainer = document.querySelector(".drink-display");
    const fetchCocktailBtn = document.querySelector(".drink-btn");
  
    drinkContainer.innerHTML = ""; // Clear previous content
    drinkContainer.appendChild(fetchCocktailBtn);
  
    fetchCocktailBtn.addEventListener("click", () => handleFetchCocktail());
  
  function handleFetchCocktail() {
    fetchRandomCocktail()
      .then(cocktailData => {
        const drinkContainer = document.querySelector(".drink-display");
        drinkContainer.innerHTML = "";
        displayCocktail(cocktailData);
      })
      .catch(error => {
        console.error("Error fetching and displaying new cocktail:", error);
      });
  }
  
