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

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
            items: [],
            selectedTitle: null,
            selectedId: null
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
        // TODO: Request API

    }

    shareCategory(slug) {
        // TODO: Genrate URL
    }

    componentDidMount() {
        // TODO: Request Categories
    }

    render() {
        const items = [
            {
                id: 'abc',
                thumbnail: "https://prod-discovery.edx-cdn.org/media/course/image/bb5e9463-0248-4f78-a337-b8bb9d829f2b-a71b8e897830.small.jpeg",
                title: "Class 7",
                slug: "programming-in-c"
            },
            {
                id: 'abc',
                thumbnail: "https://prod-discovery.edx-cdn.org/media/course/image/bb5e9463-0248-4f78-a337-b8bb9d829f2b-a71b8e897830.small.jpeg",
                title: "Class 8",
                slug: "programming-in-c"
            },
            {
                id: 'abc',
                thumbnail: "https://prod-discovery.edx-cdn.org/media/course/image/bb5e9463-0248-4f78-a337-b8bb9d829f2b-a71b8e897830.small.jpeg",
                title: "Class 9",
                slug: "programming-in-c"
            },
            {
                id: 'abc',
                thumbnail: "https://prod-discovery.edx-cdn.org/media/course/image/bb5e9463-0248-4f78-a337-b8bb9d829f2b-a71b8e897830.small.jpeg",
                title: "Class 10",
                slug: "programming-in-c"
            },
            {
                id: 'abc',
                thumbnail: "https://prod-discovery.edx-cdn.org/media/course/image/bb5e9463-0248-4f78-a337-b8bb9d829f2b-a71b8e897830.small.jpeg",
                title: "Class 12",
                slug: "programming-in-c"
            },
            {
                id: 'abc',
                thumbnail: "https://prod-discovery.edx-cdn.org/media/course/image/bb5e9463-0248-4f78-a337-b8bb9d829f2b-a71b8e897830.small.jpeg",
                title: "Class 7",
                slug: "programming-in-c"
            },
            {
                id: 'abc',
                thumbnail: "https://prod-discovery.edx-cdn.org/media/course/image/bb5e9463-0248-4f78-a337-b8bb9d829f2b-a71b8e897830.small.jpeg",
                title: "Class 8",
                slug: "programming-in-c"
            },
            {
                id: 'abc',
                thumbnail: "https://prod-discovery.edx-cdn.org/media/course/image/bb5e9463-0248-4f78-a337-b8bb9d829f2b-a71b8e897830.small.jpeg",
                title: "Class 9",
                slug: "programming-in-c"
            },
            {
                id: 'abc',
                thumbnail: "https://prod-discovery.edx-cdn.org/media/course/image/bb5e9463-0248-4f78-a337-b8bb9d829f2b-a71b8e897830.small.jpeg",
                title: "Class 10",
                slug: "programming-in-c"
            },
            {
                id: 'abc',
                thumbnail: "https://prod-discovery.edx-cdn.org/media/course/image/bb5e9463-0248-4f78-a337-b8bb9d829f2b-a71b8e897830.small.jpeg",
                title: "Class 12",
                slug: "programming-in-c"
            },
        ];
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
                    <div className="row">
                        {
                            items.map((ele, ind) => (
                                <div className="col-md-2" key={`card-${ind}`} style={{ marginBottom: "30px" }}>
                                    <Card>

                                        <CardActionArea onClick={() => {
                                            this.props.history.push(`/category/${ele.id}`);
                                        }}>
                                            <CardMedia
                                                className="card-img"
                                                image={ele.thumbnail}
                                                title={ele.title}
                                            />
                                            <CardContent style={{ paddingBottom: 0 }}>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {ele.title}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>

                                        <CardActions style={{ paddingTop: 0 }}>
                                            <IconButton aria-label="Edit"
                                                style={{ color: "#097d01" }}
                                                onClick={() => {
                                                    this.setState({
                                                        openModal: true,
                                                        selectedId: ele.id,
                                                        selectedTitle: ele.title
                                                    });
                                                }}
                                            >
                                                <EditIcon />
                                            </IconButton>

                                            <IconButton
                                                aria-label="Delete"
                                                style={{ color: "#db3825" }}
                                                onClick={() => this.deleteCategory(ele.id)}
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
                        <CreateCategory onClose={this.modalClose} ID={this.state.selectedId} title={this.state.selectedTitle} />
                    </div>
                </Modal>

            </main>
        );
    }
}

export default Dashboard;