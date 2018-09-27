import React, { Component } from 'react';
import { Header, Footer } from './Layouts';
import LogicPane from './Logic/LogicPane';
//import SimpleMap from './Logic/SimpleMap';
import { tabs, ships, periods, product2, prodfam, obg, portsdata } from '../store.js';
//import { ipdbships } from '../ipdb.js';
import { diffdate} from './Helpers/Functions.js'

export default class extends Component {
  state = {
    ships,
    portobj: {},
    allports: {},
    selportobj: [],
    ship: {},
    selectedport: '',
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


  handlePortSelected = selport => {
    let allportobj = this.state.portobj.portobject;
    let selportob = allportobj[selport];
    this.setState({
      selectedport: selport,
      selportobj: selportob
    })
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
    const ships = Object.entries(this.getShipsByPorts()),
      { selectedport } = this.state,
      { ship } = this.state

    ships.sort(function(a,b) {
      return b[1].length - a[1].length;
    })

    const selportobject = this.state.selportobj;

    //test api apiData
    const apid = this.state.apiData;

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
          ship={ship}
          ships={ ships }
          selportobject={ selportobject }
          selectedport={ selectedport }
          onSelect={this.handlePortSelected}
        />

      </div>
    )
  }
}
