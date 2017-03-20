import {
  ScrollView,
  Text,
  View,
  Navigator,
  RefreshControl,
} from 'react-native'
import React, { Component } from 'react';
import PostPreview from './PostPreview';

export default class PostsListView extends Component {
  
  static propTypes = {
    fetchPosts: React.PropTypes.func,
    posts: React.PropTypes.array,
    isFetchingPosts: React.PropTypes.bool,
  }
  
  render() {
    let postsPreviews;
    if (this.props.posts && this.props.posts.length) {
       postsPreviews = this.props.posts.map((post, index) => {
         return (
           <PostPreview
              navigator={this.props.navigator}
              key={index}
              title={post.data.title}
              upvotes={post.data.ups}
              subreddit={post.data.subreddit_name_prefixed}
              thumbnail={post.data.thumbnail}
              selfText={post.data.selfText}
              permalink={post.data.permalink}
              url={post.data.url}/>
         );
       }) 
    }

    return (
      <ScrollView
          refreshControl={
            <RefreshControl
              // RefreshControl is meant to be used with ScrollView
              onRefresh={() => {
                this.props.fetchPosts();
              }}
              refreshing={(this.props && this.props.isFetchingPosts) || false}
              tintColor={"rgba(74,144,226,1)"}
              title={'Fetching...'}
              colors={['#ff0000', '#00ff00', '#0000ff']}
              progressBackgroundColor={"rgba(100,100,100,1)"} />
          }
          horizontal={false}>
        {postsPreviews}
       </ScrollView>
    );
  }
}