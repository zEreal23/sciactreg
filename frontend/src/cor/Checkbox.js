import React, { useState, useEffect } from "react";
import "./checkbox.css";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/index";
import {
  deleteCategory,
  getCategories,
  updateCategory,
} from "../admin/apiAdmin";

const Checkbox = ({ categories, handleFilters, match }) => {
  const [checked, setCheked] = useState([]);

  const handleToggle = (c) => () => {
    // return the first index or -1
    const currentCategoryId = checked.indexOf(c);
    const newCheckedCategoryId = [...checked];
    // if currently checked was not already in checked state > push
    // else pull/take off
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(c);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }
    //console.log(newCheckedCategoryId);
    setCheked(newCheckedCategoryId);
    handleFilters(newCheckedCategoryId);
  };

  const [category, setCategory] = useState([]);

  const { user, token } = isAuthenticated();

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategory(data);
      }
    });
  };

  const destroy = (categoryId) => {
    deleteCategory(categoryId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadCategories();
        window.location.reload();
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return categories.map((c, i) => (
    <li key={i} className="list-unstyled">
      <input
        onChange={handleToggle(c._id)}
        value={checked.indexOf(c._id === -1)}
        type="checkbox"
        className="form-check-input"
      />
      <label className="form-check-label">{c.name}</label>
      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <div className="row">
          <p className="col del-cat text-center" onClick={() => destroy(c._id)}>
            {" "}
            Delete{" "}
          </p>
          <p className="col up-cat text-center">
            <Link
              to={`/activity/edit/category/${c._id}`}
              style={{ textDecoration: "none" }}
            >
              {" "}
              Edit{" "}
            </Link>
          </p>
        </div>
      )}
    </li>
  ));
};

export default Checkbox;
