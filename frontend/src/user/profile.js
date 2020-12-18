import React, { useState, useEffect } from 'react'
import { isAuthenticated } from '../auth'
import { Link, Redirect } from 'react-router-dom'
import { read, update, updateUser } from './apiUser'

const Profile = ({ match }) => {
    const [values, setValues] = useState({
        fname: '',
        lname: '',
        u_id: '',
        major: '',
        error: false,
        success: false
    })

    const { token } = isAuthenticated();
    const { fname, lname, u_id, major } = values

    const init = (userId) => {
        console.log(userId)
        read(userId, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: true });
            } else {
                setValues({
                    ...values,
                    fname: data.fname,
                    lname: data.lname,
                    u_id: data.u_id,
                    major: data.major,
                });
            }
        });
    }

    useEffect(() => {
        init(match.params.userId);
    }, [])


    const profile = (fname, lname, u_id, major) => (
        <div className="profile-page container">
            <div className="card profile-card-custom">
                <div className="head-card"></div>
                <div className="row name">
                    <h1 className="col">{fname}</h1>
                    <h1 className="col">{lname}</h1>
                </div>
                <div className="profile-datail">
                    <div className="row">
                        <h1 className="col">{u_id}</h1>
                        <h1 className="col">{major}</h1>
                    </div>
                </div>
                <div className="edit-profile">
                    <Link to={`/profile/editByAdmin/${match.params.userId}`}>Edit Profile</Link>
                </div>
            </div>
        </div>
    );

    return (
        <div className="profile-page container">
            <div className="card profile-card-custom">
                Update Profile
                {profile(fname, lname, u_id, major)}

            </div>
        </div>
    )
}

export default Profile;
