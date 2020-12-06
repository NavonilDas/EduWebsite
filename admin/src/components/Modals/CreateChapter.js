import { Button, TextField } from '@material-ui/core';
import React from 'react';

import axios from 'axios';
import API from '../../Api';
const HOST = API.HOST;

class CreateChapter extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.selected)
        this.state = {
            chapterName: (this.props.selected) ? this.props.selected.name : "",
            nameError: "",
            chapterDescription: (this.props.selected) ? this.props.selected.description : "",
            apiError: ""
        };
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let tmp = {};
        tmp[event.target.name] = event.target.value;
        this.setState(tmp);
    }

    submit() {
        if (this.state.chapterName === "") {
            return this.setState({ nameError: "Name Can't Be Empty." });
        }
        const body = new FormData();
        body.append("name", this.state.chapterName);
        body.append("position", this.props.position);
        body.append("description", this.state.chapterDescription);
        let request = null;
        const config = {
            withCredentials: true,
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        if (this.props.selected) {
            request = axios.put(`${HOST}chapters/${this.props.selected._id}`, body, config);
        } else {
            request = axios.post(`${HOST}chapters/add/${this.props.courseID}`, body, config);
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
            <div className={`create-chapter ${this.props.modal ? 'modal' : ''}`}>
                <h1>Add Chapter</h1>

                {(this.state.apiError !== "") ? (<span style={{ color: "red" }}>{this.state.apiError}</span>) : ''}

                <form className="course-form" style={{ minWidth: "400px" }}>
                    <TextField
                        required
                        id="chapter-title"
                        name="chapterName"
                        error={this.state.nameError !== ""}
                        helperText={this.state.nameError}
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