import React, { Component } from 'react';
import { FacebookLogin } from 'react-facebook-login-component';
import axios from 'axios';

class App extends Component {
  render() {
    return (
      <div>
        <FacebookLogin socialId="181150639765986"
                       language="en_US"
                       scope="public_profile,email"
                       fields="id,name,email"
                       responseHandler={this.responseFacebook}
                       xfbml={true}
                       disabled={false}
                       version="v2.5"
                       className="facebook-login"
                       buttonText="Login With Facebook"/>
      </div>
    );
  }

  responseFacebook (response) {
    
    console.log(response);
    console.log(response.accessToken);


    axios.post(`https://knuvote.herokuapp.com/api/v1/knuvote/user/login/`, {
      accessToken: response.accessToken
     })
      .then(res => {
        console.log(res);
      })
  }
}

export default App;