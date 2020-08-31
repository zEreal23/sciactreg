import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../auth';
import { createAct, getCategories } from './apiAdmin';
import './addActivity.css';

const AddActivity = () => {
    const [values, setValues] = useState({
        name: '',
        description: '',
        date: '',
        categories: [],
        category: '',
        time: '',
        hour: '',
        loading: false,
        error: '',
        createdActivity: '',
        redirectToProfile: false,
        formData: ''
    });

    const { user, token } = isAuthenticated();
    const {
        name,
        description,
        date,
        categories,
        //category,
        time,
        hour,
        error,
        createdActivity,
        redirectToProfile,
        formData
    } = values;

    // load categories and set form data
    const init = () => {
        getCategories().then(data => {
            if(data.error) {
                 setValues({...values, error: data.error})
            } else {
                setValues({
                    ...values, 
                    categories: data, 
                    formData: new FormData()
                });
            }
        });
    };

    useEffect(init, []);

    const handleChange = name => event => {
        formData.set(name, event.target.value);
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });

        createAct(user._id, token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: '',
                    description: '',
                    time: '',
                    date: '',
                    hour: '',
                    loading: false,
                    createdActivity: data.name
                });
            }
        });
    };

    const newPostForm = () => (
        <div className="create-new-act">
            <form className="mb-3" onSubmit={clickSubmit}>

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

            <button className="btn btn-outline-primary btn-lg btn-block btn-cre-act">
                <span>
                    Create Activity
                </span>
            </button>
        </form>
        </div>
    );

    const showError = () => (
        <div className="show-cre-error" style={{ display: error ? '' : 'none' }}>
            <i className="fas fa-exclamation-triangle"></i> {error}
        </div>
    );

    const showSuccess = () => (
        <div className="show-cre-success" style={{ display: createdActivity ? '' : 'none' }}>
            <h2>{`${createdActivity}`} is created!</h2>
        </div>
    );

    return (
        <div className="cre-act-card">
            <div className="row">
                <div className="col-md-6 offset-md-3 create-act">
                    <h1>Create Activity</h1>
                    {newPostForm()}
                    {showError()}
                    {showSuccess()}
                </div>
            </div>
        </div>
    );
};

export default AddActivity;