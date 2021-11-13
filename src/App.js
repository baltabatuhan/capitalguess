import { Layout } from "antd";
import { Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Capital from "./components/Capital";
import Flag from "./components/Flag";
import Country from "./components/Country";

function App() {
  return (
    <Layout className="height-100">
      <Header />
      <Switch>
        <Route exact path="/" component={Capital} />
        <Route exact path="/flagGame" component={Flag} />
        <Route exact path="/countryGame" component={Country} />
      </Switch>
      <Footer />
    </Layout>
  );
}

export default App;
