// 865aa9b27a0c620d8c458b881eeb3425
console.log('hello world');
const apiKey = '113f4e0e1aa399ec7fa92159348d450c'

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
        testWeather(data);
    } )
}

function testWeather(geodata) {
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
        
    } )
}

// update this to userinput
getLocation(city)
