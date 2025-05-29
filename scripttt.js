const planner = document.getElementById("planner");

const currentDate = document.getElementById("currentDate");

const saveMessage = document.getElementById("saveMessage");

const hours = [



  "9 AM", "10 AM", "11 AM", "12 PM",

  "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"

];

function getHourValue(index) {
  return index + 9; // 9 AM is hour 9

}

function getCurrentHour() {

  return new Date().getHours();
}

function createTimeBlock(hour, index) {
  const timeBlock = document.createElement("div");
  timeBlock.className = "time-block";


  const hourLabel = document.createElement("div");
  hourLabel.className = "hour";
  hourLabel.textContent = hour;
  

  const input = document.createElement("input");
  input.className = "task";
  input.type = "text";
  input.id = `task-${index}`;
  input.value = localStorage.getItem(`task-${index}`) || "";

  const currentHour = getCurrentHour();
  const blockHour = getHourValue(index);

  if (blockHour < currentHour) {
    input.classList.add("past");
  } else if (blockHour === currentHour) {
    input.classList.add("present");
  } else {
    input.classList.add("future");
  }

  const button = document.createElement("button");
  button.className = "saveBtn";
  button.textContent = "Save";


  button.onclick = () => {
    localStorage.setItem(`task-${index}`, input.value);
    showMessage("✅ Task saved successfully!");
  };



  timeBlock.appendChild(hourLabel);
  timeBlock.appendChild(input);
  timeBlock.appendChild(button);


  planner.appendChild(timeBlock);
}

function showMessage(msg) {
  saveMessage.textContent = msg;
  setTimeout(() => {
    saveMessage.textContent = "";
  }, 2000);
}

function clearAll() {
  if (confirm("Are you sure you want to clear all tasks?")) {
    hours.forEach((_, index) => {
      localStorage.removeItem(`task-${index}`);
    });
    location.reload();
  }
}

function displayDate() {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  
  currentDate.textContent = new Date().toLocaleDateString(undefined, options);

}

// Initialize planner
hours.forEach(createTimeBlock);
displayDate();

function updateClock() {
    const now = new Date();

    const clock = document.getElementById("liveClock");

    clock.textContent = now.toLocaleTimeString();
  }
  
  // Call it every second
  setInterval(updateClock, 1000);
  updateClock(); // Initial call
  