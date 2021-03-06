import Reflux from 'reflux';
import _ from 'lodash';
import moment from 'moment';

import {DeckActions, CardActions} from '../actions';
import CardsStore from './CardsStore';
import DeckMetaStore from './DeckMetaStore';

import CardReview from '../data/Review';

export default Reflux.createStore({
  init() {
    this._deckInfos = null;
    this._cards = [];
    this._reviews = [];
    this._cardReviews = {};

    this.listenTo(CardsStore, this.cardUpdate);
    this.listenTo(DeckMetaStore, this.deckMetaUpdate);
    this.listenTo(CardActions.review, this.onCardReview);
    this.listenTo(DeckActions.reviewDeck, this.onReviewDeck);
  },

  emit() {
    this.trigger(this._reviews);
  },

  _recalculate() {
    this._updateCurrentDeckInfo();
    let qualifyingCards = this._qualifyingCards();
    this._reviews = this._createReviews(qualifyingCards);
    let cardReviews = qualifyingCards.map((card) => {
      return new CardReview(card);
    });
    cardReviews.forEach((cr) => {
      this._cardReviews[cr.card.id] = cr;
    });
    this.emit();
  },

  deckMetaUpdate(deckInfos) {
    this._deckInfos = deckInfos;
    this._updateCurrentDeckInfo();
  },

  _updateCurrentDeckInfo() {
    if (this._currentDeckID == null) {
      return;
    }

    var deck = this._deckInfos.filter((d) => {
      return d.id === this._currentDeckID;
    });
    if (deck.length !== 1) {
      return;
    }
    this._currentDeckInfo = deck[0];
  },

  cardUpdate(cards) {
    this._cards = cards;
  },

  _qualifyingCards() {
    let now = moment();
    return this._cards.filter((c) => {
      return c.deckID === this._currentDeckID && now >= c.dueDate;
    }, this);
  },

  _createReviews(cards) {
    var makeReviews = function(sideOne, sideTwo) {
      return cards.map((card) => {
        let others = cards.filter((other) => {
          return other.id !== card.id;
        });

        return {
          orientation: sideOne,
          cardID: card.id,
          prompt: card[sideOne],
          correctAnswer: card[sideTwo],
          answers: _.shuffle([card[sideTwo]].concat(_.sample(_.pluck(others, sideTwo), 3)))
        };
      });
    };
  },

  onCardReview(cardID, orientation, correct) {
    let cardReview = this._cardReviews[cardID];
    if (orientation === 'front') {
      cardReview.reviewFront(correct);
    } else {
      cardReview.reviewBack(correct);
    }

    if (cardReview.done()) {
      let change = cardReview.correct ? 1 : -1;
      let card = cardReview.card;

      card.strength = card.strength + change;
      if (card.strength < 0) {card.strength = 0;}
      card.dueDate = CardReview.newDueDate(card.strength);
      CardActions.editCard(card);
    }
  },

  onReviewDeck(deckID) {
    this._currentDeckID = deckID;
    this._recalculate();
  }
});
