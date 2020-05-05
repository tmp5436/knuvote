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
    setIsLogin(false);
  };

  return(
    <div className = 'header d-flex'>
      <h3>
        <Link to ="/">
          {'KNU Vote'}
          </Link>
      </h3>
      <ul className ="d-flex">
        {Object.entries(LINKS).map(([path,text])=>
        (
          <li className = {isLogin? 'hidden':''}>
            <Link to={path}>{text}</Link>
          </li>
        ))}
        <li className = {isLogin? '':'hidden'}>
          <Link to ="/logout"
          onClick={onClickLabel} >Log out</Link>
        </li>
        </ul>
    </div>
  )

}

export default Header;