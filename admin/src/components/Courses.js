import React from 'react';
import NavBar from './NavBar';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class Courses extends React.Component {
    render() {
        const items = [
            {
                thumbnail: "https://prod-discovery.edx-cdn.org/media/course/image/bb5e9463-0248-4f78-a337-b8bb9d829f2b-a71b8e897830.small.jpeg",
                title: "Programming in C",
                description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
                by: "Pankaj Masiwal",
                slug: "programming-in-c"
            },
            {
                thumbnail: "https://prod-discovery.edx-cdn.org/media/course/image/bb5e9463-0248-4f78-a337-b8bb9d829f2b-a71b8e897830.small.jpeg",
                title: "Programming in C",
                description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
                by: "Pankaj Masiwal",
                slug: "programming-in-c"
            },
            {
                thumbnail: "https://prod-discovery.edx-cdn.org/media/course/image/bb5e9463-0248-4f78-a337-b8bb9d829f2b-a71b8e897830.small.jpeg",
                title: "Programming in C",
                description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
                by: "Pankaj Masiwal",
                slug: "programming-in-c"
            },
            {
                thumbnail: "https://prod-discovery.edx-cdn.org/media/course/image/bb5e9463-0248-4f78-a337-b8bb9d829f2b-a71b8e897830.small.jpeg",
                title: "Programming in C",
                description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
                by: "Pankaj Masiwal",
                slug: "programming-in-c"
            },
            {
                thumbnail: "https://prod-discovery.edx-cdn.org/media/course/image/bb5e9463-0248-4f78-a337-b8bb9d829f2b-a71b8e897830.small.jpeg",
                title: "Programming in C",
                description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
                by: "Pankaj Masiwal",
                slug: "programming-in-c"
            },
        ];
        return (
            <main className="admin-content">
                <NavBar title="Home" />
                <div className="admin-body">
                    <div className="d-flex" style={{ marginBottom: '1em' }}>
                        <h1 style={{ flexGrow: 1 }}>Courses</h1>
                        <Button variant="contained" color="primary" href="/create/course">
                            Create Course
                        </Button>
                    </div>
                    <div className="row">
                        {
                            items.map((ele, ind) => (
                                <div className="col-md-3" key={`card-${ind}`} style={{ padding: "15px" }}>
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
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    {ele.description}
                                                </Typography>
                                                <Typography variant="body2" color="textPrimary" component="p">
                                                    By {ele.by}
                                                </Typography>
                                            </CardContent>

                                        </CardActionArea>

                                        <CardActions>
                                            <Button size="small" color="primary">
                                                Share
                                        </Button>
                                            <Button size="small" color="primary" href="/course/test">
                                                Edit
                                        </Button>
                                        </CardActions>
                                    </Card>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </main>
        );
    }
}

export default Courses;