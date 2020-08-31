import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Layout from './layout/Layout';
import { read, getUser } from './apiCors';
import { isAuthenticated } from '../auth/index';
import { Link } from 'react-router-dom';
//import Participants from './participants';

const ActivityPage = props => {

    const [user, setUser] = useState([])
    const [activity, setActivity] = useState([])
    const [error, setError] = useState(false)

    const loadUser = userId => {
        getUser(userId).then(data => {
            if(data.error) {
                setError(data.error);
            } else {
                setUser(data)
            }
        })
    }

    const loadSignleActivity = actId => {
        read(actId).then(data => {
            if(data.error) {
                setError(data.error);
            } else {
                setActivity(data);
            }
        });
    };

    useEffect(() => {
        const actId = props.match.params.actId;
        loadSignleActivity(actId);
        loadUser();
    }, [props])

    return (
        <Layout title={activity.name} description={moment(activity.date).format("DD MMMM, YYYY")}>
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
                <Participants />
            </div>

        </Layout>
    )
}

export default ActivityPage;