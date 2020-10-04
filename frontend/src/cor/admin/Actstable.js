import React, { useState, useEffect } from 'react';
import { getActivities } from '../apiCors';

const Actstable = () => {
    const [ actList, setActList ] = useState([]);
    const [ error, setError ] = useState(false);

    const loadActList = () => {
        getActivities().then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setActList(data)
            }
        })
    }

    useEffect(() => {
        loadActList();
    }, []);
    
    return (
        <div className="container">
            <div className="act-table lg">
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th className="text-center"></th>
                            <th className="text-center">Activity Name</th>
                            <th className="text-center"></th>
                        </tr>
                    </thead>

                    <tbody>
                        { actList.map((act, i) => (
                            <tr key={i} act={act}>
                                <td className="text-center"></td>
                                <td>{act.name}</td>
                                <td className="text-center row">
                                    <i className="far fa-trash-alt col"></i>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Actstable;