import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
//import DialogActions from '@material-ui/core/DialogActions';
//import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Port from '@material-ui/icons/Adjust';
import ListShips from './ListShips'

class PortMarker extends Component {
  constructor(){
    super();
    this.state= {
      open: false,
    }
  }

  handleToggle = () => {
    this.setState({
      open: !this.state.open
    })
  }

  render() {
      const ship = this.props.port;

      const ships = this.props.ships;
      let shipdata;
      if(ships){
        shipdata = ships.map(ship =>{
          return (
            <ListShips
              key={ship.imo}
              ship={ship}
            />
          );
        });
      }


    return (
      <div key={ship.imo}>
        <Button style={{maxWidth: '22px', maxHeight: '22px', minWidth: '22px', minHeight: '22px', marginBottom:'-20px'}} variant="fab" onClick={this.handleToggle} mini color="primary">
          <Typography className="PortButtonText" variant="button"><p>{ships.length}</p></Typography>
        </Button>
        <Dialog
          className="searchDialogStyle"
          open={this.state.open}
          onClose={this.handleToggle}
        >
          <DialogTitle id="form-dialog-title">Port: {ship.ports}</DialogTitle>
          <Table className='shiplist'>
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="subheading">IMO</Typography></TableCell>
                <TableCell><Typography variant="subheading">Name</Typography></TableCell>
                <TableCell><Typography variant="subheading">ETA</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { shipdata }
            </TableBody>
          </Table>
        </Dialog>
      </div>
    );
  }

}
export default PortMarker;
