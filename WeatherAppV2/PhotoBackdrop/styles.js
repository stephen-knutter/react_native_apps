import {StyleSheet} from 'react-native';

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

export default styles;
