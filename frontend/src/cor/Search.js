import React, { useState, useEffect } from 'react';
import { getActivities, getCategories, list } from './apiCors';
import Card, { ActCard } from './Card';
import './search.css';

const Search = () => {
    const [ data, setData ] = useState({
        categories: [],
        category: '',
        search: '',
        results: [],
        searched: false
    });

    const { categories, category, search, results, searched } = data;

    const loadCategories = () => {
        getCategories().then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                setData({ ...data, categories: data })
            }
        });
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const searchData = () => {
        //console.log(search)
        if(search) {
            list({search: search || undefined, category: category })
            .then(response => {
                if(response.error) {
                    console.log(response.error)
                } else {
                    setData({ ...data, results: response, searched: true });
                }
            })
        }
    }

    const searchSubmit = (e) => {
        e.preventDefault()
        searchData()
    };

    const handleChange = name => event => {
        setData({...data, [name]: event.target.value, searched: false });
    }

    const searchMessage = (searched, results => {
        if(searched && results.length > 0) {
            return `Found ${results.length} activities`;
        }
        if (searched && results.length < 1) {
            return `No Activities found`;
        }
    })

    const searchedActivities = (results = []) => {
        return (
            <div>
                <p>
                    {searchMessage(searched, results)}
                </p>

                <div className="row">
                    {results.map((act, i) => (
                        <div className="col-4 mb-3">
                            <ActCard key={i} act={act} />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <span className="input-group-text ipg">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <select
                            className="btn-select mr-2 si-ip-custom"
                            onChange={handleChange('category')}
                        >
                            <option value="All">All</option>
                            {categories.map((c, i) => (
                                <option key={i} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="si-ip-custom">
                        <div className="row">
                            <div className="col">
                                <input 
                                    type="search"
                                    className="form-control input-search"
                                    onChange={handleChange("search")}
                                    placeholder="Search Activities"
                                />
                            </div>
                            <button className="btn-search input-group-text"><i className="fas fa-search" /></button>
                        </div>
                    </div>
                </div>
                <div className="input-group-append" style={{ border: "none" }}>
                </div>
            </span>
        </form>
    )

    return (
            <div>
                {searchForm()}
                {searchedActivities(results)}
            </div>
    )
}

export default Search;