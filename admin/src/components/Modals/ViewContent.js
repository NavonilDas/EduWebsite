import React from 'react';
import pdfobject from 'pdfobject';

import axios from 'axios';
import API from '../../Api';
const { HOST, IMG } = API;


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
        // TODO: REQUEST
        // console.log(pdfobject);
        if (this.props.selected.video) {
            axios.get(`${HOST}videos/${this.props.selected._id}`, { withCredentials: true })
                .then(res => {
                    if (res.data) {
                        console.log(res.data);
                        this.setState({
                            vid: res.data.vid,
                            vurl: res.data.url
                        });
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
                .catch(err => {
                    if (err.response && err.response.data && err.response.data.error) {
                        this.setState({ apiError: 'Error :  ' + err.response.data.error });
                    } else {
                        this.setState({ apiError: '' + err });
                    }
                });
        }

    }

    render() {
        if (!this.props.selected) return;
        return (
            <div className="modal" style={{ maxWidth: "80%", maxHeight: "100%", overflowY: "scroll" }}>
                <div>
                    <span className="errorText">{(this.state.apiError) ? this.state.apiError : ''}</span>

                    <div id="show-pdf-here" style={{ width: "80vw", height: "90vh" }} className={(this.state.mediaType !== 'pdf') ? "d-none" : ''}></div>

                    {(this.props.selected.media && this.state.mediaType === 'img') ? <img src={`${IMG}${this.state.mediaURL}`} /> : ''}

                    {(this.props.selected.video) ?
                        (
                            <iframe id="ytplayer" type="text/html" width="640" height="360" src={`https://www.youtube.com/embed/${this.state.vid}?autoplay=1`} frameborder="0"></iframe>
                        ) : ''}
                </div>
            </div>
        );
    }
}
export default ViewContent;