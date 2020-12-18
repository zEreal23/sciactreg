import React, { useState } from 'react';
import { signup ,isAuthenticated } from '../auth/index';

const Signup = () => {
    const [values, setValues] = useState({
        fname: "",
        lname: "",
        u_id: "",
        email: "",
        password: "",
        major: "",
        error: "",
        success: false
    });

    const {fname, lname, u_id, email, password, major, status, success, error} = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    };

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{display: success ? "" : "none"}}>
            New account is created. This user can Signin.
        </div>
    );
    const {user, token} = isAuthenticated();

    const clickSubmit = event => {
        event.preventDefault();
        signup(user._id, token,{ fname, lname, email, password, status, major, u_id })
        .then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    fname: "",
                    lname: "",
                    u_id: "",
                    email: "",
                    password: "",
                    major: "",
                    error: "",
                    success: true
                });
            }
        });
    };

    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">User ID</label>
                <input 
                    onChange={handleChange('u_id')} 
                    type="text" 
                    className="form-control si-ip-custom"
                    value={u_id}
                    ></input>
            </div>

            <div className="form-group">
                <label className="text-muted">First Name</label>
                <input 
                    onChange={handleChange('fname')} 
                    type="text" 
                    className="form-control si-ip-custom"
                    value={fname} 
                    ></input>
            </div>

            <div className="form-group">
                <label className="text-muted">Last Name</label>
                <input 
                    onChange={handleChange('lname')} 
                    type="text" 
                    className="form-control si-ip-custom"
                    value={lname} 
                    ></input>
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input 
                    onChange={handleChange('email')}
                    type="email" 
                    className="form-control si-ip-custom"
                    value={email} 
                    ></input>
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input 
                    onChange={handleChange('password')} 
                    type="password" 
                    className="form-control si-ip-custom"
                    value={password} 
                    ></input>
            </div>

            <div className="form-group">
                <label className="text-muted">Major</label>
                <select 
                    onChange={handleChange('major')} 
                    className="form-control si-ip-custom"
                    value={major} >
                        <option defaultValue="" value >Major</option>
                        <option defaultValue="Computer Science">Computer Science</option>
                        <option defaultValue="Food Science">Food Science</option>
                        <option defaultValue="Software Engineering">Software Engineering</option>
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Status</label>
                <select 
                    onChange={handleChange('status')} 
                    className="form-control si-ip-custom"
                    value={major} >
                        <option defaultValue="" value >Status</option>
                        <option defaultValue="Teacher">Teacher</option>
                        <option defaultValue="Student">Student</option>
                </select>
            </div>

            <button onClick={clickSubmit} className="btn btn-primary float-right">Add New User</button>
        </form>
    )
    return (
        <div>
            {showSuccess()}
            {showError()}
            {signUpForm()}
        </div>
    )
}

export default Signup;