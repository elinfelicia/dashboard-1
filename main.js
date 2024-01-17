import axios from "axios";

function dateTimeFn() {
  const now = new Date();
  
  const currentDate = now.toDateString();
  document.querySelector("#currentDate").textContent = currentDate;
  
  let hour = now.getHours()
  let minute = now.getMinutes()
  document.querySelector("#currentTime").textContent = `${hour}:${minute}`
}
setInterval(dateTimeFn, 1000)



const welcomeMsg = document.querySelector("#welcomeMessage");

const customGreeting = localStorage.getItem('welcomeMsgontent');
if (customGreeting) {
  welcomeMsg.textContent = customGreeting;
}

// Add an event listener to the h1 element to save its content on change
welcomeMsg.addEventListener('input', () => {
  const content = welcomeMsg.textContent;
  localStorage.setItem('wlecomeMsgContent', content);
});