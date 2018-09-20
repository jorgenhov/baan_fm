import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Search from '@material-ui/icons/Search';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 100,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 140,
  },
  searchBackground: {
    backgroundColor: 'rgba(0, 4, 48, .7)',
  },
});

class SearchDialog extends Component {
  state = {
    open: false,
    searchopt: {
        product: '',
        fromdate: new Date().toJSON().slice(0,10),
        todate: new Date().toJSON().slice(0,10),
    }
  }

  handleSubmit = () => {
    // TODO: validation
    const { searchopt } = this.state
    //const today = new Date().toJSON().slice(0,10);
    if(searchopt.product){
      this.setState({
        open: !this.state.open
      })
      this.props.onSearch(searchopt)
    }else {
      let alertmsg = '';
      if (!searchopt.product) {
        alertmsg = alertmsg + 'Choose a product.'
      }else {
        alertmsg = alertmsg + 'Something went wrong, try again.'
      }
      alert(alertmsg)
    }
  }

  handleChange = name => ({ target: { value } }) => {
    this.setState({
      searchopt: {
        ...this.state.searchopt,
        [name]: value
      }
    })
  }

  handleDateFromChange = (event)=>{
    this.setState({
      searchopt: {
        ...this.state.searchopt,
        fromdate: event.target.value
      }
    })
  }

  handleDateToChange = (event)=>{
    this.setState({
      searchopt: {
        ...this.state.searchopt,
        todate: event.target.value
      }
    })
  }

  handleToggle = () => {
    this.setState({
      open: !this.state.open
    })
  }


  render() {
    const { open, searchopt: { product, fromdate, todate } } = this.state,
          { classes, products: categories} = this.props

    //const today = new Date().toJSON().slice(0,10);

    //const dadate = this.state.fromdate;

    //console.log("date: " + fromdate);

    return (
      <div>
        <Button variant="fab" onClick={this.handleToggle} mini>
          <Search />
        </Button>
          <Dialog
            className="searchDialogStyle"
            open={open}
            onClose={this.handleToggle}
          >
            <DialogTitle id="form-dialog-title">Make a new search</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Choose product and period.
              </DialogContentText>
              <form>
                <FormControl
                  className={classes.formControl}
                >
                  <InputLabel htmlFor="product">
                    Product
                  </InputLabel>
                  <Select
                    value={product}
                    onChange={this.handleChange('product')}
                  >
                  { categories.map(category =>
                    <MenuItem key={category} value={category}>{category}</MenuItem>
                  )}
                  </Select>
                </FormControl>
                <TextField
                  id="date"
                  label="From"
                  type="date"
                  defaultValue={fromdate}
                  onChange={this.handleDateFromChange}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  id="date"
                  label="To"
                  type="date"
                  defaultValue={todate}
                  onChange={this.handleDateToChange}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </form>
            </DialogContent>
            <DialogActions>
              <Button
                color="primary"
                variant="raised"
                onClick={this.handleSubmit}
              >
                Search
              </Button>
            </DialogActions>
          </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(SearchDialog);
