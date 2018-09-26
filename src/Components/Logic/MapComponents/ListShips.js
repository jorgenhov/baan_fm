import React, { Component } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

class ListShips extends Component {
  render() {
    const ship = this.props.ship;

    return (
      <TableRow key={ship.id}>
        <TableCell>{ship.imo}</TableCell>
        <TableCell>{ship.name}</TableCell>
        <TableCell>{ship.eta}</TableCell>
      </TableRow>
    );
  }
}

export default ListShips;
