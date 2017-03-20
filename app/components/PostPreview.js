import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';
import he from 'he';
import Post from './Post';

export default class PostPreview extends Component {

  static propTypes = {
    title: React.PropTypes.string,
    upvotes: React.PropTypes.number,
    thumbnail: React.PropTypes.string,
    navigator: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
  
    this.navigateToPost = this.navigateToPost.bind(this);
  }

  getMaybeShortenedTitle(title) {
    if (title.length > 35) {
      return `${he.decode(title.substring(0, 35))}...`;
    }
    return title;
  }

  navigateToPost() {
    this.props.navigator.push({
      title: this.getMaybeShortenedTitle(this.props.title),
      component: Post,
      passProps: {
        ...this.props
      }
    });
  }

  render() {
    let image, shortenedTitle;

    if (this.props.title) {
      shortenedTitle = this.getMaybeShortenedTitle(this.props.title);
    }

    // if image is default, nsfw, i.e. does not have valid thumbnail
    // show a black box
    if (this.props.thumbnail.indexOf('.jpg') > -1) {
      image = <Image
                style={styles.thumbnail}
                source={{uri: this.props.thumbnail}} />
    } else {
      image = <View style={styles.placeholderThumbnail} />
    }
    return (
      <TouchableHighlight
        underlayColor='#f2f2f2'
        onPress={this.navigateToPost}>
        <View style={styles.innerContainer}>
          <View>
            {image}
          </View>
          <View>
            <Text style={styles.title}>
              {shortenedTitle}
            </Text>
            <Text>{`${this.props.upvotes} upvotes`}</Text>
            <Text>{this.props.subreddit}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  thumbnail: {
    width: 50,
    height: 50,
  },
  placeholderThumbnail: {
    width: 50,
    height: 50,
    backgroundColor: '#000',
  },
  innerContainer: {
    flexDirection: 'row',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  title: {
    fontWeight: 'bold',
  }
});
