import { RECEIVE_POSTS } from "./posts";
import csrfFetch from "./csrf";
import { RECEIVE_USER } from "./users";
const RECEIVE_COMMENTS = "/comments/receiveComments";
const RECEIVE_COMMENT = "/comments/receiveComment";
const REMOVE_COMMENT = "/comments/removeComment";
const EDIT_COMMENT = "/comments/editComment";

export const receiveComments = (data) => {
  return { type: RECEIVE_COMMENTS, data };
};

export const receiveComment = (data) => {
  return { type: RECEIVE_COMMENT, data };
};

export const removeComment = (id) => {
  return { type: REMOVE_COMMENT, id };
};

export const editComment = (data) => {
  return { type: EDIT_COMMENT, data };
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
    dispatch(editComment(data));
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

export const likeComment = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/comments/${id}/like`, {
    method: "POST",
  });

  if (res.ok) {
    const comment = await res.json();
    dispatch(editComment(comment));
  }
};

const commentsReducer = (state = [], action) => {
  const nextState = { ...state };
  switch (action.type) {
    case RECEIVE_POSTS:
      // debugger;
      action.data.posts.forEach((post) => {
        nextState[Object.values(post)[0].id] = post.comments;
      });
      return nextState;
    case RECEIVE_COMMENT:
      nextState[action.data.comment.postId].push(action.data.comment);
      return nextState;
    case EDIT_COMMENT:
      let indexToEdit = nextState[action.data.comment.postId].findIndex(
        (comment) => comment.id === action.data.comment.id
      );
      nextState[action.data.comment.postId].splice(
        indexToEdit,
        1,
        action.data.comment
      );
      return nextState;
    case REMOVE_COMMENT:
      let postKey;
      let commentIndex;
      Object.values(nextState).forEach((comments) => {
        comments.forEach((comment, i) => {
          if (comment.id === action.id) {
            commentIndex = i;
            postKey = comment.postId;
          }
        });
      });
      nextState[postKey].splice(commentIndex, 1);
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
