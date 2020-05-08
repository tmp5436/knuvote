import React, { Component } from 'react';
import VoteService from '../../services/knuvote-service';
import DatePicker from "react-datepicker";
import Edit from '../editing';
import { BrowserRouter as Router, Route,Redirect, Switch } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import './create-category.css';

export default class CreateCategory extends Component{
    obj = new VoteService();
    
    state = {
        name: '',
        expiration_time: "",
        startDate: new Date(),
        form_next: false,
        categoryId:0
    }

    onChangeName =(e) =>{this.setState({name:e.target.value});};
    onChangeTime =(e) =>{this.setState({expiration_time:e.target.value});};

    onBClick=(e)=>{
        e.preventDefault();
        this.obj.createCategory(this.state.name, this.state.expiration_time, localStorage.getItem('token')).then(
            (e)=>{
                    this.setState({
                        categoryId:e.id,
                       
                    })
                    this.setState(
                        prevState => {
                          return {
                            ...prevState,
                            form_next:true,
                        };
                      }
                    );
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
        const {name, expiration_time,form_next,categoryId} = this.state;
        return(
             <div class="limiter">
                <div class="container-table100">
                    <div class="wrap-table100">
                        <div class="table100 ver1 m-b-110">
            <form>
                            <table data-vertable="ver1">
                                <thead>
                                    <tr class="row100 head">
                                        <th class="column100 column1" data-column="column1">Name of category</th>
                                        <th class="column100 column2" data-column="column2">Expiration date</th>
                                        <th class="column100 column3" data-column="column3">Save</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="row100">
                                        
                                            <td class="column100 column1" data-column="column1"><input className="form-control"value = {name} onChange={this.onChangeName} ontype="text" placeholder="Name"/></td>                    
                                            <td class="column100 column2" data-column="column2"><DatePicker selected={this.state.startDate} onChange={this.handleChange} placeholder="Date of expiration"/></td>
                                            <td class="column100 column3" data-column="column3"><button class="btn btn-success" type="submit" onClick = {this.onBClick}>Add category</button>
                                            <Route
                                                exact
                                                path="/editing"
                                                render={() => (form_next ? (<Redirect to="/editing"/>) : 
                                                <span>error</span>)}/></td>
                                         
                                    </tr>
                                </tbody>
                            </table>
            </form>
                        </div>
                    </div>
                </div>
            </div>
      )
    }
}