import { Button, IconButton, ListItem, ListItemIcon, ListItemText, List, Modal } from '@material-ui/core';
import React from 'react';
import NavBar from './NavBar';
import $ from 'jquery';
import 'jquery-ui';
import 'jquery-ui/ui/widgets/sortable';
import 'jquery-ui/ui/disable-selection';

import AddVideo from './Modals/AddVideo';
import AddMedia from './Modals/AddMedia';
import CreateTest from './Modals/CreateTest';
import ViewContent from './Modals/ViewContent';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ContactSupportIcon from '@material-ui/icons/ContactSupport'; // Quiz
import MenuBookIcon from '@material-ui/icons/MenuBook'; // TOPIC
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled'; // Video
import WebAssetIcon from '@material-ui/icons/WebAsset'; // Media

import axios from 'axios';
import { errorHandler, HOST } from '../Api';

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
            addTest: false,
            viewSelected: false,
            items: [],
            apiError: "",
            selected: null,
            saveChanges: false
        };

        this.positions = [];

        this.openModal = this.openModal.bind(this);
        this.modalClose = this.modalClose.bind(this);
        this.update = this.update.bind(this);
        this.viewItem = this.viewItem.bind(this);
        this.savePositions = this.savePositions.bind(this);
    }

    savePositions() {
        let items = JSON.parse(
            JSON.stringify(
                this.state.items
            )
        );

        for (const pos of this.positions) {
            const ele = items.splice(pos[0], 1);
            if (ele && ele.length > 0) {
                items.splice(pos[1], 0, ele[0]);
            }
        }
        const body = {
            video: [],
            media: [],
            quiz: [],
            topic: []
        };

        for (let i = 0; i < items.length; ++i) {
            const item = items[i];
            let key = 'topic';
            if (item.video) {
                key = 'video';
            } else if (item.media) {
                key = 'media';
            } else if (item.quiz) {
                key = 'quiz';
            }
            body[key].push({ id: item._id, position: i });
        }

        // Send Update Request
        axios.post(`${HOST}content/chapter`, body, { withCredentials: true })
            .then(_ => {
                this.setState({ saveChanges: false });
                this.positions = [];
            })
            .catch(err => errorHandler(err, this));

    }

    modalClose() {
        this.setState({
            openModal: false,
            addMedia: false,
            addVideo: false,
            addTest: false,
            selected: null
        });
    }

    openModal() {
        this.setState({ openModal: true });
    }

    componentDidMount() {
        this.update();
        let start = null;
        $("#chapter-list").sortable({
            update: (_, ui) => {
                this.positions.push([start, ui.item.index()]);
                this.setState({ saveChanges: true });
            },
            start: (_, ui) => {
                start = ui.item.index();
            }
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
            this.setState({
                selected: ele,
                addMedia: true,
                openModal: true
            });
        } else if (ele.quiz) {
            this.setState({
                selected: ele,
                addTest: true,
                openModal: true
            });
        } else {
            // Topic
            this.props.history.push(`/edit/content/${ele._id}`);
        }
    }

    viewItem(ele) {

        if (ele.quiz) {
            return this.props.history.push(`/create/quiz/${ele._id}`);
        }

        this.setState({
            selected: ele,
            viewSelected: true,
            openModal: true
        });

    }

    deleteItem(eve, ele) {
        eve.stopPropagation();
        // TODO Ask Confirmation
        let request = null;
        if (ele.video) {
            request = axios.delete(`${HOST}videos/${ele._id}`, { withCredentials: true });
        } else if (ele.media) {
            request = axios.delete(`${HOST}media/${ele._id}`, { withCredentials: true });
        } else if (ele.quiz) {
            request = axios.delete(`${HOST}test/${ele._id}`, { withCredentials: true });
        } else {
            // Topic
            request = axios.delete(`${HOST}topics/${ele._id}`, { withCredentials: true });
        }

        request
            .then(res => {
                if (res.data) {
                    this.setState({
                        items: this.state.items.filter(item => (item._id !== ele._id) && (ele.title !== item.title))
                    });
                }
            })
            .catch((err) => errorHandler(err, this));
    }

    update() {
        this.modalClose();
        axios.get(`${HOST}content/chapter/${this.state.chapterId}`)
            .then(res => {
                if (res.data) {
                    this.setState({
                        items: res.data.sort((a, b) => (+a.position) - (+b.position))
                    });
                }
            })
            .catch((err) => errorHandler(err, this));
    }

    render() {
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
                            style={{ marginLeft: "1em", backgroundColor: "#fa7d00" }}
                            onClick={() => this.setState({ openModal: true, addVideo: true })}
                        >
                            Add Video
                        </Button>

                        <Button
                            variant="contained"
                            style={{ backgroundColor: "#097d01", marginLeft: "1em", marginRight: "1em" }}
                            color="primary"
                            onClick={() => this.setState({ openModal: true, addTest: true })}
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

                    <div className="d-flex" style={{ marginTop: "10px" }}>
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ marginLeft: "auto", backgroundColor: "#9d34cf" }}
                            disabled={!this.state.saveChanges}
                            onClick={this.savePositions}
                        >
                            Save Changes
                        </Button>

                    </div>

                    <span className="errorText">{(this.state.apiError) ? this.state.apiError : ''}</span>

                    {(this.state.items.length <= 0) ? (<p>No Courses Available</p>) : ''}


                    <List id="chapter-list" className="sortable" style={{ marginBottom: "10em" }}>
                        {items.map((ele, i) => (
                            <div key={i}>
                                <ListItem
                                    button
                                    onClick={() => this.viewItem(ele)}
                                >
                                    <ListItemIcon>
                                        {(ele.video) ? <PlayCircleFilledIcon /> : ((ele.media) ? <WebAssetIcon /> : ((ele.quiz) ? <ContactSupportIcon /> : <MenuBookIcon />))}
                                    </ListItemIcon>
                                    <ListItemText primary={ele.title} />
                                    <IconButton
                                        aria-label="Edit"
                                        onClick={eve => this.editItem(eve, ele)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton style={{ color: "#db3825" }} aria-label="Delete" onClick={eve => this.deleteItem(eve, ele)}>
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

                        {(this.state.viewSelected) ?
                            (
                                <ViewContent
                                    selected={this.state.selected}
                                />
                            )
                            :
                            ''
                        }

                        {(this.state.addTest) ?
                            (
                                <CreateTest
                                    selected={this.state.selected}
                                    chapterID={this.state.chapterId}
                                    onUpdate={this.update}
                                    position={this.state.items.length}
                                />
                            )
                            :
                            ''
                        }

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
                                onUpdate={this.update}
                                chapterID={this.state.chapterId}
                                position={this.state.items.length}
                                selected={this.state.selected}
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