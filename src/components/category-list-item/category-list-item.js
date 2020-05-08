import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class CategotyListItem extends Component{
    state = {
        id:0
    }
    render()
    {
        const {name, creator, expiration_time, onCategoryClick, id} = this.props;
        const time = expiration_time.slice(0,10);
        return(
            
                <>
                    <td className="column100 column1" data-column="column1">
                            <Link to="/candidate-list"
                            onClick = {onCategoryClick}
                            >{name } </Link> 
                    </td>
                    <td className="column100 column2" data-column="column2">
                            {time}    
                    </td>
                </>   
        );
    };
}

