import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	View
} from 'react-native';

import styles from './styles';

class Flexbox extends Component {
	render() {
		return(
			<View style={styles.parent}>
				<View style={styles.topBlock}>
					<View style={styles.leftCol}>
						<View style={[styles.cellOne, styles.base]} />
						<View style={[styles.cellTwo, styles.base]} />
					</View>
					<View style={[styles.cellThree, styles.base]} />
				</View>
				<View style={styles.bottomBlock}>
					<View style={[styles.cellFour, styles.base]} />
					<View style={[styles.cellFive, styles.base]} />
					<View style={styles.bottomRight}>
						<View style={[styles.cellSix, styles.base]} />
						<View style={[styles.cellSeven, styles.base]} />
					</View>
				</View>
			</View>
		)
	}
}

export default Flexbox;