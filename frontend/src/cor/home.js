import React, { useState, useEffect } from 'react'
import './home.css'
import moment from 'moment';
import { getTodayAct } from './apiCors';
import Head from '../components/head/head';
import { ActCard } from './Card';


const Home = () => {
    const [activitiesByNow, setActivitiesByNow] = useState([]);
    const [error, setError] = useState(false);

    const loadActivitiesByNow = () => {
        getTodayAct('date').then(data => {
            if(Date.error) {
                setError(data.error)
            } else {
                setActivitiesByNow(data)
            }
        })
    }

    useEffect(() => {
        loadActivitiesByNow();
     }, []);

    return (
        <div className="headbanner">
            <Head />
            <div className="show-date">
                {moment().format("DD MMMM, YYYY")}
            </div>
            <div className="show-today-act">
            </div>
            <div className="slide-act-page">
                    {activitiesByNow.map((act, i) => (
                        <div className="slide-card">
                            <ActCard key={i} act={act} />
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default Home;
