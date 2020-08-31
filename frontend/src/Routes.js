import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AdminRoute from './auth/AdminRoute';
import Nav from './components/menu/nav';
import Home from './cor/home';
import Signin from './user/signin';
import PrivateRoute from './auth/PrivateRoute';
import Profile from './user/userProfile';
import Activity from './cor/activity';
import AddActivity from './admin/addActivity';

const Routes = () => {
    return (
        <BrowserRouter>
            <Nav />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/activity" exact component={Activity} />
                <PrivateRoute path="/profile" exact component={Profile} />
                <AdminRoute path="/activity" exact component={Activity} />
                <AdminRoute path="/activity/create" exact component={AddActivity} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;