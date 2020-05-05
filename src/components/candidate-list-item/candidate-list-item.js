import React, { Component } from 'react';
import VoteService from '../../services/knuvote-service';

export default class CandidateListItem extends Component {
    obj = new VoteService();
    
    onClick=(e)=>{
        e.preventDefault();
        this.obj.vote(this.props.categoryId, this.props.id, localStorage.getItem('token'));
        
    }
    componentDidUpdate (prevState) {
        if(this.props.countvotes !== prevState.countvotes){
            this.props.updateCandidate(); 
        }
    }

    render(){
        const {id, name, countvotes, categoryId} = this.props;
        return(
            <span>{name} countvotes = { countvotes  }
            <button onClick={this.onClick}>Vote</button>
            </span>
        )
    }
}