
import WorldMap from 'react-svg-worldmap';
import axios from "axios";
import {useEffect,useState} from "react";








function App() {
  
  

  const [countries,setCountries] = useState([]);
  
  const handleClick1 = () => {
    // Counter state is incremented
    setCounter(Math.floor(Math.random() *countries.length))
  }

  const handleClick2 = () => {
    // Counter state is incremented
    setCounter(counter - 1)
  }

  useEffect(() =>{
      axios
      .get('https://restcountries.com/v3.1/all')
      .then(response=> setCountries(response.data.map(country=>({...countries,country:country.cca2, value:0,name:country.name.common,capital:country.capital}))))

      .catch(error => console.log({ error }));

      
  },[])
  const [counter, setCounter] = useState(0)
  console.log(countries)
  
  
  const [cap, setCap] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('The name you entered was: ${cap}')
  }

 if (countries.length===0){
   return <div>loading...</div>
 }
  return (
      
    
    <div className="World Map">
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
      </label>
      <input type="submit" />
    </form>
        
        
        
        
        
        
        
        
         {/* <h2>What is the capital of {countries[counter].name} ?</h2> */}
        {/* <div className="buttons">
        <button style={{
          fontSize: '60%',
          position: 'relative',
          top: '20vh',
          marginRight: '5px',
          backgroundColor: 'green',
          borderRadius: '8%',
          color: 'white',
        }}
          onClick={handleClick1}>Get Country</button>
        <button style={{
          fontSize: '60%',
          position: 'relative',
          top: '20vh',
          marginLeft: '5px',
          backgroundColor: 'red',
          borderRadius: '8%',
          color: 'white',
        }}
          onClick={handleClick2}>Decrement</button>
      </div> */}
    </div>
        </div>
      </div>
    
  );
}

export default App;
