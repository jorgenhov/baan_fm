import React, { Component } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

class ListShips extends Component {
  render() {
    const ship = this.props.ship;

    return (
      <TableRow key={ship.id}>
        <TableCell>{ship.id}</TableCell>
        <TableCell>{ship.name}</TableCell>
        <TableCell>{ship.pos}</TableCell>
      </TableRow>
    );
  }
}

export default ListShips;
