function convertTime() {
  const epoch_time = parseInt($("input.epoch-time").val());
  let date = new Date(epoch_time * 1000);
  converted_date = date.toLocaleString();
  document.getElementById("converted-time").innerHTML = converted_date;
  console.log(converted_date);
}
