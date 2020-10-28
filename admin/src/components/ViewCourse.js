import { Button } from '@material-ui/core';
import React from 'react';
import NavBar from './NavBar';

class ViewCourse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Course Title"
        };
    }
    componentDidMount() {
        const courseSlug = this.props?.match?.params?.slug;
        console.log(courseSlug)
    }

    render() {
        return (
            <main className="admin-content">
                <NavBar title={this.state.title} />
                <div className="admin-body">
                    <div className="d-flex">
                        <h2 style={{ flexGrow: 1 }}>Chapters</h2>
                        <Button variant="contained" color="primary" href="/create/course">
                            Add Chapter
                        </Button>
                    </div>
                    <ul>
                    </ul>
                    <script></script>
                </div>
            </main>
        );
    }
}

export default ViewCourse;