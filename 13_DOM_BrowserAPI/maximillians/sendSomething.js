console.log("sending something...");

const intervalId = setInterval(() => {
  console.log("sending semething...");
}, 2000);

document
  .getElementById("btn-stopSending")
  .addEventListener("click", () => clearInterval(intervalId));
