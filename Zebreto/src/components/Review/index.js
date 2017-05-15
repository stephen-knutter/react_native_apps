import React, {Component} from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import Reflux from 'reflux';
import ReviewStore from '../../stores/ReviewStore';

import ViewCard from './ViewCard';
import NormalText from '../NormalText';
import HeadingText from '../HeadingText';
import Button from '../Button';

import colors from '../../styles/colors';

class Review extends Component {
  constructor() {
    super();

    this.state = {
      numReviewed: 0,
      numCorrect: 0,
      currentReview: 0
    }

    this.displayName = "Review";
    this.mixins = [Reflux.connect(ReviewStore, 'reviews')];

    this.onReview = (correct) => {
      if (correct) {
        this.setState({numCorrect: this.state.numCorrect + 1});
      }
      this.setState({numReviewed: this.state.numReviewed + 1});
    }

    this._nextReview = () => {
      this.setState({currentReview: this.state.currentReview + 1});
    }

    this._contents = () => {
      if (!this.state.reviews || this.state.review.length === 0) {
        return null;
      }

      if (this.state.currentReview < this.state.reviews.length) {
        return(
          <ViewCard
            onReview={this.onReview}
            continue={this._nextReview}
            quit={this.props.quit}
            {...this.state.reviews[this.state.currentReview]} />
        )
      } else {
        let percent = this.state.numCorrect / this.state.numReviewed;
        return(
          <View style={styles.done}>
            <HeadingText style={styles.alternate}>
              Reviews cleared!
            </HeadingText>
            <NormalText style={styles.alternate}>
              {Math.round(percent * 100)}% correct
            </NormalText>
            <Button onPress={this.props.quit} style={styles.doneButton}>
              <NormalText>Done</NormalText>
            </Button>
          </View>
        )
      }
    }
  }

  componentWillMount() {
    ReviewStore.emit();
  }

  render() {
    return(
      <View style={styles.container}>
        {this._contents()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blue,
    flex: 1,
    paddingTop: 24
  },
  alternate: {
    color: '#ffffff'
  },
  done: {
    alignItems: 'center'
  },
  doneButton: {
    backgroundColor: colors.tan
  }
});

export default Review;
