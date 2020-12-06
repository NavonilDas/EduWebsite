import { Button, TextField } from '@material-ui/core';
import React from 'react';

import axios from 'axios';
import API from '../../Api';
const HOST = API.HOST;


class AddVideo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            link: "",
            linkError: "",
            titleError: "",
            apiError: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const tmp = {};
        tmp[name] = value;
        this.setState(tmp);
    }

    extractID(url) {
        /**
        Supported URL
        http://www.youtube.com/watch?v=ytid&feature=feedrec_grec_index
        http://www.youtube.com/user/channelname#p/a/u/1/ytid
        http://www.youtube.com/v/ytid?fs=1&amp;hl=en_US&amp;rel=0
        http://www.youtube.com/watch?v=ytid#t=0m10s
        http://www.youtube.com/embed/ytid?rel=0
        http://www.youtube.com/watch?v=ytid
        http://youtu.be/ytid
         */
        // Regular Expression For match.
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        // if there is match and the id length is 11 then return id else return false.
        return (match && match[7].length === 11) ? match[7] : false;
    }

    submit() {
        const vid = (this.state.link !== '') ? this.extractID(this.state.link) : false;
        if (!vid) {
            this.setState({
                linkError: "Invalid Youtube Link"
            });
            return;
        }
        if (this.state.title === "") {
            this.setState({
                titleError: "Title is Empty!"
            });
            return;
        }

        const body = {
            title: this.state.title,
            vid,
            position: this.props.position
        };

        let request = null
        if (this.props.selected) {
            // TODO: Update
        } else {
            request = axios.post(`${HOST}videos/add/${this.props.chapterID}`, body, { withCredentials: true });
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
            <div className="add-video modal d-flex flex-column">
                <h1>Add Video</h1>

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
                <TextField
                    required
                    error={(this.state.linkError !== "")}
                    name="link"
                    id="link"
                    label="Youtube Link"
                    value={this.state.link}
                    helperText={this.state.linkError}
                    onChange={this.handleChange}
                />
                <br />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.submit}
                >
                    Submit
                </Button>

            </div>
        );
    }
}

export default AddVideo;