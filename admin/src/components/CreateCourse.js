import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import { DropzoneDialog } from 'material-ui-dropzone';
import React from 'react';
import NavBar from './NavBar';

class CreateCourse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            files: []
        };
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
    
    render() {
        return (
            <main className="admin-content">
                <NavBar title="Create Course" />
                <div className="admin-body">
                    <form className="course-form" style={{ width: "300px" }}>
                        <TextField required id="course-title" label="Course Title" />
                        <TextField
                            id="outlined-multiline-static"
                            label="Course Description"
                            multiline
                            rows={4}
                            variant="outlined"
                        />

                        <TextField required id="course-slug" label="Course url" />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="checkedB"
                                    color="primary"
                                />
                            }
                            label="Is Paid"
                        />
                        <TextField
                            id="filled-number"
                            label="Price"
                            type="number"
                        />
                        <div>
                            <Button onClick={this.handleOpen.bind(this)}>
                                Add Thumbnail
                            </Button>
                            <DropzoneDialog
                                open={this.state.open}
                                onSave={this.handleSave.bind(this)}
                                acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                                showPreviews={true}
                                maxFileSize={5000000}
                                onClose={this.handleClose.bind(this)}
                            />
                        </div>
                        <Button variant="contained" color="primary">
                            Submit
                        </Button>
                    </form>
                </div>
            </main>
        );
    }
}

export default CreateCourse;