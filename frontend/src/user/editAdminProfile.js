import React, { useState, useEffect } from 'react'
import { isAuthenticated } from '../auth'
import { Link, Redirect } from 'react-router-dom'
import { read, update, updateUser } from './apiUser'

const EditAdminProfile = ({ match }) => {
    const [values, setValues] = useState({
        fname: '',
        lname: '',
        password: '',
        error: false,
        success: false
    })

    const {token } = isAuthenticated();
    const { fname, lname, password, error, success } = values

    const init = (userId) => {
        //console.log(userId)
        read(userId, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: true });
            } else {
                setValues({ ...values, 
                     fname: data.fname,
                     lname: data.lname 
                });
            }
        });
    }

    useEffect(() => {
        init(match.params.userId);
    }, [])

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const clickSubmit = e => {
        e.preventDefault();
        update(match.params.userId, token, { fname, lname, password }).then(data => {
            if (data.error) {
                console.log(data.error);  
            } else {
                updateUser(data, () => {
                    setValues({
                        ...values,
                        fname: data.fname,
                        lname: data.lname,
                        success: true
                    });
                });
            }
        });
    };

    const redirectUser = success => {
        if (success) {
            return <Redirect to="/admin" />;
        }
    };

    const profileUpdate = (fname, lname, password) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" onChange={handleChange('fname')} className="form-control" value={fname} />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" onChange={handleChange('lname')} className="form-control" value={lname} />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" onChange={handleChange('password')} className="form-control" value={password} />
            </div>

            <button onClick={clickSubmit} className="btn btn-primary">
                Submit
            </button>
        </form>
    );

    return (
        <div className="profile-page container">
            <div className="card profile-card-custom">
                Update Profile
                {profileUpdate(fname, lname, password)}
                {redirectUser(success)}
            </div>
        </div>
    )
}

export default EditAdminProfile;
