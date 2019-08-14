import React from "react";
import { connect } from "react-redux";
import { Menu, Icon, Switch } from 'antd';

const { SubMenu } = Menu;

class Profile extends React.PureComponent {
    state = {
        theme: 'light',
        current: '1',
    };


    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };

    render() {
        return (
            <div>

                <Menu
                    theme={this.state.theme}
                    onClick={this.handleClick}
                    style={{ width: 256 }}
                    defaultOpenKeys={['sub1']}
                    selectedKeys={[this.state.current]}
                    mode="vertical"
                >
                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                                <Icon type="smile" theme="twoTone" />
                                <span>Personal Information</span>
                            </span>
                        }
                    >
                        <Menu.Item key="1">Allergies</Menu.Item>
                        <Menu.Item key="2">Medical Conditions</Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub2"
                        title={
                            <span>
                                <Icon type="mail" theme="twoTone" />
                                <span>Contact & Login Info</span>
                            </span>
                        }
                    >
                    </SubMenu>
                    <SubMenu
                        key="sub3"
                        title={
                            <span>
                                <Icon type="phone" theme="twoTone" />
                                <span>Support</span>
                            </span>
                        }
                    >
                    </SubMenu>
                    <SubMenu
                        key="sub4"
                        title={
                            <span>
                                <Icon type="idcard" theme="twoTone" />
                                <span>Insurance</span>
                            </span>
                        }
                    >
                    </SubMenu>
                    <SubMenu
                        key="sub5"
                        title={
                            <span>
                                <Icon type="credit-card" theme="twoTone" />
                                <span>Payment</span>
                            </span>
                        }
                    >
                    </SubMenu>
                    <SubMenu
                        key="sub6"
                        title={
                            <span>
                                <Icon type="schedule" theme="twoTone" />
                                <span>Delivery Address</span>
                            </span>
                        }
                    >
                    </SubMenu>
                    <SubMenu
                        key="sub7"
                        title={
                            <span>
                                <Icon type="smile" theme="twoTone" />
                                <span>Your Doctor</span>
                            </span>
                        }
                    >
                    </SubMenu>

                </Menu>
            </div>
        );
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