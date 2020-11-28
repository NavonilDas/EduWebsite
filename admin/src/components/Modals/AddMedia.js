import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { DropzoneDialog } from 'material-ui-dropzone';
import React from 'react';

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
        const body = {
            file: this.state.files,
            title: this.state.title,
            chapterID: this.props.chapterID
        }
        // TODO: Add Media
        console.log(body);
        if (this.props.onSubmit) {
            this.props.onSubmit();
        }
    }

    render() {
        return (
            <div className="add-media modal d-flex flex-column">
                <h1>Add Media</h1>
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
                    Submit
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