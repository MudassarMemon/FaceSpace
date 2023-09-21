import csrfFetch from "./csrf.js";

const RECEIVE_USERS = "users/recieveUsers";
const RECEIVE_USER = "users/recieveUser";

const recieveUsers = (data) => {
  return {
    type: RECEIVE_USERS,
    data,
  };
};

const recieveUser = (data) => {
  return {
    type: RECEIVE_USER,
    data,
  };
};

export const getUsers = (state) => {
  if (state.users) return Object.values(state.users);
  return [];
};

export const getUser = (id) => {
  return (state) => {
    if (state.users) return state.users[id];
    return null;
  };
};

export const fetchUsers = () => async (dispatch) => {
  const res = await csrfFetch("/api/users");

  if (res.ok) {
    const data = await res.json();
    dispatch(recieveUsers(data));
    return data;
  }
};

export const fetchUser = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/users/${id}`);

  if (res.ok) {
    const data = await res.json();
    dispatch(recieveUser(data));
    return data;
  }
};

export const updateUser = (user) => async (dispatch) => {
  const res = await csrfFetch(`/api/users/${user.id}`, {
    method: "PATCH",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(recieveUser(data));
    return data;
  }
};

const usersReducer = (state = [], action) => {
  const nextState = { ...state };

  switch (action.type) {
    case RECEIVE_USERS:
      return { ...action.data.users };
    case RECEIVE_USER:
      nextState[action.data.user.id] = action.data.user;
      return nextState;
    default:
      return state;
  }
};

export default usersReducer;
