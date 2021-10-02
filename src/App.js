import React from "react";
import ReactDOM from "react-dom";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

import "./styles.css";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const App = () => (
  <div>
    <h1>Capital Guess</h1>
    <ComposableMap>
      <Geographies geography={geoUrl} x="10" y="10" width="100" height="100" fill="orange" stroke="green" stroke-opacity="0.8" border-color="red" stroke-linecap="butt" >
        {({ geographies }) =>
          geographies.map(geo => <Geography key={geo.rsmKey} geography={geo} />)
        }
      </Geographies>
    </ComposableMap>
  </div>
);

export default App;
