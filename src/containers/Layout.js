import React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";

const { Header, Content, Footer } = Layout;

class CustomLayout extends React.Component {
  render() {
    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            style={{ lineHeight: "64px" }}
          >
            {this.props.isAuthenticated ? (
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={["2"]}
                style={{ lineHeight: "64px" }}>
                <Menu.Item key="2" onClick={this.props.logout}>
                  Logout
              </Menu.Item>
                {this.props.token && this.props.is_patient ? (
                  <Menu.Item key="3">
                    <Link to="/prescriptions">Prescriptions</Link>
                  </Menu.Item>) : null}

                {this.props.token !== null && this.props.is_doctor ? (
                  <Menu.Item key="3">
                    <Link to="/writeprescription">Write Precription</Link>
                  </Menu.Item>
                ) : null}
              </Menu>
            ) : (
                <Menu
                  theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={["2"]}
                  style={{ lineHeight: "64px" }}
                >
                  <Menu.Item key="2">
                    <Link to="/login">Login</Link>
                  </Menu.Item>
                  <Menu.Item key="3">
                    <Link to="/">Home</Link>
                  </Menu.Item>
                  <Menu.Item key="4">
                    <Link to="/signup">Signup</Link>
                  </Menu.Item>
                </Menu>
              )}
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            {this.props.token !== null ? (
              <Breadcrumb.Item>
                <Link to={`/profile/${this.props.userId}`}>Profile</Link>
              </Breadcrumb.Item>
            ) : null}
          </Breadcrumb>
          <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
            {this.props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant UED
        </Footer>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    token: state.auth.token,
    is_doctor: state.auth.is_doctor,
    is_patient: state.auth.is_patient
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CustomLayout)
);