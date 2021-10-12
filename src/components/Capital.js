import WorldMap from "react-svg-worldmap";
import axios from "axios";
import { useEffect, useState } from "react";
import "../styles.css";
import { Layout } from "antd";
import { MDBIcon } from "mdb-react-ui-kit";

const { Content } = Layout;

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
      console.log(newCountries);
      setCap("");
    }
  };

  if (newCountries.length === 0) {
    return <div>loading...</div>;
  }

  const skip = () => {
    setCounter(Math.floor(Math.random() * newCountries.length));
    console.log(
      newCountries[counter].name,
      newCountries[counter].capital,
      "check"
    );
  };

  return (
    <Layout className="height-100" style={{ backgroundColor: "#223241" }}>
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#223241",
        }}
      >
        <div className="WorldMap">
          <WorldMap
            backgroundColor="#223241"
            color="#D6AD60"
            styleFunction={stylingFunction}
            size={1100}
            data={countries}
            hrefFunction={getHref}
          />
        </div>

        <div className="capital-question-form">
          <h1 style={{ color: "#D6AD60", marginLeft: "18%" }}>
            Point:{point}
          </h1>
          <h1 style={{ color: "#D6AD60", fontSize: "28px" }}>
            What is the capital of {newCountries[counter].name} ?
          </h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={cap}
              onChange={(e) => setCap(e.target.value)}
              style={{ backgroundColor: "#D6AD60", color: "#223241" }}
            />
            <button type="submit" style={{ backgroundColor: "#D6AD60" }}>
              Submit
            </button>
            <button
              onClick={skip}
              style={{ backgroundColor: "#D6AD60", color: "#223241" }}
            >
              Skip
            </button>
          </form>
          <div className="information">
            <MDBIcon icon="info" size="xs" style={{ paddingLeft: "8%" }}>
              {" "}
              Click on the countries for get information
            </MDBIcon>
          </div>
        </div>
      </Content>
    </Layout>
  );
}

export default Capital;
