import React, {Component} from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import Button from '../Button';
import NormalText from '../NormalText';
import Input from '../Input';

class CreateDeckButton extends Component {
  render() {
    return(
      <Button
        style={styles.createDeck}
        onPress={this.props.onPress}>
        <NormalText>Create Deck</NormalText>
      </Button>
    );
  }
}

class EnterDeck extends Component {
  constructor(props) {
    super(props);

    this.state = {text: ""};

    this._create = () => {
      this.props.create(this.state.text);
    }
  }

  render() {
    return(
      <View style={styles.EnterDeck}>
        <Input
          onEntry={this.props.create}
          onChange={(text) => {this.setState({text});}} />
        <CreateDeckButton onPress={this._create} />
      </View>
    )
  }
}

EnterDeck.propTypes = {
  create: React.PropTypes.func.isRequired
}

class DeckCreation extends Component {
  constructor(props) {
    super(props);

    this.state = {showingNameField: false};

    this._newDeck = (name) => {
      this.props.newDeck(name);
      this.setState({showingNameField: false});
    }

    this._showField = () => {
      this.setState({showingNameField: true});
    }
  }

  render() {
    var contents = this.state.showingNameField
    ? <EnterDeck create={this._newDeck} />
    : <CreateDeckButton onPress={this._showField} />;
    return contents;
  }
}

DeckCreation.propTypes = {
  newDeck: React.PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  nameField: {
    backgroundColor: colors.tan,
    height: 40
  },
  wideButton: {
    justifyContent: 'center',
    flex: 1,
    padding: 10,
    margin: 10
  },
  createDeck: {
    backgroundColor: colors.green
  }
});

export default DeckCreation;
