import csrfFetch from "./csrf";
import { RECEIVE_USER } from "./users";
const RECEIVE_COMMENTS = "/comments/receiveComments";
const RECEIVE_COMMENT = "/comments/receiveComment";
const REMOVE_COMMENT = "/comments/removeComment";

export const receiveComments = (data) => {
  return { type: RECEIVE_COMMENTS, data };
};

export const receiveComment = (data) => {
  return { type: RECEIVE_COMMENT, data };
};

export const removeComment = (id) => {
  return { type: REMOVE_COMMENT, id };
};

export const getComments = (state) => {
  if (state.comments) return Object.values(state.comments);
  return [];
};

export const getComment = (postId) => (state) => {
  if (state.comments[postId]) return state.comments[postId];
  return null;
};

export const createComment = (comment) => async (dispatch) => {
  const res = await csrfFetch("/api/comments", {
    method: "POST",
    body: JSON.stringify(comment),
  });
  if (res.ok) {
    let data = await res.json();
    dispatch(receiveComment(data));
    return data;
  }
};

export const updateComment = (comment) => async (dispatch) => {
  const res = await csrfFetch(`/api/comments/${comment.id}`, {
    method: "PATCH",
    body: JSON.stringify(comment),
  });

  if (res.ok) {
    let data = await res.json();
    dispatch(receiveComment(data));
    return data;
  }
};

export const deleteComment = (commentId) => async (dispatch) => {
  const res = await csrfFetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(removeComment(commentId));
  }
};

const commentsReducer = (state = [], action) => {
  const nextState = { ...state };
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return { ...nextState, ...action.data.comments };
    case RECEIVE_COMMENT:
      nextState[action.data.comment.postId].push(action.data.comment);
      return nextState;
    case REMOVE_COMMENT:
      delete nextState[action.id];
      return nextState;
    case RECEIVE_USER:
      Object.values(action.data.user.posts).forEach((post) => {
        nextState[Object.values(post)[0].id] = post.comments;
      });
      return nextState;
    default:
      return state;
  }
};

export default commentsReducer;
