import React, { Component } from 'react';
import VoteService from '../../services/knuvote-service';
import DatePicker from "react-datepicker";
import Editing from '../editing';
import { BrowserRouter as Router, Route,Redirect, Switch } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import './create-category.css';

export default class CreateCategory extends Component{
    obj = new VoteService();
    
    state = {
        name: '',
        expiration_time: new Date(),
        startDate: new Date(),
        form_next: false,
        categoryId:0,
        err: false,
        msg: ''
    }

    onChangeName =(e) =>{this.setState({name:e.target.value});};
    onChangeTime =(e) =>{this.setState({expiration_time:e.target.value});};

    onBClick=(e)=>{
        e.preventDefault();
        this.obj.createCategory(this.state.name, this.state.expiration_time, localStorage.getItem('token')).then(
            (e)=>{
                if(e.message === "Incorrect data" || e.message === "Access forbidden"){
                    this.setState({msg:e.message})   
                }
                    else{
                    this.setState({
                        categoryId:e.id,
                        err:true                      
                    });}
            }
        )
    }
    handleChange = date => {
        this.setState({
           expiration_time: `${date.toJSON()}`,
           startDate: date
        });
      };
    onSubmit(e){
        e.preventDefault();
    }
    render(){
        const {name, err, msg,expiration_time,form_next,categoryId} = this.state;
        const next =  err ? <Redirect to ="/editing"/> : msg;
        return(
            <div>
                 <form>
                 
                    <input value = {name} onChange={this.onChangeName} ontype="text" class="form-control" required placeholder="Name"/>    
                    <DatePicker selected={this.state.startDate} onChange={this.handleChange} placeholder="Date of expiration"/>
                    <button onClick = {this.onBClick}>Add category</button>
                    
                    
                 </form>
                 {next}
            </div>
      )
    }
}