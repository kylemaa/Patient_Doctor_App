import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../store/actions/prescriptions";
import Hoc from "../hoc/hoc";
import { Form, Input, Button, Checkbox } from 'antd';

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
};
const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 4 },
};

class ADD extends React.Component {

    handlesubmit = event => {
        event.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.onPrescription(
                    values.Title,
                    values.Medicine,
                    values.Quantity,
                    values.Direction,
                    values.Recipient)

            }
        })
    }
    constructor(props) {
        super(props)
    }
    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <FormItem {...formItemLayout} label="Prescription Title">
                    {getFieldDecorator('Title', {
                        rules: [
                            {
                                required: true,
                                message: 'What is this prescription about?',
                            },
                        ],
                    })(<Input placeholder="Please input prescription title here" />)}
                </FormItem>
                <FormItem {...formItemLayout} label="Medicine name">
                    {getFieldDecorator('Medicine', {
                        rules: [
                            {
                                required: true,
                                message: 'Please fill in the name of med',
                            },
                        ],
                    })(<Input placeholder="Please input medicine name here" />)}
                </FormItem>
                <FormItem {...formItemLayout} label="Quantity">
                    {getFieldDecorator('Quantity', {
                        rules: [
                            {
                                required: true,
                                message: 'Please fill the amount in number',
                            },
                        ],
                    })(<Input placeholder="Please input the amount here" />)}
                </FormItem>
                <FormItem {...formItemLayout} label="Direction">
                    {getFieldDecorator('Direction', {
                        rules: [
                            {
                                required: true,
                                message: 'Please fill direction for patient!',
                            },
                        ],
                    })(<Input placeholder="Give some direction to your patient here" />)}
                </FormItem>
                <FormItem {...formItemLayout} label="Recipient">
                    {getFieldDecorator('Recipient', {
                        rules: [
                            {
                                required: true,
                                message: 'Please fill in the name of your patient!',
                            },
                        ],
                    })(<Input placeholder="Name of your recipient" />)}
                </FormItem>
                <FormItem {...formTailLayout}>
                    <Checkbox >
                        Check box to sign this prescription
          </Checkbox>
                </FormItem>
                <FormItem {...formTailLayout}>
                    <Button type="primary" onClick={this.handlesubmit}>
                        Submit
          </Button>
                </FormItem>
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onPrescription: (Title, Medicine, Quantity, Direction, Recipient) => dispatch(actions.postPrescriptionDetail(Title, Medicine, Quantity, Direction, Recipient))
    }
}
const WritePrescriptionForm = Form.create()(ADD);
export default connect(null, mapDispatchToProps)(WritePrescriptionForm); 