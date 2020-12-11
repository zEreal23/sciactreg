import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import './css/userProfile.css'
import Button from '../components/buttons/buttons';

const Profile = () => {

    const { user: { _id, fname, lname, u_id, major} } = isAuthenticated(); 

    return (
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
                    <Link to={`/profile/edit/${_id}`}>Edit Profile</Link>
                </div>
            </div>
        </div>
    )
}

export default Profile