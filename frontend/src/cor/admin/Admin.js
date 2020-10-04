import React, { useState } from 'react';
import './admin.css';
import Signup from '../../user/Signup';
import Usertable from './Usertable';
import Actstable from './Actstable';
import Catstable from './Categoriestable';


const Admin = () => {

    const tab1 = () => (
        <div id="1" className="tab-1">
            <div className="text-center">Manage Users</div>
            <div className="row">
                <div className="col-lg-4 left">
                    <h3>Add New User</h3>
                        <Signup />
                </div>
                <div className="col-8 right">
                        <Usertable />
                </div>
            </div>
        </div>
    )

    const tab2 = () => (
        <div id="2" className="tab-2">
            <h2 className="text-center">
                Manage Activities
            </h2>
            <Actstable />
        </div>
    )

    const tab3 = () => (
        <div id="3" className="tab-3">
            <h2 className="text-center">
                Manage Categories
            </h2>
            <Catstable />
        </div>
    )

    const [ activeTab, setActiveTab ] = useState(tab1);

    return (
        <div>
            <div className="card">
                <div className="card-header">
                    <ul className="nav nav-tabs card-header-tabs">
                        <li className="nav-item">
                            <button 
                                className="btn-tab nav-link"
                                onClick={() => setActiveTab(tab1)}
                                activeClassName="active">
                                    Manage Users
                                </button>
                        </li>
                        <li className="nav-item">
                            <button 
                                className="btn-tab nav-link"
                                onClick={() => setActiveTab(tab2)}
                                activeClassName="active">
                                    Manage Activities
                                </button>
                        </li>
                        <li className="nav-item">
                            <button 
                                className="btn-tab nav-link"
                                onClick={() => setActiveTab(tab3)}
                                activeClassName="active">
                                    Manage Categories
                                </button>
                        </li>
                    </ul>
                </div>
                    <div class="card-body">
                        <div>
                            {activeTab}
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default Admin;

/* 
<div className="row">
                <div className="col-lg-4 left">
                    <h3>Add New User</h3>
                   <Signup />
                </div>
                <div className="col-8 right">
                    <Usertable />
                </div>
            </div>
            */