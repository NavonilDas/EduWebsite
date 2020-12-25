import React from 'react';
import NavBar from './NavBar';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { IconButton, Modal } from '@material-ui/core';
import CreateCategory from './Modals/CreateCategory';

import ShareIcon from '@material-ui/icons/Share';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import axios from 'axios';
import { errorHandler, HOST, IMG } from '../Api';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
            items: [],
            selectedTitle: null,
            selectedId: null,
            apiError: ""
        };

        this.openModal = this.openModal.bind(this);
        this.modalClose = this.modalClose.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
        this.shareCategory = this.shareCategory.bind(this);
    }

    modalClose() {
        this.setState({
            openModal: false,
            selectedId: null,
            selectedTitle: null
        });
    }

    openModal() {
        this.setState({ openModal: true });
    }

    deleteCategory(id) {

        const ans = window.confirm("Are You Sure, You want to Delete it");
        if(!ans) return;

        axios.delete(`${HOST}categories/${id}`, { withCredentials: true })
            .then(res => {
                if (res.data.error) {
                    this.setState({ apiError: res.data.error });
                }
                if (res.data.status) {
                    this.setState({ items: this.state.items.filter((ele) => ele._id !== id) });
                }
            })
            .catch((err) => errorHandler(err, this));
    }

    shareCategory(slug) {
        // TODO: Genrate URL
    }

    componentDidMount() {
        axios.get(`${HOST}categories`)
            .then(res => {
                if (res.data) {
                    this.setState({ items: res.data });
                }
            })
            .catch((err) => errorHandler(err, this));
    }

    render() {
        const items = this.state.items;
        return (
            <main className="admin-content">
                <NavBar title="Home" />
                <div className="admin-body">
                    <div className="d-flex" style={{ marginBottom: '1em' }}>
                        <h1 style={{ flexGrow: 1 }}>Categories</h1>
                        <Button variant="contained" color="primary" onClick={this.openModal}>
                            Create Category
                        </Button>
                    </div>
                    <span className="errorText">{(this.state.apiError) ? this.state.apiError : ''}</span>
                    <div className="row">
                        {
                            items.map((ele, ind) => (
                                <div className="col-md-2" key={`card-${ind}`} style={{ marginBottom: "30px", minWidth: "210px" }}>
                                    <Card>

                                        <CardActionArea onClick={() => {
                                            this.props.history.push(`/category/${ele._id}?name=${ele.name}`);
                                        }}>
                                            <CardMedia
                                                className="card-img"
                                                image={`${IMG}${ele.icon}`}
                                                title={ele.name}
                                            />
                                            <CardContent style={{ paddingBottom: 0 }}>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {ele.name}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>

                                        <CardActions style={{ paddingTop: 0 }}>
                                            <IconButton aria-label="Edit"
                                                style={{ color: "#097d01" }}
                                                onClick={() => {
                                                    this.setState({
                                                        openModal: true,
                                                        selectedId: ele._id,
                                                        selectedTitle: ele.name
                                                    });
                                                }}
                                            >
                                                <EditIcon />
                                            </IconButton>

                                            <IconButton
                                                aria-label="Delete"
                                                style={{ color: "#db3825" }}
                                                onClick={() => this.deleteCategory(ele._id)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>

                                            <IconButton aria-label="Share" style={{ color: "#1d70f5" }} onClick={() => this.shareCategory(ele.slug)}>
                                                <ShareIcon />
                                            </IconButton>

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
                        <CreateCategory onUpdate={this.componentDidMount} ID={this.state.selectedId} title={this.state.selectedTitle} />
                    </div>
                </Modal>

            </main>
        );
    }
}

export default Dashboard;