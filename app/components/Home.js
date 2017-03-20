import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import PostsListView from './PostsListView';
import {
  fetchPosts,
  fetchLocalPosts,
} from '../store/posts/actionCreators';

class Home extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  componentDidMount() {
    this.props.fetchLocalPosts();
    this.props.fetchPosts();
  }
  
  render() {
    const fetchingText = this.props.isFetchingPosts ?
          <Text>Fetching posts</Text> : null;
    const error = <Text>{this.state.error}</Text>;
    return (
      <View style={styles.container}>
        {error}
        {fetchingText}
        <PostsListView
          navigator={this.props.navigator}
          fetchPosts={this.props.fetchPosts}
          posts={this.props.posts}
          isFetchingPosts={this.props.isFetchingPosts} />
      </View>
    );
  }
}

export default connect(
  (state) => ({
    isFetchingPosts: state.fetchingPosts,
    posts: state.posts,
  }),
  (dispatch) => ({
    fetchPosts: () => dispatch(fetchPosts()),
    fetchLocalPosts: () => dispatch(fetchLocalPosts()),
}))(Home);

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
