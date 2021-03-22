import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom"
import { getCategories } from "../apiCors";
import {deleteCategory} from '../../admin/apiAdmin'
import {isAuthenticated} from '../../auth/index'

const Catstable = () => {
  const [catList, setCatList] = useState([]);
  const [error, setError] = useState(false);

  const { user, token } = isAuthenticated();

  const loadCatList = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCatList(data);
      }
    });
  };

  const destroy = (categoryId) => {
    deleteCategory(categoryId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadCatList();
      }
    });
  };

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
            {catList.map((cat, i) => (
              <tr key={i} cat={cat}>
                <td className="text-center"></td>
                <td>{cat.name}</td>
                <td className="text-center row">
                  <div className="badge badge-pill badge-primary act-ed">
                    <Link
                      to={`/activity/edit/category/${cat._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      {" "}
                      <i class="far fa-edit"></i>
                    </Link>
                  </div>
                  <div className="badge badge-pill badge-danger act-ed" onClick={() => destroy(cat._id)}>
                    <i class="fas fa-times"></i>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Catstable;
