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
import Admin from './cor/admin/Admin';
import ActivityPage from './cor/ActivityPage';
import Editcategory from './admin/editCategory';
import EditActivity from './admin/editAcivity';
import EditProfile from './user/editProfile';
import EditAdminProfile from './user/editAdminProfile'
import ProfileAdmin from './user/profile'

const Routes = () => {
    return (
        <BrowserRouter>
            <Nav />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/activity" exact component={Activity} />
                <PrivateRoute path="/profile/:userId" exact component={Profile} />
                <PrivateRoute path="/profile/edit/:userId" exact component={EditProfile} />
                <AdminRoute path="/activity" exact component={Activity} />
                <AdminRoute path="/activity/create" exact component={AddActivity} />
                <PrivateRoute path="/admin" exact component={Admin} />
                <AdminRoute path="/profile/:userId" exact component={ProfileAdmin} />
                <AdminRoute path="/profile/editByAdmin/:userId" exact component={EditAdminProfile} />
                <AdminRoute path="/activity/edit/category/:categoryId" exact component={Editcategory} />
                <Route path="/activity/:actId" exact component={ActivityPage} />
                <AdminRoute path="/activity/edit/:actId/:userId" exact component={EditActivity} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;