import React, { Component } from 'react';
import './category-list.css';
import CategoryListItem from '../category-list-item';
import VoteService from '../../services/knuvote-service';

export default class CategoryList extends Component{

    state = {
        term: '',
        stats: {},
        boolasc: false
    }
    obj = new VoteService();
    sta = new VoteService();

    search(items, term){
        if(term.length === 0){
            return items
        }
         return items.filter((item)=>{
                return item.name.toLowerCase().indexOf(term.toLowerCase())>-1
        });
    };
    componentDidMount = ()=>{
        this.getStats();
    }
    onInputChange = (e)=>{
        const term = e.target.value;
        this.setState({term});        
    }    
    getStats (){     
            this.sta.getStatsCategory().then((e)=>{
                this.setState({
                    stats:e
                })
            })   
    }
   

    render(){
        const {arr, onCategoryClick}= this.props;
        const {term,stats}= this.state;
        const visibleItems = this.search(arr, term);
        


        const elements = visibleItems.map((item)=>{
            const {id, name, expiration_time} = item;
                return (<li key = {id} className = "list-group-item">    
    
                <CategoryListItem
                {...item}
                onCategoryClick = {()=>onCategoryClick(id, name,expiration_time)}
                id= {id} />
                    </li>
            );
        });  
        return (
            <div>          
            <div className="limiter">  
                <div className="container-table100">
                    <div className="wrap-table100">
                        <ul>
                            <li>Count categories: {arr.length}</li>
                            <li>All votes: {stats.countVotes}</li>
                            <li>Top category: {stats.topCategory}</li>
                        </ul>
                        <div className="table100 ver1 m-b-110">	
                             <table data-vertable="ver1">
                                        <thead>
                                            
                                            <tr className="row100 head">
                                                <th className="column100 column1" data-column="column1">Name and Expirations</th>
                                                   
                                            </tr>
                                        </thead>
                                        <div className = "header d-flex">
                                            <input placeholder = "Search"
                                                    className="form-control"
                                                    value = {term}
                                                    onChange = {this.onInputChange} /> 
            
                                                    <button className = "btn btn-secondary" onClick={this.props.onClickAsc}> A-Z </button>
                                                     
                                                    <button className = "btn btn-secondary" onClick={this.props.onClickDesc}> Z-A </button>

                                                    
                                                    
                                                    </div>                                          
                                        <tbody>                                        
                                            {elements}                                          
                                        </tbody>
                             </table>
                        </div>
                    </div>
                </div>
            </div> 
            </div> 
     );
    }
}

