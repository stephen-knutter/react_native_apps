import React, {Component} from 'react';
import {
  View
} from 'react-native';

import Reflux from 'reflux';
import DeckMetaStore from '../../stores/DeckMetaStore';
import CardsStore from '../../stores/CardsStore';
import {DeckActions, CardActions} from '../../actions';
import DeckModel from '../../data/Deck';

import Button from '../Button';
import NormalText from '../NormalText';

import Deck from './Deck';
import DeckCreation from './DeckCreation';

class Decks extends Component {
  constructor() {
    super();

    this.displayName = 'Decks';

    this.state = {
      decks: []
    }

    this.onDecksChange = (decks) => {
      this.setState({decks});
    }

    this._newDeck = () => {
      let deck = new DeckModel(newDeckName);
      DeckActions.createDeck(deck);
      this.props.createdDeck(deck);
    }

    this._getDecks = () => {
      return this.state.decks.map((deck) => {
        return(
          <Deck
            deck={deck}
            addCards={this.props.createdDeck}
            onReview={this.props.review}
            key={deck.id} />
        )
      });
    }

    this.deleteAll = () => {
      DeckActions.deleteAllDecks();
      CardActions.deleteAllCards();
    }
  }

  componentDidMount() {
    CardsStore.emit();
    DeckMetaStore.emit();
  }

  render() {
    return(
      <View>
        {this._getDecks()}
        <DeckCreation newDeck={this._newDeck} />
      </View>
    )
  }
};

Decks.propTypes = {
  createdDeck: React.PropTypes.func.isRequired,
  review: React.PropTypes.func.isRequired
}

export default Decks;
