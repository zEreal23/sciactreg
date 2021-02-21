import './css/userProfile.css'
import React, { useState, useEffect } from 'react'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
import { read } from './apiUser'

const Profile = ({ match }) => {
    const [values, setValues] = useState({
        id: '',
        fname: '',
        lname: '',
        u_id: '',
        major: '',
        error: false,
        success: false
    })
    const [act, setAct] = useState([])

    const { token } = isAuthenticated();
    const {id, fname, lname, u_id, major } = values

    const init = (userId) => {
        read(userId, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: true });
            } else {
                setValues({
                    ...values,
                    id: data._id,
                    fname: data.fname,
                    lname: data.lname,
                    u_id: data.u_id,
                    major: data.major,
                });
               setAct(data.enrolling)
            }
        });
    }

    useEffect(() => {
        init(match.params.userId);
    }, [])

    const profile = (id ,fname, lname, u_id, major ) => (
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

                <div className="profile-datail">
                    กิจกรรมที่ลงทะเบียน
                    <div className="row">
                        <h1 className="col">{act}</h1>
                    </div>
                </div>

                <div className="edit-profile">
                    <Link to={`/profile/edit/${id}`}>Edit Profile</Link>
                </div>
            </div>
        </div>
    )
    console.log("กิจกรรม",act)

    return (
        <div>
            {profile(id ,fname, lname, u_id, major)}
        </div>
    )
}

export default Profile