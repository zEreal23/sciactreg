import React from 'react'
import moment from 'moment';
import { Link } from 'react-router-dom';
import './Card.css'

export const ActCard = ({ act }) => {
    return (
        <div className="col">
            <div className="bg-light card-custom-act">
                <h3 className="act-name">{act.name}</h3>
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
                <Link to={`/activity/${act._id}`}>
                    <button className="btn btn-outline-dark btn-lg btn-block view-act">
                        <span>
                            View Activity
                        </span>
                    </button>
                </Link>
        </div>
        </div>
    )
}

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

