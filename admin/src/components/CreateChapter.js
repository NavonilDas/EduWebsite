import { TextField } from '@material-ui/core';
import React from 'react';
import NavBar from './NavBar';

class CreateChapter extends React.Component {
    render() {

        return (
            <main className="admin-content">
                <NavBar title="Chapter" />
                <div className="admin-body">
                    <form className="course-form">
                        <TextField required id="chapter-title" label="Chapter Title" />
                        <TextField
                            id="outlined-multiline-static"
                            label="Chapter Description"
                            multiline
                            rows={4}
                            variant="outlined"
                        />
                    </form>
                    
                </div>
            </main>
        );
    }
}

export default CreateChapter;