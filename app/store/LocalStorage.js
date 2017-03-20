import {
  AsyncStorage,
} from 'react-native';

export async function setPostsToLocalStorage(posts) {
  try {
    await AsyncStorage.setItem(
      '@WhilStorage:posts', JSON.stringify(posts)
    );
  } catch (e) {
    console.log('Error storing posts:', e);
  }
}

export async function getPostsFromLocalStorage() {
  let posts = await AsyncStorage.getItem(
    '@WhilStorage:posts'
  );
  return JSON.parse(posts);
}
