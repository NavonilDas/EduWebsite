import React from 'react';
import NavBar from './NavBar';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { Button, TextField } from '@material-ui/core';

import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';


class AddContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            editorState: EditorState.createEmpty(),
        };
        this.chapterID = this.props.match.params.chapterID;
        this.onEditorStateChange = this.onEditorStateChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
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
        console.log(this.state.name, markup);
    }

    render() {
        return (
            <main className="admin-content">
                <NavBar title="Content" />
                <div className="admin-body">

                    <div className="d-flex">
                        <TextField
                            required
                            name="name"
                            id="name"
                            label="Content Name"
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.submit}
                            style={{ marginLeft: "auto" }}>
                            Submit
                        </Button>
                    </div>

                    <br />
                    <br />

                    <Editor
                        editorState={this.state.editorState}
                        wrapperClassName="content-wrapper"
                        editorClassName="content-editor"
                        onEditorStateChange={this.onEditorStateChange}
                    />
                </div>
            </main>
        );
    }
}

export default AddContent;