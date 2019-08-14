import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { List, Skeleton } from "antd";
import * as actions from "../store/actions/prescriptions";
import Hoc from "../hoc/hoc";

class PrescriptionList extends React.PureComponent {
    componentDidMount() {
        if (this.props.token !== undefined && this.props.token !== null) {
            this.props.getPrescriptions(this.props.token);
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
            if (newProps.token !== undefined && newProps.token !== null) {
                this.props.getPrescriptions(newProps.token);
            }
        }
    }

    renderItem(item) {
        return (
            <Link to={`/prescriptions/${item.id}`}>
                <List.Item>{item.title}</List.Item>
            </Link>
        );
    }

    render() {
        return (
            <Hoc>
                {this.props.loading ? (
                    <Skeleton active />
                ) : (
                        <div>
                            <h3 style={{ margin: "16px 0" }}>Your Prescription List</h3>
                            <List
                                size="large"
                                bordered
                                dataSource={this.props.prescriptions}
                                renderItem={item => this.renderItem(item)}
                            />
                        </div>
                    )}
            </Hoc>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        prescriptions: state.prescriptions.prescriptions,
        loading: state.prescriptions.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getPrescriptions: token => dispatch(actions.getPrescriptions(token))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PrescriptionList);