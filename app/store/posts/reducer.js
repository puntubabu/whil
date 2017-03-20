import {
  FETCH_POSTS,
  FETCHING_POSTS,
} from './actionTypes';

const initialState = {
  posts: [],
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        posts: action.posts,
        fetchingPosts: false,
      };
    case FETCHING_POSTS:
      return {
        ...state,
        fetchingPosts: true,
      };
    default:
      return state;
  }
}
