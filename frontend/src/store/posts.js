import csrfFetch from "./csrf";

const RECEIVE_POSTS = "/posts/receivePosts";
// const RECEIVE_POST = "/posts/receivePost";
// const REMOVE_POST = "/posts/receivePost";

export const receivePosts = (data) => {
  return { type: RECEIVE_POSTS, data };
};

export const getPosts = (state) => {
  if (state.posts) return Object.values(state.posts);
  return [];
};

const postsReducer = (state = [], action) => {
  const nextState = { ...state };

  switch (action.type) {
    case RECEIVE_POSTS:
      return { nextState, ...action.data.posts };
    default:
      return state;
  }
};

export default postsReducer;
