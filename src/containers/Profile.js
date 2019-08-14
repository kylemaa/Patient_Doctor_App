import React from "react";
import { connect } from "react-redux"

class Profile extends React.Component {

    render() {
        return (
            <div> HI, {this.props.username} </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        username: state.auth.username
    };
};


const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile)