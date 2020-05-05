import React from 'react';
import { Link } from 'react-router-dom';


/*if(!isLogin){
      return(
        <div className = 'header d-flex'>
      <ul className="d-flex justify-content-end">
        <li>
          <Link to="/login">Votings</Link>
        </li>
        <li>
          <Link to="/login">Create a category</Link>
        </li>
      </ul>
    </div>
      )
    }
    else{*/



const HeaderPanel = ({isLogin}) =>{
    
    return(

        <div className = 'header d-flex'>
      <ul className="d-flex justify-content-end">
        <li>
          <Link to="/category-list">Votings</Link>
        </li>
        <li>
          <Link to="/create-category">Create a category</Link>
        </li>
      </ul>

    </div>
    );
};
export default HeaderPanel;