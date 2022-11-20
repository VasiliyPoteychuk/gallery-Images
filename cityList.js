import { useState } from "react"
import WeatherInCity from "./weatherInCity";


export default function CityList(props){
  const [selected, setSelected] = useState([]);


  return(
    <div className="totalLIst">
      <ul>
        {props.areas.map(area =>
          <li
            key={area.id}
            onClick={()=> setSelected(area)}
          >
            {area.name}
          </li>
        )}
      </ul>
      {selected?.areas?.length && <CityList areas={selected.areas}/>}
      {selected?.areas?.length===0 && <WeatherInCity city={selected.name}/>}

    </div>
    
    
  )
}