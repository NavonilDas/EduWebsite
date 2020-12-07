import { Button, IconButton, ListItem, ListItemIcon, ListItemText, List, Modal } from '@material-ui/core';
import React from 'react';
import NavBar from './NavBar';
import $ from 'jquery';
import 'jquery-ui';
import 'jquery-ui/ui/widgets/sortable';
import 'jquery-ui/ui/disable-selection';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddVideo from './Modals/AddVideo';
import AddMedia from './Modals/AddMedia';

import ContactSupportIcon from '@material-ui/icons/ContactSupport'; // Quiz
import MenuBookIcon from '@material-ui/icons/MenuBook'; // TOPIC
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled'; // Video
import WebAssetIcon from '@material-ui/icons/WebAsset'; // Media

import axios from 'axios';
import API from '../Api';
const { HOST } = API;

class Chapters extends React.Component {
    constructor(props) {
        super(props);

        let chapName = null;
        if (this.props?.location?.search) {
            const params = new URLSearchParams(this.props.location.search);
            chapName = params.get('name');
        }

        this.state = {
            chapterId: this.props.match.params.id,
            chapName,
            openModal: false,
            addVideo: false,
            addMedia: false,
            items: [],
            apiError: "",
            selected: null
        };

        this.openModal = this.openModal.bind(this);
        this.modalClose = this.modalClose.bind(this);
        this.update = this.update.bind(this);
    }

    modalClose() {
        this.setState({ openModal: false, addMedia: false, addVideo: false });
    }

    openModal() {
        this.setState({ openModal: true });
    }

    componentDidMount() {
        this.update();
        $("#chapter-list").sortable({
        }).disableSelection();
    }

    editItem(eve, ele) {
        eve.stopPropagation();
        if (ele.video) {
            this.setState({
                selected: ele,
                addVideo: true,
                openModal: true
            });
        } else if (ele.media) {

        } else if (ele.quiz) {

        } else {
            // Topic
            this.props.history.push(`/edit/content/${ele._id}`);
        }
    }

    deleteItem(eve, ele) {
        eve.stopPropagation();
    }

    update() {
        this.setState({ openModal: false, addMedia: false, addVideo: false, selected: null });
        axios.get(`${HOST}content/chapter/${this.state.chapterId}`)
            .then(res => {
                if (res.data) {
                    this.setState({
                        items: res.data.sort((a, b) => (+a.position) - (+b.position))
                    });
                }
            })
            .catch(err => {
                if (err.response && err.response.data && err.response.data.error) {
                    this.setState({ apiError: 'Error: ' + err.response.data.error });
                } else {
                    this.setState({ apiError: '' + err });
                }
                console.error(err);
            });
    }

    render() {
        // const items = this.state.items;
        const items = this.state.items;
        return (
            <main className="admin-content">

                <NavBar title={(this.state.chapName) ? this.state.chapName : 'Chapter Name'} />

                <div className="admin-body">

                    <div className="d-flex" style={{ marginTop: "10px" }}>
                        <h2 style={{ flexGrow: 1 }}>Contents</h2>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                this.props.history.push(`/content/${this.state.chapterId}`);
                            }}
                        >
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

                    <span className="errorText">{(this.state.apiError) ? this.state.apiError : ''}</span>

                    {(this.state.items.length <= 0) ? (<p>No Courses Available</p>) : ''}


                    <List id="chapter-list" className="sortable" style={{ marginBottom: "10em" }}>
                        {items.map((ele, i) => (
                            <div key={i}>
                                <ListItem
                                    button
                                >
                                    <ListItemIcon>
                                        {(ele.video) ? <PlayCircleFilledIcon /> : ((ele.media) ? <WebAssetIcon /> : ((ele.quiz) ? <ContactSupportIcon /> : <MenuBookIcon />))}
                                    </ListItemIcon>
                                    <ListItemText primary={ele.title} />
                                    <IconButton
                                        aria-label="Edit"
                                        onClick={(eve) => this.editItem(eve, ele)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton style={{ color: "#db3825" }} aria-label="Delete" onClick={this.delete}>
                                        <DeleteIcon />
                                    </IconButton>

                                </ListItem>


                            </div>
                        ))}
                    </List>
                </div>

                <Modal
                    open={this.state.openModal}
                    onClose={this.modalClose}
                >
                    <div>
                        {(this.state.addVideo) ?
                            <AddVideo
                                onUpdate={this.update}
                                chapterID={this.state.chapterId}
                                position={this.state.items.length}
                                selected={this.state.selected}
                            />
                            : ''
                        }
                        {(this.state.addMedia) ?
                            <AddMedia
                                onSubmit={this.modalClose}
                                chapterID={this.state.chapterId}
                            />
                            : ''
                        }
                    </div>
                </Modal>

            </main>
        );
    }
}

export default Chapters;