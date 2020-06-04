import React, {Component} from 'react';
import './item-status-filter.css';

export default class ItemsStatus extends Component{
    render(){
        return (
            <div className = 'buttons d-flex btn-group'>
                <button className = "btn btn-outline-info">All</button>
                <button className = "btn btn-outline-secondary">Active</button>
                <button className = "btn btn-outline-secondary">Done</button>
            </div>
        );
    }
}