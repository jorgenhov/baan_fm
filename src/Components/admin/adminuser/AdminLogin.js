import React, { Component } from 'react';
import { login, getGoogleMapsApiKey } from '../../util/APIUtils';
import './Login.css';
import { ACCESS_TOKEN } from '../../constants';

import Buttonmu from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Search from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';


import { Form, Input, Button, Icon } from 'antd';
const FormItem = Form.Item;

class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {
        open: false,
      }
    }

    handleToggle = () => {
      this.setState({
        open: !this.state.open
      })
    }

    render() {
        const AntWrappedLoginForm = Form.create()(LoginForm)
        const open = this.state.open;
        return (
          <div>
            <Buttonmu color="primary" variant="outlined" style={{marginLeft: '44%', marginRight: '56%', marginTop: '18%'}} onClick={this.handleToggle}>
              <Typography variant="display1">LOGIN</Typography>
            </Buttonmu>
            <Dialog
              className="searchDialogStyle"
              open={open}
              onClose={this.handleToggle}
            >
              <div className="login-container">
                  <h2 className="page-title">Login</h2>
                  <div className="login-content">
                      <AntWrappedLoginForm onLogin={this.props.onLogin} />
                  </div>
              </div>
            </Dialog>
          </div>
        );
    }
}

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const loginRequest = Object.assign({}, values);
                login(loginRequest)
                .then(response => {
                    localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                    this.props.onLogin();
                }).catch(error => {
                    if(error.status === 401) {
                        console.log('feil brukarnavn');
                        alert('Wrong username/email or password!')
                    } else {
                      console.log(error);
                      alert('Somthing went wrong, please try again!')
                    }
                });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('usernameOrEmail', {
                        rules: [{ required: true, message: 'Please input your username or email!' }],
                    })(
                    <Input
                        prefix={<Icon type="user" />}
                        size="large"
                        name="usernameOrEmail"
                        placeholder="Username or Email" />
                    )}
                </FormItem>
                <FormItem>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                    <Input
                        prefix={<Icon type="lock" />}
                        size="large"
                        name="password"
                        type="password"
                        placeholder="Password"  />
                )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" size="large" className="login-form-button">Login</Button>
                </FormItem>
            </Form>
        );
    }
}


export default Login;
