import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { read, getUser, getActivities , enroll , unroll} from './apiCors';
import { isAuthenticated } from '../auth/index';
import { Link, Redirect } from 'react-router-dom';
import './ActivityPage.css'

const ActivityPage = props => {
    const [activity, setActivity] = useState([])
    const [enrolled , setEnrolled] = useState(false)
    const [enrolluser , setEnrolluser] = useState(0)
    const [redirectToLogin, setRedirecttologin] = useState(false)
    const [error, setError] = useState(false)

    const checkEnroll = (enrolled) =>{
        const userId = isAuthenticated() && isAuthenticated().user._id;
        let match = enrolled.indexOf(userId) !== -1;
        return match;
    }

    const loadSignleActivity = actId => {
        read(actId).then(data => {
            if(data.error) {
                setError(data.error);
            } else {
                setActivity(data);
                setEnrolluser(data.enrolluser.length)
                setEnrolled(checkEnroll(data.enrolluser))
            }
        });
    };

    const EnrollToggle = () =>{
        if(!isAuthenticated()){
            setRedirecttologin(true)
            return false
        }
        let callApi = enrolled ? unroll : enroll
        const userId = isAuthenticated().user._id;
        const actId = props.match.params.actId;
        const token = isAuthenticated().token;
        callApi(userId, token ,actId ).then(data=>{
            if(data.error){
                console.log(data.error)
            } else {
                setEnrolled(!enrolled)
                setEnrolluser(data.enrolluser.length)
            }
        })
    }

    useEffect(() => {
        const actId = props.match.params.actId;
        loadSignleActivity(actId);
        //loadUser();
    }, [props])

    const redirectLogin = () => {
        if(redirectToLogin) {
            if(!error){
                return <Redirect to="/signin"/>
            }
        }
    }


    return (
        <div className="container">
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
                    {enrolled ? 
                    (<div className="btn btn-enroll" onClick={EnrollToggle}>
                        Cancle Activity
                    </div>):(
                        <div className="btn btn-enroll" onClick={EnrollToggle}>
                        Enter Activity
                    </div>
                    )}
                    
                    <h3>Total {enrolluser} Enroll</h3>
                    
                </div>
            </div>
            {redirectLogin()}
        </div>
    )
}

export default ActivityPage;

//title={activity.name} description={moment(activity.date).format("DD MMMM, YYYY")}

/**
 * <div>
            <div className="container">
                <div className="card">
                    <div className="row">
                        <div className="col-3">
                            <div className="card-body m-5">
                                <h4>{activity.name}</h4>
                            </div>
                        </div>
                        <div className="col-9">
                            <div className="card-body">
                                <div className="row my-2">
                                    <div className="col-3 my-2">
                                        <p className="card-text">description :</p>
                                    </div>
                                    <div className="col-8 my-2">
                                        <p className="card-text">{activity.description}</p>
                                    </div>
                                </div>
                                <div className="row my-2">
                                    <div className="col-2 my-2">
                                        <p className="card-text">Time :</p>
                                    </div>
                                    <div className="col-8 my-2">
                                        <p className="card-text">{activity.time}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <div className="container p-5">
                    <Link to={`/activity/registration/${activity._id}/${activity._id}`}>
                        <button type="button" className="btn btn-outline-dark btn-lg btn-block">Link For Register</button>
                    </Link>
                </div>
            )}

            <div className="container p-5">
                Participants
            </div>

        </div>
 */