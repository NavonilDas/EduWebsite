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

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            block: false,
        };
        this.blockId = -1;
        this.showBlockAlert = this.showBlockAlert.bind(this);
        this.closeBlockAlert = this.closeBlockAlert.bind(this);
        this.blockUser = this.blockUser.bind(this);
        this.searchUser = this.searchUser.bind(this);
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
        if (query && query !== "") {
        }
    }

    changePage(eve, page) { }
    render() {
        return (
            <main className="admin-content">
                <NavBar title="Users" />
                <div
                    className="admin-body d-flex flex-column"
                    style={{ height: "100%" }}
                >
                    <form className="d-flex" style={{ marginBottom: "11px" }}>
                        <TextField
                            id="standard-basic"
                            label="Search Username"
                            onChange={this.searchUser}
                            style={{ flex: 1 }}
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            style={{ marginLeft: "11px" }}
                        >
                            Search
                        </Button>
                    </form>

                    <List dense style={{ flex: 1 }}>
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((value, i) => (
                            <ListItem key={value} button>
                                <ListItemAvatar>
                                    <Avatar
                                        alt={`Bvatar n°${value + 1}`}
                                        src={`/static/images/avatar/${value + 1}.jpg`}
                                    />
                                </ListItemAvatar>
                                <ListItemText primary={`User Name ${value + 1}`} />
                                <ListItemSecondaryAction>
                                    <IconButton
                                        style={{ color: "#db3825" }}
                                        edge="end"
                                        aria-label="Delete"
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
                        count={10}
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
