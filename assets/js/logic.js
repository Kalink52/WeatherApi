// 865aa9b27a0c620d8c458b881eeb3425
// console.log('hello world');
const apiKey = '113f4e0e1aa399ec7fa92159348d450c'
let citiesStorage = JSON.parse(localStorage.getItem("cities"));
const userCity = document.querySelector('#city-btn');

if (citiesStorage == null) {
    citiesStorage = []
}
// let activeCityRef = document.getElementById("activeCity") 

// temp variables for testing lat and long 
// let lat = 28.5783
// let lon = 81.8867
// let city = 'clermont'


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
    // console.log(geodata)
    // console.log(geodata[0].lat)
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
    // console.log(city)
    //K to F converter
    $('#activeCity').html("");
    let tempInF = ((Number(city.list[0].main.temp) - 273.15) * 9/5 + 32).toFixed(0)
    let date = city.list[0].dt_txt

    const cityObject =
    $(`<div class="fw-bold p-2"> ${city.city.name} ${city.list[0].dt_txt}</div>
        <div class="fw-bold p-2">temp: ${tempInF}° F</div>
        <div class="fw-bold p-2">Wind: ${city.list[0].wind.speed}MPH</div>
        <div class="fw-bold p-2">Humidity: ${city.list[0].main.humidity}%</div>
        `)
    $('#activeCity').append(cityObject)
    return
}

function fivedayforcast (city){
    $('#forecast').html("");


    // console.log(city) // won't work how it looked like it should but it game me an idea that this was being called


    for (let i=4; i<40; i=i+8){
        // console.log(city.list[i].weather[0].main)
        //convert temp to F
    let tempInF = ((Number(city.list[i].main.temp) - 273.15) * 9/5 + 32).toFixed(0)
    
    let wEmoji = '☀️'
    switch(city.list[i].weather[0].main) {
        case 'Rain':
            wEmoji = '🌧️'
             break;
        case 'Clouds':
            wEmoji = '☁️'
            break;
        default:
            wEmoji = '☀️'
          // code block
      } 
    const cityCard =
    $(` <div class="col-2 card bg-primary text-white">
            <div class="card-body p-0">
            <h5 class="card-title"> ${city.list[i].dt_txt}</h5>
            <p>${wEmoji} </p>
            <p class="card-text">
                Temp: ${tempInF}°K <br> 
                Wind: ${city.list[i].wind.speed}MPH <br> 
                Humidity: ${city.list[i].main.humidity}%
            </p>
            </div>  
        </div>
        `)

    $('#forecast').append(cityCard)
    } // end of for loop
}


function setHistory(){ 
    console.log(userCity.value)
    if (userCity.value == null){
        console.log(true)
        return
    }else {
        console.log(false)
    }
    $('#formHistory').html("");
    // console.log('here')
    // console.log(citiesStorage)

    for (let i = 0; i < citiesStorage.length; i++) {
        // console.log('mlkm')

        const cityHistory =
    $(` <button type="button" class="btn bg-dark-subtle col-12 mt-1" 
    onclick="historyButton(event)">${citiesStorage[i]}</button>`)
    
    $('#formHistory').append(cityHistory)
}
    while (citiesStorage.length > 5){
        citiesStorage.splice(0,1)
        // console.log('remove')

    }

    // console.log(userCity.value)
    citiesStorage.push(userCity.value)
    localStorage.setItem("cities", JSON.stringify(citiesStorage));
    getLocation(userCity.value)
}
function historyButton(event){
    console.log(event.target.outerText)
    getLocation(event.target.outerText)
    
 }
// update this to userinput
// getLocation(city)


