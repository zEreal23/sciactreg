import { API } from '../config';

export const signup = (userId , token, user) => {
    // console.log(fname, lname, u_id, email, password, major);
    return fetch(`${API}/signup/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const signin = (user) => {
    //console.log(fname, lname, u_id, email, password, major);
    return fetch(`${API}/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const authenticate = (data, next) => {
    if(typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
};

export const signout = (next) => {
    if(typeof window !== "undefined") {
        localStorage.removeItem("jwt");
        return fetch(`${API}/signout`, {
            method: "GET",
        })
            .then(response => {
                console.log("signout", response);
            })
            .catch(err => console.log(err));
    }
    next();
};

export const isAuthenticated = () => {
    if(typeof window == "undefined") {
        return false;
    } if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"));
    } else {
        return false;
    }
};