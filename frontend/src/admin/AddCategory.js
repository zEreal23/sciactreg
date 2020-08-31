import React, { useState } from 'react';
import { isAuthenticated } from '../auth/index';
import { createCategory } from './apiAdmin';
import './AddCategory.css'

const AddCategory = () => {
    const [name, setName] = useState ('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    //destructure user and token from localStorage
    const {user, token} = isAuthenticated();

    const handleChange = (e) => {
        setError("");
        setName(e.target.value);
    };

    const clickSubmit = (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        // make request to api to create category
        createCategory(user._id, token, {name})
        .then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setError("");
                setSuccess(true);
            }
        });
    };

    const showSuccess = () => {
        if(success) {
            return <h6 className="show-add-success">{name} is created</h6>
        }
    }

    const showError = () => {
        if(error) {
            return <h6 className="show-add-error"><i className="fas fa-exclamation-triangle"></i> Category name should be unique</h6>
        }
    }

    const newCategoryForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <div className="row">
                    <div className="col-4">
                            <input 
                                type="text" 
                                className="form-control add-cat-custom" 
                                onChange={handleChange} 
                                value={name} 
                                autoFocus
                                required
                                placeholder="Add New Category" />
                    </div>
                    <div className="col-2">
                        <button className="btn btn-outline-primary btn-cre-cat">
                            <span>
                                Create
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );

    return (
        <div className=".col-md-6 .offset-md-2">
            {newCategoryForm()}
            {showError()}
            {showSuccess()}
            </div>
    )
};

export default AddCategory;