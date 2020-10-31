import React from 'react';
import NavBar from './NavBar';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Modal } from '@material-ui/core';
import CreateCategory from './Modals/CreateCategory';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false
        };

        this.openModal = this.openModal.bind(this);
        this.modalClose = this.modalClose.bind(this);
    }

    modalClose() {
        this.setState({ openModal: false });
    }

    openModal() {
        this.setState({ openModal: true });
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
                                <div className="col-md-2" key={`card-${ind}`} style={{ padding: "15px" }}>
                                    <Card>
                                        <CardActionArea>
                                            <CardMedia
                                                className="card-img"
                                                image={ele.thumbnail}
                                                title={ele.title}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {ele.title}
                                                </Typography>
                                            </CardContent>

                                        </CardActionArea>

                                        <CardActions>
                                            {/* <Button size="small" color="primary">
                                                Share
                                            </Button> */}
                                            <Button size="small" color="primary" href={`/category/${ele.id}`}>
                                                Edit
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
                    <CreateCategory onClose={this.modalClose} />
                </Modal>

            </main>
        );
    }
}

export default Dashboard;