import { Button, TextField } from '@material-ui/core';
import React from 'react';

class CreateChapter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chapterName: this.props.chapterName || "",
            chapterDescription: this.props.chapterDescription || ""
        };
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        let tmp = {};
        tmp[event.target.name] = event.target.value;
        console.log(tmp);
        this.setState(tmp);
    }
    submit() {
        // TODO: API Call
        if (this.props.chapterID) {
            console.log("TODO: Update");
        }
        console.log(this.state);
        if (this.props.onSubmit) {
            this.props.onSubmit();
        }
    }

    render() {
        return (
            <div className={`create-chapter ${this.props.modal ? 'modal' : ''}`}>
                <form className="course-form" style={{ minWidth: "400px" }}>
                    <TextField
                        required
                        id="chapter-title"
                        name="chapterName"
                        onChange={this.handleChange}
                        value={this.state.chapterName}
                        label="Chapter Title"
                    />

                    <TextField
                        name="chapterDescription"
                        id="outlined-multiline-static"
                        label="Chapter Description (Optional)"
                        value={this.state.chapterDescription}
                        multiline
                        rows={4}
                        onChange={this.handleChange}
                        variant="outlined"
                    />

                    <div className="d-flex">
                        <Button variant="contained" color="primary" onClick={this.submit} style={{ marginLeft: "auto" }}>
                            {this.props.modal ? 'Submit' : 'Update'}
                        </Button>
                    </div>
                </form>

            </div>
        );
    }
}

export default CreateChapter;