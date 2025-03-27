function updateClock() {
    const now = new Date();
    const options = { dateStyle: 'full', timeStyle: 'long' };
    const ruDate = new Intl.DateTimeFormat("ru", options).format(now);
    document.getElementById('date').innerHTML = ruDate.replace(ruDate[0], ruDate[0].toUpperCase());
}

setInterval(updateClock, 5000);
updateClock();
