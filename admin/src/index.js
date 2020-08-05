import ReactDOM from 'react-dom'
import React from 'react';
import { BrowserRouter as Router, Route,Switch} from "react-router-dom";
import Login from '../src/Pages/Login.js'
import Default from '../src/Pages/Default.js'


function App(){
    return (
        <Router>
            <Switch>      
               <Route path="/login"  exact  component={Login} />
               <Route path="/"  component={Default} />
            </Switch>
        </Router>
    )
}
ReactDOM.render(<App/>,document.getElementById('root'))



























