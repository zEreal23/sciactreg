import { API } from '../config';
import queryString from 'query-string';


export const getActivities = (sortBy) => {
    return fetch(`${API}/Activities?sortBy=${sortBy}&order=desc&limit=12`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

export const getCategories = (sortBy) => {
    return fetch(`${API}/categories`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

export const getUser = (req) => {
    return fetch(`${API}/users`, {
        method: "GET",
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

export const getTodayAct = (sortBy) => {
    return fetch(`${API}/activities/today`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

export const getMonthAct = (sortBy) => {
    return fetch(`${API}/activities/month`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

export const read = (actId) => {
    return fetch(`${API}/activity/${actId}`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

export const readForRegist = (actId, token, userId) => {
    return fetch(`${API}/activity/registration/${actId}/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

export const getFilteredAct = (skip, filters = {}) => {
    const data = {
        skip,
        filters
    }
    return fetch(`${API}/activities/by/search`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
};

export const list = params => {
    const query = queryString.stringify(params)
    console.log('query', query)
    return fetch(`${API}/activities/search?${query}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const readuser = (userId, token) => {
    return fetch(`${API}/user/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const enroll = (userId, token, actId) => {
    return fetch(`${API}/activity/enroll`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId, actId })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const unroll = (userId, token, actId) => {
    return fetch(`${API}/activity/unroll`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId, actId })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
