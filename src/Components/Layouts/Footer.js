import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export default ({ tabs }) => (
  <Paper>
    <Tabs
      value={0}
      indicatorColor="primary"
      textColor="primary"
      centered
    >
      {tabs.map(thetabs =>
        <Tab
          label={thetabs}
          key={thetabs}
        />
      )};
    </Tabs>
  </Paper>
)
