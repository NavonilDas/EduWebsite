import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Button, TextField, Typography } from '@material-ui/core';


function validate(values) {
    const errors = {};
    if (values.email === "") {
        errors.email = 'Email Required';
    }
    if (values.name === "") {
        errors.name = 'Name Required';
    }

    if (values.password === "" && values.newpassword !== "") {
        errors.password = 'Password Required';
    }
    if (values.password !== "" && values.newpassword === "") {
        errors.newpassword = 'Password Required';
    }

    return errors;
}

const Profile = () => {
    const [state, setSate] = useState({
        email: "",
        name: '',
        phone: '',
        password: '',
        newpassword: ''
    });

    // TODO: Fetch Initial Data


    const formik = useFormik({
        initialValues: state,
        validate,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <div>

            <Typography variant="h5" gutterBottom style={{ margin: "11px 0 0 11px" }}>
                Edit Profile
            </Typography>

            <form onSubmit={formik.handleSubmit} className="profile-form">
                <TextField
                    fullWidth
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    name="name"
                    type="text"
                    label="Name"
                    required
                />
                <TextField
                    fullWidth
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    name="email"
                    type="email"
                    label="Email"
                    required
                />
                <TextField
                    fullWidth
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                    name="phone"
                    type="tel"
                    label="Phone Number"
                />
                <TextField
                    fullWidth
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    name="password"
                    type="password"
                    label="Current Password"
                />
                <TextField
                    fullWidth
                    value={formik.values.newpassword}
                    onChange={formik.handleChange}
                    error={formik.touched.newpassword && Boolean(formik.errors.newpassword)}
                    helperText={formik.touched.newpassword && formik.errors.newpassword}
                    name="newpassword"
                    type="password"
                    label="New Password"
                />

                <Button color="primary" variant="contained" fullWidth type="submit">
                    Save Changes
                </Button>

            </form>
        </div>
    );
};

export default Profile;