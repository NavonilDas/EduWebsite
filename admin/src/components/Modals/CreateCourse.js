import { Button, TextField } from '@material-ui/core';
import { DropzoneDialog } from 'material-ui-dropzone';
import React from 'react';

import axios from 'axios';
import API from '../../Api';
const HOST = API.HOST;


class CreateCourse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            files: [],
            title: (this.props.item) ? this.props.item.name : "",
            titleError: "",
            description: (this.props.item) ? this.props.item.description : "",
            // isPaid: true,
            price: (this.props.item) ? this.props.item.price : 1,
            priceError: "",
            duration: (this.props.item) ? this.props.item.duration : 10,
            durationError: "",
            apiError: ""
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleClose() {
        this.setState({
            open: false
        });
    }

    handleSave(files) {
        //Saving files to state for further use and closing Modal.
        this.setState({
            files: files,
            open: false
        });
    }

    handleOpen() {
        this.setState({
            open: true,
        });
    }

    handleChange(event) {
        const ele = event.target;
        let tmp = {};
        if (ele.type && ele.type === 'checkbox') {
            tmp[ele.name] = ele.checked;
        } else {
            tmp[ele.name] = ele.value;
        }
        this.setState(tmp);
    }
    submit() {
        if (!this.props.categoryID) return;

        if (this.state.title === "") {
            return this.setState({ titleError: 'Title Can\'t Be Empty' });
        }

        if (this.state.price <= 0 || isNaN(parseInt(this.state.price))) {
            return this.setState({ priceError: 'Price is Invalid' });
        }

        if (this.state.duration <= 0 || isNaN(parseInt(this.state.duration))) {
            return this.setState({ priceError: 'Duration is Invalid' });
        }


        const body = new FormData();
        body.append('name', this.state.title);
        body.append('description', this.state.description);
        body.append('duration', this.state.duration);
        body.append('price', this.state.price);
        if (this.state.files.length > 0) {
            body.append('thumbnail', this.state.files[0]);
        }

        const config = {
            withCredentials: true,
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        let request = null
        if (this.props.item) {
            request = axios.put(`${HOST}courses/${this.props.item._id}`, body, config)
        } else {
            request = axios.post(`${HOST}courses/add/${this.props.categoryID}`, body, config);
        }

        request
            .then(res => {
                if (res.data) {
                    if (this.props.onUpdate) {
                        this.props.onUpdate();
                    }
                }
            })
            .catch(err => {
                if (err.response && err.response.data && err.response.data.error) {
                    this.setState({ apiError: 'Error :  ' + err.response.data.error });
                } else {
                    this.setState({ apiError: '' + err });
                }
            });

    }

    render() {
        return (
            <main className="create-course modal">
                <h1>Create Course</h1>
                <div>

                    <span className="errorText">{(this.state.apiError) ? this.state.apiError : ''}</span>

                    <form className="course-form" style={{ width: "300px" }}>
                        <TextField
                            required
                            name="title"
                            error={this.state.titleError !== ""}
                            helperText={this.state.titleError}
                            id="course-title"
                            label="Course Title"
                            value={this.state.title}
                            onChange={this.handleChange}
                        />

                        <TextField
                            id="outlined-multiline-static"
                            label="Course Description"
                            multiline
                            rows={4}
                            name="description"
                            variant="outlined"
                            value={this.state.description}
                            onChange={this.handleChange}
                        />

                        {/* <FormControlLabel
                            control={
                                <Checkbox
                                    name="checkedB"
                                    color="primary"
                                />
                            }
                            checked={this.state.isPaid}
                            onChange={this.handleChange}
                            label="Is Paid"
                        /> */}


                        <TextField
                            id="filled-number"
                            label="Price"
                            type="number"
                            name="price"
                            error={this.state.priceError !== ""}
                            helperText={this.state.priceError}
                            InputProps={{
                                inputProps: {
                                    min: 1
                                }
                            }}
                            value={this.state.price}
                            onChange={this.handleChange}
                        />

                        <div className="d-flex">
                            <TextField
                                id="filled-number"
                                label="Course Duration"
                                style={{ flex: 1 }}
                                error={this.state.durationError !== ""}
                                helperText={this.state.durationError}
                                type="number"
                                InputProps={{
                                    inputProps: {
                                        min: 1
                                    }
                                }}
                                name="duration"
                                onChange={this.handleChange}
                                value={this.state.duration}
                            />
                            <label style={{ margin: "auto 0 0 10px", fontSize: "1.5em" }}>Months</label>
                        </div>
                        <div>
                            <Button onClick={this.handleOpen} variant="contained">
                                Add Thumbnail
                            </Button>
                            <DropzoneDialog
                                open={this.state.open}
                                onSave={this.handleSave}
                                acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                                showPreviews={true}
                                maxFileSize={5000000}
                                onClose={this.handleClose}
                            />
                        </div>
                        <Button variant="contained" color="primary" onClick={this.submit}>
                            Submit
                        </Button>
                    </form>
                </div>
            </main>
        );
    }
}

export default CreateCourse;