import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { signin, authenticate } from '../auth';
import './css/signin.css';

const Signin = () => {

    const [values, setValues] = useState({
        u_id: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferror: false,
    });

    const {u_id, password, error, redirectToReferror } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    };

    const showError = () => (
        <div className="err-text" style={{display: error ? "" : "none"}}>
            <i className="fas fa-exclamation-triangle"></i> {error}
        </div>
    );

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ u_id, password })
        .then(data => {
            if(data.error) {
                setValues({...values, error: data.error, loading: false})
            } else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        redirectToReferror: true
                    });
                });
            }
        });
    };

    const redirectUser = () => {
        if(redirectToReferror) {
            return <Redirect to="/" />;
        }
    };
    
    const signInForm = () => (
        <form className="custom-form">
            <div className="form-group">
                <label className="text-muted">Username</label>
                <input 
                    onChange={handleChange('u_id')}
                    type="text"
                    className="form-control si-ip-custom"
                    value={u_id}></input>
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input 
                    onChange={handleChange('password')}
                    type="password"
                    className="form-control si-ip-custom"
                    value={password}></input>
            </div>

            {showError()}

            <Link to="/" >
                <button className="submit-btn" onClick={clickSubmit}>
                    <span>submit</span>
                </button>
            </Link>
        </form>
    )
    return (
        <div className="signin-bg">
            <div>
                <div className="card-custom signin">
                    <h1>Sign in</h1>
                    <div>
                        {signInForm()}
                        {redirectUser()}
                    </div>
                </div>
                <div className="box-bg1">
                    <div className="bg-sci4">science</div>
                </div>
                <div className="box-bg2"></div>
                <div className="box-bg3">
                    <div className="bg-sci ">science</div>
                    <div className="bg-sci2">science</div>
                    <div className="bg-sci3">science</div>
                </div>
                <div className="box-bg4"></div>
                <div className="box-bg5"></div>
                <div className="box-bg6"></div>
                <div className="box-bg7"></div>
            </div>
        </div>
    )

}

export default Signin;