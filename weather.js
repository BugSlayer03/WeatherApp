// http://api.weatherapi.com/v1/current.json?key=0cf3f4985d3e404a908154315261703&q=Varanasi&aqi=no

const tempField = document.querySelector('.temp');
const locationField = document.querySelector('.location');
const dateField = document.querySelector('.date');
const conditionText = document.querySelector('.condition p');
// const minmaxField = document.querySelector('.min_max');
const searchField = document.querySelector('.city_input');
const condImg = document.querySelector('.condImg');
const windSpeedField = document.querySelector('.wind .w1');
const lastUpdateField=document.querySelector('.lastUpdated');
// const windDirField=document.querySelector('.wind .w2');

const countryAbbreviations = {
    "United States of America": "USA",
    "United Arab Emirates": "UAE",
    "United Kingdom": "UK",
};

let target = 'Varanasi';

const fetchResults = async (targetLocation) => {
    let url = `https://api.weatherapi.com/v1/current.json?key=0cf3f4985d3e404a908154315261703&q=${targetLocation}&aqi=no`;

    const res = await fetch(url);

    const data = await res.json();

    console.log(data);

    let locationName = data.location.name;
    console.log(locationName);
    let locationCountry=data.location.country;
    if (countryAbbreviations[country]) {
        country = countryAbbreviations[country];
    }
    let locationTime = data.location.localtime;
    console.log(locationTime);
    let locationTemp = data.current.temp_c;
    console.log(locationTemp);
    let locationCond = data.current.condition.text;
    console.log(locationCond);
    let locationWind = data.current.wind_kph;
    console.log(locationWind);
    // let windDir=data.current.wind_dir;
    let lastUpdate=data.current.last_updated;

    tempField.innerText = `${locationTemp}°C`;
    locationField.innerText = locationName+' , '+locationCountry;
    // dateField.innerText=locationTime;
    let dateObj = new Date(locationTime);
    dateField.innerText = dateObj.toDateString();
    conditionText.innerText = locationCond;
    condImg.src = "https:" + data.current.condition.icon;
    windSpeedField.innerText = 'Wind Speed (Kph) : ' + locationWind;
    lastUpdateField.innerText='Last Updated : '+lastUpdate;
    // windDirField.innerText=windDir;

}

searchField.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        target = searchField.value;
        fetchResults(target);
    }
});

fetchResults(target);
