import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getActivities } from "../apiCors";
import { deleteAct } from "../../admin/apiAdmin";
import { isAuthenticated } from "../../auth/index";

const Actstable = () => {
  const [actList, setActList] = useState([]);
  const [error, setError] = useState(false);

  const { user, token } = isAuthenticated();

  const loadActList = () => {
    getActivities().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setActList(data);
      }
    });
  };

  const destroy = (actId) => {
    deleteAct(actId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadActList();
      }
    });
  };

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
              <th className="text-center">Category</th>
              <th className="text-center">Manage</th>
            </tr>
          </thead>

          <tbody>
            {actList.map((act, i) => (
              <tr key={i} act={act}>
                <td className="text-center"></td>
                <td>{act.name}</td>
                <td className="text-center">{act.category.name}</td>
                <td className="text-center ">
                  <div className="badge badge-pill badge-primary act-ed">
                    <Link
                      to={`/activity/edit/${act._id}/${user.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <i class="far fa-edit"></i>
                    </Link>
                  </div>
                  <div
                    className="badge badge-pill badge-danger act-ed"
                    onClick={() => destroy(act._id)}
                  >
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

export default Actstable;
