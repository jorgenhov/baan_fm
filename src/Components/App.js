import React, { Component } from 'react';
import { Header } from './Layouts';
import LogicPane from './Logic/LogicPane';
//import SimpleMap from './Logic/SimpleMap';
import { ships, periods, product2, prodfam, obg } from '../store.js';
//import { ipdbships } from '../ipdb.js';
import { diffdate} from './Helpers/Functions.js'
import Login from './user/login/login.js';

import { Route, withRouter, Switch } from 'react-router-dom';

import { getCurrentUser, getGoogleMapsApiKey } from './util/APIUtils';
import { ACCESS_TOKEN } from './constants';

export default class extends Component {
  constructor(props){
    super(props);
    this.state = {
      ships,
      portobj: {},
      apiKey: null,
      apiData: [],
      currentUser: null,
      isAuthenticated: false,
      isLoading: false,
      contHeight: {
        header: '57px',
        map: '400px'
      }
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

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
    this.getContainerHeights();
  }

  getContainerHeights(){
    let wHeight = window.innerHeight;
    let mHeight = wHeight - 64;
    let maHeight = mHeight.toString();
    let mapHeight = maHeight.concat('px');
    this.setState({
      contHeight: {
        map: mapHeight
      }
    });
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
  }

  render() {
    console.log(this.state.contHeight.map);

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
          contHeight={this.state.contHeight}
        />
        <LogicPane
          className="logicPapers"
          ships={ ships }
          apiKey={this.state.apiKey}
          currentUser={this.state.currentUser}
          onSelect={this.handlePortSelected}
          contHeight={this.state.contHeight}
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
          contHeight={this.state.contHeight}
        />
        <Login
          onLogin={this.handleLogin}
        />
      </div>
    }

    return (
      <div>
        {logicPanes}
      </div>

    )
  }
}
