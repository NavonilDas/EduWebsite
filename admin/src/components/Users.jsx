import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, InputLabel, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, MenuItem, Select, TextField } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React from 'react';
import NavBar from './NavBar';
import DeleteIcon from '@material-ui/icons/Delete';
import BlockIcon from '@material-ui/icons/Block';

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            block: false
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
    changePage(eve, page) {
        
    }
    render() {
        return (
            <main className="admin-content">
                <NavBar title="Users" />
                <div className="admin-body">
                    <Dialog
                        open={this.state.block}
                        onClose={this.closeBlockAlert}
                        aria-labelledby="draggable-dialog-title"
                    >
                        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
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
                    <form>
                        <TextField id="standard-basic" label="Search Username" onChange={this.searchUser} />
                        <FormControl variant="filled">
                            <InputLabel id="demo-simple-select-filled-label">Filter</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={0}
                            >
                                <MenuItem value={0}><em>ALL</em></MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                        <Button variant="contained" color="primary">
                            Search
                        </Button>
                    </form>
                    <List dense>
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
                                    <Select value={30}>
                                        <MenuItem value={10}>Admin</MenuItem>
                                        <MenuItem value={20}>Teacher</MenuItem>
                                        <MenuItem value={30}>Student</MenuItem>
                                    </Select>
                                    <IconButton style={{ color: "#db3825" }} edge="end" aria-label="Delete" onClick={() => this.showBlockAlert(10)}>
                                        <BlockIcon />
                                    </IconButton>
                                    <IconButton style={{ color: "#db3825" }} edge="end" aria-label="Delete">
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                    <Pagination onChange={this.changePage} count={10} variant="outlined" color="primary" />
                </div>
            </main>
        );
    }
}

export default Users;