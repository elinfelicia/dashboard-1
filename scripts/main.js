import {fetchWeatherForecast, comingDaysWeather } from './weatherAPI';
import "./background.js"
import axios from 'axios';

document.addEventListener('DOMContentLoaded', () => {
  // Date and time display
  function dateTimeFn() {
    const now = new Date();
    const currentDate = now.toDateString();
    document.querySelector("#currentDate").textContent = currentDate;
    
    let hour = now.getHours();
    let minute = now.getMinutes();
    document.querySelector("#currentTime").textContent = `${hour}:${minute}`;
  }
  setInterval(dateTimeFn, 1000);

  // Custom Greeting
  const welcomeMsg = document.querySelector("#welcomeMessage");
  const customGreeting = localStorage.getItem("welcomeMsgContent");
  if (customGreeting) {
    welcomeMsg.textContent = customGreeting;
  }
  welcomeMsg.addEventListener("input", () => {
    const content = welcomeMsg.textContent;
    localStorage.setItem("welcomeMsgContent", content);
  });

  // Save notes
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

//Links

const addLinkBtn = document.querySelector("#links-btn");
const linkList = document.querySelector("#linkList");
let newListItem
let newLink
let removeLinkBtn

addLinkBtn.addEventListener("click", () => {
  const addLink = prompt("Add link URL");

  function isValidUrl (url) {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
  }

  function addElement() {
    if (addLink && isValidUrl(addLink)) {
      newListItem = document.createElement("li");
      
      newLink = document.createElement("a")
      newLink.href = addLink;
      newLink.textContent = addLink;

      removeLinkBtn = document.createElement("button");
      removeLinkBtn.textContent = "x"
      removeLinkBtn.classList.add("remove-btn");
      removeLinkBtn.addEventListener("click", () => {
        linkList.removeChild(newListItem)
      });

      newListItem.appendChild(newLink);
      newListItem.appendChild(removeLinkBtn);
      linkList.appendChild(newListItem)
    } else {
      alert ("Please enter a valid URL")
    }
  }
  addElement();
});



//Weather
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