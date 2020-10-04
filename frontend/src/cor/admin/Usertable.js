import React, { useState, useEffect } from 'react';
import './usertable.css';
import { getUser } from '../../cor/apiCors';


const Usertable = () => {
    
    const [userList, setUserList] = useState([]);
    const [error, setError] = useState(false);

    const loadUserList = () => {
        getUser().then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setUserList(data)
            }
        })
    }

    useEffect(() => {
        loadUserList();
     }, []);



    return (
        <div className="user-table lg">
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col text-center">ID</th>
                    <th scope="col text-center">First Name</th>
                    <th scope="col text-center">Last Name</th>
                    <th scope="col text-center">Email</th>
                    <th scope="col text-center">major</th>
                    <th scope="col text-center">status</th>
                    <th scope="col text-center"></th>
                    </tr>
                </thead>
                <tbody>
                {userList.map((user, i) => (
                        <tr key={i} user={user}>
                            <td className="text-center">{user.u_id}</td>
                            <td>{user.fname}</td>
                            <td>{user.lname}</td>
                            <td className="text-center">{user.email}</td>
                            <td className="text-center">{user.major}</td>
                            <td className="text-center">{user.status}</td>
                            <td className="text-center row">
                                <i className="fas fa-user-edit col"></i>
                                <i className="far fa-trash-alt col"></i>
                                <i className="fas fa-user-circle col"></i>
                            </td>
                        </tr>
                    ))}
                </tbody>
                </table>
        </div>
    )
};

export default Usertable;