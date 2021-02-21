import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { readAct, getUser, getActivities, enroll, unroll } from './apiCors';
import { isAuthenticated } from '../auth/index';
import { Link, Redirect } from 'react-router-dom';

import Loading from "../components/Loading";


import './ActivityPage.css'


const ActivityPage = props => {

    const [enrolled, setEnrolled] = useState(false)
    const [loading, setLoading] = useState(false)
    const [enrolluser, setEnrolluser] = useState(0)

    const [activity, setActivity] = useState([])
    const [name, setFname] = useState([])
    const [redirectToLogin, setRedirecttologin] = useState(false)
    const [error, setError] = useState(false)

    const checkEnroll = (enrolluser) => {
        const userId = isAuthenticated().user._id;
        let match = enrolluser.filter(value => value._id == userId).length > 0;
        return match;
    }

    const getAct = (actId) =>{
        return new Promise( async (resolve, reject) => {
            readAct(actId).then(data => {
                if (data.error){ 
                    return reject(data.error)
                }

                return resolve(data)
            });
        })
        
    }

    const fetchActivityById  = async (actId) => {
        try {
            const data = await getAct(actId)
            setActivity(data)
            setEnrolluser(data.enrolluser.length)
            setEnrolled(checkEnroll(data.enrolluser))
            setFname(data.enrolluser)
        } catch (error) {
            setError(error)
        }
    }

    const onInitActivity = async (actId) => {
        setLoading(true)
        await fetchActivityById(actId);
        setLoading(false)
    }

    useEffect(() => {
        const actId = props.match.params.actId;
        onInitActivity(actId)
    }, [])

    const EnrollToggle = () => {
        setLoading(true)
        if (!isAuthenticated()) {
            setRedirecttologin(true)
            return false
        }
        const callApi = enrolled ? unroll : enroll
        const userId = isAuthenticated().user._id;
        const actId = props.match.params.actId;
        const token = isAuthenticated().token;
        callApi(userId, token, actId).then(async (data) => {
            if (data.error) {
                console.log(data.error)
                setLoading(false)
            } else {
                await fetchActivityById(actId)
                setLoading(false)
            }
        })
    }

    const redirectLogin = () => {
        if (redirectToLogin) {
            if (!error) {
                return <Redirect to="/signin" />
            }
        }
    }

    return (
        <div className="container">
            <Loading loading={loading} />
            <div className="card sing-page-act">
                <div className="card-head">
                    <div className="badge badge-pill badge-black">{activity.category}</div>
                    <h5 className="act-name card-title text-center act-page-name">{activity.name}</h5>
                </div>
                <p className="act-date col text-center act-date-sing">
                    {moment(activity.date).format("DD MMMM, YYYY")}
                </p>
                <div className="cardbody text-center act-detail">
                    <h6 className="card-text act-detail">{activity.description}</h6>
                    <div className="row mb-3 card-time">
                        <div className="col-6">
                            <p className="card-text">Time :</p>
                        </div>
                        <div className="col-6">
                            <p className="card-text">{activity.time}</p>
                        </div>
                    </div>
                    <div>
                        <p>Participants</p>
                    </div>

                    <div className="btn btn-enroll" onClick={EnrollToggle}>
                        <p>
                            {enrolled ? "Cancle" : "Enter"}
                        </p>
                    </div>

                    <h3>Total {enrolluser} Enroll</h3>
                    {name.map((person, i) => (
                        <div key={i}>
                            <p>{person.fname} {person.lname}</p>
                        </div>
                    ))}

                </div>
            </div>
            {redirectLogin()}
        </div>
    )
}

export default ActivityPage;