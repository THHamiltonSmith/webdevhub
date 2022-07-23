const epoch_time = document.getElementById("epoch-time");
const converted_time = document.getElementById("converted-time");
const popupText = document.getElementById("popup-text");

function convertTime() {
  let date = new Date(epoch_time.value * 1000);
  date = date.toLocaleString();
  converted_time.value = date;
}

function copyText() {
  navigator.clipboard.writeText(converted_time.value);

  // Displays text `Copied!` for 2 seconds
  popupText.style.opacity = 1;
  setTimeout(function () {
    popupText.style.opacity = 0;
  }, 2000);
}
