import React, { Component } from 'react';
import { Header } from './Layouts';
import LogicPane from './Logic/LogicPane';
//import SimpleMap from './Logic/SimpleMap';
import { ships, periods, product2, prodfam, obg } from '../store.js';
//import { ipdbships } from '../ipdb.js';
import { diffdate} from './Helpers/Functions.js'

export default class extends Component {
  state = {
    ships,
    portobj: {},
    apiData: []
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

    //test api apiData
    //const apid = this.state.apiData;

    return (
      <div className="bodyClass">
        <Header
          product2={product2}
          prodfam={prodfam}
          obg={obg}
          periods={periods}
          onNewSearch={this.handleNewSearch}
        />

        <LogicPane
          className="logicPapers"
          ships={ ships }
          onSelect={this.handlePortSelected}
        />

      </div>
    )
  }
}
