import React, {Component} from 'react';
import {Switch} from 'react-native';

export class Switcher extends Component {
	constructor() {
		super();
		this.state = {
			value: false
		}
	}
	
	_onValueChange(value) {
		this.setState({value: value});
		if (this.props.onValueChange) {
			this.props.onValueChange(value);
		}
	}
	
	render() {
		return(
			<Switch
				onValueChange={this._onValueChange} 
				value={this.state.value} />
		)
	}
}

export default Switcher;