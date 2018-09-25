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
//import Select from '@material-ui/core/Select';
import Select from 'react-select'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 400,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 240,
  },
  searchBackground: {
    backgroundColor: 'rgba(0, 4, 48, .7)',
  },
});

class SearchDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedOptionFam: {value: 'All Product family', label: ' All Product family'},
      selectedOptionProd: [{value: 'All Products', label: 'All Products'}],
      selectedOptionObg:[{value: 'All objects', label: 'All objects'}],
      prodfam: this.props.prodfam,
      product2: this.props.product2,
      obg: this.props.obg,
      filteredOptions: this.props.product2,
      filteredOptionsObg: this.props.obg,
      searchopt: {
          fromdate: new Date().toJSON().slice(0,10),
          todate: new Date().toJSON().slice(0,10),
      }
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

  handleChangeFam = (selectedOptionFam) => {
     this.setState({selectedOptionFam});
     let filter = selectedOptionFam ? this.state.product2.filter((o) => o.link === selectedOptionFam.value) : this.state.product2
     console.log(filter)

     this.setState({filteredOptions: filter})
  };

  handleChangeProd = (selectedOptionProd) => {
    this.setState({selectedOptionProd})

    let filter = selectedOptionProd ? this.state.obg.filter((o) => o.link === selectedOptionProd.value) : this.state.obg
    console.log(filter)

    this.setState({filteredOptionsObg: filter})
  }

  handleChangeObg = (selectedOption) => {
    this.setState({selectedOptionObg: selectedOption})
  }


  handleToggle = () => {
    this.setState({
      open: !this.state.open
    })
  }


  render() {
    const { open, searchopt: { fromdate, todate } } = this.state,
          { classes, products: categories} = this.props

    const prodfam = this.state.prodfam;
    const filteredOptions = this.state.filteredOptions;
    const filteredOptionsObg = this.state.filteredOptionsObg

    console.log('seloptprod');
    console.log(this.state.selectedOptionProd);

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
                    className="select-prod"
                    name="form-field-name"
                    value={this.state.selectedOptionFam}
                    onChange={this.handleChangeFam}
                    options={prodfam}
                  />
                  <Select
                    className="select-prod"
                    name="form-field-name"
                    value={this.state.selectedOptionProd}
                    onChange={this.handleChangeProd}
                    options={filteredOptions}
                  />
                  <Select
                    className="select-prod"
                    name="form-field-name"
                    value={this.state.selectedOptionObg}
                    onChange={this.handleChangeObg}
                    isMulti
                    options={filteredOptionsObg}
                  />
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
