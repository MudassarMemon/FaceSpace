import csrfFetch from "./csrf";
import { RECEIVE_USER } from "./users";
const RECEIVE_POSTS = "/posts/receivePosts";
const RECEIVE_POST = "/posts/receivePost";
const REMOVE_POST = "/posts/removePost";

export const receivePosts = (data) => {
  return { type: RECEIVE_POSTS, data };
};

export const receivePost = (data) => {
  return { type: RECEIVE_POST, data };
};

export const removePost = (id) => {
  return { type: REMOVE_POST, id };
};

export const getPosts = (state) => {
  if (state.posts) return Object.values(state.posts);
  return [];
};

export const getPost = (postId) => (state) => {
  if (state.posts[postId]) {
    return state.posts[postId];
  }
  return null;
};

export const createPost = (post) => async (dispatch) => {
  const res = await csrfFetch("/api/posts", {
    method: "POST",
    body: JSON.stringify(post),
  });

  if (res.ok) {
    let data = await res.json();
    dispatch(receivePost(data));
    return data;
  }
};

export const updatePost = (post) => async (dispatch) => {
  const res = await csrfFetch(`/api/posts/${post.id}`, {
    method: "PATCH",
    body: JSON.stringify(post),
  });

  if (res.ok) {
    let data = await res.json();
    dispatch(receivePost(data));
    return data;
  }
};

export const deletePost = (postId) => async (dispatch) => {
  const res = await csrfFetch(`/api/posts/${postId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(removePost(postId));
  }
};

const postsReducer = (state = [], action) => {
  const nextState = { ...state };
  switch (action.type) {
    case RECEIVE_POSTS:
      return { ...nextState, ...action.data.posts };
    case RECEIVE_POST:
      nextState[action.data.post.id] = action.data.post;
      return nextState;
    case REMOVE_POST:
      delete nextState[action.id];
      return nextState;
    case RECEIVE_USER:
      const usersPosts = [];
      Object.values(action.data.user.posts).forEach((post) => {
        usersPosts[Object.values(post)[0].id] = Object.values(post)[0];
      });
      return usersPosts;
    default:
      return state;
  }
};

export default postsReducer;
