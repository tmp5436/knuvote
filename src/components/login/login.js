import React, { Component } from 'react';
import VoteService from '../../services/knuvote-service';
import "./fonts/material-icon/css/material-design-iconic-font.min.css"
import logo from './images/signin-image.jpg';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

import './login.css';
import { Redirect } from 'react-router';

export default class Login extends Component{
    state = {
        email:'',
        password:'',
        isLogin: false,
        userData :{},
        msg: ''     
    }

    obj = new VoteService();

    onSubmit(e){
        e.preventDefault();
        this.obj.login(this.state);

    }
    componentDidMount=()=>{
        this.setState({
            isLogin: localStorage.getItem('isLogin') === 'true'
        })
    }
    onButtonClick = () =>{
        this.obj.login(this.state).then((e)=>{
            if (e.token === undefined || e.message === "Invalid email or password"){
                this.setState({
                    isLogin:false,
                    msg: e.message
                }); 
                
            }else{
            this.setState({
                
                isLogin: true,  
                userData: e                 
            }); window.location.reload();  }        
            
            localStorage.setItem('username', this.state.userData.username);
            localStorage.setItem('token', this.state.userData.token);
            localStorage.setItem('email', this.state.userData.email);
            localStorage.setItem('id', this.state.userData.id);
            localStorage.setItem('isLogin',this.state.isLogin);
            this.props.getUserData(this.state.isLogin);
            
           }
        );                   
    }

    onChangeUsername =(e) =>{this.setState({ email:e.target.value});};
    onChangePassword =(e) =>{this.setState({password:e.target.value});};

    responseFacebook = response =>{
        console.log(response);
        
        this.obj.socialLogin(response.name,response.accessToken,response.email,response.id,"FACEBOOK").then((e)=>{
            this.setState({              
                isLogin: true,  
                userData: e                 
            });
            localStorage.setItem('username', this.state.userData.username);
            localStorage.setItem('token', this.state.userData.token);
            localStorage.setItem('email', this.state.userData.email);
            localStorage.setItem('id', this.state.userData.id);
            localStorage.setItem('isLogin',this.state.isLogin);
            this.props.getUserData(this.state.isLogin);
            window.location.reload();
        })
    }

    onFacebookClick = () =>{
       
            
    }
    responseGoogle = response =>{
        console.log(response)
        this.obj.socialLoginGoogle(response.profileObj.name, response.tokenId, response.profileObj.email, response.profileObj.googleId, "GOOGLE").then((e)=>{
            this.setState({              
                isLogin: true,  
                userData: e                 
            });
            localStorage.setItem('username', this.state.userData.username);
            localStorage.setItem('token', this.state.userData.token);
            localStorage.setItem('email', this.state.userData.email);
            localStorage.setItem('id', this.state.userData.id);
            localStorage.setItem('isLogin',this.state.isLogin);
            this.props.getUserData(this.state.isLogin);
            window.location.reload();
        })
    }

    render(){
        const {email, password, isLogin, msg} = this.state;
        const login = isLogin ? <Redirect to = "/" /> : msg;
        let fb = (<FacebookLogin
        
        appId="783569722047672"
        autoLoad={false}
        fields="name,email,picture"
        onClick = {this.onFacebookClick}
        callback={this.responseFacebook}
        cssClass='display-flex-center zmdi zmdi-facebook-box'   
        textButton='Login'/>)

        let google = (
            <GoogleLogin
                clientId="132881880043-logcl1evsro58htse5k52chbcffm8fip.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                
                buttonText = 'Login'
                autoLoad = {false}
                
            />)

        return(
            <div className="main">
                
                <section className="sign-in">
                    <div className="container">
                        <div className="signin-content">
                            <div className="signin-image">
                                <figure><img src={logo} /></figure>
                                <a href="/registration" className="signup-image-link">Create an account</a>
                            </div>
            
                            <div className="signin-form">
                                <h2 className="form-title">Log In</h2>
                                <form className="register-form" id="login-form"
                                     onSubmit = {this.onSubmit}>
                                    <div className="form-group">
                                        <label for="your_name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                        <input value={email} onChange = {this.onChangeUsername}type="text" id="your_name" required placeholder="Email" aria-label="Username" aria-describedby="basic-addon1"></input>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="your_pass"><i className="zmdi zmdi-lock"></i></label>
                                        <input  value={password} onChange = {this.onChangePassword} type="password" id="your_pass" required placeholder="Password" aria-label="Username" ></input>
                                    </div>
                                    <button  
                                    onClick = {this.onButtonClick} 
                                    type="button" 
                                    id="signin"
                                    className="form-submit">Log In</button>
                                </form>
                                {login}
                                <div className="social-login">
                                <span className="social-label">Or login with</span>
                                <ul className="socials">
                                 <li clasName=''>    {fb}</li>
                                <li><i >{google}</i></li>
                                </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
                        
        );
    }
};