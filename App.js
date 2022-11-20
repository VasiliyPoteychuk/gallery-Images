import citysList from './areas.json'
import './App.css';
import CityList from './cityList';

function App() {
  return (
  <CityList areas = {citysList}/>  
  )
}

export default App;
