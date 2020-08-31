import React, { Fragment } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './nav.css';
import Button from '../buttons/buttons';
import { isAuthenticated, signout } from '../../auth';

const Nav = () => {

    const refreshPage = () => {
        window.location.reload();
    };

    return(
        <div className="fixed-nav navbar navbar-expand-lg nav-custom">
            <Link to="/" className="navbar-brand">/sci</Link>
            <button className="navbar-toggler custom-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"><i className="fas fa-bars"></i></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink exact to="/" className="nav-link" activeClassName="active">home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact to="/activity" className="nav-link" activeClassName="active">activity</NavLink>
                        </li>
                        {isAuthenticated() && isAuthenticated().user.role ===1 && (
                            <li className="nav-item">
                                <NavLink to="/admin" className="nav-link" activeClassName="active">admin</NavLink>
                            </li>
                        )}

                        {isAuthenticated() && (
                            <li className="nav-item">
                                <NavLink to="/profile" className="nav-link" activeClassName="active">{`${isAuthenticated().user.u_id}`}</NavLink>
                            </li>
                        )}
                    </ul>
                <ul className="navbar-nav mr-auto"></ul>
                <div className="form-inline my-2 my-lg-0">
                    <ul className="navbar-nav">
                        {!isAuthenticated() && (
                            <Fragment>
                                <NavLink to="/signin" activeClassName="btn-active">
                                    <li>
                                        <Button title="sign in" />
                                    </li> 
                                </NavLink>
                            </Fragment>
                        )}

                        {isAuthenticated() && (
                            <li>
                                <Link to="/" onClick={refreshPage}>
                                    <button onClick={() => signout()} className="btn">
                                        <span>signout</span>
                                    </button>
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Nav;