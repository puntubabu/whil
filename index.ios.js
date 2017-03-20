import React, { Component } from 'react';
import {
  AppRegistry,
  NavigatorIOS,
} from 'react-native';
import PostsListView from './app/components/Home';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import postReducer from './app/store/posts/reducer';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(postReducer);

export default class whil_challenge extends Component {
  
  render() {
    return (
      <Provider store={store}>
        <NavigatorIOS
          ref='navigation'
          initialRoute={{
            component: PostsListView,
            title: 'Reddit Posts',
          }}
          style={{flex: 1}} />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('whil_challenge', () => whil_challenge);
