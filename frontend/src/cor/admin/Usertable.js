import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../../auth/index'
import './usertable.css';
import { getUser , deleteUser } from '../../cor/apiCors';
import { Link } from 'react-router-dom';


const Usertable = () => {

    const [userList, setUserList] = useState([]);
    const [error, setError] = useState(false);

    const destroy = (userId) => {
        const {token } = isAuthenticated();
        console.log(userId)
        deleteUser(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadUserList();
            }
        });
    };

    const deleteConfirmed = (userId) =>{
        let answer = window.confirm("คุณต้องการที่จะลบบัญชีหรือไม่?")
        if(answer){
            window.location.reload(false);
            destroy(userId)
        }
    }

    const loadUserList = () => {
        getUser().then(data => {
            if (data.error) {
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
                        <tr key={i} user={user.status}>
                            <td className="text-center">{user.u_id}</td>
                            <td>{user.fname}</td>
                            <td>{user.lname}</td>
                            <td className="text-center">{user.email}</td>
                            <td className="text-center">{user.major}</td>
                            <td className="text-center">{user.status}</td>
                            <td className="text-center row">
                                <Link to={`/profile/${user._id}`}><i className="fas fa-user-circle col"></i></Link>
                                <Link to={`/profile/editByAdmin/${user._id}`}><i className="fas fa-user-edit col"></i></Link>
                                <span onClick={()=>deleteConfirmed(user._id)}><i className="far fa-trash-alt col"></i></span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};

export default Usertable;