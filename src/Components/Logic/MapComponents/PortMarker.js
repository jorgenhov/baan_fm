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
import ListShips from './ListShips'
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  MapMarkerStyle: {
    background: '#001644',
    background: '-moz-linear-gradient(-45deg, #001644 0%, #074a91 100%)',
    background: '-webkit-linear-gradient(-45deg, #2151a5 0%,#7db9e8 100%)',
    background: 'linear-gradient(135deg, #0942a3 0%,#0482e2 100%)',
  },
});


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

      const { classes} = this.props
      //makes a new list for the tabel for each boat in this port
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
      <Tooltip title={ship.ports} placement="left" TransitionComponent={Zoom}>
        <Button
          style={{maxWidth: '22px', maxHeight: '22px', minWidth: '22px', minHeight: '22px', marginLeft:'-11px', marginTop:'-11px'}} variant="fab" onClick={this.handleToggle} mini color="primary"
          className={classes.MapMarkerStyle}
        >
          <Typography className="PortButtonText" variant="button"><p>{ships.length}</p></Typography>
        </Button>
      </Tooltip>
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
export default withStyles(styles)(PortMarker);
