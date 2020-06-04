import React, { Component }  from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import VoteService from '../../services/knuvote-service';


const LINKS = {
  '/login': 'Log in',
  '/registration':'Registration'
};

const Header = () => {
  const [isLogin, setIsLogin] = React.useState(localStorage.getItem('isLogin')==='true');

  React.useEffect(()=>{
  if(localStorage.getItem('isLogin')==='false'){
  localStorage.setItem("token", undefined);
  localStorage.setItem("username", undefined);
  localStorage.setItem("id", undefined)
      }
    },
  );

  const onClickLabel = ()=> {
    localStorage.setItem('isLogin',false);
    localStorage.setItem('email','')
    setIsLogin(false);
  };
    
  return(
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="/">
            KNUVote
          </a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="true" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                

              
                    {Object.entries(LINKS).map(([path,text])=>
                    (
                      <li className = {isLogin? 'hidden':"nav-item active"}>
                        <a class="nav-link" href={path}>{text}<span class="sr-only">(current)</span></a>
                        
                      </li>
                    ))}
                    <li className = {isLogin? "nav-item active":'hidden'}>
                      <Link class="nav-link" to ="/logout"
                      onClick={onClickLabel} >Log out</Link>
                      
                    </li>
                    <li className = "user">{localStorage.getItem('email') === 'undefined' ? '' : localStorage.getItem('email')}</li>
            </ul>
          </div>
    </nav>
    
  )

}

export default Header;
