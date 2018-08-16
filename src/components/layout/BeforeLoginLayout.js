import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';

/* import Components */
import { NavBeforeComponent } from './nav/NavComponents';
import { RegisterComponent, LoginComponent } from './contents/ContentsComponents';

const BeforeLoginLayout = () => (
  <div className="h100">
    <NavBeforeComponent />
    <BrowserRouter>
      <div>
          <Route exact path="/signup" component={RegisterComponent} />
          <Route exact path="/login" component={LoginComponent} />
      </div>
    </BrowserRouter>
  </div>
);

export default BeforeLoginLayout;
