import React, { useState, useEffect } from 'react';
import { getCategories } from '../apiCors';

const Catstable = () => {
    const [ catList, setCatList ] = useState([]);
    const [ error, setError ] = useState(false);

    const loadCatList = () => {
        getCategories().then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setCatList(data)
            }
        })
    }

    useEffect(() => {
        loadCatList();
    }, []);
    
    return (
        <div className="container">
            <div className="cat-table lg">
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th className="text-center"></th>
                            <th className="text-center">Categoriy Name</th>
                            <th className="text-center"></th>
                        </tr>
                    </thead>

                    <tbody>
                        { catList.map((cat, i) => (
                            <tr key={i} cat={cat}>
                                <td className="text-center"></td>
                                <td>{cat.name}</td>
                                <td className="text-center row">
                                    <i className="fas fa-edit col"></i>
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

export default Catstable;