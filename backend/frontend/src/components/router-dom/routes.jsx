import React from 'react'
import {Route, Switch} from "react-router-dom";
import Login from "../pages/sign-in";
import Register from "../pages/sign-up";
import LandingPage from "../pages/home";
import EditTime from "../pages/edit-time";
import UserDashboard from "../pages/dashboard";
import UserProfile from "../pages/profile"
import PrivateRoute from "./PrivateRoute";
import ChangePassword from "../pages/change-password";
import PersonalInfo from "../pages/personal-info";

function RouterSwitch(){
    return(
        <Switch>
            <Route path="/sign-in">
                <Login/>
            </Route>
            <Route path="/sign-up">
                <Register/>
            </Route>
            <Route path="/" exact>
                <LandingPage/>
            </Route>
            <PrivateRoute path="/edit-time"  exact component={EditTime}/>
            <PrivateRoute path="/personal-info"  exact component={PersonalInfo}/>
            <Route path="/change-pw"  exact>
                 <ChangePassword/>
            </Route>
            <PrivateRoute path="/dashboard" exact component={UserDashboard}/>
            <PrivateRoute exact path="/user-profile" component={UserProfile} />

        </Switch>
    )
}

export default RouterSwitch;