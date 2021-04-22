import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navbar from "./navbar";

import Streamlist from "./streams/streamlist";
import Streamcreate from "./streams/streamcreate";
import Streamedit from "./streams/streamedit";
import Streamdelete from "./streams/streamdelete";
import Streamshow from "./streams/streamshow";

const App = () => {
  return (
    <div className="custom-container">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Streamlist}></Route>
          <Route path="/streams/new" component={Streamcreate}></Route>
          <Route path="/streams/edit/:id" component={Streamedit}></Route>
          <Route path="/streams/delete/:id" component={Streamdelete}></Route>
          <Route path="/streams/:id" component={Streamshow}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
