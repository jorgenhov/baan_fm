import React, { Component } from 'react';

import { ACCESS_TOKEN } from '../constants';
import { getCurrentUser, getGoogleMapsApiKey } from '../util/APIUtils';

import Header from './header/Header';
import AdminLogin from './adminuser/AdminLogin';
import CreateUser from './actions/create/CreateUser';

class Admin extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    if(localStorage.getItem(ACCESS_TOKEN)){
      this.loadCurrentUser();
    }
  }

  loadCurrentUser() {
    this.setState({
      isLoading: true
    });
    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response,
        isAuthenticated: true,
        apiKey: response.gmkey,
        isLoading: false
      });
    }).catch(error => {
      this.setState({
        isLoading: false
      });
    });
  }

  handleLogin() {
    console.log('loggedin');
    this.loadCurrentUser();
  }

  handleLogout() {

    console.log('Logout');

    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false,
      apiKey: null
    });
  }

  render() {
    let logicPanes;
    if(this.state.isAuthenticated){
      logicPanes =
      <div className="bodyClass">
        <CreateUser />
      </div>
    }else {
      logicPanes =
      <div className="bodyClass">
        <AdminLogin onLogin={this.handleLogin}/>
      </div>
    }

    return(
      <div>
        <Header />
        {logicPanes}
      </div>
    )
  }

}
export default Admin
