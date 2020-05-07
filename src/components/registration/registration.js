import React, { Component } from 'react';
import './registration.css';
import VoteService from '../../services/knuvote-service';
import QueryString from 'query-string';
import logo from './images/signup-image.jpg';

export default class Registration extends  Component{
    state = {
       username: '',
       email: '' ,
       password: ''
  
    }

    obj = new VoteService();

    onSubmit=(e)=>{
        e.preventDefault();
        this.obj.registration(this.state)

    }

    onChangeEmail =(e) =>{
        this.setState({
            email:e.target.value
        });
    };
    onChangeUsername =(e) =>{
        this.setState({
            username:e.target.value
        });
    };
    onChangePassword =(e) =>{
        this.setState({
            password:e.target.value
        });
    };
    onButtonClick = () =>{
        this.obj.registration(this.state)
    }

    render(){
        const {username,email,password} =this.state;
        return(   
             <div class="main">
                <section class="signup">
                    <div class="container">
                        <div class="signup-content">
                            <div class="signup-form">
                                <h2 class="form-title">Registration</h2>
                                <form className = "register-form" id="register-form"
                                onSubmit = {this.onSubmit}>
                                    <div class="form-group">
                                        <label for="email"><i class="zmdi zmdi-email"></i></label>
                                        <input value={email} onChange = {this.onChangeEmail} type="email" id="email" placeholder="Your Email"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                                        <input value={username} onChange = {this.onChangeUsername} type="text" id="name" placeholder="Username" />
                                    </div>
                                    <div class="form-group">
                                        <label for="pass"><i class="zmdi zmdi-lock"></i></label>
                                        <input value={password} onChange = {this.onChangePassword} type="password" id="pass" placeholder="Password" />
                                    </div>
                                    <button 
                                    type="button" 
                                    className="form-submit"
                                    id="signup"
                                    onClick={this.onButtonClick} >
                                    Submit</button>

                                </form>
                            </div>
                            <div class="signup-image">
                                <figure><img src={logo} /></figure>
                                <a href="/login" class="signup-image-link">I am already member</a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
    
};
