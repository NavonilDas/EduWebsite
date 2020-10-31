import { Button, TextField } from '@material-ui/core';
import { DropzoneDialog } from 'material-ui-dropzone';
import React from 'react';

class CreateCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            files: [],
            category: ""
        };

        this.onChange = this.onChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.submit = this.submit.bind(this);
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
        console.log(files);
    }

    handleOpen() {
        this.setState({
            open: true,
        });
    }

    onChange(event) {
        const val = event.target.value;
        console.log(val);
    }

    submit() {
        // TODO: Call API
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    render() {
        return (
            <div className="create-category modal">
                <h1 style={{ marginBottom: "8px" }}>Create Category</h1>
                <form style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "150px", width: "300px" }}>
                    <TextField label="Category Name" onChange={this.onChange} />

                    <Button onClick={this.handleOpen} variant="contained">
                        Add Thumbnail
                    </Button>

                    <Button variant="contained" color="primary" onClick={this.submit}>Submit</Button>
                </form>

                <DropzoneDialog
                    open={this.state.open}
                    onSave={this.handleSave}
                    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                    showPreviews={true}
                    maxFileSize={5000000}
                    onClose={this.handleClose}
                />

            </div>
        );
    }
}

export default CreateCategory;