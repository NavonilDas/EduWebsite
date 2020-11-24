import { Button, Card, CardContent, TextField } from '@material-ui/core';
import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

class Login extends React.Component {
    render() {
        return (
            <div className="d-flex" style={{ width: "100%", height: "100vh" }}>
                <div style={{ margin: "auto" }}>
                    <Card>
                        <CardContent className="d-flex flex-column" style={{width:"300px"}}>
                            <AccountCircleIcon style={{width:"160px",height:"150px",margin:"0 auto 0 auto"}}/>
                            <TextField
                                required
                                name="username"
                                id="username"
                                label="User Name"
                                // value={this.state.name}
                                // onChange={this.handleChange}
                            />
                            <br />
                            <TextField
                                required
                                name="password"
                                id="password"
                                type="password"
                                label="Password"
                                // value={this.state.name}
                                // onChange={this.handleChange}
                            />
                            <br />
                            <br />

                            <Button variant="contained" color="primary" onClick={this.submit} style={{ marginLeft: "auto" }}>
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