
import WorldMap from 'react-svg-worldmap';
import serializer from "./components/Countries";
// import CountriesCapital from './components/CountriesCapital';
import axios from "axios";
import {useEffect,useState} from "react";








function App() {
  

  const [countries,setCountries] = useState([]);


  useEffect(() =>{
      axios
      .get('https://restcountries.com/v3.1/all')
      .then(response=>setCountries(response.data))
      
  },[])
  const tata = serializer();
 
  return (

    
    <div className="App">
      <WorldMap
        color="red"
        title="Capital Guess Game"
        value-suffix="people"
        size="lg"
        data={tata}
      />
    {/* <CountriesCapital/> */}
    
      
    </div>
  );
}

export default App;
