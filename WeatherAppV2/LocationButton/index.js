import React, {Component} from 'react';
import Button from '../Button';
import styles from './styles';

class LocationButton extends Component {
  constructor() {
    super();

    this._onPress = () => {
      navigator.geolocation.getCurrentPosition((initialPosition) => {
        this.props.onGetCoords(initialPosition.coords.latitude, initialPosition.coords.longitude);
      }, (error) => {
        alert(error.message)
      }, {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
    }
  }

  render() {
    return(
      <Button label="Use CurrentLocation"
        style={styles.LocationButton}
        onPress={this._onPress.bind(this)} />
    )
  }

  propTypes: {
    onGetCoords: React.propTypes.func.isRequired
  }
}

export default LocationButton;
