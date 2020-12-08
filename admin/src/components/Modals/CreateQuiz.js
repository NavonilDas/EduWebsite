import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { DropzoneDialog } from 'material-ui-dropzone';

import axios from 'axios';
import API from '../../Api';
const { HOST } = API;

class CreateQuiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            opt1: "",
            opt2: "",
            opt3: "",
            opt4: "",
            ans1: false,
            ans2: false,
            ans3: false,
            ans4: false,
            open: false,
            files: [],
        };

        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.onEditorStateChange = this.onEditorStateChange.bind(this);
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.checkUnique = this.checkUnique.bind(this);
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

    handleClose() {
        this.setState({
            open: false
        });
    }

    onEditorStateChange(editorState) {
        this.setState({
            editorState,
        });
    };

    componentDidMount() {

    }

    handleChange(event) {
        const target = event.target;
        const tmp = {};
        if (target.type === "checkbox") {
            tmp[target.name] = target.checked;
        } else {
            tmp[target.name] = target.value;
        }
        this.setState(tmp);
    }

    checkUnique() {
        const tmp = {};
        tmp[this.state.opt1.trim()] = true;
        if (tmp[this.state.opt2.trim()]) {
            alert('Duplicate Option Found!');
            return true;
        } else tmp[this.state.opt2.trim()] = true;

        if (tmp[this.state.opt3.trim()]) {
            alert('Duplicate Option Found!');
            return true;
        } else tmp[this.state.opt3.trim()] = true;

        if (tmp[this.state.opt4.trim()]) {
            alert('Duplicate Option Found!');
            return true;
        } else tmp[this.state.opt4.trim()] = true;

        return false;
    }

    submit() {
        const rawContentState = convertToRaw(this.state.editorState.getCurrentContent());
        const markup = draftToHtml(
            rawContentState
        );
        if (markup.trim() === "<p></p>") {
            alert("Question is Empty!");
            return;
        }

        if (
            this.state.opt1.trim() === "" ||
            this.state.opt2.trim() === "" ||
            this.state.opt3.trim() === "" ||
            this.state.opt4.trim() === ""
        ) {
            alert("Option is Empty!");
            return;
        }

        if (!(this.state.ans1 || this.state.ans2 || this.state.ans3 || this.state.ans4)) {
            alert("Answer is Empty!");
            return;
        }

        if (this.checkUnique()) return;

        const solution = [];
        if (this.state.ans1) {
            solution.push(this.state.opt1);
        }
        if (this.state.ans2) {
            solution.push(this.state.opt2);
        }
        if (this.state.ans3) {
            solution.push(this.state.opt3);
        }
        if (this.state.ans4) {
            solution.push(this.state.opt4);
        }

        const body = new FormData();
        body.append("question", markup);
        body.append("options", JSON.stringify([
            this.state.opt1,
            this.state.opt2,
            this.state.opt3,
            this.state.opt4,
        ]));
        body.append("answer", JSON.stringify(solution));
        if (this.state.files.length > 0) {
            body.append('image', this.state.files[0]);
        }

        const config = {
            withCredentials: true,
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        let request = null;
        // TODO: Update
        request = axios.post(`${HOST}test/add/${this.props.testID}`, body, config);
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
            <div className="create-quiz modal">
                <h1>Create Quiz</h1>
                <label className="label"> Question </label>
                <div style={{ height: "350px", overflowY: "scroll" }}>
                    <Editor
                        editorState={this.state.editorState}
                        wrapperClassName="quiz-question-wrapper"
                        editorClassName="quiz-question-editor"
                        onEditorStateChange={this.onEditorStateChange}
                    />
                </div>
                <br />
                <Button variant="contained" onClick={this.handleOpen}>
                    Add Image
                </Button>

                <div className="d-flex" style={{ flexDirection: "column", margin: "10px" }}>
                    <label className="label">Options</label>
                    <TextField
                        required
                        name="opt1"
                        id="option1"
                        label="Option 1"
                        multiline
                        value={this.state.opt1}
                        onChange={this.handleChange}
                    />
                    <TextField
                        required
                        name="opt2"
                        id="option2"
                        label="Option 2"
                        multiline
                        value={this.state.opt2}
                        onChange={this.handleChange}
                    />
                    <TextField
                        required
                        name="opt3"
                        id="option3"
                        multiline
                        label="Option 3"
                        value={this.state.opt3}
                        onChange={this.handleChange}
                    />
                    <TextField
                        required
                        name="opt4"
                        id="option4"
                        label="Option 4"
                        multiline
                        value={this.state.opt4}
                        onChange={this.handleChange}
                    />
                </div>

                <div className="d-flex" style={{ flexDirection: "column", margin: "10px" }}>
                    <label className="label">Correct Answers</label>
                    {(this.state.opt1 !== "") ?
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="ans1"
                                    color="primary"
                                />
                            }
                            checked={this.state.ans1}
                            onChange={this.handleChange}
                            label={this.state.opt1}
                        />
                        : ""
                    }
                    {(this.state.opt2 !== "") ?
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="ans2"
                                    color="primary"
                                />
                            }
                            checked={this.state.ans2}
                            onChange={this.handleChange}
                            label={this.state.opt2}
                        />
                        : ""
                    }

                    {(this.state.opt3 !== "") ?
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="ans3"
                                    color="primary"
                                />
                            }
                            checked={this.state.ans3}
                            onChange={this.handleChange}
                            label={this.state.opt3}
                        />
                        : ""
                    }

                    {(this.state.opt4 !== "") ?
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="ans4"
                                    color="primary"
                                />
                            }
                            checked={this.state.ans4}
                            onChange={this.handleChange}
                            label={this.state.opt4}
                        />
                        : ""
                    }

                </div>

                <div className="d-flex">
                    <Button variant="contained" color="primary" onClick={this.submit} style={{ marginLeft: "auto" }}>
                        Submit
                    </Button>
                </div>

                <DropzoneDialog
                    open={this.state.open}
                    onSave={this.handleSave}
                    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                    showPreviews={true}
                    maxFileSize={5000000}
                    onClose={this.handleClose}
                />

            </div>
        );
    }
}

export default CreateQuiz;