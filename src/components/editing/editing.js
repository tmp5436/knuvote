import React, { Component } from 'react';
import VoteService from '../../services/knuvote-service';

export default class Editing extends Component{
    obj = new VoteService();
    state ={
        name : '',
        msg:''
    }

    onChange = (e)=>{this.setState({name:e.target.value})}

    onClick =(e)=>{
        e.preventDefault();
        this.obj.addCandidate(localStorage.getItem('catId'), this.state, localStorage.getItem('token')).then((e)=>{
            this.setState({
                msg: `Added ${this.state.name}`
            })
        })
    }

    render(){
        
    return(
         <div class="limiter">
                <div class="container-table100">
                    <div class="wrap-table100">
                        <div class="table100 ver1 m-b-110">
            <form>
                            <table data-vertable="ver1">
                                <thead>
                                    <tr class="row100 head">
                                        <th class="column100 column1" data-column="column1">Name</th>
                                        <th class="column100 column2" data-column="column2">Save</th>
                                        <th class="column100 column3" data-column="column3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="row100">
                                        
                                            <td class="column100 column1" data-column="column1"><input className="form-control"value = {this.state.name} onChange = {this.onChange} required placeholder = "Name"/></td>                    
                                            <td class="column100 column2" data-column="column2"><button class="btn btn-success" type="submit" onClick = {this.onClick}>Add candidate</button>
                                            </td>
                                            <td class="column100 column3" data-column="column3"><span>{this.state.msg}</span></td>
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
