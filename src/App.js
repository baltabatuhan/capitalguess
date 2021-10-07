
import WorldMap from 'react-svg-worldmap';
import axios from "axios";
import {useEffect,useState} from "react";








function App() {
  
  
  const [point,setPoint]= useState(0)
  const [countries,setCountries] = useState([]);
  
  const handleClick1 = () => {
    // Counter state is incremented
    setCounter(Math.floor(Math.random() *countries.length))
  }



  useEffect(() =>{
      axios
      .get('https://restcountries.com/v3.1/all')
      .then(response=> setCountries(response.data.map(country=>({...countries,country:country.cca2, value:0,name:country.name.common,capital:country.capital}))))

      .catch(error => console.log({ error }));

      
  },[])
  const [counter, setCounter] = useState(0)
  
  const skip = () => {
    setCounter(Math.floor(Math.random() *countries.length))
    console.log(countries[counter].capital[0])
  }
  
  const [cap, setCap] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if(cap===`${countries[counter].capital[0]}`){
      alert('correct')
      setCounter(Math.floor(Math.random() *countries.length))
      setPoint(point + 10)
      countries[counter].value = countries[counter].value + 1 
      
    }
  }
  
 if (countries.length===0){
   return <div>loading...</div>
 }
  return (
      
    
    <div className="World Map">
      <h1>Point:{point}</h1>
      <WorldMap
        color="red"
        title="Capital Guess Game"
        value-suffix="people"
        size="lg"
        data={countries}
      />
        
     
      
       <div className="question-form">
      <div key={countries.name}>
      <h2>What is the capital of {countries[counter].name} ?</h2>
      
      <form onSubmit={handleSubmit}>
      <label>Capital:
        <input 
          type="text" 
          value={cap}
          onChange={(e) => setCap(e.target.value)}
        />
         <button onClick={skip}>Skip</button>
      </label>
      <input type="submit" />
    </form>
        
        
        
        
        
        
        
        
         
    </div>
        </div>
      </div>
    
  );
}

export default App;
