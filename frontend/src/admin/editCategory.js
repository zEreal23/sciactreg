import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth/index";
import { getCategory, updateCategory } from "../admin/apiAdmin";
import "./editCategory.css";

const Editcategory = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    error: "",
    redirectToProfile: false,
    formData: "",
  });

  const { user, token } = isAuthenticated();

  const { name, error, redirectToProfile } = values;

  const init = (categoryId) => {
    getCategory(categoryId, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
        });
      }
    });
  };

  useEffect(() => {
    init(match.params.categoryId);
  }, []);

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const submitCategoryForm = (e) => {
    e.preventDefault();
    const category = {
      name: name,
    };
    updateCategory(match.params.categoryId, user._id, token, category).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: data.name,
            error: false,
            redirectToProfile: true,
          });
        }
      }
    );
  };

  const showError = () => (
    <div>
      <h6
        className="show-add-error"
        role="alert"
        style={{ display: error ? "" : "none" }}
      >
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        {error}
      </h6>
    </div>
  );

  const redirectUser = () => {
    if (redirectToProfile) {
      if (!error) {
        return <Redirect to="/activity" />;
      }
    }
  };

  const goBackBTN = () => {
    return (
      <div>
        <Link to="/activity" className="text-info">
          <button className="btn btn-cancle">cancle</button>
        </Link>
      </div>
    );
  };

  const updateForm = (name) => (
    <div className="card text-cente card-edit-cat">
      <h2 className="head-edit-cat">Edit Category's Name</h2>
      <form className="form-group" onSubmit={submitCategoryForm}>
        <div className="rename">
          <input
            onChange={handleChange("name")}
            value={name}
            className="form-control add-cat-custom"
            type="text"
            required
          />
        </div>
        {showError()}
        <div className="row can-save">
          <div>{goBackBTN()}</div>
          <div>
            <div>
              <button type="submit" className="btn btn-submit">
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
      {redirectUser()}
    </div>
  );

  return <div>{updateForm(name)}</div>;
};

export default Editcategory;
