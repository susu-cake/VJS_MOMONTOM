const weather = document.querySelector(".js-weather")

const COORDS = 'coords';
const API_KEY = '4061d9f9040aa8e0dd1a8461753b292e'

function getWeather(lat, lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(reponse) {
        return reponse.json()
    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        console.log(temperature, place)
        weather.innerText = `${temperature}@${place}`;
    });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude: latitude,
        longitude: longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude)
}

function handleGeoError(position){
    console.log('Cant access geo location');
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
        const parsedcoords = JSON.parse(loadedCoords);
        getWeather(parsedcoords.latitude, parsedcoords.longitude);
    }
}



function init() {
    loadCoords();
}

init();