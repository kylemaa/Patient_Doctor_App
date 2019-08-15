import React from "react";
import { Card } from "antd";
import { connect } from "react-redux";
import { getPrescriptionsDetail } from "../store/actions/prescriptions"

class PrescriptionDetail extends React.Component {

    componentDidMount() {
        if (this.props.token !== undefined && this.props.token !== null) {
            this.props.getPrescriptionsDetail(this.props.token, this.props.match.params.id);
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
            if (newProps.token !== undefined && newProps.token !== null) {
                this.props.getPrescriptionsDetail(newProps.token, this.props.match.params.id);
            }
        }
    }
    render() {
        const { title } = this.props.currentPrescription
        const { item_name } = this.props.currentPrescription
        const { quantity } = this.props.currentPrescription
        const { direction } = this.props.currentPrescription
        const { release_date } = this.props.currentPrescription
        return (
            <Card title={title} extra={<a href='#'> Buy </a>}>
                <p>Your item is {item_name}. Quantity: {quantity}. Release Date: {release_date} </p>
                <br></br>
                <br></br>
                <p>Direction: {direction}</p>

            </Card>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        currentPrescription: state.prescriptions.currentPrescription,
        loading: state.prescriptions.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getPrescriptionsDetail: (token, id) => dispatch(getPrescriptionsDetail(token, id))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PrescriptionDetail);