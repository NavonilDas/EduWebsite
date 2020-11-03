import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import { DropzoneDialog } from 'material-ui-dropzone';
import React from 'react';

class CreateCourse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            files: [],
            title: "",
            description: "",
            isPaid: true,
            price: 0,
            duration: 10
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
        if (ele.type && ele.type == 'checkbox') {
            tmp[ele.name] = ele.checked;
        } else {
            tmp[ele.name] = ele.value;
        }
        this.setState(tmp);
    }
    submit() {
        // TODO: API Request
        console.log(this.state);
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    render() {
        return (
            <main className="create-course modal">
                <h1>Create Course</h1>
                <div>
                    <form className="course-form" style={{ width: "300px" }}>
                        <TextField
                            required
                            name="title"
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

                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="checkedB"
                                    color="primary"
                                />
                            }
                            checked={this.state.isPaid}
                            onChange={this.handleChange}
                            label="Is Paid"
                        />
                        <TextField
                            id="filled-number"
                            label="Price"
                            type="number"
                            name="price"
                            value={this.state.price}
                            onChange={this.handleChange}
                        />
                        <div className="d-flex">
                            <TextField
                                id="filled-number"
                                label="Course Duration"
                                type="number"
                                name="duration"
                                onChange={this.handleChange}
                                value={this.state.duration}
                            />
                            <label style={{ margin: "auto 0 0 10px", fontSize: "1.5em" }}>Months</label>
                            {/* <FormControl>
                                <InputLabel id="demo-simple-select-helper-label">Du</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={10}>
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl> */}
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