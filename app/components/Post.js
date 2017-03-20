import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
} from 'react-native';
import he from 'he';

const Post = ({
  title,
  upvotes,
  subreddit,
  thumbnail,
  selfText,
  permalink,
  url,
}) => {
  let decodedTitle, displayThumbnail, image;

  if (title) {
    decodedTitle = he.decode(title);
  }

  // if image is default, nsfw, i.e. does not have valid thumbnail
  // show a black box
  if (thumbnail.includes('.jpg')) {
    displayThumbnail = <Image style={{width: 50, height: 50}} source={{uri: thumbnail}} />
  } else {
    displayThumbnail = <View style={styles.placeholderImage}></View>
  }

  if (url.match(/(jpg|png|jpeg|gif|gifv)/)) {
    let newURL;
    if (url.includes('gifv')) {
      newURL = url.substring(0, url.length - 1);
    }
    if (!newURL.includes('https')) {
      newURL = newURL.replace('http', 'https');
    }
    image = <Image
              style={{ width: 250, height: 250 }}
              source={{ uri: newURL }}/>
  }

  return (
    <View style={styles.postContainer}>
      <View>
        {displayThumbnail}
      </View>
      <View>
        <Text>{decodedTitle}</Text>
        <Text>{`${upvotes} upvotes`}</Text>
        <Text>{subreddit}</Text>
        <Text>{selfText}</Text>
        <Text
          style={styles.link}
          onPress={() => Linking.openURL(`https://reddit.com${permalink}`)}>
            Link to Post
        </Text>
      </View>
      {image}
    </View>
  );
};

const styles = StyleSheet.create({
  placeholderImage: {
    width: 50,
    height: 50,
    backgroundColor: '#000',
  },
  postContainer: {
    marginTop: 75,
    flexDirection: 'column',
    width: '100%',
    flexShrink: 0,
  },
  link: {
    textDecorationLine: 'underline',
    color: '#FFA500',
  }
});

export default Post;
