import React from "react";
import WorldMap from 'react-svg-worldmap';
import serializer from "./components/Countries";
import CountriesCapital from "./components/CountriesCapital"

console.log(CountriesCapital());


// console.log(serializer())
function App() {
  const data = serializer();

  return (
    <div className="App">
      <WorldMap
        color="red"
        title="Capital Guess Game"
        value-suffix="people"
        size="lg"
        data={data}
      />
    </div>
  );
}

export default App;
