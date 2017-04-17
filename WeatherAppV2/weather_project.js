import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  AsyncStorage,
  Image
} from 'react-native';

import Forecast from './Forecast';
import LocationButton from './LocationButton';

const STORAGE_KEY = '@WeatherAppV2:zip';
const WEATHER_API_KEY = 'bbeb34ebf60ad50f7893e7440a1e2b0b';
const API_STEM = 'http://api.openweathermap.org/data/2.5/weather?';

import PhotoBackdrop from './PhotoBackdrop/local_image';

class WeatherProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forecast: null
    }

    this._getForecast = (url, cb) => {
      fetch(url)
        .then((response) => response.json())
        .then((responseJSON) => {
          this.setState({
            forecast: {
              main: responseJSON.weather[0].main,
              description: responseJSON.weather[0].description,
              temp: responseJSON.weather[0].main.temp
            }
          })
        })
        .catch((error) => {
          console.warn(error);
        })
    }

    this._getForecastForZip = zip => {
      AsyncStorage.setItem(STORAGE_KEY, zip)
        .then(() => console.log('Saved selection to disk: ' + zip))
        .catch((error) => console.log('AsyncStorage error: ' + error.message))
        .done();

        this._getForecast(`${API_STEM}q=${zip}&units=imperial&APPID=${WEATHER_API_KEY}`);
    }

    this._getForecastForCoords = (lat, lon) => {
      this._getForecast(`${API_STEM}lat=${lat}&lon=${lon}&units=imperial&APPID=${WEATHER_API_KEY}`);
    }

    this._handleTextChange = event => {
      var zip = event.nativeElement.text;
      this._getForecastForZip(zip);
    }
  }

  componentDidMount() {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((value) => {
        if (value !== null) {
          this._getForecastForZip(value);
        }
      })
      .catch((error) => console.log('AsyncStorage error: ', error.message))
      .done();
  }

  render() {
    var content = null;
    if (this.state.forecast !== null) {
      content = (
        <View style={styles.row}>
          <Forecast
            main={this.state.forecast.main}
            description={this.state.forecast.description}
            temp={this.state.forecast.temp} />
        </View>
      );
    }

    return(
      <PhotoBackdrop>
        <View style={styles.overlay}>
          <View style={styles.row}>
            <Text style={textStyles.mainText}>
              Current weather for:
            </Text>
            <View style={styles.zipContainer}>
              <TextInput
                style={[textStyles.mainText, styles.zipCode]}
                returnKeyType='go'
                onSubmitEditing={this._handleTextChange} />
            </View>
          </View>
          <View style={styles.row}>
            <LocationButton onGetCoords={this._getForecastForCoords} />
          </View>

          {content}

        </View>
      </PhotoBackdrop>
    )
  }
}

import textStyles from './styles/typography';
const styles = StyleSheet.create({
  overlay: {
    paddingTop: 5,
    backgroundColor: '#000000',
    opacity: 0.5
  },
  row: {
    width: 400,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30
  },
  zipContainer: {
    flex: 1,
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    marginLeft: 5,
    marginTop: 3,
    width: 10
  },
  zipCode: {
    width: 50,
    height: textStyles.baseFontSize
  }
})

export default WeatherProject;
