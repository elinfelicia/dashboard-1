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
