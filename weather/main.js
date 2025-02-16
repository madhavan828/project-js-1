
let apiKey='7c544caa9185758ed22855680929a3d0'
let api =`https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=${apiKey}`
let input = document.querySelector('.input')
let search =document.querySelector('.js-search-btn')
let weatherIcon =document.querySelector('.weather-img')
let  name= document.querySelector('.js-city')
let lat = document.querySelector('.lat-count')
let lon = document.querySelector('.lon-count')
let wind = document.querySelector('.wind')
let country = document.querySelector('.js-country')
let humidity = document.querySelector('.humidity')
let celsius = document.querySelector('.cel')
let errors = document.querySelector('.error')
let container = document.querySelector('.container')

container.style.display="none"

async function checkWeather() {
  let cityName = input.value
if(cityName){
  
  const url=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
  try{
    container.style.display="block"
    errors.innerHTML=''

    const response =await fetch(url)
    const data =await response.json()
if(data.cod !== 200){
  container.style.display="none"
  throw new Error(data.message)
}

lat.innerHTML=data.coord.lat
lon.innerHTML=data.coord.lon
name.innerHTML=data.name
wind.innerHTML=`${data.wind.speed}Km/h `
humidity.innerHTML=`${data.main.humidity} % `
let c = data.main.temp - 273.15;
celsius.innerHTML = `${c.toFixed(2)} °C`;
country.innerHTML=data.sys.country


if(data.weather[0].main== "Clouds"){
  weatherIcon.src = "image/clouds.png"
}
else if(data.weather[0].main== "Drizzle"){
  weatherIcon.src = "image/drizzle.png"
}
else if(data.weather[0].main== "Clear"){
  weatherIcon.src = "image/clear.png"
}
else if(data.weather[0].main== "Rain"){
  weatherIcon.src = "image/rain.png"
}
else if(data.weather[0].main== "Mist"){
  weatherIcon.src = "image/mist.png"
}
else if(data.weather[0].main== "Snow"){
  weatherIcon.src = "image/snow.png"

}
  input.value=""
  }catch(error){
console.log(error)
    errors.innerHTML=`Error: ${error.message}`
  }
}else{
  errors.innerHTML="pleaes enter your city"
}

}

search.addEventListener('click',checkWeather)
