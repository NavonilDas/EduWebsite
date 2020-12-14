import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, TextField, Typography } from '@material-ui/core';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    validate(values) {
    }

    submit(values, data) {

    }

    render() {
        return (
            <div>

                <Typography variant="h5" gutterBottom style={{ margin: "11px 0 0 11px" }}>
                    Edit Profile
                </Typography>

                <Formik
                    initialValues={{
                        email: ''
                    }}
                    validate={this.validate.bind(this)}
                    onSubmit={this.submit.bind(this)}
                >
                    <Form className="profile-form">
                        <Field
                            component={TextField}
                            name="name"
                            type="text"
                            label="Name"
                        />
                        <Field
                            component={TextField}
                            name="email"
                            type="email"
                            label="Email"
                        />
                        <Field
                            component={TextField}
                            name="phone"
                            type="tel"
                            label="Phone Number"
                        />
                        <Field
                            component={TextField}
                            name="password"
                            type="password"
                            label="Current Password"
                        />
                        <Field
                            component={TextField}
                            name="newpassword"
                            type="password"
                            label="New Password"
                        />

                        <Button color="primary" variant="contained" fullWidth type="submit">
                            Save Changes
                        </Button>

                    </Form>
                </Formik>
            </div>
        );
    }
}


export default Profile;