import React, { Component } from 'react';
import SearchDialog from '../Logic/Dialogs/SearchDialog.js'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'

class Header extends Component {
  render() {

    let logout;
    let search;
    if(this.props.isAuthenticated){
      logout =
      <Button mini onClick={this.props.onLogout}>
        <Typography style={{color: 'white'}}>Logout</Typography>
      </Button>
      search =
      <SearchDialog
        product2={this.props.product2}
        prodfam={this.props.prodfam}
        obg={this.props.obg}
        periods={this.props.periods}
        onSearch={this.props.onNewSearch}
      />
    }

    return (
      <AppBar
        position="static"
        style={{ height: '10vh', width: '100%' }}
      >
        <Toolbar className="headerUI">
          <Typography variant="title" color="inherit" style={{flex: 1}}>
            Ships in port
          </Typography>
          {logout}
          {search}          
        </Toolbar>
      </AppBar>
    )
  }
}

export default Header;
