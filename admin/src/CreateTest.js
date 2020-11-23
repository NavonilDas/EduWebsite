import { Button, Card, CardActions, CardContent, Checkbox, FormControlLabel, List, ListItem, Modal } from '@material-ui/core';
import React from 'react';
import CreateQuiz from './components/Modals/CreateQuiz';
import NavBar from './components/NavBar';

class CreateTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            testName: "Create Test",
            openModal: false
        };
        this.openModal = this.openModal.bind(this);
        this.modalClose = this.modalClose.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);
    }
    componentDidMount() {
        const chapterid = null;
        const courseid = null;
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

    render() {
        // SAMPLE Questions
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




                </div>

                <Modal
                    open={this.state.openModal}
                    onClose={this.modalClose}
                >
                    <CreateQuiz />
                </Modal>

            </main>

        );
    }
}

export default CreateTest;