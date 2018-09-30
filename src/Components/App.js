import React, { Component } from 'react';
import { Header } from './Layouts';
import LogicPane from './Logic/LogicPane';
//import SimpleMap from './Logic/SimpleMap';
import { ships, periods, product2, prodfam, obg } from '../store.js';
//import { ipdbships } from '../ipdb.js';
import { diffdate} from './Helpers/Functions.js'
import Login from './user/login/login.js';
import Button from '@material-ui/core/Button';
import Search from '@material-ui/icons/Search';

import { notification } from 'antd';

import { getCurrentUser } from './util/APIUtils';
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
    /*
    fetch('http://localhost:8080/Ship')
    .then(response => response.json())
    .then(json => console.log(json));

    //fra apien der apien kalla en anna api
    fetch('http://localhost:8080/resttemp')
    .then(response => response.json())
    .then(json => console.log(json))
    */
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
    notification.success({
      message: 'Baan FM',
      description: "You logged in successfully.",
    });
    this.loadCurrentUser();
  }

  handleLogout() {

    console.log('Logout');

    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });

    notification.success({
      message: 'Baan FM',
      description: "You logged out successfully.",
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

    let loginout;
    if(this.state.isAuthenticated){
      loginout = <Button onClick={this.handleLogout}>
        <h4>LOGOUT: {this.state.currentUser.name}</h4>
      </Button>
    }else {
      loginout = <Login onLogin={this.handleLogin} />
    }

    //test api apiData
    //const apid = this.state.apiData;

    return (
      <div className="bodyClass">

        {loginout}

        <Header
          product2={product2}
          prodfam={prodfam}
          obg={obg}
          periods={periods}
          onNewSearch={this.handleNewSearch}
        />

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
