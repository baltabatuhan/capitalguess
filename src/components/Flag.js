import axios from "axios";
import { useEffect, useState } from "react";
import "../styles.css";
import { Layout } from "antd";
import "../styles.css";

const { Content } = Layout;

const Flag = () => {
  const [point, setPoint] = useState(0);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) =>
        setCountries(
          response.data.map((country) => ({
            country: country.cca2,
            value: 0,
            name: country.name.common,
            capital: country.capital,
            population: country.population,
            flag: country.flags.png,
            independent: country.independent,
          }))
        )
      ).catch((error) => console.log({ error }));
  }, []);

  const [counter, setCounter] = useState(0);
  let newCountries = countries.filter(
    (check) =>
      check.capital !== undefined &&
      // check.value === 0 &&
      check.independent === true
  );

  const [cap, setCap] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      cap.toLowerCase() ===
      `${newCountries[counter].name
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
    <Layout className="height-100" style={{ backgroundColor: "#223241" }}>
      <Content style={{ backgroundColor: "#223241" }}>
        <div className="flagGame">
          <div className="point">
            <h1 style={{ color: "#D6AD60" }}>Point:{point}</h1>
          </div>
          <img
            className="countryFlag"
            src={newCountries[counter].flag}
            alt="image"

          />

          <div className="form">
            <h1 style={{ color: "#D6AD60" }}>Guess the country name ?</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={cap}
                onChange={(e) => setCap(e.target.value)}
                style={{ backgroundColor: "#D6AD60", color: "#223241" }}
              />
              <button type="submit" style={{ backgroundColor: "#D6AD60" }}>Submit</button>
              <button
                onClick={skip}
                style={{ backgroundColor: "#D6AD60", color: "#223241" }}
              >
                Skip
              </button>
            </form>
          </div>
          <div className="countriesSpan" style={{ fontWeight: "bold", width: "70%", marginLeft: "15%", marginTop: "3%" }}>
            {newCountries
              .map((name) => {

                return <span
                  className="flex-sm-nowrap"
                  key={name.name}
                  style={{
                    margin: "3px",
                    padding: "3px",
                    color: name.value === 1 ? "#223241" : "#D6AD60",
                    backgroundColor: name.value === 1 ? "#D6AD60" : "#223241",


                  }}
                >
                  {name.name}
                </span>
              }
              ).reduce((prev, curr) => [prev, "  ", curr])}

          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Flag;
