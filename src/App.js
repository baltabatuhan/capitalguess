
import WorldMap from 'react-svg-worldmap';
import axios from "axios";
import {useEffect,useState} from "react";
import "./styles.css";
import { Layout, Col,Menu } from 'antd';


const { Header, Footer, Content } = Layout;





function App() {
  
  
  const [point,setPoint]= useState(0)
  const [countries,setCountries] = useState([]);




  useEffect(() =>{
      axios
      .get('https://restcountries.com/v3.1/all')
      .then(response=> setCountries(response.data.map(country=>({...countries,country:country.cca2, value:0,name:country.name.common,capital:country.capital,population:country.population,flag:country.flag,independent:country.independent}))))
      
      .catch(error => console.log({ error }));

      
  },[])
  const [counter, setCounter] = useState(0)
  let newCountries = countries.filter(check => check.capital !== undefined && check.value===0 && check.independent === true )
 

  
 
 
  
  const [cap, setCap] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if(cap.toLowerCase()===`${(newCountries[counter].capital[0].toLowerCase()).normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`){

      
      
      setCounter(Math.floor(Math.random() *newCountries.length))
      setPoint(point + 10)
      newCountries[counter].value = newCountries[counter].value + 1 
      console.log(newCountries)
      setCap("")
      
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

  <Layout className="height-100">
      <Header className="header">
        
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1">Capital</Menu.Item>
          <Menu.Item key="2">Flag</Menu.Item>
          
        </Menu>
      </Header>
      <Content style={{ display:"flex", justifyContent:"center",backgroundColor:"white"}}>   
   
    <div className="WorldMap">
      <h1>Point:{point}</h1>
      <WorldMap
        color="green"
        value-suffix="people"
        size={1100}
        data={countries}
        
      />
      </div>
    
    <div className="question-form">
      
      <h1>What is the capital of {newCountries[counter].name} ?</h1>
      
      
      <form onSubmit={handleSubmit}>
      <label>
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
    </Content>
    <Footer style={{ textAlign: "center" }}>Created by Batuhan Balta</Footer>
  </Layout>
  );
}

export default App;
