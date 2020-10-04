import React, { useState, useEffect } from 'react'
import moment from 'moment';
import { Link } from 'react-router-dom';
import './Card.css'
import { isAuthenticated } from '../auth/index';
import { deleteAct, getAct } from '../admin/apiAdmin';

export const ActCard = ({ act }) => {

    const [ activity, setActivity ] = useState([]);

    const { user, token } = isAuthenticated();

    const loadActivity = () => {
        getAct().then(data => {
            if(data.error){
                console.log(data.error)
            } else {
                setActivity(data)
            }
        })
    }

    const destroy = actId => {
        deleteAct(actId, user._id, token).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                loadActivity()
                window.location.reload()
            }
        })
    }

    useEffect(() => {
        loadActivity()
    }, [])

    return (
        <div className="act-card-list">
            <div className="card-head">
                <div className="row">
                <span className="badge badge-pill badge-black">{act.category.name}</span>
                <div className="col"></div>
                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <div className="row col-4">
                        <div className="badge badge-pill badge-success act-ed">
                            <Link to={`/activity/edit/${act._id}`} style={{ textDecoration: 'none' }}>
                                <i class="fas fa-plus"></i>
                            </Link>
                        </div>
                        <div className="badge badge-pill badge-danger act-ed"
                        onClick={() => destroy(act._id)}><i class="fas fa-times"></i></div>
                    </div>
                    )}
                </div>
                <h5 className="act-name card-title">{act.name}</h5>
            </div>
            <p className="act-date col text-center">
                {moment(act.date).format("DD MMMM, YYYY")}
            </p>
            <div className="cardbody">
                <h6 className="card-text">{act.description}</h6>
                <div className="row mb-3 card-time">
                    <div className="col-4">
                        <p className="card-text">Time :</p>
                    </div>
                    <div className="col-8">
                        <p className="card-text">{act.time}</p>
                    </div>
                </div>
                <div className="row mb-3 card-time">
                    <div className="col-4">
                        <p className="card-text">Hour :</p>
                    </div>
                    <div className="col-8">
                        <p className="card-text">{act.hour} hour</p> 
                    </div>
                </div>
                <Link to={`/activity/${act._id}`} style={{ textDecoration: 'none' }}>
                    <button className="btn view-act">
                            View Activity
                    </button>
                </Link>
            </div>
        </div>
    )
}

/* 
<div className="bg-light card-custom-act">
                <span class="badge badge-pill badge-warning">{act.category.name}</span>
                <h3 className="act-name card-title">{act.name}</h3>
                <h4 className="act-date">
                    {moment(act.date).format("DD MMMM, YYYY")}
                </h4>
                <h6>Description</h6>
                <p className="card-text">{act.description}</p>
                <div className="row mb-3 card-time">
                    <div className="col-4">
                        <p className="card-text">Time :</p>
                    </div>
                    <div className="col-8">
                        <p className="card-text">{act.time}</p>
                    </div>
                </div> 
                <Link to={`/activity/${act._id}`} style={{ textDecoration: 'none' }}>
                    <button className="btn btn-outline-dark btn-lg btn-block view-act">
                            View Activity
                    </button>
                </Link>
                <div class="blockquote-footer">
                    <small class="text-muted">Last updated 3 mins ago</small>
                </div>
            </div>
*/

/* 
<div className="col-4 ">
            <div className="card bg-light ">
                <h4 className="card-header bg-dark text-white">{moment(act.date).format("DD MMMM, YYYY ( dddd )")}</h4>
                <div className="card-body">
                    <h3 className="card-title">{act.name}</h3>
                    <p className="card-text">{act.description}</p>
                    <div className="row mb-3">
                        <div className="col-4">
                            <p className="card-text">Time :</p>
                        </div>
                        <div className="col-8">
                            <p className="card-text">{act.time}</p>
                        </div>
                    </div>
                    <Link to={`/activity/${act._id}`}>
                        <button className="btn btn-outline-dark btn-lg btn-block">View Activity</button>
                    </Link>
                </div>
            </div>
        </div>
*/

