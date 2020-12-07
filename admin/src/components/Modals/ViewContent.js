import React from 'react';
import pdfobject from 'pdfobject';

import axios from 'axios';
import API from '../../Api';
const { HOST } = API;


class ViewContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mediaType: "",
            vid: "",
            vurl: "", // TODO: Video URL
            content: null
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
    }

    render() {
        return (
            <div className="modal" style={{ maxWidth: "80%", maxHeight: "100%", overflowY: "scroll" }}>
                <div>
                    {(this.props.selected.media && this.state.mediaType === 'img') ? <img src="" /> : ''}
                    {(this.props.selected.media && this.state.mediaType === 'pdf') ? <div></div> : ''}

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