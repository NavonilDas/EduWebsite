import { Button } from '@material-ui/core';
import { DropzoneDialog } from 'material-ui-dropzone';
import React from 'react';
import { AtomicBlockUtils } from 'draft-js';

class PickImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            files: [],
            prev: null,
            selected: "",
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.pick = this.pick.bind(this);
        this.addImage = this.addImage.bind(this);
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

    addImage(location) {
        if (location && this.props.editorState && this.props.onChange) {
            const entityData = {
                src: location,
                height: "auto",
                width: "auto"
            };
            const entityKey = this.props.editorState
                .getCurrentContent()
                .createEntity('IMAGE', 'MUTABLE', entityData)
                .getLastCreatedEntityKey();

            const newEditorState = AtomicBlockUtils.insertAtomicBlock(
                this.props.editorState,
                entityKey,
                ' '
            );
            this.props.onChange(newEditorState);
        }
    }

    pick() {
        const url = this.state.selected;
        this.addImage(url);
        setTimeout(() => {
            if (this.props.onClose) {
                this.props.onClose();
            }
        }, 100);
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
                            className={`col-md-2 ${this.state[`item${ind}`] ? 'selected' : ''}`}
                            key={ind}
                            onClick={() => {
                                let tmp = {};
                                tmp[`item${ind}`] = true;
                                if (this.state.prev) {
                                    tmp[this.state.prev] = false;
                                }
                                tmp['prev'] = `item${ind}`;
                                tmp['selected'] = ele.url;
                                this.setState(tmp);
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
                            onClick={this.handleOpen}
                        >
                            Upload
                        </Button>
                        <Button variant="contained" color="primary" onClick={this.pick}>
                            Pick
                    </Button>
                    </div>
                </div>

                <DropzoneDialog
                    open={this.state.open}
                    onSave={this.handleSave}
                    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                    showPreviews={true}
                    maxFileSize={5000000}
                    onClose={this.handleClose}
                />

            </div >
        );
    }
}

export default PickImage;
