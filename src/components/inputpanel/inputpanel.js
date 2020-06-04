import React, {Component} from 'react';

import './inputpanel.css';

export default class InputPanel extends Component {

    state = {
        term: ''
    }
    onInputChange = (e)=>{
        const term = e.target.value;
        this.setState({term});
        this.props.onInputChange(term);
    }

    render() {
        return (
            <div className = "input-class ">
                <input placeholder = "search smth"
                value = {this.state.term}
                onChange = {this.onInputChange} ></input>
            </div>
        );
    }
    
}
