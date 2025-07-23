const container = document.getElementById("time-tracking");
const daily = document.getElementById("daily");
const weekly = document.getElementById("weekly");
const monthly = document.getElementById("monthly");

// Update DOM when daily is clicked
daily.addEventListener("click", function () {
  daily.classList.add("active");
  weekly.classList.remove("active");
  monthly.classList.remove("active");
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      // Assuming data is an array of activities
      // Each activity has: title, timeframes: { weekly: { current, previous } }
      // const container = document.getElementById("time-tracking");
      const time = document.querySelectorAll(".time");
      const lastWeek = document.querySelectorAll(".last_text");
      const lastHrs = document.querySelectorAll(".last_hrs");
      index = 0;
      data.forEach((activity) => {
        time[index].innerHTML = activity.timeframes.daily.current + "hrs";
        if (activity.timeframes.daily.current == 1) {
          time[index].innerHTML = "1hr";
        }

        lastWeek[index].innerHTML = "Yesterday";
        lastHrs[index].innerHTML = activity.timeframes.daily.previous + "hrs";
        if (activity.timeframes.daily.previous == 1) {
          lastHrs[index].innerHTML = "1hr";
        }
        index++;
      });
    })
    .catch((error) => console.error("Error loading data:", error));
});
// Update DOM when daily is clicked
weekly.addEventListener("click", function () {
  daily.classList.remove("active");
  weekly.classList.add("active");
  monthly.classList.remove("active");
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      // Assuming data is an array of activities
      // Each activity has: title, timeframes: { weekly: { current, previous } }
      // const container = document.getElementById("time-tracking");
      const time = document.querySelectorAll(".time");
      const lastWeek = document.querySelectorAll(".last_text");
      const lastHrs = document.querySelectorAll(".last_hrs");
      index = 0;
      data.forEach((activity) => {
        time[index].innerHTML = activity.timeframes.weekly.current + "hrs";
        lastWeek[index].innerHTML = "Last Week";
        lastHrs[index].innerHTML = activity.timeframes.weekly.previous + "hrs";
        index++;
      });
    })
    .catch((error) => console.error("Error loading data:", error));
});

// Update DOM when daily is clicked
monthly.addEventListener("click", function () {
  daily.classList.remove("active");
  weekly.classList.remove("active");
  monthly.classList.add("active");
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      // Assuming data is an array of activities
      // Each activity has: title, timeframes: { weekly: { current, previous } }
      // const container = document.getElementById("time-tracking");
      const time = document.querySelectorAll(".time");
      const lastWeek = document.querySelectorAll(".last_text");
      const lastHrs = document.querySelectorAll(".last_hrs");
      index = 0;
      data.forEach((activity) => {
        time[index].innerHTML = activity.timeframes.monthly.current + "hrs";
        lastWeek[index].innerHTML = "Last Month";
        lastHrs[index].innerHTML = activity.timeframes.monthly.previous + "hrs";
        index++;
      });
    })
    .catch((error) => console.error("Error loading data:", error));
});

prefixText = "Last Week";
currentActive = weekly;

const appendItem = (item) => {
  // add markup for each item to the DOM
  const todo = document.createElement("div");
  // replace space with dash so I can get correct name and color
  const title = item.title.trim().replace(/\s+/g, "-");
  todo.innerHTML = `
  <div class="card bg-${title}">
      <div class="image-container"><img src="/images/icon-${title}.svg"></div>
  
    <div class="card_content">
        <div class="card_title">${item.title}<img src="images/icon-ellipsis.svg"></div>
        <div class="time_period"> 
          <div class="time">${item.timeframes.weekly.current}hrs</div>
          <div class="last_week"><div class="last_text">Last Week</div> - <div class="last_hrs">${item.timeframes.weekly.previous}hrs</div></div>
        </div>
    </div>
  </div>`;
  container.appendChild(todo);
};

// append the data to the DOM
const populateItems = (data) => {
  // with a forEach loop
  data.forEach((item) => {
    appendItem(item);
    // console.log(item);
  });
};

// fetch the data from the JSON file
fetch("data.json")
  .then((response) => {
    if (!response.ok) return console.error("Opps! Something went wrong.");

    return response.json();
  })
  .then((data) => {
    // populate the items
    populateItems(data);
  });
