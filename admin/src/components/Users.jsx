import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    TextField,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import React from "react";
import NavBar from "./NavBar";
// import DeleteIcon from '@material-ui/icons/Delete';
import BlockIcon from "@material-ui/icons/Block";

import axios from 'axios';
import { errorHandler, HOST, IMG } from '../Api';

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            block: false,
            users: [],
            pages: 1,
            search: ""
        };

        this.showBlockAlert = this.showBlockAlert.bind(this);
        this.closeBlockAlert = this.closeBlockAlert.bind(this);
        this.blockUser = this.blockUser.bind(this);
        this.searchUser = this.searchUser.bind(this);
        this.listUsers = this.listUsers.bind(this);
        this.changePage = this.changePage.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    showBlockAlert(id) {
        this.blockId = id;
        this.setState({ block: true });
    }

    closeBlockAlert() {
        this.setState({ block: false });
    }

    blockUser() {
        console.log(this.blockId);
        this.setState({ block: false });
    }

    searchUser(eve) {
        const query = eve.target.value;
        this.setState({
            search: query
        });
    }

    onSearch() {
        this.listUsers(1, this.state.search);
    }

    changePage(_, page) {
        if (this.state.search !== "") {
            this.listUsers(page, this.state.search);
        } else {
            this.listUsers(page);
        }
    }

    listUsers(page, name) {
        let URL = `${HOST}users/find`;
        const tmp = {};
        if (typeof page === "number") tmp.next = page;
        if (typeof name === "string" && name !== "") tmp.name = name;
        let query = new URLSearchParams(tmp).toString();
        if (query !== "") {
            URL += '?' + query;
            if (this.props.history) {
                this.props.history.push('/users?' + query)
            }
        }

        axios.get(URL, { withCredentials: true })
            .then(res => {
                this.setState({
                    users: res.data.users,
                    pages: res.data.pages
                });
            })
            .catch(err => errorHandler(err, this));
    }

    componentDidMount() {
        this.listUsers(this.state.pages);
    }

    render() {
        return (
            <main className="admin-content d-flex flex-column" style={{ minHeight: "100vh" }}>
                <NavBar title="Users" />
                <div
                    className="admin-body d-flex flex-column"
                    style={{ height: "100%" }}
                >
                    <form
                        className="d-flex"
                        style={{ marginBottom: "11px" }}
                        onSubmit={(event) => {
                            event.preventDefault();
                            this.onSearch();
                        }}
                    >
                        <TextField
                            fullWidth
                            id="standard-basic"
                            label="Search Username"
                            onChange={this.searchUser}
                            style={{ flex: 1 }}
                            value={this.state.search}
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            style={{ marginLeft: "11px" }}
                            onClick={this.onSearch}
                        >
                            Search
                        </Button>
                    </form>

                    <List dense style={{ flex: 1 }}>
                        {this.state.users.map((ele, i) => (
                            <ListItem key={'user' + i} button style={{ marginTop: '3px' }}>
                                <ListItemAvatar>
                                    <Avatar
                                        alt={`${ele.name}`}
                                        src={`${IMG}${ele.profile || ''}`}
                                    />
                                </ListItemAvatar>
                                <ListItemText primary={`${ele.name} (@${ele.username})`} />
                                <ListItemSecondaryAction>
                                    <IconButton
                                        style={{ color: "#db3825" }}
                                        edge="end"
                                        aria-label="Block"
                                        onClick={() => this.showBlockAlert(10)}
                                    >
                                        <BlockIcon />
                                    </IconButton>
                                    {/* <IconButton style={{ color: "#db3825" }} edge="end" aria-label="Delete">
                                        <DeleteIcon />
                                    </IconButton> */}
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>

                    <Pagination
                        onChange={this.changePage}
                        count={this.state.pages}
                        variant="outlined"
                        color="primary"
                        style={{ marginLeft: "auto" }}
                    />
                </div>

                <Dialog
                    open={this.state.block}
                    onClose={this.closeBlockAlert}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
                        Alert
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you Sure you want to Block the User?.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus color="primary" onClick={this.closeBlockAlert}>
                            Cancel
                        </Button>

                        <Button color="primary" onClick={this.blockUser}>
                            Block
                        </Button>

                    </DialogActions>
                </Dialog>
            </main>
        );
    }
}

export default Users;
