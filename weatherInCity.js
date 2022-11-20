import { useEffect, useState } from "react"


export default function WeatherInCity(props){
  const [cityWeather, setCityWeather] = useState(false);
  

  useEffect(()=>{
    async function getCityWeather(props){
      console.log(props.city);
      const responce = await fetch(`http://api.weatherapi.com/v1/current.json?key=bfcfaf0d5c5142d3aa3170700221411&q=${props.city}&aqi=no`);
      const json = await responce.json();
      setCityWeather(json)
    }
    getCityWeather(props)
  },[props])


  return(
    <>
      {cityWeather && 
        <div className="cityWeatherInfo">
          <h2>{cityWeather.location.name}</h2>
          <p>температура: {cityWeather.current.temp_c} <sup>0</sup>C </p>
          <p>скорость ветра: {cityWeather.current.wind_kph} км/ч</p>
          {/* <p>направление ветра: {poles}</p> */}
          <p>влажность воздуха: {cityWeather.current.humidity}%</p>
        </div>
        
        
      }
    </>
    
    
  )

}