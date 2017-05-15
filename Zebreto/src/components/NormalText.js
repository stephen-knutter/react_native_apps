import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import {fonts, scalingFactors} from '../styles/fonts';
//import Dimensions from 'Dimensions';

class NormalText extends Component {
  static displayName = 'NormalText';

  render() {
    return(
      <Text style={[this.props.style, fonts.normal, scaled.normal]}>
        {this.props.children}
      </Text>
    );
  }
}

NormalText.propTypes = {
  style: Text.propTypes.style
};

const scaled = StyleSheet.create({
  normal: {
    fontSize: 16
  }
});

export default NormalText;
