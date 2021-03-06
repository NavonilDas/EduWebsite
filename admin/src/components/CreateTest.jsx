import { Button, Card, CardActions, CardContent, Checkbox, FormControlLabel, List, ListItem, Modal, Snackbar, Typography } from '@material-ui/core';
import React from 'react';
import CreateQuiz from './Modals/CreateQuiz';
import NavBar from './NavBar';
import { Alert } from '@material-ui/lab';

import axios from 'axios';
import { errorHandler, HOST } from '../Api';

class CreateTest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            test_id: this.props.match.params.id,
            testName: "Create Test",
            description: "",
            openModal: false,
            questions: [],
            selected: null,
            openSnackbar: false
        };

        this.openModal = this.openModal.bind(this);
        this.modalClose = this.modalClose.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
    }
    componentDidMount() {
        this.addQuestion();
    }

    modalClose() {
        this.setState({ openModal: false });
    }

    openModal() {
        this.setState({ openModal: true });
    }

    deleteQuestion(id) {
        const ans = window.confirm("Are You Sure, You want to Delete it");
        if(!ans) return;

        axios.delete(`${HOST}test/del/${this.state.test_id}/${id}`, { withCredentials: true })
            .then(res => {
                this.setState({
                    questions: this.state.questions.filter(ele => ele._id !== id)
                });
            })
            .catch((err) => errorHandler(err, this));
    }

    addQuestion(show) {

        this.setState({
            openModal: false,
            openSnackbar: show
        });

        if (this.state.test_id) {
            axios.get(`${HOST}test/admin/${this.state.test_id}`, { withCredentials: true })
                .then(res => {
                    this.setState({
                        questions: res.data.questions,
                        testName: res.data.title,
                        description: res.data.description
                    });
                })
                .catch((err) => errorHandler(err, this));
        }
    }

    render() {
        // Sample Questions
        const questions = this.state.questions;

        return (
            <main className="admin-content">
                <NavBar title={this.state.testName} />
                <div className="admin-body">

                    <Typography variant="body1" gutterBottom>
                        {this.state.description}
                    </Typography>

                    <div className="d-flex">
                        <h2 style={{ flexGrow: 1 }}>Questions</h2>
                        <Button variant="contained" color="primary" onClick={this.openModal}>
                            Add
                        </Button>
                    </div>

                    <span className="errorText">{(this.state.apiError) ? this.state.apiError : ''}</span>

                    <List>
                        {questions.map((ele, ind) => (
                            <ListItem key={ind}>
                                <Card style={{ width: "100%" }}>
                                    <CardContent>
                                        <div dangerouslySetInnerHTML={{ __html: ele.question }}></div>
                                        <div className="test-imgs">
                                        </div>

                                        <div className="test-options d-flex">
                                            {ele.options.map((opt, j) => (
                                                <FormControlLabel
                                                    key={j}
                                                    control={
                                                        <Checkbox
                                                            name={`ans${j + 1}`}
                                                            color="primary"
                                                        />
                                                    }
                                                    checked={ele.answer.includes(opt)}
                                                    // onChange={this.handleChange}
                                                    label={opt}
                                                />
                                            ))}
                                        </div>

                                    </CardContent>


                                    <CardActions>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => this.setState({ selected: ele, openModal: true })}
                                        >
                                            Edit
                                        </Button>

                                        <Button variant="contained" color="primary" style={{ backgroundColor: "#f0242e" }} onClick={() => this.deleteQuestion(ele._id)}>
                                            Delete
                                        </Button>

                                    </CardActions>
                                </Card>
                            </ListItem>
                        ))}
                    </List>



                </div>

                <Snackbar open={this.state.openSnackbar} autoHideDuration={6000} onClose={() => this.setState({ openSnackbar: false })}>
                    <Alert onClose={() => this.setState({ openSnackbar: false })} severity="success">
                        Question Updated!
                    </Alert>
                </Snackbar>

                <Modal
                    open={this.state.openModal}
                    onClose={this.modalClose}
                >
                    <div>
                        <CreateQuiz
                            selected={this.state.selected}
                            testID={this.state.test_id}
                            onUpdate={this.addQuestion}
                        />
                    </div>
                </Modal>

            </main>

        );
    }
}

export default CreateTest;