import React, {Component} from 'react';
import {
  View,
  Image
} from 'react-native';

import styles form './styles';
import HeadingText from '../HeadingText';

export class Header extends Component {
  static displayName = 'Header';

  render() {
    return(
      <View style={styles.header}>
        <Image source={require('../../../icon.png')} style={styles.logo} />
        <HeadingText>ZEBRETO</HeadingText>
      </View>
    );
  }
}

export default Header;
