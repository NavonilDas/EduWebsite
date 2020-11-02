import { Button, Collapse, Divider, IconButton, List, ListItem, ListItemText, Modal } from '@material-ui/core';
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
import CreateChapter from './Modals/CreateChapter';

class ViewCourse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Course Title",
            saveChanges: false,
            items: [],
            list: [],
            openModal: false
        };

        this.course_id = this.props.match.params.id;
        this.save_btn = React.createRef();
        this.change = this.change.bind(this);
        this.expandDetail = this.expandDetail.bind(this);
        this.openModal = this.openModal.bind(this);
        this.modalClose = this.modalClose.bind(this);
    }

    modalClose() {
        this.setState({ openModal: false });
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
        // TODO: Fetch API

        $("#course-chapters").sortable({
            update: this.change
        }).disableSelection();
        this.setState({
            items: [
                {
                    title: 'Chapter 1',
                    id: 1,
                    expand: false
                },
                {
                    title: 'Chapter 2',
                    id: 1,
                    expand: false
                },
                {
                    title: 'Chapter 3',
                    id: 1,
                    expand: false
                },
                {
                    title: 'Chapter 4',
                    id: 1,
                    expand: false
                },
                {
                    title: 'Chapter 5',
                    id: 1,
                    expand: false
                },
                {
                    title: 'Chapter 6',
                    id: 1,
                    expand: false
                },
                {
                    title: 'Chapter 7',
                    id: 7,
                    expand: false
                },
            ]
        });
    }
    delete(eve) {
        console.log(eve)
    }

    expandDetail(id, index) {
        // console.log(id);
        // TODO: find using id
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
                <NavBar title={this.state.title} />
                <div className="admin-body d-flex flex-column">
                    <div className="d-flex">
                        <h2 style={{ flexGrow: 1 }}>Chapters &amp; Tests</h2>
                        <Button variant="contained" color="primary" onClick={this.openModal}>
                            Add Chapter
                        </Button>
                        <Button variant="contained" style={{ backgroundColor: "#097d01", marginLeft: "1em", marginRight: "1em" }} color="primary">
                            Add Test
                        </Button>
                        <Button style={{ marginLeft: "1em" }} variant="contained" color="secondary" disabled={!this.state.saveChanges} ref={this.save_btn}>
                            Save Changes
                        </Button>
                    </div>

                    <div>
                        <ul ref={this.tmp} id="course-chapters" className="sortable">
                            {this.state.items.map((ele, i) => (
                                <li key={i}>{ele.title}
                                    <IconButton aria-label="Expand" onClick={() => this.expandDetail(ele.id, i)}>
                                        {ele.expand ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                    </IconButton>
                                    <IconButton aria-label="Edit" href={`/chapter/${ele.id}`}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton style={{ color: "#db3825" }} aria-label="Delete" onClick={this.delete}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <Collapse in={ele.expand} timeout="auto" unmountOnExit>
                                        <Divider />
                                        <List component="nav">
                                            {this.state.list.map((ele, i) => (
                                                <ListItem button key={`list-${i}`}>
                                                    <ListItemText primary={ele} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Collapse>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <Modal
                    open={this.state.openModal}
                    onClose={this.modalClose}
                >
                    <CreateChapter onSubmit={this.modalClose} modal="true"/>
                </Modal>


            </main>
        );
    }
}

export default ViewCourse;