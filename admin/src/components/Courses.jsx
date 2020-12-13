import React from 'react';
import NavBar from './NavBar';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CreateCourse from './Modals/CreateCourse';
import { Modal } from '@material-ui/core';

import axios from 'axios';
import { errorHandler, HOST, IMG } from '../Api';


class Courses extends React.Component {
    constructor(props) {
        super(props);
        let catName = null;
        if (this.props?.location?.search) {
            const params = new URLSearchParams(this.props.location.search);
            catName = params.get('name');
        }
        // console.log(this.props.location.search);
        this.state = {
            category_id: this.props.match.params.id,
            catName,
            openModal: false,
            items: [],
            apiError: "",
            selected: null
        };

        this.openModal = this.openModal.bind(this);
        this.modalClose = this.modalClose.bind(this);
        this.update = this.update.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
        this.editCourse = this.editCourse.bind(this);
        this.shareCourse = this.shareCourse.bind(this);
    }

    modalClose() {
        this.setState({ openModal: false, selected: null });
    }

    openModal() {
        this.setState({ openModal: true });
    }

    deleteCourse(id) {
        if (!id) return;
        axios.delete(`${HOST}courses/${id}`, { withCredentials: true })
            .then(res => {
                if (res.data) {
                    this.setState({
                        items: this.state.items.filter((ele) => ele._id !== id)
                    });
                }
            })
            .catch((err) => errorHandler(err, this));
    }

    editCourse(item) {
        this.setState({
            openModal: true,
            selected: item
        });
    }

    shareCourse(item) {
        // TODO: Generate Link
    }

    update() {
        this.setState({ openModal: false, selected: null });
        axios.get(`${HOST}courses/${this.state.category_id}`)
            .then(res => {
                this.setState({
                    items: res.data
                });
            })
            .catch((err) => errorHandler(err, this));
    }

    componentDidMount() {
        this.update();
    }

    render() {
        const items = this.state.items;
        return (
            <main className="admin-content">
                <NavBar title={(this.state.catName) ? this.state.catName : "Class Name"} />
                <div className="admin-body">

                    <div className="d-flex" style={{ marginBottom: '1em' }}>
                        <h1 style={{ flexGrow: 1 }}>Courses</h1>
                        <Button variant="contained" color="primary" onClick={this.openModal}>
                            Create Course
                        </Button>
                    </div>

                    <span className="errorText">{(this.state.apiError) ? this.state.apiError : ''}</span>

                    {(this.state.items.length <= 0) ? (<p>No Courses Available</p>) : ''}

                    <div className="row">
                        {
                            items.map((ele, ind) => (
                                <div className="col-md-3" key={`card-${ind}`} style={{ padding: "15px", minWidth: "250px" }}>
                                    <Card>
                                        <CardActionArea onClick={() => {
                                            this.props.history.push(`/course/${ele._id}?name=${ele.name}`);
                                        }}>
                                            <CardMedia
                                                className="card-img"
                                                image={`${IMG}${ele.thumbnail}`}
                                                title={ele.name}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {ele.name}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    {ele.description}
                                                </Typography>
                                            </CardContent>

                                        </CardActionArea>

                                        <CardActions>
                                            <Button
                                                size="small"
                                                color="primary"
                                                style={{ color: "green" }}
                                                onClick={() => this.shareCourse(ele)}
                                            >
                                                Share
                                            </Button>

                                            <Button
                                                size="small"
                                                color="primary"
                                                onClick={() => this.editCourse(ele)}
                                            >
                                                Edit
                                            </Button>

                                            <Button
                                                size="small"
                                                color="primary"
                                                style={{ color: "red" }}
                                                onClick={() => this.deleteCourse(ele._id)}
                                            >
                                                Delete
                                            </Button>

                                        </CardActions>
                                    </Card>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <Modal
                    open={this.state.openModal}
                    onClose={this.modalClose}
                >
                    <div>
                        <CreateCourse item={this.state.selected} onUpdate={this.update} categoryID={this.state.category_id} />
                    </div>
                </Modal>


            </main>
        );
    }
}

export default Courses;