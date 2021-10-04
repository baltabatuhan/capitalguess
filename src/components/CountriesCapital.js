import axios from "axios";
import {useEffect,useState} from "react";


export default function CountriesCapital(){
    const [countries,setCountries] = useState([]);


    useEffect(() =>{
        axios
        .get('https://restcountries.com/v3.1/all')
        .then(response=>setCountries(response.data))
        
    },[])
    
    return(
        <div key="zaza">
          {countries.map(country=>{
              return(
                  <h1>{country.name.common}:{country.capital}</h1>
              )
          })}  
        </div>
    )
}
