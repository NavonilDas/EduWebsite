import { Button } from '@material-ui/core';
import { DropzoneDialog } from 'material-ui-dropzone';
import React from 'react';

class PickImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prev: null,
            selected: "",
        };
        this.pick = this.pick.bind(this);
    }

    pick() {
        const url = this.state.selected;
        if (this.props.onPick) {
            this.props.onPick(url);
        }
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    render() {
        const images = [
            {
                url: "https://images.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            },
            {
                url: "https://images.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            },
            {
                url: "https://images.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            },
            {
                url: "https://images.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            },
            {
                url: "https://images.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            },
            {
                url: "https://images.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            },
            {
                url: "https://images.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            },
            {
                url: "https://images.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            },
            {
                url: "https://images.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            },
            {
                url: "https://images.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            },
            {
                url: "https://images.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            },
            {
                url: "https://images.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            },
            {
                url: "https://images.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            },
            {
                url: "https://images.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            },
            {
                url: "https://images.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            },
            {
                url: "https://images.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            },
            {
                url: "https://images.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            },
            {
                url: "https://images.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            },
            {
                url: "https://images.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            },
            {
                url: "https://images.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            },
            {
                url: "https://images.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            },
            {
                url: "https://images.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            },
            {
                url: "https://images.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            },
            {
                url: "https://images.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            },
            {
                url: "https://images.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            },
            {
                url: "https://images.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            },
            {
                url: "https://images.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            },
            {
                url: "https://images.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            },
            {
                url: "https://images.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            },
            {
                url: "https://images.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            },
            {
                url: "https://images.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            },
            {
                url: "https://images.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            },
            {
                url: "https://images.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            },
            {
                url: "https://images.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            },
            {
                url: "https://images.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            },
            {
                url: "https://images.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            },
            {
                url: "https://images.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            },
            {
                url: "https://images.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            },
            {
                url: "https://images.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            },
            {
                url: "https://images.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            },
            {
                url: "https://images.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            },
            {
                url: "https://images.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            }
        ];
        return (
            <div className="modal">
                <h1>Pick Image</h1>

                <div className="pick-image-gallery row">
                    {images.map((ele, ind) => (
                        <div
                            className="col-md-2"
                            key={ind}
                            onClick={() => {
                            }}>

                            <img src={`${ele.url}`} alt={`Gallery Item ${ind}`} />

                        </div>
                    ))}
                </div>

                <div className="row" style={{ marginTop: "10px", marginRight: "10px" }}>
                    <div style={{ marginLeft: "auto" }}>
                        <Button
                            variant="contained"
                            style={{ marginRight: "10px" }}
                        >
                            Upload
                        </Button>
                        <Button variant="contained" color="primary" onClick={this.pick}>
                            Pick
                    </Button>
                    </div>
                </div>

            </div >
        );
    }
}

export default PickImage;
