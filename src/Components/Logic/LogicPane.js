import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PortMap from './MapComponents/PortMap';


class LogicPane extends Component {
  render() {
    return (
      <Grid container>
        <PortMap
          ships={this.props.ships}
          currentUser={this.props.currentUser}
          apiKey={this.props.apiKey}
          contHeight={this.props.contHeight}
        />
      </Grid>
    );
  }
}

export default LogicPane;
