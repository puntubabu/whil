import {
  FETCH_POSTS,
  FETCHING_POSTS,
} from './actionTypes';
import {
  getPostsFromLocalStorage,
  setPostsToLocalStorage,
} from '../LocalStorage';

export function fetchLocalPosts() {
  return async (dispatch) => {
    const locallyStoredPosts = await getPostsFromLocalStorage();
    dispatch({
      type: FETCH_POSTS,
      posts: locallyStoredPosts || [],
    });
  }
}

export function fetchPosts() {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCHING_POSTS,
      });

      let response = await fetch('https://www.reddit.com/.json');
      let responseJSON = await response.json();
      const returnPosts = responseJSON.data.children;
      await setPostsToLocalStorage(returnPosts);

      dispatch({
        type: FETCH_POSTS,
        posts: returnPosts,
      });
    }
    catch(e) {
      console.log('Error fetching posts', e);
    }
  }
}
