import { Button, TextField } from '@material-ui/core';
import React from 'react';


class CreateTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: (this.props.item) ? this.props.item.name : "",
            titleError: "",
            description: (this.props.item) ? this.props.item.description : "",
            duration: (this.props.item) ? this.props.item.duration : 10,
            durationError: "",
            apiError: ""
        };
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const ele = event.target;
        let tmp = {};
        if (ele.type && ele.type === 'checkbox') {
            tmp[ele.name] = ele.checked;
        } else {
            tmp[ele.name] = ele.value;
        }
        this.setState(tmp);
    }
    submit() {
        if (!this.props.categoryID) return;

        if (this.state.title === "") {
            return this.setState({ titleError: 'Title Can\'t Be Empty' });
        }

        if (this.state.duration <= 0 || isNaN(parseInt(this.state.duration))) {
            return this.setState({ priceError: 'Duration is Invalid' });
        }


        const body = new FormData();
        body.append('title', this.state.title);
        body.append('description', this.state.description);

        const config = {
            withCredentials: true,
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

    }

    render() {
        return (
            <main className="create-course modal">
                <h1>Create Test</h1>
                <div>

                    <span className="errorText">{(this.state.apiError) ? this.state.apiError : ''}</span>

                    <form className="course-form" style={{ width: "300px" }}>
                        <TextField
                            required
                            name="title"
                            error={this.state.titleError !== ""}
                            helperText={this.state.titleError}
                            label="Quiz Title"
                            value={this.state.title}
                            onChange={this.handleChange}
                        />

                        <TextField
                            id="outlined-multiline-static"
                            label="Quiz Description"
                            multiline
                            rows={4}
                            name="description"
                            variant="outlined"
                            value={this.state.description}
                            onChange={this.handleChange}
                        />

                        <div className="d-flex">
                            <TextField
                                id="filled-number"
                                label="Quiz Duration"
                                style={{ flex: 1 }}
                                error={this.state.durationError !== ""}
                                helperText={this.state.durationError}
                                type="number"
                                InputProps={{
                                    inputProps: {
                                        min: 1
                                    }
                                }}
                                name="duration"
                                onChange={this.handleChange}
                                value={this.state.duration}
                            />
                            <label style={{ margin: "auto 0 0 10px", fontSize: "1.5em" }}>Hours</label>
                        </div>

                        <Button variant="contained" color="primary" onClick={this.submit}>
                            {(this.props.selected) ? 'Update' : 'Submit'}
                        </Button>

                    </form>
                </div>
            </main>
        );
    }
}

export default CreateTest;