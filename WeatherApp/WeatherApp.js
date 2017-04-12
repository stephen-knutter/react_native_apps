import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
	TextInput,
	Image
} from 'react-native';
import Forecast from './Forecast';

const API_KEY = 'bbeb34ebf60ad50f7893e7440a1e2b0b';

export class WeatherApp extends Component {
	constructor() {
		super();
		this.state = {
			zip: '',
			forecast: null
		};
		
		this._handleTextChange = event => {
			var zip = event.nativeEvent.text;
			this.setState({zip: zip});
			fetch('http://api.openweathermap.org/data/2.5/weather?q=' + 
						zip + '&units=imperial&APPID=' + API_KEY)
				.then((response) => response.json())
				.then((responseJSON) => {
					console.log(responseJSON);
					this.setState({
						forecast: {
							main: responseJSON.weather[0].main,
							description: responseJSON.weather[0].description,
							temp: responseJSON.main.temp
						}
					});
				})
				.catch((error) => {
					console.warn(error);
				})
		}
	}
	
  render() {
		var content = null;
		if (this.state.forecast !== null) {
			content = <Forecast 
									main={this.state.forecast.main}
									description={this.state.forecast.description}
									temp={this.state.forecast.temp} />;
		}
    return (
				<View style={styles.container}>
				
					<Image 
						source={require('./img/summer.jpg')}
						resizeMode='cover'
						style={styles.backdrop} >
						
						<View style={styles.overlay}>
							<View style={styles.row}>
								<Text style={styles.mainText}>
									Enter Zip Code:
								</Text>
								<View style={styles.zipContainer}>
									<TextInput 
										style={styles.zipCode}
										onSubmitEditing={this._handleTextChange} />
								</View>
							</View>
							
							{content}
							
						</View>
						
					</Image>
					
				</View>
    );
  }
}

let baseFontSize = 16;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  
  },
	backdrop: {
		flex: 1,
		flexDirection: 'column',
	},
	overlay: {
		backgroundColor: '#000000',
		opacity: 0.5,
		flexDirection: 'column',
		alignItems: 'center',
	},
  row: {
		flexDirection: 'row',
		flexWrap: 'nowrap',
		alignItems: 'flex-start',
		paddingBottom: 10,
		paddingTop: 20
	},
	zipContainer: {
		marginLeft: 5,
		marginTop: 5,
	},
	zipCode: {
		fontSize: baseFontSize,
		color: '#ffffff',
		width: 55
	},
	mainText: {
		marginTop: 17,
		fontSize: baseFontSize,
		color: '#ffffff',
	}
});

export default WeatherApp;