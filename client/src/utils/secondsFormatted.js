export default (time) => {
    if (!time || time === 0) { return "0:00" };
    let minutes = Math.floor(time / 60);
    let seconds = (time % 60).toFixed(0);
    return (seconds === 60 ? (minutes + 1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
    // return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}