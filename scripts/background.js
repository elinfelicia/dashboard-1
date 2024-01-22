import axios from "axios";


const apiKey = "ENTER UNSPLASH API KEY";
const apiUrl = `https://api.unsplash.com/photos/random?query=nature&client_id=${apiKey}`;

async function fetchBackground() {
    try {
        const response = await axios.get(apiUrl);
        const photoUrl = response.data.urls.regular;
        return photoUrl;
    } catch (error) {
        console.error("Error fetching background image", error);
    };
};

function setBackground () {
    const body = document.body;
    fetchBackground()
    .then (photoUrl => {
        body.style.backgroundImage = `url(${photoUrl})`;
    });
}

document.addEventListener("DOMContentLoaded", setBackground);

const bgBtn = document.querySelector(".bg-btn")

bgBtn.addEventListener("click", setBackground)