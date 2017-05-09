import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import {fonts} from '../styles/fonts';
// import Dimensions from 'Dimensions';

class HeadingText extends Component {
  static displayName = 'HeadingText';

  render() {
    return(
      <Text style={[this.props.style, fonts.big]}>\
        {this.props.children}
      </Text>
    );
  }
}

HeadingText.propTypes = {
  style: Text.propTypes.style
}

var scaled = StyleSheet.create({
  big: {
    fontSize: width / fonts.scalingFactors.big
  }
});

export default HeadingText;
