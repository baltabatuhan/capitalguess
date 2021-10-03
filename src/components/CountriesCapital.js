import axios from "axios";
import {useEffect,useState} from "react";
const CountriesCapital = ()=>{
    const [countries,setCountries] = useState([]);


    useEffect(() =>{
        axios.get('https://api.countrylayer.com/v2/')
        .then(response=>console.log('Axios then',response))
    },[])

    return{
        
    }
}

export default CountriesCapital;