import React, {Component} from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import DeckModel from '../../data/Deck';

import Button from '../Button';
import NormalText from '../NormalText';

import colors from '../../styles/colors';

class Deck extends Component {
  static displayName = 'Deck';

  constructor() {
    super();

    this._review = () => {
      this.props.addCards(this.props.deck.id);
    }

    this._addCards = () => {
      this.props.addCards(this.props.deck);
    }
  }

  render() {
    return(
      <View style={styles.deckGroup}>
        <Button style={styles.deckButton}  onPress={this._review}>
          <NormalText>
            {this.props.deck.name}: {this.props.deck.dueCards} due
          </NormalText>
        </Button>

        <Button style={styles.editButton} onPress={this._addCards}>\
          <NormalText>+</NormalText>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deckGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    padding: 10,
    marginBottom: 5
  },
  deckButton: {
    backgroundColor: colors.pink,
    padding: 10,
    margin: 0,
    flex: 1
  },
  editButton: {
    width: 60,
    backgroundColor: colors.pink2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 0,
    paddingTop: 10,
    paddingBottom: 10,
    margin: 0,
    flex: 0
  }
});

Deck.propTypes = {
  onReview: React.PropTypes.func.isRequired,
  deck: React.PropTypes.instanceOf(DeckModel),
  addCards: React.PropTypes.func.isRequired
}

export default Deck;