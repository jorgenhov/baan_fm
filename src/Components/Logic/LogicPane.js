import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
//import Paper from '@material-ui/core/Paper';
//import Typography from '@material-ui/core/Typography';
//import List from '@material-ui/core/List';
//import ListItem from '@material-ui/core/ListItem';
//import ListItemText from '@material-ui/core/ListItemText';
//import Table from '@material-ui/core/Table';
//import TableBody from '@material-ui/core/TableBody';
//import TableCell from '@material-ui/core/TableCell';
//import TableHead from '@material-ui/core/TableHead';
//import TableRow from '@material-ui/core/TableRow';
//import ListShips from './ListShips';
import PortMap from './PortMap';


class LogicPane extends Component {
  render() {
    /*
    const styles = {
      Paper: {
        padding: 20,
        marginTop: 10,
        marginBottom:10,
        height: 430,
        width: '100%',
        overflowY: 'auto',
        overflowX: 'auto'
      }
    }

    const selectedportobject = this.props.selportobject;
    let shipdata;
    if(selectedportobject){
      shipdata = selectedportobject.map(ship =>{
        return (
          <ListShips
            key={ship.id}
            ship={ship}
          />
        );
      });
    }



    const portships = this.props.ships;
    console.log(selectedportobject);
    */

    return (
      <Grid container>
        <PortMap
          ships={this.props.ships}
        />
      {/*
        <Grid item sm>
          <Paper style={styles.Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="subheading">Port</Typography></TableCell>
                <TableCell><Typography variant="subheading">Ships</Typography></TableCell>
              </TableRow>
            </TableHead>
              <TableBody>
              {portships.map(([port, ships]) =>
                <TableRow
                hover
                key={port}
                onClick={() => this.props.onSelect(port)}
                >
                  <TableCell>{ port }</TableCell>
                  <TableCell>{ ships.length }</TableCell>
                </TableRow>
              )}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
        <Grid item sm>
          <Paper style={styles.Paper}>
            <Table className='shiplist'>
              <TableHead>
                <TableRow>
                  <TableCell><Typography variant="subheading">IMO</Typography></TableCell>
                  <TableCell><Typography variant="subheading">Name</Typography></TableCell>
                  <TableCell><Typography variant="subheading">Position</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {shipdata}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      */}
      </Grid>
    );
  }
}

export default LogicPane;
