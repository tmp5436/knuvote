import React, { Component } from 'react';
import VoteService from '../../services/knuvote-service';

export default class CandidateListItem extends Component {
    obj = new VoteService();
    
    onClick=(e)=>{
        e.preventDefault();
        this.obj.vote(this.props.categoryId, this.props.id, localStorage.getItem('token')).then((e)=>{
            this.props.updateCandidate();
        });
    }
    // componentDidUpdate (prevState) {
    //     if(this.props.countvotes !== prevState.countvotes){
    //         this.props.updateCandidate(); 
    //     }
    // }

    render(){
        const {id, name, countvotes, categoryId} = this.props;
        return(
            <div>
                <td className="column100 column1" data-column="column1">
                        {name}
                </td>
           
                <td className="column100 column2" data-column="column2">
                          { countvotes  }      
                </td>
                <td className="column100 column6" data-column="column6">
                    <button className="fas fa-vote-yea btn btn-success " onClick={this.onClick}>Vote</button>
                </td>
            </div>
            
        )
    }
}