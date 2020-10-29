import { Button, IconButton, TextField } from '@material-ui/core';
import React from 'react';
import NavBar from './NavBar';
import qs from 'qs';
import $ from 'jquery';
import 'jquery-ui';
import 'jquery-ui/ui/widgets/sortable';
import 'jquery-ui/ui/disable-selection';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';


class CreateChapter extends React.Component {
    componentDidMount() {
        const query = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
        $("#chapter-list").sortable({
        }).disableSelection();
    }
    render() {
        return (
            <main className="admin-content">
                <NavBar title="Chapter" />
                <div className="admin-body">
                    <form className="course-form">
                        <TextField required id="chapter-title" label="Chapter Title" />
                        <TextField
                            id="outlined-multiline-static"
                            label="Chapter Description (Optional)"
                            multiline
                            rows={4}
                            variant="outlined"
                        />
                    </form>
                    <div className="d-flex" style={{ marginTop: "10px" }}>
                        <h2 style={{ flexGrow: 1 }}>Contents</h2>
                        <Button variant="contained" color="primary" href="/create/chapter">
                            Add Video
                        </Button>
                        <Button variant="contained" style={{ backgroundColor: "#097d01", marginLeft: "1em", marginRight: "1em" }} color="primary" href="/create/chapter">
                            Add Quiz
                        </Button>
                        <Button variant="contained" color="secondary" href="/create/chapter">
                            Add Media
                        </Button>
                    </div>
                    <ul id="chapter-list" className="sortable" style={{ marginBottom: "10em" }}>
                        {['1', '2', '3', '4', '5', '6'].map((ele, i) => (
                            <li key={i}>
                                <PlayCircleFilledIcon /> Chapter {i + 1}
                                <IconButton aria-label="Edit" href={`/create/chapter?id=${ele.id}`}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton style={{ color: "#db3825" }} aria-label="Delete" onClick={this.delete}>
                                    <DeleteIcon />
                                </IconButton>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        );
    }
}

export default CreateChapter;