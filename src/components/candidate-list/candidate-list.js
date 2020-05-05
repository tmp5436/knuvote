import React, { Component } from 'react';
import CandidateListItem from '../candidate-list-item';
import VoteService from '../../services/knuvote-service';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './candidate-list.css';

export default class CandidateList extends Component{
    obj = new VoteService();
    cand = new VoteService();
    edit = new VoteService ();
    state={
        name:'',
        candidates: [],
        err: false,
        expiration_time: '',
        catName: '',
        id: 0
        
    }

    onClick = (e)=>{
        e.preventDefault();
            this.obj.addCandidate(this.props.categoryId, this.state, localStorage.getItem('token')).then((e)=>
            {
            if(e.message === "Access forbidden"){
                this.setState({
                    err:true
                });
            };         
        });
        this.setState({
            candidates:[],
        });
        
        this.updateCandidate(); 
        
        
    }
    onChangeInput =(e) =>{this.setState({ name:e.target.value});};
    onChange =(e) =>{this.setState({ catName:e.target.value});};
    
    componentDidMount=()=>{
        this.updateCandidate();  
        this.setState({catName: this.props.categoryName, id: this.props.categoryId})
    }
    componentDidUpdate (prevState){
        if(this.props.categoryId !== prevState.categoryId ){
            this.updateCandidate();  
        }
    }

    updateCandidate=()=>{
        const {categoryId} = this.props;
        if (categoryId === 0){
            return ;
        }
        this.cand.getCandidates(this.props.categoryId).then((e)=>{
            if(e.message === "Access forbidden"){
                this.setState({
                    err:true
                });
            };      
                this.setState(prevState => ({
                    candidates: [...prevState.candidates, ...e]
                  }));            
            });         
    }; 
    onClickEdit = (e) => {
        e.preventDefault();

        this.edit.editCategory(this.state.catName,this.state.id,  this.state.expiration_time, localStorage.getItem('token')).then((e)=>
        {
            if(e.message === "Access forbidden"){
                this.setState({
                    err:true
                });
            };         
        });
        this.setState({
            candidates:[],
        })
        this.updateCandidate(); 

    }
    handleChange = date => {
        this.setState({
           expiration_time: `${date.toJSON()}`
        });
      };

    render(){
        const {categoryId, categoryName, time} = this.props;
        const utc = time.slice(0,10);
        const {candidates,err} = this.state;
        const ErrorIndicate = err ? <span class="border border-danger">You don't creator of this category</span> : <span> </span>;
        const selectedCandidates = candidates.filter(cand => cand.category_id === categoryId)
           const elements = selectedCandidates.map((item)=>{
            const {id, ...allitems} = item;
                return (<li key = {id} className = "list-group-item">    
                <CandidateListItem {...item} categoryId = {categoryId} updateCandidate={()=>this.updateCandidate} />
                    </li>
            );
        });  
        
        return (
        <ul className = "list-group ">
         <div>
            
             <h5>Name: {categoryName}</h5>
             <h5>Expiration time: {utc}</h5>
             <input placeholder = "find a category"/>
             </div>
        
            {elements}
            <div>
            <div className = "foo1">
                <input 
                    value = {this.state.name}
                    onChange = {this.onChangeInput}
                    placeholder = "Name of candidate"/>
                <button
                    onClick = {this.onClick}>
                    Add candidate</button>
                    
            </div>
            <div className = "foo2 d-flex">
                <div>
                <input value = {this.state.catName} onChange={this.onChange} />
                <DatePicker  onChange={this.handleChange} placeholder="Date of expiration"/>
                </div>
                <button onClick = {this.onClickEdit}>Edit a category</button>
                
            </div>
            {ErrorIndicate} 
            </div>
            
       </ul>
     );
    }
}