import React from 'react';
import NavBar from './NavBar';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { Button, Modal, TextField } from '@material-ui/core';

import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import PickImage from './Modals/PickImage';

class AddContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
            name: "",
            nameError: "",
            editorState: EditorState.createEmpty(),
        };

        this.chapterID = this.props.match.params.chapterID;


        this.openModal = this.openModal.bind(this);
        this.modalClose = this.modalClose.bind(this);
        this.onEditorStateChange = this.onEditorStateChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    modalClose() {
        this.setState({
            openModal: false,
        });
    }

    openModal() {
        this.setState({ openModal: true });
    }

    handleChange(event) {
        const tmp = {};
        tmp[event.target.name] = event.target.value;
        this.setState(tmp);
    }

    onEditorStateChange(editorState) {
        this.setState({
            editorState,
        });
    };

    submit() {
        const rawContentState = convertToRaw(this.state.editorState.getCurrentContent());
        const markup = draftToHtml(
            rawContentState
        );
        if (markup.trim() === '<p></p>') {
            return alert('Content Can\'t Be Empty!');
        }
        if (this.state.name === "") {
            this.setState({
                nameError: "Content Name Can't Be Empty!"
            });
        }
        console.log(this.state.name, markup);
    }

    render() {
        return (
            <main className="admin-content">
                <NavBar title="Content" />
                <div className="admin-body d-flex flex-column" style={{ height: "85vh", overflow: "hidden" }}>

                    <div className="d-flex">
                        <TextField
                            required
                            error={this.state.nameError !== ""}
                            helperText={this.state.nameError}
                            name="name"
                            id="name"
                            label="Content Name"
                            value={this.state.name}
                            onChange={this.handleChange}
                            style={{ flex: 1, marginRight: "1em" }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.submit}
                            style={{ margin: "auto" }}>
                            Submit
                        </Button>
                    </div>

                    <br />

                    <Editor
                        editorState={this.state.editorState}
                        wrapperClassName="content-wrapper"
                        editorClassName="content-editor"
                        onEditorStateChange={this.onEditorStateChange}
                        toolbarCustomButtons={[
                            <div>
                                <div className="rdw-option-wrapper" title="Add Image From Library" onClick={this.openModal}>
                                    <PhotoLibraryIcon />
                                </div>
                            </div>
                        ]}
                    />
                </div>


                <Modal
                    open={this.state.openModal}
                    onClose={this.modalClose}
                >
                    <div>
                        <PickImage
                            editorState={this.state.editorState}
                            onChange={this.onEditorStateChange}
                            onClose={this.modalClose}
                        />
                    </div>
                </Modal>


            </main>
        );
    }
}

export default AddContent;