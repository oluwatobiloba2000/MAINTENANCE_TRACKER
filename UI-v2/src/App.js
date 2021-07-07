import React from "react";
import "./App.less";
import {Switch, Route, BrowserRouter as Router} from "react-router-dom";

import home from "./views/home/home";
import NotFound from "./views/notfound_page/notfound";



class App extends React.Component {

  render(){
      return (
        <div className="App">
           <Router>
              <Switch>
                <Route  exact={true} path="/" component={home}/>
                <Route component={NotFound} />
              </Switch>
         </Router>
        </div>
      );
  };

};

export default App;