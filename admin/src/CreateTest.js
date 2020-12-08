import { Button, Card, CardActions, CardContent, Checkbox, FormControlLabel, List, ListItem, Modal } from '@material-ui/core';
import React from 'react';
import CreateQuiz from './components/Modals/CreateQuiz';
import NavBar from './components/NavBar';

class CreateTest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            test_id: this.props.match.params.id,
            testName: "Create Test",
            openModal: false,
            questions: []
        };

        this.openModal = this.openModal.bind(this);
        this.modalClose = this.modalClose.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
    }
    componentDidMount() {
        if (this.state.test_id) {
            // Test is already Created
            // TODO: Fetch Question
        }
    }

    modalClose() {
        this.setState({ openModal: false });
    }

    openModal() {
        this.setState({ openModal: true });
    }

    deleteQuestion(index) {
        // TODO: Fetch API
        console.log(index);
    }

    addQuestion(que) {
        console.log(que);
        this.setState({
            openModal: false
        });
    }

    render() {
        // Sample Questions
        const questions = [
            {
                question: "<p><b>Hello</b> This i Question</p>",
                options: ["Option 1", "Option 2", "Option 3", "Option 4"],
                answer: ["Option 2"],
                images: []
            },
            {
                question: "<p>Hello This i <b>Question</b></p>",
                options: ["Option 1", "Option 2", "Option 3", "Option 4"],
                answer: ["Option 1", "Option 4"],
                images: ['https://upload.wikimedia.org/wikipedia/commons/9/91/LampFlowchart.svg']
            },
        ];

        return (
            <main className="admin-content">
                <NavBar title={this.state.testName} />
                <div className="admin-body">
                    <div className="d-flex">
                        <h2 style={{ flexGrow: 1 }}>Questions</h2>
                        <Button variant="contained" color="primary" onClick={this.openModal}>
                            Add
                        </Button>
                    </div>

                    <form>

                    </form>

                    <List>
                        {questions.map((ele, ind) => (
                            <ListItem key={ind}>
                                <Card style={{ width: "100%" }}>
                                    <CardContent>
                                        <div dangerouslySetInnerHTML={{ __html: ele.question }}></div>
                                        <div className="test-imgs">
                                            {ele.images.map((src, j) => (
                                                <img src={src} alt={`opt${j}`} key={j} />
                                            ))}
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
                                        <Button variant="contained" color="primary">
                                            Edit
                                        </Button>

                                        <Button variant="contained" color="primary" style={{ backgroundColor: "#f0242e" }} onClick={() => this.deleteQuestion(ind)}>
                                            Delete
                                        </Button>

                                    </CardActions>
                                </Card>
                            </ListItem>
                        ))}
                    </List>



                </div>

                <Modal
                    open={this.state.openModal}
                    onClose={this.modalClose}
                >
                    <CreateQuiz
                        testID={this.state.test_id}
                        onUpdate={this.addQuestion}
                    />
                </Modal>

            </main>

        );
    }
}

export default CreateTest;