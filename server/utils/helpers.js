function formatTime(timeTaken) {
  const minutes = Math.floor(timeTaken / 60);
  const seconds = timeTaken % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
}

module.exports = {
  formatTime,
};
