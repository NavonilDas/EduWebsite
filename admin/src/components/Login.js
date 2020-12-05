import { Button, Card, CardContent, TextField } from '@material-ui/core';
import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import axios from 'axios';
import API from '../Api';
const HOST = API.HOST;

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            nameError: '',
            password: '',
            passError: ''
        };
        this.doLogin = this.doLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const tmp = {};
        tmp[name] = value;
        this.setState(tmp);
    }

    doLogin() {
        if (this.state.username === '') {
            this.setState({ nameError: 'User Name Can\'t Be Empty!' });
            return;
        }
        if (this.state.password === '') {
            this.setState({ passError: 'Password is Empty' });
            return;
        }
        const body = {
            username: this.state.username,
            password: this.state.password
        };
        console.log(body);
        axios.post(`${HOST}users/admin/login`, body, { headers: {} })
            .then(res => {
                if (res.data && res.data.token) {
                    document.cookie = `ID=${res.data.token}`;
                    if (this.props.onLogin) {
                        this.props.onLogin();
                    }
                }
            })
            .catch(err => console.error(err));

        // TODO: Do a Post Request
    }

    render() {
        return (
            <div className="d-flex" style={{ width: "100%", height: "100vh" }}>
                <div style={{ margin: "auto" }}>
                    <Card>
                        <CardContent className="d-flex flex-column" style={{ width: "300px" }}>
                            <AccountCircleIcon style={{ width: "160px", height: "150px", margin: "0 auto 0 auto" }} />
                            <TextField
                                error={this.state.nameError !== ''}
                                helperText={this.state.nameError}
                                required
                                name="username"
                                id="username"
                                label="User Name"
                                value={this.state.username}
                                onChange={this.handleChange}
                            />
                            <br />
                            <TextField
                                error={this.state.passError !== ''}
                                helperText={this.state.passError}
                                required
                                name="password"
                                id="password"
                                type="password"
                                label="Password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                            <br />
                            <br />

                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.doLogin}
                                style={{ marginLeft: "auto" }}
                            >
                                Login
                            </Button>

                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }
}

export default Login;