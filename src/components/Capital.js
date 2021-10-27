import WorldMap from "react-svg-worldmap";
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import "../styles.css";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import { MDBIcon } from "mdb-react-ui-kit";

function Capital() {
  const [point, setPoint] = useState(0);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) =>
        setCountries(
          response.data.map((country) => ({
            ...countries,
            country: country.cca2,
            value: 0,
            name: country.name.common,
            capital: country.capital,
            population: country.population,
            flag: country.flag,
            independent: country.independent,
          }))
        )
      )

      .catch((error) => console.log({ error }));
  }, []);
  const [counter, setCounter] = useState(0);
  let newCountries = countries.filter(
    (check) =>
      check.capital !== undefined &&
      check.value === 0 &&
      check.independent === true
  );

  const getHref = ({ countryName }) => {
    return {
      href: `https://en.wikipedia.org/wiki/${countryName.replace(
        /\s/g,
        "%20"
      )}`,
      target: "_blank",
    };
  };

  const stylingFunction = ({
    countryValue,

    minValue,
    maxValue,
    color,
  }) => {
    const opacityLevel = countryValue
      ? 0.1 + (1.5 * (countryValue - minValue)) / (maxValue - minValue)
      : 0;
    return {
      fill: color,
      fillOpacity: opacityLevel,
      stroke: "#D6AD60",
      strokeWidth: 1,
      strokeOpacity: 0.2,
      cursor: "pointer",
    };
  };

  const [cap, setCap] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      cap.toLowerCase() ===
      `${newCountries[counter].capital[0]
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")}`
    ) {
      setCounter(Math.floor(Math.random() * newCountries.length));
      setPoint(point + 10);
      newCountries[counter].value = newCountries[counter].value + 1;

      setCap("");
    }
  };

  if (newCountries.length === 0) {
    return <div>loading...</div>;
  }

  const skip = () => {
    setCounter(Math.floor(Math.random() * newCountries.length));
  };

  return (
    <div className="height-100" style={{ backgroundColor: "#223241" }}>
      <div className="capitalContent" style={{}}>
        <div className="WorldMap">
          <TransformWrapper
            defaultScale={1}
            defaultPositionX={200}
            defaultPositionY={100}
          >
            {({
              zoomIn,
              zoomOut,
              resetTransform,
              positionX,
              positionY,
              ...rest
            }) => (
              <div>
                <TransformComponent>
                  <WorldMap
                    backgroundColor="#223241"
                    color="#D6AD60"
                    styleFunction={stylingFunction}
                    size="responsive"
                    data={countries}
                    hrefFunction={getHref}
                  />
                </TransformComponent>
                <div className="tools">
                  <button onClick={() => zoomIn()}>
                    <MDBIcon icon="search-plus" />
                  </button>
                  <button onClick={() => zoomOut()}>
                    <MDBIcon icon="search-minus" />
                  </button>
                  <button onClick={() => resetTransform()}>
                    <MDBIcon icon="arrows-alt" />
                  </button>
                </div>
              </div>
            )}
          </TransformWrapper>
        </div>

        <div className="capital-question-form">
          <h1
            className="capital-point"
            style={{ color: "#D6AD60", fontSize: "30px" }}
          >
            Point: {point}
          </h1>
          <h1 style={{ color: "#D6AD60", fontSize: "30px" }}>
            What is the capital of {newCountries[counter].name}?
          </h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={cap}
              onChange={(e) => setCap(e.target.value)}
              style={{ backgroundColor: "#D6AD60", color: "#223241" }}
            />
            <div className="capital-button">
              <button type="submit" style={{ backgroundColor: "#D6AD60" }}>
                Submit
              </button>
              <button
                onClick={skip}
                style={{ backgroundColor: "#D6AD60", color: "#223241" }}
              >
                Skip
              </button>
            </div>
          </form>
          <div className="information">
            <MDBIcon icon="info" size="xs">
              {" "}
              Click on the countries for get information
            </MDBIcon>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Capital;
