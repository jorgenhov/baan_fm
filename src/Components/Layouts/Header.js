import React from 'react';
import SearchDialog from '../Logic/Dialogs/SearchDialog.js'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export default ({ products, onNewSearch, periods, product2, prodfam, obg }) => (
  <AppBar
    position="static"
    style={{ height: '11vh', width: '100%' }}
  >
    <Toolbar className="headerUI">
      <Typography variant="title" color="inherit" style={{flex: 1}}>
        Ships in port
      </Typography>
      <SearchDialog
        product2={product2}
        prodfam={prodfam}
        obg={obg}
        periods={periods}
        onSearch={onNewSearch}
      />
    </Toolbar>
  </AppBar>
)
