import {BrowserRouter, Switch, Route} from "react-router-dom";
import Header from "../common/header/Header";
import UsersList from "./usersLists/UsersList";
import UserProfile from "./userProfile/UserProfile";

const Controller = () => {
    return (
        <BrowserRouter>
            <Header/>
            <Switch>
                <Route exact path="/" component={UsersList}/>
                <Route exact path="/home" component={UsersList}/>
                <Route exact path="/users/:id" component={UserProfile}/>
            </Switch>
        </BrowserRouter>
    );
};

export default Controller;
