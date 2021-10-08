
import WorldMap from 'react-svg-worldmap';
import axios from "axios";
import {useEffect,useState} from "react";








function App() {
  
  
  const [point,setPoint]= useState(0)
  const [countries,setCountries] = useState([]);




  useEffect(() =>{
      axios
      .get('https://restcountries.com/v3.1/all')
      .then(response=> setCountries(response.data.map(country=>({...countries,country:country.cca2, value:0,name:country.name.common,capital:country.capital,population:country.population,flag:country.flag}))))
      
      .catch(error => console.log({ error }));

      
  },[])
  const [counter, setCounter] = useState(0)
  let newCountries = countries.filter(check => check.capital !== undefined)
 
  
 
 
  
  const [cap, setCap] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if(cap.toLowerCase()===`${(newCountries[counter].capital[0].toLowerCase()).normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`){

      
      alert('correct')
      setCounter(Math.floor(Math.random() *newCountries.length))
      setPoint(point + 10)
      newCountries[counter].value = newCountries[counter].value + 1 
      
    }
  
 
  }
  




 if (newCountries.length===0){
   return <div>loading...</div>
 }

 const skip = () => {
    
  setCounter(Math.floor(Math.random() *newCountries.length))
  console.log(newCountries[counter].name,newCountries[counter].capital,"check")
 
  
}

  return (
      
    
    <div className="World Map">
      <h1>Point:{point}</h1>
      <WorldMap
        color="green"
        value-suffix="people"
        size="lg"
        data={countries}
      />
        
     
      
       <div className="question-form">
       
      <div key={newCountries.name}>
      <h2>What is the capital of {newCountries[counter].name} ?</h2>
      
      
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
