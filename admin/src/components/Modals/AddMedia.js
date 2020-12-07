import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { DropzoneDialog } from 'material-ui-dropzone';
import React from 'react';

import axios from 'axios';
import API from '../../Api';
const { HOST } = API;


class AddMedia extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            files: [],
            title: "",
            titleError: "",
            fileType: "",
            fileTypeError: false,
            mimes: {
                pdf: ["application/pdf"],
                image: ['image/jpeg', 'image/png', 'image/bmp'],
                zip: ["application/zip"]
            }
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
        if (this.state.fileType === "") {
            this.setState({ fileTypeError: true });
            return;
        }
        this.setState({
            open: true,
        });
    }

    handleChange(event) {
        const tmp = {};
        const { name, value } = event.target;
        // console.log(event.target);
        tmp[name] = value;
        tmp.fileTypeError = false;
        this.setState(tmp);
    }

    submit() {
        // TODO: API Request
        if (this.state.title === "") {
            this.setState({ titleError: "Empty Title!" });
            return;
        }
        if (this.state.files.length === 0) {
            alert('File Not Uploaded');
            return;
        }
        const body = new FormData();
        body.append('title', this.state.title);
        body.append('file', this.state.files[0]);
        body.append('position', this.props.position);
        body.append('type', this.state.fileType);

        const config = {
            withCredentials: true,
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        let request = null
        if (this.props.selected) {
            // TODO: Update
        } else {
            request = axios.post(`${HOST}media/add/${this.props.chapterID}`, body, config);
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
                console.error(err);
            });

    }

    render() {
        return (
            <div className="add-media modal d-flex flex-column">
                <h1>{(this.props.selected) ? 'Update' : 'Add'} Media</h1>

                <span className="errorText">{(this.state.apiError) ? this.state.apiError : ''}</span>

                <TextField
                    required
                    error={(this.state.titleError !== "")}
                    name="title"
                    id="title"
                    label="Video Title"
                    helperText={this.state.titleError}
                    value={this.state.title}
                    onChange={this.handleChange}
                />
                <br />
                <FormControl>
                    <InputLabel id="file-type-label">File Type</InputLabel>
                    <Select
                        error={this.state.fileTypeError}
                        name="fileType"
                        onChange={this.handleChange}
                        labelId="file-type-label"
                        value={this.state.fileType}>
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="image">Image</MenuItem>
                        <MenuItem value="pdf">PDF</MenuItem>
                        <MenuItem value="zip">ZIP</MenuItem>
                    </Select>
                </FormControl>
                <br />
                <Button
                    variant="contained"
                    onClick={this.handleOpen}
                >
                    Upload Files
                </Button>
                <br />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.submit}
                >
                    {(this.props.selected) ? 'Update' : 'Submit'}
                </Button>

                <DropzoneDialog
                    open={this.state.open}
                    onSave={this.handleSave}
                    acceptedFiles={this.state.mimes[this.state.fileType]}
                    showPreviews={true}
                    maxFileSize={5000000}
                    onClose={this.handleClose}
                />
            </div>
        );
    }
}

export default AddMedia;