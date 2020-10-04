import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import { getCategories } from '../cor/apiCors';
import { getAct, updateAct } from './apiAdmin';

const EditActivity = ({ match, act }) => {
    
    const [ values, setValues ] = useState({
        name: '',
        description: '',
        date: '',
        categories: [],
        category: '',
        time: '',
        hour: '',
        error: false,
        createdActivity: '',
        redirectToProfile: false,
        formData: ''
    });

    const [ categories, setCategories ] = useState([]);

    const { user, token } = isAuthenticated();
    const {
        name,
        description,
        date,
        category,
        time,
        hour,
        error,
        createdActivity,
        redirectToProfile,
        formData
    } = values;

    const init = actId => {
        getAct(actId).then(data => {
            if(data.error) {
                setValues({ ...values,error: data.error });
            } else {
                setValues({
                    ...values,
                    name: data.name,
                    description: data.description,
                    date: data.date,
                    category: data.category._id,
                    time: data.time,
                    hour: data.hour,
                    formData: new FormData()
                });
                initCategories();
            }
        });
    }

    const initCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setCategories(data);
            }
        });
    };

    useEffect(() => {
        init(match.params.actId);
    }, []);

    const handleChange = name => event => {
        formData.set(name, event.target.value);
        setValues({ ...values, [name]: event.target.value });
    }

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '' });

        updateAct(match.params.actId, user._id, token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: '',
                    description: '',
                    date: '',
                    category: '',
                    time: '',
                    hour: '',
                    error: false,
                    redirectToProfile: true,
                    createdActivity: data.name
                });
            }
        });
    };

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const redirectUser = () => {
        if(redirectToProfile) {
            if(!error) {
                return <Redirect to={`/activity/${act._id}`} />
            }
        }
    }

    const newPostForm = () => (
        <div className="container">
            <div className="create-new-act">
                <form className="mb-3" onSubmit={clickSubmit}>
                    <div>
                        <div className="form-group">
                            <label className="text-muted">Activity Name</label>
                            <input 
                                onChange={handleChange("name")} 
                                type="name" 
                                className="form-control si-ip-custom"
                                value={name} />
                        </div>

                        <div className="form-group">
                            <label className="text-muted">Date</label>
                            <input 
                                onChange={handleChange("date")} 
                                type="date" 
                                className="form-control si-ip-custom" 
                                value={date}
                            />
                        </div>

                        <div className="form-group">
                            <label className="text-muted">Time</label>
                            <input 
                                onChange={handleChange("time")} 
                                type="time" 
                                className="form-control si-ip-custom" 
                                value={time}
                            />
                        </div>

                        <div className="form-group">
                            <label className="text-muted">Hour</label>
                            <input 
                                onChange={handleChange("hour")} 
                                type="number" 
                                className="form-control si-ip-custom" 
                                value={hour}
                            />
                        </div>

                        <div className="form-group">
                            <label className="text-muted">Category</label>
                            <select 
                                onChange={handleChange("category")} 
                                className="form-control si-ip-custom"
                            >
                                <option>Please select</option>
                                {categories && 
                                    categories.map((c, i) => (
                                        <option key={i} value={c._id}>
                                            {c.name}
                                        </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                                <label className="text-muted">Description</label>
                                <textarea 
                                    onChange={handleChange("description")} 
                                    type="text" 
                                    className="form-control si-ip-custom"
                                    value={description}
                                />
                        </div>
                    </div>
                    {showError()}

                    <button className="btn btn-outline-primary btn-lg btn-block btn-cre-act">
                        <span>
                            confirm edit
                        </span>
                    </button>
                </form>
            </div>
        </div>
    );
    
    return (
        <div className="container">
            <div className="card">
                <div>
                    {newPostForm()}
                    {redirectUser()}
                </div>
            </div>
        </div>
    )
}

export default EditActivity;