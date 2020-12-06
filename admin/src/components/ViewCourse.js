import { Button, Collapse, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, Modal, Typography } from '@material-ui/core';
import React from 'react';
import NavBar from './NavBar';
import $ from 'jquery';
import 'jquery-ui';
import 'jquery-ui/ui/widgets/sortable';
import 'jquery-ui/ui/disable-selection';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';

import CreateChapter from './Modals/CreateChapter';

import axios from 'axios';
import API from '../Api';
import CreateTest from './Modals/CreateTest';
const HOST = API.HOST;

class ViewCourse extends React.Component {
    constructor(props) {
        super(props);

        let crsName = null;
        if (this.props?.location?.search) {
            const params = new URLSearchParams(this.props.location.search);
            crsName = params.get('name');
        }

        this.state = {
            course_id: this.props.match.params.id,
            crsName,
            saveChanges: false,
            items: [],
            list: [],
            openModal: false,
            apiError: "",
            selected: null,
            openTest: false
        };

        this.save_btn = React.createRef();
        this.change = this.change.bind(this);
        this.expandDetail = this.expandDetail.bind(this);
        this.openModal = this.openModal.bind(this);
        this.modalClose = this.modalClose.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.editChapter = this.editChapter.bind(this);
    }

    modalClose() {
        this.setState({ openModal: false, selected: null, openTest: false });
    }

    openModal() {
        this.setState({ openModal: true });
    }

    change(event, ui) {
        if (this.save_btn?.current) {
            console.log(this.save_btn);
            this.setState({ saveChanges: true });
        }
    }

    componentDidMount() {
        this.update();

        $("#course-chapters").sortable({
            update: this.change
        }).disableSelection();
        this.setState({
            items: []
        });
    }

    delete(eve, ele) {
        eve.stopPropagation();
        // TODO: Ask Confirmation
        let request = null;
        if (ele.name) {
            // Delete Chapter
            request = axios.delete(`${HOST}chapters/${ele._id}`, { withCredentials: true });
        } else {
            // Delete Quiz
            request = axios.delete(`${HOST}test/${ele._id}`, { withCredentials: true });
        }
        request
            .then(res => {
                if (res.data) {
                    this.setState({
                        items: this.state.items.filter(item => item._id !== ele._id)
                    });
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

    editChapter(eve, ele) {
        eve.stopPropagation();
        this.setState({
            selected: ele,
            openModal: true,
            openTest: (ele.title) ? true : false
        });
    }

    update() {
        this.setState({ openModal: false, selected: null });
        axios.get(`${HOST}content/course/${this.state.course_id}`)
            .then(res => {
                if (res.data) {
                    this.setState({ items: res.data });
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

    expandDetail(eve, ele, index) {
        eve.stopPropagation();

        if (ele.title) {
            this.setState({
                items: this.state.items.map((ele, i) => {
                    if (i === index) {
                        ele.expand = !ele.expand;
                    }
                    return ele;
                })
            });
        } else {
            axios.get(`${HOST}content/chapter/${ele._id}`)
                .then(res => {
                    if (res.data) {

                        this.setState({
                            items: this.state.items.map((ele, i) => {
                                if (i === index) {
                                    ele.expand = !ele.expand;
                                }
                                return ele;
                            }),
                            list: res.data
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
    }

    render() {
        return (
            <main className="admin-content">
                <NavBar title={(this.state.crsName) ? this.state.crsName : 'Course Title'} />
                <div className="admin-body d-flex flex-column">
                    <div className="d-flex">
                        <h2 style={{ flexGrow: 1 }}>Chapters &amp; Tests</h2>

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.openModal}
                        >
                            Add Chapter
                        </Button>

                        <Button
                            variant="contained"
                            style={{ backgroundColor: "#097d01", marginLeft: "1em", marginRight: "1em" }}
                            color="primary"
                            onClick={() => this.setState({ openTest: true, openModal: true })}
                        >
                            Add Test
                        </Button>

                        <Button
                            style={{ marginLeft: "1em" }}
                            variant="contained"
                            color="secondary"
                            disabled={!this.state.saveChanges}
                            ref={this.save_btn}
                            onClick={() => this.savePositions}
                        >
                            Save Changes
                        </Button>

                    </div>

                    <span className="errorText">{(this.state.apiError) ? this.state.apiError : ''}</span>

                    <div>
                        <List ref={this.tmp} id="course-chapters" className="sortable" component="nav">
                            {this.state.items.map((ele, i) => (
                                <div key={i}>
                                    <ListItem
                                        button
                                        onClick={() => this.props.history.push((ele.name) ? `/chapter/${ele._id}` : `/create/quiz/${ele._id}`)}
                                    >
                                        <ListItemIcon>
                                            {(ele.name) ? <LibraryBooksIcon /> : <ContactSupportIcon />}
                                        </ListItemIcon>

                                        <ListItemText primary={(ele.name) ? ele.name : ele.title} />
                                        <IconButton
                                            aria-label="Expand"
                                            onClick={(eve) => this.expandDetail(eve, ele, i)}
                                        >
                                            {ele.expand ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                        </IconButton>

                                        <IconButton
                                            aria-label="Edit"
                                            onClick={(eve) => this.editChapter(eve, ele)}
                                        >
                                            <EditIcon />
                                        </IconButton>

                                        <IconButton
                                            style={{ color: "#db3825" }}
                                            aria-label="Delete"
                                            onClick={eve => this.delete(eve, ele)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>

                                    </ListItem>

                                    <Collapse in={ele.expand} timeout="auto" unmountOnExit>
                                        <Divider />
                                        <Typography variant="body1" gutterBottom style={{ margin: "16px", color: "gray" }}>
                                            {ele.description}
                                        </Typography>
                                        {(this.state.list.length > 0) ? (
                                            <div>
                                                <Divider />
                                                <List component="nav">
                                                    {this.state.list.map((ele, i) => (
                                                        <ListItem key={`list-${i}`}>
                                                            <ListItemText primary={ele} />
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            </div>
                                        ) : ''}

                                    </Collapse>

                                </div>
                            ))}
                        </List>
                    </div>
                </div>

                <Modal
                    open={this.state.openModal}
                    onClose={this.modalClose}
                >
                    <div>

                        {(this.state.openTest) ?
                            (
                                <CreateTest
                                    selected={this.state.selected}
                                    courseID={this.state.course_id}
                                    onUpdate={this.update}
                                    modal="true"
                                    position={this.state.items.length}
                                />
                            )
                            :
                            (
                                <CreateChapter
                                    selected={this.state.selected}
                                    courseID={this.state.course_id}
                                    onUpdate={this.update}
                                    modal="true"
                                    position={this.state.items.length}
                                />

                            )
                        }

                    </div>
                </Modal>


            </main>
        );
    }
}

export default ViewCourse;