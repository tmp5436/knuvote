import React, { Component } from 'react';
import './category-list.css';
import CategoryListItem from '../category-list-item';
import VoteService from '../../services/knuvote-service';

export default class CategoryList extends Component{

    state = {
        term: ''
    }
    obj = new VoteService();

    search(items, term){
        if(term.length === 0){
            return items
        }
    
         return items.filter((item)=>{
                return item.name.toLowerCase().indexOf(term.toLowerCase())>-1
        });
    };
    onInputChange = (e)=>{
        const term = e.target.value;
        this.setState({term});
        
    }    

    render(){
        const {arr, onCategoryClick}= this.props;
        const {term}= this.state;
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
            <div className="limiter">
                <div className="container-table100">
                    <div className="wrap-table100">
                        <div className="table100 ver1 m-b-110">	
                             <table data-vertable="ver1">
                                        <thead>
                                            <tr className="row100 head">
                                                <th className="column100 column1" data-column="column1">Name and Expirations</th>
                                            </tr>
                                        </thead>
                                            <input placeholder = "Search"
                                                    className="form-control"
                                                    value = {term}
                                                    onChange = {this.onInputChange} />                                           
                                        <tbody>                                        
                                            {elements}                                          
                                        </tbody>
                             </table>
                        </div>
                    </div>
                </div>
            </div>  
     );
    }
}

