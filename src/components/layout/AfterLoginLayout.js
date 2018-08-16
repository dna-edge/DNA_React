import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';

/* import Components */
import { NavAfterComponent } from './nav/NavComponents';
import { MainComponent } from './contents/ContentsComponents';;

const AfterLoginLayout = () => (
  <div className="h100">
    <NavAfterComponent />
    <BrowserRouter>
      <div>
          <Route exact path="/" component={MainComponent} />
      </div>
    </BrowserRouter>
  </div>
);

export default AfterLoginLayout;
