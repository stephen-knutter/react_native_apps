import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	View
} from 'react-native';

import Switcher from './switcher';

class CrossPlatform extends Component {
	constructor() {
		super();
		
		this.state = {
			val: false
		}
		
		this._onValueChange = (val) => {
			this.setState({val: val});
		}
	}
	
	render() {
		let colorClass = this.state.val ? styles.blueContainer : styles.redContainer;
		return(
			<View style={[colorClass, styles.container]}>
				<Text style={styles.welcome}>
					Make me blue!
				</Text>
				<Switcher onValueChange={this._onValueChange} />
			</View>
		)
	}
}

let styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	blueContainer: {
		backgroundColor: '#5555FF'
	},
	redContainer: {
		backgroundColor: '#FF5555'
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10
	}
});

export default CrossPlatform;