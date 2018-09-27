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
//import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
//import Select from '@material-ui/core/Select';
import Select from 'react-select'
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

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
      prodfam: this.props.prodfam,
      product2: this.props.product2,
      obg: this.props.obg,
      filteredOptions: this.props.product2,
      filteredOptionsObg: this.props.obg,
      searchopt: {
          fromdate: new Date().toJSON().slice(0,10),
          todate: new Date().toJSON().slice(0,10),
          selectedOptionFam: {value: 'Select Product Family', label: 'Select Product Family'},
          selectedOptionProd: {value: 'All Products', label: 'All Products'},
          selectedOptionObg:[],
      }
    }
  }

  handleSubmit = () => {
    // TODO: validation
    const { searchopt } = this.state
    console.log(searchopt.selectedOptionObg);
    //const today = new Date().toJSON().slice(0,10);
    if(searchopt.selectedOptionProd.value === 'All Products' && searchopt.selectedOptionFam.value === 'Select Product Family' && !searchopt.selectedOptionObg[0]){
      alert('You need to at least make one selection.')
    }else {
      this.setState({
        open: !this.state.open
      })
      this.props.onSearch(searchopt)
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

  //If you chose a product family, the product select will only show products from the chosen product family. Also sets the selected product family to state
  handleChangeFam = (selectedOptionFam) => {
     this.setState({
       searchopt: {
         ...this.state.searchopt,
         selectedOptionFam
       }
     })

     let filter;
     if(selectedOptionFam.value === 'Select Product Family'){
       filter = this.state.product2;
     }else {
       filter = selectedOptionFam ? this.state.product2.filter((o) => o.link === selectedOptionFam.value) : this.state.product2
     }

     this.setState({filteredOptions: filter})
  };

  //If you chose a product, the object group select will only show objects from the chosen product. Also sets the selected product to state
  handleChangeProd = (selectedOptionProd) => {
    this.setState({
      searchopt: {
        ...this.state.searchopt,
        selectedOptionProd
      }
    })

    let filter;
    if(selectedOptionProd.value === 'All Products'){
      filter = this.state.obg;
    }else {
      filter = selectedOptionProd ? this.state.obg.filter((o) => o.link === selectedOptionProd.value) : this.state.obg
    }

    this.setState({filteredOptionsObg: filter})
  }


  handleChangeObg = (selectedOption) => {
    this.setState({
      searchopt: {
        ...this.state.searchopt,
        selectedOptionObg: selectedOption
      }
    })

  }


  handleToggle = () => {
    this.setState({
      open: !this.state.open
    })
  }


  render() {
    const { open, searchopt: { fromdate, todate } } = this.state,
          { classes} = this.props

    const prodfam = this.state.prodfam;
    const filteredOptions = this.state.filteredOptions;
    const filteredOptionsObg = this.state.filteredOptionsObg

    //console.log('seloptprod');
    //console.log(this.state.selectedOptionProd);

    //const today = new Date().toJSON().slice(0,10);
    //const dadate = this.state.fromdate;
    //console.log("date: " + fromdate);

    return (
      <div>
      <Tooltip title="New search" placement="bottom" enterDelay={500}>
        <Button variant="fab" onClick={this.handleToggle} mini>
          <Search />
        </Button>
      </Tooltip>
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
                    value={this.state.searchopt.selectedOptionFam}
                    onChange={this.handleChangeFam}
                    options={prodfam}
                  />
                  <Select
                    className="select-prod"
                    name="form-field-name"
                    value={this.state.searchopt.selectedOptionProd}
                    onChange={this.handleChangeProd}
                    options={filteredOptions}
                  />
                  <Select
                    className="select-prod"
                    name="form-field-name"
                    value={this.state.searchopt.selectedOptionObg}
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
