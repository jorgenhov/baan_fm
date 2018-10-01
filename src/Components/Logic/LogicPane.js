import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PortMap from './MapComponents/PortMap';


class LogicPane extends Component {
  render() {
    return (
      <Grid container>
        <PortMap
          ships={this.props.ships}
          apiKey={this.props.apiKey}
        />
      </Grid>
    );
  }
}

export default LogicPane;
