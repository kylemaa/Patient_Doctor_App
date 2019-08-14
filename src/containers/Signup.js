import React from 'react';
import { Form, Input, Icon, Button, Select, Upload } from 'antd';
import { Grid } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../store/actions/auth';

const FormItem = Form.Item;
const Option = Select.Option;

class RegistrationForm extends React.Component {
  state = {
    userId: null
  };
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      selectUserType: '',
    };
    this.handleSelectChange = this.handleSelectChange.bind(this)
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let is_patient = false;
        if (values.userType === "patient") is_patient = true;
        this.props.onAuth(
          values.userName,
          values.email,
          values.password,
          values.confirm,
          is_patient
        );
        // this.props.history.push("/");
      }
    });
  };

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  handleSelectChange = (event) => {
    this.setState({
      selectUserType: `${event}`
    });
  }
  userTypeFormSelector = (type) => {
    const UserTypeName = type
    if (UserTypeName === 'Patient') {
      const { getFieldDecorator } = this.props.form;
      return (<div>
        <FormItem><Input placeholder="Full Name" /></FormItem>
        <FormItem><Input placeholder="Gender" /></FormItem>
        <FormItem><Input placeholder="Address" /></FormItem>
        <FormItem><Input placeholder="City, State, Country, ZIP Code" /></FormItem>
        <FormItem><Input placeholder="Phone Number" /></FormItem>
        <FormItem><Input placeholder="Email address" /></FormItem>
        <Form.Item label="Upload your ID">
          {getFieldDecorator('upload', {
            valuePropName: 'fileList', getValueFromEvent: this.normFile,
          })(
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button> <Icon type="upload" /> Click to upload</Button>
            </Upload>,
          )}
        </Form.Item>
      </div>)
    }
    if (UserTypeName === 'Doctor') {
      return <FormItem><Input></Input></FormItem>
    }
  }

  render() {
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = (
        <p>{this.props.error.message}</p>
      );
    }

    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        {errorMessage}
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>

          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
          </FormItem>

          <FormItem>
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: 'The input is not valid E-mail!',
              }, {
                required: true, message: 'Please input your E-mail!',
              }],
            })(
              <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
            )}
          </FormItem>

          <FormItem>
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: 'Please input your password!',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </FormItem>

          <FormItem>
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: 'Please confirm your password!',
              }, {
                validator: this.compareToFirstPassword,
              }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" onBlur={this.handleConfirmBlur} />
            )}
          </FormItem>

          <FormItem>
            {getFieldDecorator("userType", {
              rules: [
                {
                  required: true,
                  message: "Please select a user!"
                }
              ]
            })(
              <Select placeholder="Select a user type" onChange={this.handleSelectChange}>
                <Option value="Patient">Patient</Option>
                <Option value="Doctor">Doctor/ Medical Institution</Option>
              </Select>
            )}
          </FormItem>

          {this.userTypeFormSelector(this.state.selectUserType)}


          <FormItem>
            <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
              Signup
        </Button>
            Or
        <NavLink
              style={{ marginRight: '10px' }}
              to='/login/'> login
        </NavLink>
          </FormItem>

        </Form>
      </Grid>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, email, password1, password2, is_patient) => dispatch(actions.authSignup(username, email, password1, password2, is_patient))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedRegistrationForm);