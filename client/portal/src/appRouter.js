import React from "react";
import { HashRouter, Route, Switch } from 'react-router-dom';
import App from "./App";
import Register from "./components/Register"
import PrivateRouter from "./../src/components/PrivateRouter";
import Company from "./components/Company";
import Appbar from "./components/Appbar"
import Cordinator from "./components/Cordinator";
import Stats from "./components/Stats";
import Student from "./components/Student";
class AppRouter extends React.Component {
    render() {
        return (
            <div>
                <HashRouter>
                    <div>
                        <Appbar></Appbar>
                        <Switch>
                            <Route path="/" component={App} exact={true} />
                            <Route path = "/register" component = {Register}/>
                            <PrivateRouter path = "/register-job" component = {Company}/>
                            <PrivateRouter path = "/stats" component = {Stats}/>
                           <PrivateRouter path = "/register-company" component = {Cordinator}/>
                           <PrivateRouter path = "/student" component = {Student}/>
                        </Switch>
                    </div>
                </HashRouter>
            </div>
        );
    }
};
export default AppRouter;