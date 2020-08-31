import React, { useState , useEffect } from 'react';
import AddCategory from '../admin/AddCategory';
import { isAuthenticated } from '../auth/index';
import { getCategories, getFilteredAct } from './apiCors';
import { Link } from 'react-router-dom';
import './activity.css';
import Fade from 'react-reveal/Fade';
import Checkbox from './Checkbox';
import { ActCard } from './Card';


const Activity = () => {
    const [myFilters, setMyFilters] = useState({
        filters: { category: [] }
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    //const [size, setSize] = useState(0);
    const [filteredResults, setfilteredResults] = useState([]);

    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setCategories(data);
            }
        });
    };

    const loadfilteredResults = newFilters => {
        //console.log(newFilters)
        getFilteredAct(newFilters)
        .then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setfilteredResults(data.data);
            }
        })
    };

    useEffect(() => {
        init();
        loadfilteredResults(myFilters.filters);
    }, [])

    const handleFilters = (filters, filterBy) => {
        //console.log("ACTIVITY",filters, filterBy);
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;

        loadfilteredResults(myFilters.filters);
        setMyFilters(newFilters);
    }  



    return (
        <div>
            <div className="activity-page">
                <Fade left>
                    <h1>Activity</h1>
                </Fade>
                <Fade left>
                    <div className="act-head-line"></div>
                </Fade> 
                <Fade top>
                    <p>the activities that bring us together.</p>
                </Fade>
                <div className="act-head-page"></div>
                <div className="act-head-bg-1"></div>
                <h5>Filter Activities.</h5>
            </div>
            <div className="category-card">
                <ul className="categories-list">
                    <Checkbox
                        categories={categories}
                        handleFilters={filters =>
                            handleFilters(filters, 'category')
                        }
                    />
                </ul>
            </div>
            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <div className="add-new">
                    <div className="add-cat">
                        <AddCategory />    
                    </div>
                    <div className="cre-act">
                        <Link to="/activity/create">
                            <button type="button" className="btn btn-outline-primary btn-new-act">New Activity</button>
                        </Link>  
                    </div>
                </div>
            )}

            <div className="show-activities">
                <div className="row">
                    {filteredResults.map((act, i) => (
                        <div key={i} className="col-4 mb-3">
                            <ActCard act={act} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Activity;

/* 
{isAuthenticated() && isAuthenticated().user.role ===1 && (
                <div className="container cre-new">
                    <div className="row">
                        <div className="col-9">
                            <AddCategory />
                        </div>
                        <div className="col-3">
                        <Link to="/activity/create">
                            <button type="button" className="btn btn-outline-primary">New Activity</button>
                        </Link>
                        </div>
                    </div>
                </div>
            )}
            */