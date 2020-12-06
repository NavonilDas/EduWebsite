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
            apiError: ""
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
        this.setState({ openModal: false, selected: null });
    }

    openModal() {
        this.setState({ openModal: true });
    }

    change(event, ui) {
        // console.log(ui);
        if (this.save_btn?.current) {
            console.log(this.save_btn);
            this.setState({ saveChanges: true });
        }
        // this.save_btn.current.disabled = false;
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

    delete(eve, id) {
        eve.stopPropagation();
    }

    editChapter(eve, ele) {
        eve.stopPropagation();
        this.setState({
            selected: ele,
            openModal: true
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

    expandDetail(eve, id, index) {
        eve.stopPropagation();
        // TODO: find using id
        console.log('hello')
        this.setState({
            items: this.state.items.map((ele, i) => {
                if (i === index) {
                    ele.expand = !ele.expand;
                }
                return ele;
            }),
            list: [
                'Video 1',
                'Video 2',
                'Quiz 1',
                'Research Material',
                'Quiz 2'
            ]
        });
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
                            onClick={() => this.props.history.push(`/create/quiz?course=${this.state.course_id}`)}
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
                                        onClick={() => this.props.history.push(`/chapter/${ele._id}`)}
                                    >
                                        <ListItemIcon>
                                            {(ele.name) ? <LibraryBooksIcon /> : <ContactSupportIcon />}
                                        </ListItemIcon>

                                        <ListItemText primary={(ele.name) ? ele.name : ele.title} />
                                        <IconButton
                                            aria-label="Expand"
                                            onClick={(eve) => this.expandDetail(eve, ele._id, i)}
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
                                            onClick={eve => this.delete(eve, ele._id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>

                                    </ListItem>

                                    <Collapse in={ele.expand} timeout="auto" unmountOnExit>
                                        <Divider />
                                        <Typography variant="body1" gutterBottom style={{ margin: "16px", color: "gray" }}>
                                            {ele.description}
                                        </Typography>
                                        <Divider />

                                        <List component="nav">
                                            {this.state.list.map((ele, i) => (
                                                <ListItem key={`list-${i}`}>
                                                    <ListItemText primary={ele} />
                                                </ListItem>
                                            ))}
                                        </List>
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
                        <CreateChapter
                            selected={this.state.selected}
                            courseID={this.state.course_id}
                            onUpdate={this.update}
                            modal="true"
                            position={this.state.items.length}
                        />
                    </div>
                </Modal>


            </main>
        );
    }
}

export default ViewCourse;