import React from 'react';
import pdfobject from 'pdfobject';

import axios from 'axios';
import { errorHandler, HOST, IMG } from "../../Api";


class ViewContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mediaType: "",
            vid: "",
            vurl: "", // TODO: Video URL
            content: null,
            mediaURL: "",
            apiError: ""
        };
    }

    componentDidMount() {
        if (this.props.selected.video) {
            axios.get(`${HOST}videos/${this.props.selected._id}`, { withCredentials: true })
                .then(res => {
                    if (res.data) {
                        this.setState({
                            vid: res.data.vid,
                            vurl: res.data.url
                        });
                    }
                })
                .catch((err) => errorHandler(err, this));
        }
        else if (this.props.selected.media) {
            axios.get(`${HOST}media/${this.props.selected._id}`, { withCredentials: true })
                .then(res => {
                    if (res.data) {

                        if (res.data.type === 'pdf') {
                            pdfobject.embed(`${IMG}${res.data.url}`, '#show-pdf-here');
                        }

                        // TODO: Handle ZIP
                        this.setState({
                            mediaType: res.data.type,
                            mediaURL: res.data.url
                        });
                    }
                })
                .catch((err) => errorHandler(err, this));
        } else {
            // TOPIC
            axios.get(`${HOST}topics/${this.props.selected._id}`, { withCredentials: true })
                .then(res => {
                    this.setState({
                        content: res.data,
                        mediaType: "topic"
                    });
                })
                .catch((err) => errorHandler(err, this));
        }
    }

    render() {
        if (!this.props.selected) return;
        return (
            <div className="modal" style={{ maxWidth: "80%", maxHeight: "100%", overflowY: "scroll" }}>
                <div>
                    <span className="errorText">{(this.state.apiError) ? this.state.apiError : ''}</span>

                    <div id="show-pdf-here" style={{ width: "80vw", height: "90vh" }} className={(this.state.mediaType !== 'pdf') ? "d-none" : ''}></div>

                    {(this.props.selected.media && this.state.mediaType === 'img') ? <img src={`${IMG}${this.state.mediaURL}`} alt="media" /> : ''}

                    {(this.props.selected.video) ?
                        (
                            <iframe id="ytplayer" title="YoutubeVideo" type="text/html" width="640" height="360" src={`https://www.youtube.com/embed/${this.state.vid}?autoplay=1`} frameborder="0"></iframe>
                        ) : ''}


                    {
                        (this.state.mediaType === 'topic') ?
                            (
                                <div style={{ width: "70vw", height: "90vh" }}>
                                    <h1>{this.state.content.title}</h1>
                                    <div dangerouslySetInnerHTML={{ __html: this.state.content.content }}></div>
                                </div>
                            )
                            :
                            ''
                    }
                </div>
            </div>
        );
    }
}
export default ViewContent;