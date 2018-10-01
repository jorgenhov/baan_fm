import React, { Component } from 'react';
import { Header } from './Layouts';
import LogicPane from './Logic/LogicPane';
//import SimpleMap from './Logic/SimpleMap';
import { ships, periods, product2, prodfam, obg } from '../store.js';
//import { ipdbships } from '../ipdb.js';
import { diffdate} from './Helpers/Functions.js'
import Login from './user/login/login.js';

import { notification } from 'antd';

import { getCurrentUser, getGoogleMapsApiKey } from './util/APIUtils';
import { ACCESS_TOKEN } from './constants';

export default class extends Component {
  constructor(props){
    super(props);
    this.state = {
      ships,
      portobj: {},
      apiData: [],
      currentUser: null,
      isAuthenticated: false,
      isLoading: false,
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    notification.config({
      placement: 'topRight',
      top: 70,
      duration: 3,
    });
  }

  //temporary, will be replaced by the search
  componentWillMount() {
    let portobject = this.state.ships.reduce((ships, ship) => {
      const { ports } = ship

      ships[ports] = ships[ports] ? [...ships[ports], ship] : [ship]
      return ships
    }, {})
    this.setState({ portobj: {
      portobject
    }});

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
      isAuthenticated: false
    });
  }


  getShipsByPorts() {
      let portas = this.state.ships.reduce((ships, ship) => {
        const { ports } = ship

        ships[ports] = ships[ports] ? [...ships[ports], ship] : [ship]
        return ships
      }, {})
      return portas
  }


  handleNewSearch = searchopt => {
    console.log(searchopt);
    console.log(searchopt.selectedOptionFam);
    console.log(searchopt.selectedOptionProd);
    console.log(searchopt.selectedOptionObg);
    console.log(searchopt.fromdate);
    console.log(searchopt.todate);
    let days = diffdate(searchopt.fromdate, searchopt.todate)
    console.log(days);
    fetch('http://localhost:8080/Ship?theship=' + searchopt.product)
    .then(response => response.json())
    .then(json => this.setState({apiData: json}));
  }

  render() {
    const ships = Object.entries(this.getShipsByPorts())

    ships.sort(function(a,b) {
      return b[1].length - a[1].length;
    })

    let logicPanes;
    if(this.state.isAuthenticated){
      logicPanes =
      <div className="bodyClass">
        <Header
          product2={product2}
          prodfam={prodfam}
          obg={obg}
          periods={periods}
          onNewSearch={this.handleNewSearch}
          isAuthenticated={this.state.isAuthenticated}
          currentUser={this.state.currentUser}
          onLogout={this.handleLogout}
        />
        <LogicPane
          className="logicPapers"
          ships={ ships }
          onSelect={this.handlePortSelected}
        />
      </div>
    }else {
      logicPanes =
      <div className="bodyClass">
        <Header
          product2={product2}
          prodfam={prodfam}
          obg={obg}
          periods={periods}
          onNewSearch={this.handleNewSearch}
          isAuthenticated={this.state.isAuthenticated}
          currentUser={this.state.currentUser}
        />
        <Login
          onLogin={this.handleLogin}
        />
      </div>
    }

    return (
      <div>
        {logicPanes}

        {/*
        <LogicPane
          className="logicPapers"
          ships={ ships }
          onSelect={this.handlePortSelected}
        />*/}
      </div>

    )
  }
}
