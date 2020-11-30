import { Button, IconButton, Modal } from '@material-ui/core';
import React from 'react';
import NavBar from './NavBar';
import $ from 'jquery';
import 'jquery-ui';
import 'jquery-ui/ui/widgets/sortable';
import 'jquery-ui/ui/disable-selection';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CreateChapter from './Modals/CreateChapter';
import AddVideo from './Modals/AddVideo';
import AddMedia from './Modals/AddMedia';


class Chapters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chapterId: this.props.match.params.id || -1,
            openModal: false,
            addVideo: false,
            addMedia: false
        };

        this.openModal = this.openModal.bind(this);
        this.modalClose = this.modalClose.bind(this);
    }

    modalClose() {
        this.setState({ openModal: false, addMedia: false, addVideo: false });
    }

    openModal() {
        this.setState({ openModal: true });
    }

    componentDidMount() {
        $("#chapter-list").sortable({
        }).disableSelection();
    }

    render() {
        return (
            <main className="admin-content">
                <NavBar title="Chapter" />
                <div className="admin-body">

                    <CreateChapter chapterName="ABC" chapterDescription="Hello World" chapterID="10" />

                    <div className="d-flex" style={{ marginTop: "10px" }}>
                        <h2 style={{ flexGrow: 1 }}>Contents</h2>
                        <Button variant="contained" color="primary" onClick={() => {
                            this.props.history.push(`/content/${this.state.chapterId}`);
                        }}>
                            Add Content
                        </Button>

                        <Button
                            variant="contained"
                            color="primary"
                            style={{ marginLeft: "1em" }}
                            onClick={() => {
                                this.setState({
                                    openModal: true,
                                    addVideo: true
                                });
                            }}
                        >
                            Add Video
                        </Button>

                        <Button
                            variant="contained"
                            style={{ backgroundColor: "#097d01", marginLeft: "1em", marginRight: "1em" }}
                            color="primary"
                            onClick={() => {
                                this.props.history.push(`/create/quiz?cid=${this.state.chapterId}`);
                            }}
                        >
                            Add Test
                        </Button>

                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                                this.setState({
                                    openModal: true,
                                    addMedia: true
                                });
                            }}
                        >
                            Add Media
                        </Button>
                        
                    </div>
                    <ul id="chapter-list" className="sortable" style={{ marginBottom: "10em" }}>
                        {['1', '2', '3', '4', '5', '6'].map((ele, i) => (
                            <li key={i}>
                                <PlayCircleFilledIcon /> Content {i + 1}
                                <IconButton aria-label="Edit" href={`/create/chapter?id=${ele.id}`}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton style={{ color: "#db3825" }} aria-label="Delete" onClick={this.delete}>
                                    <DeleteIcon />
                                </IconButton>
                            </li>
                        ))}
                    </ul>
                </div>

                <Modal
                    open={this.state.openModal}
                    onClose={this.modalClose}
                >
                    <div>
                        {(this.state.addVideo) ? <AddVideo onSubmit={this.modalClose} chapterID={this.state.chapterId} /> : ''}
                        {(this.state.addMedia) ? <AddMedia onSubmit={this.modalClose} chapterID={this.state.chapterId} /> : ''}
                    </div>
                </Modal>

            </main>
        );
    }
}

export default Chapters;