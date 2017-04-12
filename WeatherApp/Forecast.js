import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export class Forecast extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	
	render() {
		if (this.props) {
			return(
				<View>
					<Text style={styles.bigText}>
						{this.props.main}
					</Text>
					<Text style={styles.mainText}>
						Current conditions: {this.props.description}
					</Text>
					<Text style={styles.bigText}>
						{this.props.temp} F
					</Text>
				</View>
			)
		}
		return null;
	}
}

const styles = StyleSheet.create({
	bigText: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
		color: '#ffffff'
	},
	mainText: {
		fontSize: 16,
		textAlign: 'center',
		color: '#ffffff'
	}
});

export default Forecast;