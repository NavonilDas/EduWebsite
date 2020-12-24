import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Button, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import { HOST, toFormData } from "../Api";


function validate(values) {
    const errors = {};
    if (values.email === "") {
        errors.email = "Email Required";
    }
    if (values.name === "") {
        errors.name = "Name Required";
    }

    if (values.password === "" && values.newpassword !== "") {
        errors.password = "Password Required";
    }
    if (values.password !== "" && values.newpassword === "") {
        errors.newpassword = "New Password Required";
    }

    if (values.password !== "") {
        const check = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;
        if (!values.newpassword.match(check)) {
            errors.newpassword =
                "Password Length should be minimum 8,At least one Uppercase letter, One lowercase letter, One number and One special character";
        }
    }

    return errors;
}

function onSubmit(values) {
    // TODO: Save Data
}

const Profile = () => {
    const [state, setSate] = useState({
        email: "",
        name: "",
        password: "",
        newpassword: "",
    });

    const [apiError, setApiError] = useState('');

    useEffect(() => {
        axios.get(`${HOST}users/info`, { withCredentials: true, })
            .then((res) => {
                setSate({
                    email: res.data.email,
                    name: res.data.name,
                    password: "",
                    newpassword: ""
                });
            })
            .catch((err) => {
                console.error(err);
                if (err?.response?.status === 401) {
                    // Unauthorised Clear Cookie
                    document.cookie = 'ID=;expires=Thu, 01 Jan 1970 00:00:00 GMT'; // Clear Cookie
                    window.location = '/';
                }
                if (err.response?.data?.error && (typeof err.response.data.error) === 'string') {
                    setApiError(err.response.data.error);
                } else {
                    setApiError("Something Went Wrong!");
                }
            });
    }, []);

    const formik = useFormik({
        initialValues: state,
        validate,
        onSubmit,
        enableReinitialize: true
    });

    return (
        <div>
            <Typography variant="h5" gutterBottom style={{ margin: "11px 0 0 11px" }}>
                Edit Profile
            </Typography>

            <span className="errorText">{apiError}</span>

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
                    error={
                        formik.touched.newpassword && Boolean(formik.errors.newpassword)
                    }
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
