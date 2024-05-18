// 865aa9b27a0c620d8c458b881eeb3425
console.log('hello world');
const apiKey = '113f4e0e1aa399ec7fa92159348d450c'

// let activeCityRef = document.getElementById("activeCity") 

// temp lat and long 
// let lat = 28.5783
// let lon = 81.8867
let city = 'mascotte'


function getLocation(city) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`)
    .then(function (response){
        return response.json();
    })
    .then(function (data){
        // console.log(data)
        getWeather(data);
    } )
}

function getWeather(geodata) {
    console.log(geodata)
    console.log(geodata[0].lat)
    let lat = geodata[0].lat
    let lon = geodata[0].lon

    fetch(`http://api.openweathermap.org/data/2.5/forecast/?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    .then(function (response){
        return response.json();
    })
    .then(function (data){
        console.log(data)
        activeCity(data)
        fivedayforcast(data)

    } )
}
function activeCity(city){ 
    console.log(city)
    //K to F converter
    let tempInF = ((Number(city.list[0].main.temp) - 273.15) * 9/5 + 32).toFixed(0)
    
    const cityObject =
    $(`<div class="fw-bold p-2"> ${city.city.name} ${city.list[0].dt}</div>
        <div class="fw-bold p-2">temp: ${tempInF}° K</div>
        <div class="fw-bold p-2">Wind: ${city.list[0].wind.speed}MPH</div>
        <div class="fw-bold p-2">Humidity: ${city.list[0].main.humidity}%</div>
        `)
$('#activeCity').append(cityObject)
return
}

function fivedayforcast (daysObject){
    console.log(`daysObject`)

}


// update this to userinput
getLocation(city)
