import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Index } from "./pages/index";
import { Doc } from "./pages/doc/";
import { BuildingsProvider } from "./providers/buildings";
import { Header } from "./components/Header";

function App() {
  return (
    <div className="App">
      <BuildingsProvider>
        <Router>
          <Header />
          <Route exact path="/" component={Index} />
          <Route path="/doc" component={Doc} />
        </Router>
      </BuildingsProvider>
    </div>
  );
}

export default App;
