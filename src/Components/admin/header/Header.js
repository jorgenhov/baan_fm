import React, { Component } from 'react';

import './Header.css';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'

const styles = {
  root: {
    flexGrow: 1,
  },
};
class Header extends Component {
  render() {
    let logout;
    if(this.props.isAuthenticated){
      logout =
      <Button mini onClick={this.props.onLogout}>
        <Typography style={{color: 'black'}}>Logout</Typography>
      </Button>
    }

    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title" color="inherit" style={{flex: 1}}>
              <Link to='/'>Go to Application</Link>
            </Typography>
            {logout}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Header);
